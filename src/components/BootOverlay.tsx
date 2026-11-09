import { useEffect, useState } from 'react';

const SESSION_KEY = 'om_os_booted';
const DURATION_MS = 650;

function shouldShow(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    if (window.sessionStorage.getItem(SESSION_KEY)) return false;
    window.sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    // Storage blocked (private mode etc.): still show it, just not remembered.
  }
  return true;
}

/**
 * Decorative boot screen drawn over the already-rendered page.
 * ≤ 700 ms, once per session, skippable with any key / click / tap,
 * skipped for prefers-reduced-motion, hidden from assistive tech.
 */
export default function BootOverlay() {
  const [visible, setVisible] = useState(shouldShow);

  useEffect(() => {
    if (!visible) return;
    const hide = () => setVisible(false);
    const timer = window.setTimeout(hide, DURATION_MS);
    window.addEventListener('keydown', hide, { once: true });
    window.addEventListener('pointerdown', hide, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', hide);
      window.removeEventListener('pointerdown', hide);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="boot-overlay fixed inset-0 z-[1000] bg-neo-bg flex flex-col items-center justify-center font-mono"
    >
      <div className="text-center space-y-6">
        <p className="text-4xl md:text-6xl font-extrabold text-black tracking-tight">
          OM<span className="text-neo-pink">.</span>OS
        </p>
        <div className="space-y-2">
          <p className="text-xs text-black/70 uppercase tracking-widest">Initializing core modules</p>
          <div className="w-64 h-[8px] bg-black/10 mx-auto overflow-hidden border border-black p-0.5">
            <div className="boot-bar h-full bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
}
