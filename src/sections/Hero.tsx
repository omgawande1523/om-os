import { ArrowDown, Download, Mail, Terminal as TerminalIcon } from 'lucide-react';
import Picture from '../components/Picture';
import { profile } from '../data/profile';
import { education, experience } from '../data/experience';
import { forumRoleShort } from '../data/leadership';
import { projects } from '../data/projects';
import { RESUME_PDF } from '../data/resume';

const mrsac = experience[0];

/** At most three facts, all from src/data. */
const facts = [`${mrsac.shortTitle} @ ${mrsac.shortOrg}`, `CGPA ${education.cgpa.split(' ')[0]}`, forumRoleShort];

/** In-progress projects with a short label, linked to their entries in 01 / Work. */
const now = projects.filter((p) => p.status === 'in progress' && p.shortTitle);

const cta =
  'nb-press inline-flex items-center gap-2 font-mono text-xs font-bold uppercase border-[2.5px] border-black px-4 py-2.5 shadow-neo-sm';

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="w-full pt-10 md:pt-16 pb-12 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative overflow-hidden"
    >
      <div className="absolute inset-0 thread-grid-static pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-6">
        <div className="os-window bg-neo-surface">
          <div className="os-window-header-accent">
            <div className="flex items-center gap-2 text-black">
              <TerminalIcon size={14} aria-hidden="true" />
              <span>om_os</span>
            </div>
            <div className="window-dots" aria-hidden="true">
              <span className="window-dot bg-red-400"></span>
              <span className="window-dot bg-yellow-400"></span>
              <span className="window-dot bg-emerald-400"></span>
            </div>
          </div>

          <div className="p-5 sm:p-8 md:p-10 flex flex-col-reverse sm:flex-row gap-6 md:gap-10 items-start">
            <div className="flex-1 min-w-0 space-y-4">
              <h1 id="hero-title" className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-black leading-none">
                {profile.name}
              </h1>
              <p className="font-mono text-sm md:text-base font-bold text-black">{profile.role}</p>
              <p className="font-body text-base md:text-lg text-black/80 leading-relaxed max-w-2xl">{profile.heroBio}</p>

              <ul className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs md:text-sm font-semibold text-black" aria-label="Key facts">
                {facts.map((f, i) => (
                  <li key={f} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true" className="text-black/40">·</span>}
                    {f}
                  </li>
                ))}
              </ul>

              {now.length > 0 && (
                <p className="font-mono text-xs md:text-sm text-black/80">
                  <span className="font-bold text-black">Now:</span>{' '}
                  {now.map((p, i) => (
                    <span key={p.slug}>
                      {i > 0 && <span aria-hidden="true"> · </span>}
                      <a href={`#project-${p.slug}`} className="underline decoration-2 underline-offset-2 hover:bg-neo-yellow">
                        {p.shortTitle}
                      </a>
                    </span>
                  ))}
                </p>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <a href="#work" className={`${cta} bg-black text-neo-bg`}>
                  Projects <ArrowDown size={12} aria-hidden="true" />
                </a>
                <a href={RESUME_PDF} download className={`${cta} bg-neo-yellow text-black`}>
                  Resume <Download size={12} aria-hidden="true" />
                </a>
                <a href="#contact" className={`${cta} bg-neo-surface text-black`}>
                  Contact <Mail size={12} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="relative shrink-0 self-start">
              <div className="absolute inset-0 border-[2.5px] border-black bg-neo-blue translate-x-2 translate-y-2" aria-hidden="true" />
              <div className="relative border-[2.5px] border-black p-1.5 bg-neo-surface">
                <Picture
                  name="portrait"
                  alt={`Portrait of ${profile.name}`}
                  priority
                  sizes="(min-width: 768px) 176px, 112px"
                  className="w-28 h-28 md:w-44 md:h-44 object-cover border border-black"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
