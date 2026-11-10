import { useEffect, useState } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/<>_=+';
const SESSION_KEY = 'om_os_scrambled';
const DURATION_MS = 700;

interface Props {
  text: string;
  /** id of the element whose text is being decoded (it keeps the one real copy of `text`). */
  targetId: string;
  /** Same typography classes as the target, so the overlay lines up glyph for glyph (monospace). */
  className: string;
}

/**
 * Decodes `text` from random glyphs once per session, drawn on an aria-hidden overlay placed over the
 * target (a sibling, not inside it), so the heading's text content is always exactly `text`.
 * Written for this site (React Bits' DecryptedText / ScrambledText need Framer Motion / GSAP).
 * Skipped under prefers-reduced-motion and when sessionStorage is unavailable.
 */
export default function ScrambleText({ text, targetId, className }: Props) {
  const [shown, setShown] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      return; // storage blocked: skip rather than replay on every load
    }
    const target = document.getElementById(targetId);
    let raf = 0;
    let start = 0;
    const finish = () => {
      target?.removeAttribute('data-scrambling');
      setShown(null);
    };
    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min(1, (now - start) / DURATION_MS);
      const settled = Math.floor(progress * text.length);
      setShown(
        text
          .split('')
          .map((ch, i) => (ch === ' ' || i < settled ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join('')
      );
      if (progress < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    // Start after the boot overlay (index.html) has gone, so the effect is actually seen.
    const boot = document.getElementById('boot');
    const delay = boot && !boot.hidden ? 700 : 150;
    const timer = window.setTimeout(() => {
      target?.setAttribute('data-scrambling', 'true');
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      target?.removeAttribute('data-scrambling');
    };
  }, [text, targetId]);

  if (shown === null) return null;
  return (
    <span aria-hidden="true" className={`absolute left-0 top-0 pointer-events-none select-none ${className}`}>
      {shown}
    </span>
  );
}
