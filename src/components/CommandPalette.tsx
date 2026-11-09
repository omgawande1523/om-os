// Lazy-loaded on first open (⌘K / Ctrl+K or the header hint). Uses cmdk (MIT, © 2022 Paco Coursey)
// inside a native <dialog> so no Radix dialog is needed.
import { useLayoutEffect, useRef, useState } from 'react';
import { Command } from 'cmdk';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { sections } from '../data/sections';
import { RESUME_PDF } from '../data/resume';
import { scrollToId, showProject } from '../lib/projectNav';
import { useTheme } from './ThemeProvider';

interface Props {
  onClose: () => void;
}

export default function CommandPalette({ onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();
  const [notice, setNotice] = useState('');

  useLayoutEffect(() => {
    const d = dialogRef.current;
    if (d && !d.open) d.showModal();
    // showModal() focuses cmdk's root (it has a tabindex); typing must go to the search box.
    inputRef.current?.focus();
  }, []);

  /** Close first (returns focus to the opener), then act. */
  const run = (action: () => void) => {
    dialogRef.current?.close();
    requestAnimationFrame(action);
  };

  const download = () => {
    const a = document.createElement('a');
    a.href = RESUME_PDF;
    a.download = 'Om_Gawande_Resume.pdf';
    a.click();
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setNotice(`Copied ${profile.email}`);
    } catch {
      setNotice(`Copy failed. Email: ${profile.email}`);
    }
    window.setTimeout(() => dialogRef.current?.close(), 900);
  };

  const openUrl = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

  const item =
    'flex items-center justify-between gap-3 px-3 py-2 font-mono text-xs text-black cursor-pointer data-[selected=true]:bg-neo-yellow data-[selected=true]:!text-black';
  const group = '[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-black/70';

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) dialogRef.current.close();
      }}
      aria-label="Command palette"
      className="os-window p-0 w-[calc(100%-2rem)] max-w-xl mt-[12vh] bg-neo-surface border-[2.5px] border-black"
    >
      <Command label="Command palette" className="flex flex-col max-h-[70vh]">
        <div className="os-window-header-accent">
          <span className="font-mono text-sm text-black">⌘K</span>
          <kbd className="font-mono text-[10px] border border-black px-1">Esc</kbd>
        </div>
        <Command.Input
          ref={inputRef}
          autoFocus
          placeholder="Jump to a section, open a project, copy email…"
          className="w-full px-4 py-3 font-mono text-sm bg-neo-surface text-black border-b-[2px] border-black placeholder:text-black/50"
        />
        <p role="status" aria-live="polite" className="font-mono text-xs text-black px-4 empty:hidden pt-2">
          {notice}
        </p>
        <Command.List className="overflow-y-auto pb-2">
          <Command.Empty className="px-4 py-6 font-mono text-xs text-black/70">No match.</Command.Empty>

          <Command.Group heading="Sections" className={group}>
            {sections.map((s) => (
              <Command.Item key={s.id} value={`section ${s.title}`} onSelect={() => run(() => scrollToId(s.id))} className={item}>
                <span>{s.title}</span>
                <span className="text-black/60">{s.number}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Projects" className={group}>
            {projects.map((p) => (
              <Command.Item key={p.slug} value={`project ${p.title} ${p.slug}`} onSelect={() => run(() => showProject(p.slug))} className={item}>
                <span className="truncate">{p.title}</span>
                {p.caseStudy && <span className="text-black/60 shrink-0">case study</span>}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Actions" className={group}>
            <Command.Item value="copy email address" onSelect={copyEmail} className={item}>
              <span>Copy email</span>
              <span className="text-black/60 truncate">{profile.email}</span>
            </Command.Item>
            <Command.Item value="download resume pdf" onSelect={() => run(download)} className={item}>
              Download resume
            </Command.Item>
            <Command.Item value="toggle theme dark light" onSelect={() => run(toggleTheme)} className={item}>
              <span>Toggle theme</span>
              <span className="text-black/60">→ {theme === 'light' ? 'dark' : 'light'}</span>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Links" className={group}>
            <Command.Item value="open github profile" onSelect={() => run(() => openUrl(profile.links.github))} className={item}>
              GitHub
            </Command.Item>
            <Command.Item value="open linkedin profile" onSelect={() => run(() => openUrl(profile.links.linkedin))} className={item}>
              LinkedIn
            </Command.Item>
            <Command.Item value="open orcid profile" onSelect={() => run(() => openUrl(profile.links.orcid))} className={item}>
              ORCID
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </dialog>
  );
}
