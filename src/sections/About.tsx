import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Briefcase, BookOpen, Settings, FileText, Code2, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Award,
    title: 'Forum President',
    subtitle: 'AI Prabodha Student Forum',
    description: 'Leading the AI student community at SVPCET, hosting hackathons, tech seminars, and mentoring junior coders.',
    colorClass: 'bg-neo-mint',
  },
  {
    icon: Users,
    title: 'Class Representative',
    subtitle: 'Elected CR for 3 Years',
    description: 'Serving as the primary communication link between students, academic department chairs, and college administration.',
    colorClass: 'bg-neo-blue',
  },
  {
    icon: Briefcase,
    title: 'Industry Internships',
    subtitle: 'Acube AI & RNR',
    description: 'Developed AI-powered applications, integrated machine learning models into production systems, and built enterprise ERP modules with AI capabilities.',
    colorClass: 'bg-neo-yellow',
  },
  {
    icon: BookOpen,
    title: 'Academic Honors',
    subtitle: '8.68 Cumulative CGPA',
    description: 'Consistently strong performance in advanced computer science, neural networks, and statistics coursework.',
    colorClass: 'bg-neo-pink',
  },
];

const quickStats = [
  { icon: Code2, label: 'Projects Built', value: '15+', color: 'text-neo-blue' },
  { icon: Lightbulb, label: 'Leadership Roles', value: '3', color: 'text-neo-orange' },
  { icon: Users, label: 'Events Organized', value: '10+', color: 'text-neo-mint' },
  { icon: Award, label: 'Certifications', value: '5+', color: 'text-neo-yellow' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        windowRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: windowRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-silver">
          <span>05 / ABOUT_ME.SYS</span>
        </div>

        {/* About OS Window */}
        <div
          ref={windowRef}
          className="os-window flex flex-col"
          style={{ opacity: 0 }}
        >
          {/* Header */}
          <div className="os-window-header-pink">
            <div className="flex items-center gap-2 text-black">
              <FileText size={14} />
              <span>system_properties_v1.0</span>
            </div>
            <div className="window-dots">
              <span className="window-dot bg-red-400"></span>
              <span className="window-dot bg-yellow-400"></span>
              <span className="window-dot bg-emerald-400"></span>
            </div>
          </div>

          {/* Menu bar inside window */}
          <div className="border-b-[2.5px] border-black bg-neo-surface px-4 py-1.5 flex items-center gap-4 font-mono text-xs text-black/60 font-semibold border-t-0 select-none">
            <span className="hover:text-black cursor-pointer">File</span>
            <span className="hover:text-black cursor-pointer">Edit</span>
            <span className="hover:text-black cursor-pointer">Compile</span>
            <span className="hover:text-black cursor-pointer">Help</span>
          </div>

          {/* Window Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border-t-0 bg-neo-surface">
            {/* Bio Column */}
            <div className="lg:col-span-5 p-6 md:p-8 space-y-6 lg:border-r-[2.5px] border-black flex flex-col justify-between">
              <div className="space-y-6">
                {/* Premium Profile Card */}
                <div className="relative group w-max mx-auto lg:mx-0 select-none">
                  {/* Layered behind offset */}
                  <div className="absolute inset-0 border-[2px] border-black bg-neo-pink translate-x-2 translate-y-2 pointer-events-none" />
                  <div className="relative border-[2.5px] border-black p-2 bg-neo-surface shadow-none z-10 w-40 h-40 overflow-hidden">
                    <img
                      src="/om-gawande-photo.jpg"
                      alt="Om Gawande"
                      className="w-full h-full object-cover border border-black"
                    />
                  </div>
                  <div className="absolute -top-3 -right-3 bg-neo-yellow border border-black px-2 py-0.5 text-[8px] font-mono font-bold rotate-6 z-20 text-black">
                    OM_OS v1.0
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs bg-neo-blue/20 text-black border border-black/10 px-2.5 py-1 w-max">
                  <span>Target: AI & Machine Learning</span>
                </div>
                <h3 className="font-display text-3xl font-extrabold leading-tight">
                  BUILDER. LEADER.
                  <br />
                  PROBLEM SOLVER.
                </h3>
                <p className="font-body text-sm md:text-base text-black/80 leading-relaxed">
                  Artificial Intelligence undergraduate with practical experience in building real-world computer vision and NLP systems and deploying them on embedded and fully offline infrastructure. Experienced in training custom object detection models, developing local LLM-based agentic pipelines, and delivering end-to-end AI solutions from dataset preparation to production deployment.
                </p>
                <p className="font-body text-sm md:text-base text-black/80 leading-relaxed">
                  Interested in applied AI, computer vision, and scalable intelligent systems. As President of the AI Prabodha Student Forum, I lead a community of aspiring AI engineers and organize technical events that bridge the gap between applied research and production systems.
                </p>
              </div>

              <div className="pt-6 border-t border-black/15 font-mono text-xs text-silver space-y-1.5">
                <p>INSTITUTION: SVPCET, Nagpur</p>
                <p>CGPA METRIC: 8.68 / 10.0</p>
                <p>GRADUATION: CLASS OF 2027</p>
              </div>
            </div>

            {/* Highlights Grid Column */}
            <div className="lg:col-span-7 p-6 md:p-8 bg-neo-surface space-y-8">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-black/60 mb-4 flex items-center gap-2">
                <Settings size={12} className="text-black" />
                SYSTEM_KEY_HIGHLIGHTS
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="os-window bg-neo-surface hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo-lg transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className={`border-b-[2px] border-black px-4 py-1.5 ${item.colorClass} font-mono text-[10px] font-bold text-black flex justify-between items-center`}>
                        <span className="uppercase">{item.title}</span>
                        <Icon size={12} className="text-black" />
                      </div>
                      <div className="p-4 space-y-2">
                        <p className="font-mono text-xs font-semibold text-black/60">
                          {item.subtitle}
                        </p>
                        <p className="font-body text-xs text-black/75 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="os-window bg-neo-surface hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo-lg transition-all duration-300 p-4 flex items-center gap-4"
              >
                <div className="p-2 border-[2px] border-black bg-black text-neo-bg">
                  <Icon size={18} className="text-current" />
                </div>
                <div>
                  <p className="font-mono text-xl md:text-2xl font-extrabold text-black leading-none">{stat.value}</p>
                  <p className="font-mono text-[10px] font-bold text-silver uppercase mt-1">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
