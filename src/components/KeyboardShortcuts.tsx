import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { sections } from '../data/sections';

function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  // Move focus for keyboard and screen-reader users without scrolling again.
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}

/** `1`–`9` jump to the numbered sections, `?` toggles this help. Ignored while typing. */
export default function KeyboardShortcuts() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      // Leave other open dialogs (e.g. a case study) alone.
      const otherDialogOpen = [...document.querySelectorAll('dialog[open]')].some((d) => d !== dialogRef.current);
      if (otherDialogOpen) return;

      if (e.key === '?') {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (/^[1-9]$/.test(e.key)) {
        const section = sections[Number(e.key) - 1];
        if (section) {
          e.preventDefault();
          setOpen(false);
          scrollToSection(section.id);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setOpen(false)}
      onClick={(e) => {
        if (e.target === dialogRef.current) setOpen(false);
      }}
      aria-labelledby="shortcuts-title"
      className="os-window p-0 w-[calc(100%-2rem)] max-w-sm bg-neo-surface border-[2.5px] border-black"
    >
      <div className="os-window-header-accent">
        <h2 id="shortcuts-title" className="font-mono text-sm text-black">
          Keyboard shortcuts
        </h2>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close keyboard shortcuts"
          className="p-1 border border-black bg-neo-surface hover:bg-black hover:text-neo-bg"
        >
          <X size={12} aria-hidden="true" />
        </button>
      </div>
      <dl className="p-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-xs text-black">
        {sections.map((s) => (
          <div key={s.id} className="contents">
            <dt>
              <kbd className="border border-black px-1.5 bg-neo-bg">{Number(s.number)}</kbd>
            </dt>
            <dd>{s.title}</dd>
          </div>
        ))}
        <dt>
          <kbd className="border border-black px-1.5 bg-neo-bg">?</kbd>
        </dt>
        <dd>Show / hide this help</dd>
        <dt>
          <kbd className="border border-black px-1.5 bg-neo-bg">Esc</kbd>
        </dt>
        <dd>Close dialogs</dd>
      </dl>
    </dialog>
  );
}
