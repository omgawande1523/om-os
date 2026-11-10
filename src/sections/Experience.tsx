import { ArrowUpRight, Award, GraduationCap } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { experience, education } from '../data/experience';
import { certifications } from '../data/certifications';

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black">
      <div className="max-w-7xl mx-auto space-y-10">
        <SectionHeading id="experience" />

        {/* Timeline */}
        <ol className="relative border-l-[2.5px] border-black ml-2 space-y-8">
          {experience.map((role) => (
            <li key={role.id} className="relative pl-6 md:pl-8">
              <span className="absolute -left-[9px] top-1.5 w-4 h-4 bg-neo-yellow border-[2.5px] border-black" aria-hidden="true" />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-lg md:text-xl font-bold text-black">{role.title}</h3>
                {role.period && <span className="font-mono text-xs font-bold text-black/70">{role.period}</span>}
              </div>
              <p className="font-mono text-xs md:text-sm font-semibold text-black/80 mt-0.5">{role.org}</p>
              <ul className="mt-3 space-y-1.5 font-body text-sm text-black/80 max-w-3xl">
                {role.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="text-black/50" aria-hidden="true">–</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        {/* Education: one line */}
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs md:text-sm text-black border-t-[2.5px] border-black pt-6">
          <GraduationCap size={16} aria-hidden="true" className="shrink-0" />
          <span className="font-bold">{education.degree}</span>
          <span aria-hidden="true" className="text-black/40">·</span>
          <span>
            {education.institution}, {education.city}
          </span>
          <span aria-hidden="true" className="text-black/40">·</span>
          <span>{education.period}</span>
          <span aria-hidden="true" className="text-black/40">·</span>
          <span className="font-bold">CGPA {education.cgpa}</span>
        </p>

        {/* Certifications: badges */}
        <div className="space-y-3">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-black/70">Certifications</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {certifications.map((c) => {
              const body = (
                <>
                  <Award size={14} aria-hidden="true" className="shrink-0 mt-0.5" />
                  <span className="min-w-0">
                    <span className="block font-display text-xs font-bold text-black leading-snug">{c.name}</span>
                    <span className="block font-mono text-[10px] text-black/70 mt-0.5">{c.issuer}</span>
                  </span>
                  {c.credentialUrl && <ArrowUpRight size={12} aria-hidden="true" className="shrink-0 ml-auto" />}
                </>
              );
              const cls = 'flex items-start gap-2 h-full border-[2px] border-black bg-neo-surface p-3 shadow-nb-sm';
              return (
                <li key={c.id}>
                  {c.credentialUrl ? (
                    <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className={`nb-press ${cls} hover:bg-neo-yellow`}>
                      {body}
                    </a>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
