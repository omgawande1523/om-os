import { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  speed: number;
  size: number;
  opacity: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const burstContainerRef = useRef<HTMLDivElement>(null);
  
  // Position trackers with inertia
  const posRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const trailPositions = useRef<{ x: number; y: number }[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [hoverColor, setHoverColor] = useState('bg-neo-yellow');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(true);

  // Detect if screen is touch/mobile
  useEffect(() => {
    const checkMobile = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
      setIsMobile(isTouch);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Track mouse coordinates
    const onMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
    };

    // Handle interactive hover states
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const clickableElement = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.os-window') ||
        target.closest('.bento-card') || 
        target.closest('.bento-card-dark') ||
        target.closest('[data-cursor]');

      if (clickableElement) {
        setIsHovering(true);
        const dataCursor = clickableElement.getAttribute('data-cursor');
        
        if (dataCursor) {
          setHoverText(dataCursor);
          setHoverColor('bg-neo-pink');
        } else {
          const href = clickableElement.getAttribute('href') || '';
          const text = clickableElement.textContent?.toLowerCase() || '';
          const id = clickableElement.id || '';
          
          if (href.includes('github') || id.includes('github')) {
            setHoverText('CODE');
            setHoverColor('bg-neo-blue');
          } else if (href.includes('linkedin')) {
            setHoverText('CONNECT');
            setHoverColor('bg-neo-pink');
          } else if (href.includes('resume') || href.includes('cv') || text.includes('resume')) {
            setHoverText('OPEN');
            setHoverColor('bg-neo-mint');
          } else if (href.includes('mailto') || text.includes('transmit') || text.includes('contact')) {
            setHoverText('HELLO');
            setHoverColor('bg-neo-yellow');
          } else if (clickableElement.closest('#projects')) {
            setHoverText('VIEW');
            setHoverColor('bg-neo-orange');
          } else {
            setHoverText('GO');
            setHoverColor('bg-neo-yellow');
          }
        }
      }
    };

    const onMouseOut = () => {
      setIsHovering(false);
      setHoverText('');
    };

    // Click burst handler
    const onMouseClick = (e: MouseEvent) => {
      const colors = ['#99D2BF', '#A3E2F3', '#FFC4D0', '#FFB37C', '#F5C518'];
      const newParticles: Particle[] = Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.5;
        const speed = 2 + Math.random() * 4;
        const size = 4 + Math.random() * 6;
        return {
          id: Date.now() + i + Math.random(),
          x: e.clientX,
          y: e.clientY,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle,
          speed,
          size,
          opacity: 1,
        };
      });
      setParticles((prev) => [...prev, ...newParticles]);
    };

    // Animation frames loop
    let frameId: number;
    const animate = () => {
      const pos = posRef.current;
      
      // Interpolate main cursor coordinates for smooth drag feel
      pos.x += (pos.targetX - pos.x) * 0.22;
      pos.y += (pos.targetY - pos.y) * 0.22;

      if (cursor) {
        cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }

      // Animate trailing dot segments
      let prevX = pos.x;
      let prevY = pos.y;
      
      trailRefs.current.forEach((trailDot, idx) => {
        if (!trailDot) return;
        const tPos = trailPositions.current[idx];
        
        // Add lag to each segment in the tail snake
        tPos.x += (prevX - tPos.x) * 0.25;
        tPos.y += (prevY - tPos.y) * 0.25;
        
        trailDot.style.transform = `translate3d(${tPos.x}px, ${tPos.y}px, 0)`;
        
        prevX = tPos.x;
        prevY = tPos.y;
      });

      frameId = requestAnimationFrame(animate);
    };

    // Attach document listener sets
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('click', onMouseClick);
    
    frameId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('click', onMouseClick);
      cancelAnimationFrame(frameId);
    };
  }, [isMobile]);

  // Particle physics update
  useEffect(() => {
    if (particles.length === 0) return;

    let animId = requestAnimationFrame(() => {
      setParticles((prev) =>
        prev
          .map((p) => {
            const nextX = p.x + Math.cos(p.angle) * p.speed;
            const nextY = p.y + Math.sin(p.angle) * p.speed;
            return {
              ...p,
              x: nextX,
              y: nextY,
              opacity: p.opacity - 0.05,
            };
          })
          .filter((p) => p.opacity > 0)
      );
    });

    return () => cancelAnimationFrame(animId);
  }, [particles]);

  if (isMobile) return null;

  return (
    <>
      {/* Click burst particles */}
      <div ref={burstContainerRef} className="fixed inset-0 pointer-events-none z-[10000]">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute border border-black shadow-neo-sm"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: p.opacity,
              transform: 'translate(-50%, -50%) rotate(45deg)',
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* Snake Trail Dots */}
      {!isHovering &&
        Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            ref={(el) => {
              if (el) trailRefs.current[idx] = el;
            }}
            className="fixed top-0 left-0 w-2 h-2 rounded-full border border-black bg-neo-blue pointer-events-none z-[9998]"
            style={{
              opacity: (4 - idx) * 0.22,
              transform: 'translate3d(0, 0, 0)',
              marginLeft: 16 - idx * 3,
              marginTop: 18 - idx * 2,
              transition: 'opacity 0.2s',
              willChange: 'transform',
            }}
          />
        ))}

      {/* Main Cursor Element */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          transform: 'translate3d(0,0,0)',
        }}
      >
        {isHovering ? (
          /* Hover Badge State */
          <div
            className={`border-[2.5px] border-black px-3 py-1 font-mono text-[10px] font-extrabold text-black uppercase shadow-neo-sm -translate-x-1/2 -translate-y-1/2 select-none flex items-center justify-center animate-in scale-in-95 duration-100 ${hoverColor}`}
            style={{
              minWidth: '70px',
              height: '26px',
            }}
          >
            {hoverText}
          </div>
        ) : (
          /* Default SVG Pointer Arrow (Thick Black Outline, Soft Blue Accent Offset) */
          <div ref={pointerRef} className="relative -left-2 -top-1">
            <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Soft Blue Offset/Drop Shadow */}
              <path
                d="M4 2 L4 20 L9.5 14.5 L13.5 23 L17.5 21 L13.5 12.5 L20 12.5 Z"
                fill="#A3E2F3"
                className="transform translate-x-[2px] translate-y-[2px]"
              />
              {/* Main Arrow */}
              <path
                d="M2 0 L2 18 L7.5 12.5 L11.5 21 L15.5 19 L11.5 10.5 L18 10.5 Z"
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </>
  );
}
