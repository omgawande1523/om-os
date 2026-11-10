import { useEffect, useRef, useState } from 'react';
import Picture, { type ImageKey } from './Picture';

interface Props {
  /** Basename under public/video/ (AV1 .webm + H.264 .mp4). */
  video: string;
  poster: ImageKey;
  alt: string;
  caption: string;
}

type NetworkInformation = { saveData?: boolean };

/**
 * Real recording of a live demo. Shows the poster; attaches and plays the muted loop only while the
 * card is on screen, and never under prefers-reduced-motion or Data Saver.
 */
export default function DemoVideo({ video, poster, alt, caption }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [attach, setAttach] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = (navigator as Navigator & { connection?: NetworkInformation }).connection?.saveData === true;
    if (reduce.matches || saveData) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAttach(true);
          vid.current?.play().catch(() => {});
        } else {
          vid.current?.pause();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    const onReduce = () => {
      if (reduce.matches) {
        vid.current?.pause();
        setAttach(false);
      }
    };
    reduce.addEventListener('change', onReduce);
    return () => {
      io.disconnect();
      reduce.removeEventListener('change', onReduce);
    };
  }, []);

  return (
    <figure className="relative aspect-video overflow-hidden border-b-[2.5px] border-black bg-black m-0">
      <div ref={box} className="absolute inset-0">
        <Picture name={poster} alt={alt} sizes="(min-width: 1024px) 600px, 100vw" className="w-full h-full object-cover" />
        {attach && (
          <video
            ref={vid}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            autoPlay
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
          >
            <source src={`/video/${video}.webm`} type='video/webm; codecs="av01.0.05M.08"' />
            <source src={`/video/${video}.mp4`} type="video/mp4" />
          </video>
        )}
      </div>
      <figcaption className="absolute left-2 bottom-2 font-mono text-[10px] font-bold uppercase bg-black text-neo-bg px-1.5 py-0.5">
        {caption}
      </figcaption>
    </figure>
  );
}
