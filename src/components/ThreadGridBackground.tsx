import { lazy, Suspense, useEffect, useRef, useState } from 'react';

// three.js + meshline live in their own chunk and are only fetched when this decides to render them.
const ElasticThreadGrid = lazy(() => import('./ElasticThreadGrid'));

const QUERY = '(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)';

/**
 * Decorative background for the Projects section.
 * Desktop + fine pointer + motion allowed → interactive WebGL grid, loaded once the section nears the viewport.
 * Everyone else → a static CSS grid (no JS, no WebGL).
 */
export default function ThreadGridBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia(QUERY).matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEnabled(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 z-0 thread-grid-static" aria-hidden="true">
      {enabled && (
        <Suspense fallback={null}>
          <ElasticThreadGrid />
        </Suspense>
      )}
    </div>
  );
}
