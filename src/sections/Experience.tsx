import { useState } from 'react';
import { Folder, FolderOpen, FileText, GraduationCap } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import SectionHeading from '../components/SectionHeading';
import { experience, education } from '../data/experience';


export default function Experience() {
  const windowRef = useReveal<HTMLDivElement>();
  const [selectedId, setSelectedId] = useState<string>(experience[0].id);


  const current = experience.find((r) => r.id === selectedId) ?? experience[0];

  return (
    <section
      id="experience"
      className="w-full py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <SectionHeading id="experience" />

        <div ref={windowRef} className="space-y-8">
          {/* Education card */}
          <article className="os-window bg-neo-surface">
            <div className="os-window-header">
              <div className="flex items-center gap-2 font-mono text-sm text-black">
                <GraduationCap size={14} aria-hidden="true" />
                <span>{education.fileName}</span>
              </div>
              <span className="font-mono text-[10px] font-bold">{education.period}</span>
            </div>
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-1">
                <h3 className="font-display text-xl md:text-2xl font-bold text-black">{education.degree}</h3>
                <p className="font-body text-sm text-black/75">
                  {education.institution}, {education.city}
                </p>
              </div>
              <dl className="md:col-span-4 grid grid-cols-2 gap-3 font-mono">
                <div className="border-[2px] border-black p-3 bg-neo-yellow shadow-neo-sm">
                  <dt className="text-[9px] font-bold uppercase text-black/70">CGPA</dt>
                  <dd className="text-lg font-extrabold text-black">{education.cgpa}</dd>
                </div>
                <div className="border-[2px] border-black p-3 bg-neo-mint shadow-neo-sm">
                  <dt className="text-[9px] font-bold uppercase text-black/70">Class of</dt>
                  <dd className="text-lg font-extrabold text-black">{education.classOf}</dd>
                </div>
              </dl>
            </div>
          </article>

          {/* Work experience explorer */}
          <div className="os-window flex flex-col bg-neo-surface">
            <div className="os-window-header-accent">
              <div className="flex items-center gap-2 font-mono text-sm text-black min-w-0">
                <Folder size={14} className="text-black shrink-0" aria-hidden="true" />
                <span className="truncate">explorer.exe --path C:\omgawande\experience</span>
              </div>
              <div className="window-dots" aria-hidden="true">
                <span className="window-dot bg-red-400"></span>
                <span className="window-dot bg-yellow-400"></span>
                <span className="window-dot bg-emerald-400"></span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 bg-neo-surface">
              <div className="md:col-span-4 p-4 md:border-r-[2.5px] border-b-[2.5px] md:border-b-0 border-black bg-neo-bg/50 font-mono text-xs space-y-2">
                <p className="flex items-center gap-2 py-1.5 px-2.5 font-bold bg-black text-neo-bg">
                  <FolderOpen size={14} aria-hidden="true" />
                  <span>Work_Experience</span>
                </p>
                <div className="pl-6 border-l border-black/10 space-y-0.5" role="group" aria-label="Internships">
                  {experience.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedId(role.id)}
                      aria-pressed={selectedId === role.id}
                      className={`flex items-center gap-1.5 w-full text-left py-1 px-2 border border-transparent text-[11px] ${
                        selectedId === role.id ? 'bg-neo-blue border-black font-semibold' : 'hover:bg-black/5 text-black'
                      }`}
                    >
                      <FileText size={11} aria-hidden="true" />
                      <span>{role.fileName}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-8 p-6 md:p-8 bg-neo-surface space-y-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl font-bold text-black">{current.title}</h3>
                    {current.period && (
                      <span className="inline-flex items-center font-mono text-[10px] font-bold bg-neo-yellow/20 text-black border border-black/15 px-2 py-0.5">
                        {current.period}
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-xs text-black/60 font-semibold uppercase">{current.org}</p>
                </div>

                <ul className="space-y-2 font-body text-sm text-black/80">
                  {current.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span className="text-neo-pink font-bold mt-0.5" aria-hidden="true">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
