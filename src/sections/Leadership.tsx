import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Flag, Users, Trophy, Sparkles, Activity, Target, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const leadershipRoles = [
  {
    icon: Flag,
    role: 'President (prev. Secretary & Founding Member)',
    org: 'AI Prabodha Student Forum',
    period: '2023 - Present',
    details: [
      'Pioneered the SVPCET AI student society, growing the active member base to 150+ active participants.',
      'Organized multiple Python development bootcamps and artificial intelligence starter seminars.',
      'Mentored 50+ junior engineering students in setting up local Jupyter notebooks and training models.'
    ],
    color: 'bg-neo-mint',
  },
  {
    icon: Users,
    role: 'Class Representative',
    org: 'AI Department, SVPCET',
    period: '2023 - 2026 (3 Consecutive Years)',
    details: [
      'Elected peer representative coordinating scheduling, syllabus alignments, and resource distributions.',
      'Liaison between department faculty heads and 70+ students to smooth academic operations.',
      'Managed event feedback loops resulting in improved laboratory compute hour allocations.'
    ],
    color: 'bg-neo-blue',
  },
  {
    icon: Trophy,
    role: 'Dataventics GenAI Hackathon Lead',
    org: 'SVPCET AI Campus Events',
    period: '2024 - 2025',
    details: [
      'Chaired logistics and challenge design for campus-wide hackathons attracting 200+ competitors.',
      'Configured server compute slots and verified target API access keys for student hackathon teams.',
      'Maintained uptime of assessment web app during concurrent grading checks by judges.'
    ],
    color: 'bg-neo-yellow',
  },
  {
    icon: Target,
    role: 'AI Verse Organizer',
    org: 'Department Technical Board',
    period: '2024',
    details: [
      'Coordinated challenge rules and evaluation metrics for the campus-wide prompt engineering competition.',
      'Designed evaluation schemas and reference prompts to assess model compliance and efficiency.',
      'Evaluated 40+ competitor submissions, verifying execution pipelines and response accuracies.'
    ],
    color: 'bg-neo-pink',
  },
  {
    icon: Sparkles,
    role: 'Community Builder',
    org: 'Open Source Education',
    period: 'Ongoing',
    details: [
      'Advocate for open-source AI utilities, publishing custom Python wrappers and CLI tools on GitHub.',
      'Host weekend code reviews and hardware debugging sessions for student builders.',
      'Organize technical visits to local tech hubs to inspect real-world automated pipelines.'
    ],
    color: 'bg-neo-orange',
  },
  {
    icon: Brain,
    role: 'Technical Leader',
    org: 'Research & Project Teams',
    period: '2023 - Present',
    details: [
      'Directing core development groups for student projects, establishing coding styles and lint rules.',
      'Guiding model optimization methodologies (quantization, RAG pipeline fine-tuning).',
      'Orchestrated multi-disciplinary teams across frontend, backend, and embedded edge systems.'
    ],
    color: 'bg-neo-surface',
  }
];

export default function Leadership() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className="w-full py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-silver">
          <span>04 / LEADERSHIP_REGISTRY.CFG</span>
        </div>

        {/* Outer Command Center Window */}
        <div className="os-window flex flex-col bg-neo-surface">
          {/* Window Header */}
          <div className="os-window-header-accent">
            <div className="flex items-center gap-2 font-mono text-sm text-black">
              <ShieldCheck size={14} />
              <span>community_leadership_dashboard.exe</span>
            </div>
            <div className="window-dots">
              <span className="window-dot bg-red-400"></span>
              <span className="window-dot bg-yellow-400"></span>
              <span className="window-dot bg-emerald-400"></span>
            </div>
          </div>

          {/* Sub menu bar */}
          <div className="border-b-[2px] border-black bg-neo-surface px-4 py-2 flex items-center justify-between font-mono text-[10px] text-black/60 border-t-0 select-none">
            <div className="flex gap-4">
              <span>Registry</span>
              <span>Achievements</span>
              <span>Impact_Index</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 font-bold">
              <Activity size={10} className="animate-pulse" />
              <span>LIVE_INDEX_OK</span>
            </div>
          </div>

          {/* Window Body */}
          <div className="p-6 md:p-8 bg-[#FFFDF9]">
            <div className="max-w-3xl mb-8 space-y-2">
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-black uppercase">
                Bridging Tech & Management
              </h3>
              <p className="font-body text-sm text-black/70 leading-relaxed">
                Technical competency becomes exponential when paired with leadership. As a forum founder, representative, and event organizer, I manage engineering goals, event operations, and student peer mentorship.
              </p>
            </div>

            {/* Roles Grid */}
            <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {leadershipRoles.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="os-window bg-neo-surface hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-neo-lg transition-all duration-300 flex flex-col justify-between"
                    style={{ opacity: 0 }}
                  >
                    {/* Header bar of role window */}
                    <div className={`border-b-[2.5px] border-black px-4 py-2 ${item.color} font-mono text-xs font-bold text-black flex justify-between items-center`}>
                      <span className="uppercase">{item.role}</span>
                      <span className="text-[10px] text-black/60 font-bold">{item.period}</span>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1 border border-black bg-black text-neo-bg">
                            <Icon size={12} className="text-current" />
                          </div>
                          <span className="font-mono text-xs font-bold text-black">{item.org}</span>
                        </div>
                        <ul className="space-y-2 font-body text-xs text-black/75 leading-relaxed list-none">
                          {item.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-1.5">
                              <span className="text-neo-pink font-bold mt-0.5">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer bar */}
          <div className="border-t-[2.5px] border-black bg-black text-neo-bg px-4 py-2 font-mono text-[9px] text-right flex justify-between select-none">
            <span>OFFICER_GRADE: SVPCET_FORUM_PRESIDENT</span>
            <span>SYSTEM_METRIC: EXCELLENT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
