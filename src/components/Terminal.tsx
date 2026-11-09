import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { profile } from '../data/profile';
import { heroFacts } from '../data/facts';
import { projects } from '../data/projects';
import { RESUME_PDF } from '../data/resume';
import { github, languageMethodLabel, formatDate, display } from '../lib/github';
import { scrollToId, showProject } from '../lib/projectNav';
import { useTheme } from './ThemeProvider';
import { PREFILL_CONTACT_EVENT } from '../lib/events';

const HIRE_MESSAGE = 'Hi Om, I found your portfolio and would like to talk about an opportunity.';

interface Entry {
  id: number;
  input: string | null;
  output: ReactNode;
}

const COMMANDS: { name: string; desc: string }[] = [
  { name: 'help', desc: 'list commands' },
  { name: 'whoami', desc: 'who I am, in three lines' },
  { name: 'ls projects', desc: 'list every project' },
  { name: 'open <slug>', desc: 'open a project (case study or entry)' },
  { name: 'cat resume', desc: 'download my resume (PDF)' },
  { name: 'contact', desc: 'email and profiles' },
  { name: 'github', desc: 'GitHub stats, languages, latest commits' },
  { name: 'theme', desc: 'toggle light / dark' },
  { name: 'clear', desc: 'clear the screen' },
];
const COMPLETIONS = ['help', 'whoami', 'ls projects', 'open ', 'cat resume', 'contact', 'github', 'theme', 'clear', 'sudo hire om'];
const CHIPS = ['help', 'whoami', 'ls projects', 'github', 'cat resume', 'sudo hire om'];
const slugs = projects.map((p) => p.slug);

const resumeKB = `${(__RESUME_META__.sizeBytes / 1024).toFixed(0)} KB`;

const link = (href: string, label: string) => (
  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="underline text-neo-yellow">
    {label}
  </a>
);

function commonPrefix(items: string[]) {
  if (!items.length) return '';
  let p = items[0];
  for (const s of items) while (!s.startsWith(p)) p = p.slice(0, -1);
  return p;
}

const welcome: Entry = {
  id: 0,
  input: null,
  output: (
    <p className="text-[#c9c3b8]">
      Type <span className="text-neo-yellow">help</span>, or tap a command below.
    </p>
  ),
};

/** The hero terminal: a real command line over the site's data. */
export default function Terminal() {
  const { theme, toggleTheme } = useTheme();
  const [entries, setEntries] = useState<Entry[]>([welcome]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [entries]);

  const print = (input: string | null, output: ReactNode) =>
    setEntries((prev) => [...prev, { id: nextId.current++, input, output }]);

  function execute(raw: string) {
    const cmd = raw.trim().replace(/\s+/g, ' ');
    if (!cmd) return;
    setHistory((h) => (h[h.length - 1] === cmd ? h : [...h, cmd]));
    setCursor(null);
    setValue('');
    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setEntries([]);
      return;
    }
    if (lower === 'help') {
      return print(
        cmd,
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5">
          {COMMANDS.map((c) => (
            <div key={c.name} className="contents">
              <dt className="text-neo-yellow whitespace-nowrap">{c.name}</dt>
              <dd className="text-[#c9c3b8]">{c.desc}</dd>
            </div>
          ))}
        </dl>
      );
    }
    if (lower === 'whoami') {
      return print(
        cmd,
        <div className="space-y-1">
          <p>
            <span className="text-neo-yellow font-bold">{profile.name}</span> · {profile.role}
          </p>
          <p className="text-[#c9c3b8]">{profile.heroBio}</p>
          <p>{heroFacts.join(' · ')}</p>
        </div>
      );
    }
    if (lower === 'ls projects' || lower === 'ls') {
      return print(
        cmd,
        <div className="space-y-1">
          <ul className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-4">
            {projects.map((p) => (
              <li key={p.slug} className="contents">
                <span className="text-neo-yellow whitespace-nowrap">{p.slug}</span>
                <span className="text-[#c9c3b8] mb-1 sm:mb-0">{p.title}</span>
              </li>
            ))}
          </ul>
          <p className="text-[#c9c3b8]">
            Try <span className="text-neo-yellow">open {projects[0].slug}</span>
          </p>
        </div>
      );
    }
    if (lower.startsWith('open')) {
      const slug = lower.slice(4).trim();
      if (!slug) return print(cmd, <p>Usage: open &lt;slug&gt;. See <span className="text-neo-yellow">ls projects</span>.</p>);
      const project = projects.find((p) => p.slug === slug);
      if (!project || !showProject(slug)) return print(cmd, <p className="text-red-300">No project “{slug}”. Try ls projects.</p>);
      return print(cmd, <p>Opening {project.title}{project.caseStudy ? ' (case study)' : ''}…</p>);
    }
    if (lower === 'cat resume' || lower === 'resume') {
      const a = document.createElement('a');
      a.href = RESUME_PDF;
      a.download = 'Om_Gawande_Resume.pdf';
      a.click();
      return print(
        cmd,
        <p>
          Downloading Om_Gawande_Resume.pdf ({resumeKB}). {link(RESUME_PDF, 'Open in browser')}
        </p>
      );
    }
    if (lower === 'contact') {
      return print(
        cmd,
        <ul className="space-y-0.5">
          <li>email · {link(`mailto:${profile.email}`, profile.email)}</li>
          <li>github · {link(profile.links.github, profile.links.github.replace('https://', ''))}</li>
          <li>linkedin · {link(profile.links.linkedin, 'linkedin.com/in/om-gawande-601081242')}</li>
          <li>orcid · {link(profile.links.orcid, profile.links.orcid.replace('https://', ''))}</li>
          <li className="text-[#c9c3b8]">
            or the form: {link('#contact', '#contact')} (tip: <span className="text-neo-yellow">sudo hire om</span>)
          </li>
        </ul>
      );
    }
    if (lower === 'github') {
      return print(
        cmd,
        <div className="space-y-2">
          <p>
            {display(github.publicRepos)} public repos · {display(github.contributions?.lastYear)} contributions (last year) ·{' '}
            {display(github.totalStars)} stars · {display(github.followers)} followers
          </p>
          <div>
            <p className="text-[#c9c3b8]">languages ({languageMethodLabel[github.languages.method]}):</p>
            {github.languages.items.map((l) => (
              <p key={l.name} className="flex gap-2">
                <span className="w-36 shrink-0 truncate">{l.name}</span>
                <span aria-hidden="true" className="text-neo-yellow">
                  {'█'.repeat(Math.max(1, Math.round(l.percent / 5)))}
                </span>
                <span>{l.percent}%</span>
              </p>
            ))}
          </div>
          <div>
            <p className="text-[#c9c3b8]">latest public commits:</p>
            {github.recentPushes.map((c) => (
              <p key={`${c.repo}${c.date}${c.message}`} className="break-words">
                <span className="text-neo-yellow">{c.repo.split('/')[1]}</span> {c.message}{' '}
                <span className="text-[#c9c3b8]">({formatDate(c.date)})</span>
              </p>
            ))}
          </div>
          <p className="text-[#c9c3b8]">snapshot {formatDate(github.generatedAt)} · {link(github.profileUrl, 'full profile')}</p>
        </div>
      );
    }
    if (lower === 'theme') {
      toggleTheme();
      return print(cmd, <p>Theme: {theme === 'light' ? 'dark' : 'light'}</p>);
    }
    if (lower === 'sudo hire om') {
      window.dispatchEvent(new CustomEvent(PREFILL_CONTACT_EVENT, { detail: HIRE_MESSAGE }));
      scrollToId('contact');
      // Contact is lazy: dispatch again once it has had a chance to mount.
      window.setTimeout(() => window.dispatchEvent(new CustomEvent(PREFILL_CONTACT_EVENT, { detail: HIRE_MESSAGE })), 400);
      return print(cmd, <p className="text-neo-mint">Permission granted. The contact form is open and pre-filled.</p>);
    }
    if (lower.startsWith('sudo')) return print(cmd, <p className="text-red-300">Permission denied. Only “sudo hire om” works here.</p>);
    print(cmd, <p className="text-red-300">command not found: {cmd}. Type help.</p>);
  }

  function complete() {
    const v = value.toLowerCase();
    const pool = v.startsWith('open ') ? slugs.map((s) => `open ${s}`) : COMPLETIONS;
    const matches = pool.filter((c) => c.startsWith(v));
    if (matches.length === 1) setValue(matches[0]);
    else if (matches.length > 1) {
      const prefix = commonPrefix(matches);
      if (prefix.length > v.length) setValue(prefix);
      else print(value, <p className="text-[#c9c3b8]">{matches.map((m) => m.replace(/^open /, '')).join('   ')}</p>);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      execute(value);
    } else if (e.key === 'Tab' && value) {
      // Only capture Tab while there is something to complete, so keyboard users can still tab out.
      e.preventDefault();
      complete();
    } else if (e.key === 'ArrowUp') {
      if (!history.length) return;
      e.preventDefault();
      const next = cursor === null ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (e.key === 'ArrowDown') {
      if (cursor === null) return;
      e.preventDefault();
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(null);
        setValue('');
      } else {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === 'Escape') {
      setValue('');
    }
  }

  return (
    <div className="os-window !bg-[#111111] !text-[#FAF6EE] font-mono text-xs md:text-sm">
      <div className="os-window-header-dark">
        <span className="text-neo-bg">om_os — terminal</span>
        <div className="window-dots" aria-hidden="true">
          <span className="window-dot bg-red-400"></span>
          <span className="window-dot bg-yellow-400"></span>
          <span className="window-dot bg-emerald-400"></span>
        </div>
      </div>

      {/* Clicking anywhere in the screen focuses the prompt (unless the user is selecting text). */}
      <div
        className="p-4 md:p-5 space-y-3"
        onMouseUp={(e) => {
          if (window.getSelection()?.toString()) return;
          if (e.target instanceof Element && e.target.closest('a,button')) return;
          inputRef.current?.focus({ preventScroll: true });
        }}
      >
        <div ref={logRef} role="log" aria-label="Terminal output" className="max-h-64 overflow-y-auto space-y-3 pr-1">
          {entries.map((e) => (
            <div key={e.id} className="space-y-1">
              {e.input !== null && (
                <p className="text-neo-pink flex items-center gap-1 break-all">
                  <ChevronRight size={14} className="shrink-0" aria-hidden="true" />
                  <span>{e.input}</span>
                </p>
              )}
              <div className="pl-5 break-words">{e.output}</div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            execute(value);
          }}
          className="flex items-center gap-2 pt-3 border-t border-white/10"
        >
          <label htmlFor="terminal-input" className="text-neo-pink font-bold flex items-center shrink-0">
            om_os
            <ChevronRight size={14} aria-hidden="true" />
            <span className="sr-only">Terminal command. Try help, whoami, ls projects, open, cat resume, contact, github, theme, clear.</span>
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setCursor(null);
            }}
            onKeyDown={onKeyDown}
            placeholder="type help"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="go"
            className="flex-1 min-w-0 bg-transparent !text-[#FAF6EE] border-none placeholder-white/50 font-mono text-xs md:text-sm"
          />
        </form>

        <div className="flex flex-wrap gap-2" aria-label="Quick commands" role="group">
          {CHIPS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => execute(c)}
              className="px-2 py-1 border border-white/30 text-[11px] font-bold hover:bg-neo-yellow hover:text-black hover:border-neo-yellow"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
