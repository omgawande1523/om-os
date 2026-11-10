import { useLayoutEffect, useRef } from 'react';

/**
 * Fade-up on scroll, replacing GSAP/ScrollTrigger.
 * The element is fully visible in the HTML (no JS, prerender, crawlers). The hidden start
 * state is applied only once JS runs, and never under prefers-reduced-motion (see index.css).
 * `stagger` animates the element's direct children one after another instead.
 */
export function useReveal<T extends HTMLElement>({ stagger = false }: { stagger?: boolean } = {}) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    el.classList.add(stagger ? 'reveal-stagger' : 'reveal');
    if (stagger) {
      Array.from(el.children).forEach((child, i) => (child as HTMLElement).style.setProperty('--reveal-i', String(i)));
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stagger]);

  return ref;
}
