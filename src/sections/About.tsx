import { Award, Briefcase, Code2, FileText, FlaskConical, Github, Linkedin, Users, Compass, Hammer } from 'lucide-react';
import { profile } from '../data/profile';
import { education, experience } from '../data/experience';
import { projects } from '../data/projects';
import { leadership } from '../data/leadership';
import { certifications } from '../data/certifications';
import { useReveal } from '../hooks/useReveal';


const inProgress = projects.filter((p) => p.status === 'in progress');

const quickStats = [
  { icon: Code2, label: 'Projects', value: projects.length },
  { icon: Briefcase, label: 'Internships', value: experience.length },
  { icon: Users, label: 'Leadership roles', value: leadership.length },
  { icon: Award, label: 'Certifications', value: certifications.length },
];

const profileLinks = [
  { label: 'GitHub', href: profile.links.github, icon: Github },
  { label: 'LinkedIn', href: profile.links.linkedin, icon: Linkedin },
  { label: 'ORCID', href: profile.links.orcid, icon: FileText },
  { label: 'Google Scholar', href: profile.links.googleScholar, icon: FileText },
].filter((l) => l.href);

export default function About() {
  const windowRef = useReveal<HTMLDivElement>();


  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="w-full py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-1">
          <p className="font-mono text-xs uppercase tracking-widest text-silver" aria-hidden="true">
            00 / ABOUT.SYS
          </p>
          <h2 id="about-title" className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-black">
            About
          </h2>
        </div>

        <div ref={windowRef} className="os-window flex flex-col">
          <div className="os-window-header-pink">
            <div className="flex items-center gap-2 text-black">
              <FileText size={14} aria-hidden="true" />
              <span>system_properties</span>
            </div>
            <div className="window-dots" aria-hidden="true">
              <span className="window-dot bg-red-400"></span>
              <span className="window-dot bg-yellow-400"></span>
              <span className="window-dot bg-emerald-400"></span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 bg-neo-surface">
            {/* Bio */}
            <div className="lg:col-span-5 p-6 md:p-8 space-y-6 lg:border-r-[2.5px] border-black flex flex-col justify-between">
              <div className="space-y-6">
                {profile.aboutParagraphs.map((para) => (
                  <p key={para} className="font-body text-sm md:text-base text-black/80 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              <div className="pt-6 border-t border-black/15 font-mono text-xs text-black/70 space-y-1.5">
                <p>
                  {education.shortName}, {education.city} · CGPA {education.cgpa} · Class of {education.classOf}
                </p>
                <ul className="flex flex-wrap gap-2 pt-2">
                  {profileLinks.map(({ label, href, icon: Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border-[2px] border-black px-2 py-1 font-bold text-black bg-neo-surface hover:bg-neo-yellow transition-colors"
                      >
                        <Icon size={12} aria-hidden="true" />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What I'm working on / interests / looking for */}
            <div className="lg:col-span-7 p-6 md:p-8 bg-neo-surface grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
              <div className="os-window bg-neo-surface">
                <div className="border-b-[2px] border-black px-4 py-1.5 bg-neo-mint font-mono text-[10px] font-bold text-black flex justify-between items-center">
                  <h3 className="uppercase">Research interests</h3>
                  <FlaskConical size={12} aria-hidden="true" />
                </div>
                <ul className="p-4 space-y-1.5 font-body text-sm text-black/80">
                  {profile.researchInterests.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>

              {inProgress.length > 0 && (
                <div className="os-window bg-neo-surface">
                  <div className="border-b-[2px] border-black px-4 py-1.5 bg-neo-yellow font-mono text-[10px] font-bold text-black flex justify-between items-center">
                    <h3 className="uppercase">Working on now</h3>
                    <Hammer size={12} aria-hidden="true" />
                  </div>
                  <ul className="p-4 space-y-3 font-body text-sm text-black/80">
                    {inProgress.map((p) => (
                      <li key={p.slug}>
                        <span className="font-bold text-black">{p.title}</span>
                        <span className="block text-xs text-black/70 mt-0.5">{p.oneLiner}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {profile.lookingFor && (
                <div className="os-window bg-neo-surface sm:col-span-2">
                  <div className="border-b-[2px] border-black px-4 py-1.5 bg-neo-blue font-mono text-[10px] font-bold text-black flex justify-between items-center">
                    <h3 className="uppercase">Looking for</h3>
                    <Compass size={12} aria-hidden="true" />
                  </div>
                  <p className="p-4 font-body text-sm text-black/80">{profile.lookingFor}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Counts derived from src/data */}
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats.map(({ icon: Icon, label, value }) => (
            <li key={label} className="os-window bg-neo-surface p-4 flex items-center gap-4">
              <div className="p-2 border-[2px] border-black bg-black text-neo-bg">
                <Icon size={18} className="text-current" aria-hidden="true" />
              </div>
              <div>
                <p className="font-mono text-xl md:text-2xl font-extrabold text-black leading-none">{value}</p>
                <p className="font-mono text-[10px] font-bold text-black/70 uppercase mt-1">{label}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
