import { useEffect, useState } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/<>_=+';
const SESSION_KEY = 'om_os_scrambled';
const DURATION_MS = 700;

/**
 * Decodes `text` from random glyphs once per session. Written for this site (React Bits'
 * DecryptedText/ScrambledText need Framer Motion / GSAP). Screen readers always get the real text;
 * the HTML and reduced-motion users see it unchanged.
 */
export default function ScrambleText({ text }: { text: string }) {
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      return; // storage blocked: skip rather than replay on every load
    }
    let raf = 0;
    let start = 0;
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
    };
    // Start after the boot overlay (index.html) has gone, so the effect is actually seen.
    const boot = document.getElementById('boot');
    const delay = boot && !boot.hidden ? 700 : 150;
    const timer = window.setTimeout(() => (raf = requestAnimationFrame(tick)), delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
    </>
  );
}
