import { useState, useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ChevronRight, Play, BarChart2, Calendar, GitCommit, GitBranch } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { github, languageMethodLabel, formatDate, display } from '../lib/github';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const languageColors = ['bg-neo-blue', 'bg-neo-mint', 'bg-neo-pink', 'bg-neo-yellow', 'bg-neo-orange', 'bg-black/40', 'bg-black/15'];

const snapshotDate = formatDate(github.generatedAt);

// Curated one-liners beat empty GitHub descriptions.
const descriptionFor = (repoName: string, fallback: string | null) => {
  const project = projects.find((p) => p.repoUrls.some((u) => u.endsWith(`/${repoName}`)));
  return project?.oneLiner ?? fallback ?? 'No description on GitHub.';
};

const recentRepos = github.repos
  .filter((r) => r.name !== github.user)
  .slice(0, 5)
  .map((r) => ({ name: r.name, lang: r.language ?? '—', desc: descriptionFor(r.name, r.description) }));

// Contribution calendar: group days into weeks (columns), Sunday first.
const weeks: ({ date: string; count: number; level: number } | null)[][] = [];
if (github.contributions) {
  const days = github.contributions.days;
  const firstDow = days.length ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0;
  let week: ({ date: string; count: number; level: number } | null)[] = Array.from({ length: firstDow }, () => null);
  for (const d of days) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push([...week, ...Array.from({ length: 7 - week.length }, () => null)]);
}

const levelClass = [
  'bg-black/5 dark:bg-white/5',
  'bg-emerald-200 dark:bg-emerald-900/50',
  'bg-emerald-400 dark:bg-emerald-700',
  'bg-emerald-600 dark:bg-emerald-500',
  'bg-emerald-800 dark:bg-emerald-300',
];

interface CommandLog {
  input: string;
  output: ReactNode;
}

const stats = [
  { label: 'Public repos', value: display(github.publicRepos), className: 'bg-neo-mint/20' },
  { label: 'Contributions (last year)', value: display(github.contributions?.lastYear), className: 'bg-neo-blue/20' },
  { label: 'Stars', value: display(github.totalStars), className: 'bg-neo-pink/20' },
  { label: 'Followers', value: display(github.followers), className: 'bg-neo-yellow/20' },
];

export default function GitHubStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      input: 'cat github.snapshot.json | head',
      output: (
        <p className="text-[#c9c3b8]">
          Snapshot of github.com/{github.user} taken {snapshotDate}. Type &apos;help&apos; for commands.
        </p>
      ),
    },
  ]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        windowRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: windowRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const runCommand = (cmd: string) => {
    const clean = cmd.trim().toLowerCase();
    let out: ReactNode;
    switch (clean) {
      case 'help':
        out = (
          <div className="space-y-1.5 text-xs">
            <p className="text-neo-yellow font-bold">AVAILABLE COMMANDS:</p>
            <p><span className="text-neo-blue font-bold">stats</span> - profile numbers from the snapshot</p>
            <p><span className="text-neo-blue font-bold">languages</span> - language split</p>
            <p><span className="text-neo-blue font-bold">repos</span> - most recently pushed public repos</p>
            <p><span className="text-neo-blue font-bold">clear</span> - clear the terminal</p>
          </div>
        );
        break;
      case 'stats':
        out = (
          <div className="space-y-1 text-xs border border-white/10 p-3 bg-white/5">
            <p className="text-neo-mint font-bold border-b border-white/10 pb-1 mb-1">SNAPSHOT {snapshotDate}</p>
            <p>USER: {github.user}</p>
            <p>PUBLIC_REPOS: {display(github.publicRepos)}</p>
            <p>CONTRIBUTIONS_LAST_YEAR: {display(github.contributions?.lastYear)}</p>
            <p>STARS: {display(github.totalStars)}</p>
            <p>FOLLOWERS: {display(github.followers)}</p>
          </div>
        );
        break;
      case 'languages':
        out = (
          <div className="space-y-2 text-xs border border-white/10 p-3 bg-white/5">
            <p className="text-neo-pink font-bold">LANGUAGES ({languageMethodLabel[github.languages.method]}):</p>
            {github.languages.items.map((l) => (
              <p key={l.name}>
                {l.name.padEnd(18, ' ')} {l.percent}%
              </p>
            ))}
          </div>
        );
        break;
      case 'repos':
        out = (
          <div className="space-y-2 text-xs">
            <p className="text-neo-blue font-bold">RECENTLY PUSHED PUBLIC REPOS:</p>
            {recentRepos.map((repo) => (
              <div key={repo.name} className="border-l-2 border-neo-mint pl-3 py-0.5 bg-white/5">
                <p className="font-bold text-neo-mint break-all">
                  {repo.name} <span className="text-[10px] text-white/60">({repo.lang})</span>
                </p>
                <p className="text-white/70 text-[11px]">{repo.desc}</p>
              </div>
            ))}
          </div>
        );
        break;
      case 'clear':
        setLogs([]);
        setInputVal('');
        return;
      default:
        out = <p className="text-red-300">command not found: {cmd}. Type &apos;help&apos;.</p>;
    }
    setLogs((prev) => [...prev, { input: cmd, output: out }]);
    setInputVal('');
  };

  return (
    <section
      ref={sectionRef}
      id="github"
      className="w-full py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <SectionHeading id="github" />

        <div ref={windowRef} className="os-window flex flex-col bg-neo-surface" style={{ opacity: 0 }}>
          <div className="os-window-header-dark">
            <div className="flex items-center gap-2 font-mono text-sm text-neo-bg min-w-0">
              <Github size={14} className="text-neo-bg shrink-0" aria-hidden="true" />
              <span className="truncate">github.snapshot.json</span>
            </div>
            <span className="font-mono text-[10px] text-neo-bg">Snapshot: {snapshotDate}</span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 bg-neo-surface">
            {/* Left: stats */}
            <div className="xl:col-span-7 p-4 sm:p-6 md:p-8 space-y-6 xl:border-r-[2.5px] border-black min-w-0">
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className={`border-[2px] border-black p-3 shadow-neo-sm ${s.className}`}>
                    <dd className="font-mono text-2xl font-extrabold text-black">{s.value}</dd>
                    <dt className="font-mono text-[9px] font-bold text-black/70 uppercase">{s.label}</dt>
                  </div>
                ))}
              </dl>

              {github.languages.items.length > 0 && (
                <div className="border-[2.5px] border-black bg-neo-surface p-4 shadow-neo-sm space-y-3">
                  <h3 className="font-mono text-xs font-bold text-black uppercase flex items-center gap-1.5">
                    <BarChart2 size={13} className="text-neo-pink" aria-hidden="true" />
                    Languages
                  </h3>
                  <div className="flex h-4 border-[2px] border-black p-0.5 bg-neo-bg" aria-hidden="true">
                    {github.languages.items.map((lang, i) => (
                      <div
                        key={lang.name}
                        style={{ width: `${lang.percent}%` }}
                        className={`h-full ${languageColors[i % languageColors.length]} border-r last:border-r-0 border-black`}
                      />
                    ))}
                  </div>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                    {github.languages.items.map((lang, i) => (
                      <li key={lang.name} className="flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 border border-black inline-block shrink-0 ${languageColors[i % languageColors.length]}`} />
                        <span className="font-semibold text-black/80">
                          {lang.name} ({lang.percent}%)
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-mono text-[10px] text-black/70">Method: {languageMethodLabel[github.languages.method]}.</p>
                </div>
              )}

              {github.contributions && (
                <div className="border-[2.5px] border-black bg-neo-surface p-4 shadow-neo-sm space-y-3">
                  <h3 className="font-mono text-xs font-bold text-black uppercase flex items-center gap-1.5">
                    <Calendar size={13} className="text-neo-blue" aria-hidden="true" />
                    {github.contributions.lastYear} contributions in the last year
                  </h3>
                  <div className="overflow-x-auto pt-1" role="img" aria-label={`Contribution calendar: ${github.contributions.lastYear} contributions in the year to ${snapshotDate}`}>
                    <div className="flex gap-[3px] w-max">
                      {weeks.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-[3px]">
                          {week.map((day, di) =>
                            day ? (
                              <div
                                key={day.date}
                                title={`${day.date}: ${day.count}`}
                                className={`w-2.5 h-2.5 border-[0.5px] border-black/10 ${levelClass[Math.min(day.level, 4)]}`}
                              />
                            ) : (
                              <div key={`empty-${di}`} className="w-2.5 h-2.5" />
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="font-mono text-[10px] text-black/70">Public contribution calendar, from github-contributions-api.jogruber.de.</p>
                </div>
              )}

              {github.recentPushes.length > 0 && (
                <div className="border-[2.5px] border-black bg-neo-surface p-4 shadow-neo-sm space-y-3">
                  <h3 className="font-mono text-xs font-bold text-black uppercase flex items-center gap-1.5">
                    <GitBranch size={13} className="text-neo-orange" aria-hidden="true" />
                    Latest public commits
                  </h3>
                  <ul className="space-y-2 text-xs font-mono">
                    {github.recentPushes.map((push) => (
                      <li key={`${push.repo}-${push.date}-${push.message}`} className="flex items-start gap-2 border-b border-black/5 pb-2 last:border-0">
                        <GitCommit size={14} className="text-neo-pink shrink-0 mt-0.5" aria-hidden="true" />
                        <div className="min-w-0">
                          <p className="font-bold text-black break-words">{push.message}</p>
                          <p className="text-[10px] text-black/70 font-semibold mt-0.5 break-all">
                            {push.repo} · {formatDate(push.date)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right: terminal */}
            <div className="xl:col-span-5 p-4 sm:p-6 md:p-8 !bg-[#111111] !text-[#FAF6EE] font-mono text-xs md:text-sm flex flex-col justify-between min-h-[350px] space-y-6 min-w-0">
              <div className="space-y-4 flex-1 overflow-y-auto" aria-live="polite">
                {logs.map((log, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center gap-1 text-neo-pink break-all">
                      <ChevronRight size={14} className="shrink-0" aria-hidden="true" />
                      <span>{log.input}</span>
                    </div>
                    <div className="pl-4 !text-[#FAF6EE]/90 break-words">{log.output}</div>
                  </div>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inputVal.trim()) runCommand(inputVal);
                }}
                className="flex items-center gap-2 pt-4 border-t border-white/10"
              >
                <span className="text-neo-pink font-bold flex items-center select-none" aria-hidden="true">
                  om_os
                  <ChevronRight size={14} className="mt-0.5" />
                </span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  aria-label="Terminal command (help, stats, languages, repos, clear)"
                  placeholder="help, stats, languages, repos…"
                  className="flex-1 min-w-0 bg-transparent !text-[#FAF6EE] font-mono text-xs md:text-sm border-none placeholder-white/50"
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </div>
          </div>

          <div className="border-t-[2.5px] border-black bg-neo-bg p-4 flex flex-wrap items-center justify-between gap-4 font-mono">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] text-black/70 font-bold uppercase mr-1">Run:</span>
              {['help', 'stats', 'languages', 'repos', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => runCommand(cmd)}
                  className="px-3 py-1 bg-black text-neo-bg border border-black hover:bg-neo-bg hover:text-black transition-colors text-[10px] font-bold uppercase flex items-center gap-1"
                >
                  <Play size={8} aria-hidden="true" />
                  {cmd}
                </button>
              ))}
            </div>
            <a
              href={github.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-black border-b-[2px] border-black pb-0.5 font-bold hover:bg-neo-yellow flex items-center gap-1"
            >
              <Github size={12} className="text-black" aria-hidden="true" />
              <span>Full GitHub profile</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
