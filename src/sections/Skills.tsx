import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Code2, Eye, Globe, Wrench, Cpu, Sparkles, FolderOpen, Users, type LucideIcon } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { skillCategories, type SkillIcon } from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

const icons: Record<SkillIcon, LucideIcon> = {
  code: Code2,
  brain: Brain,
  eye: Eye,
  sparkles: Sparkles,
  globe: Globe,
  wrench: Wrench,
  cpu: Cpu,
  users: Users,
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
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
      id="skills"
      className="w-full py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div ref={headingRef}>
          <SectionHeading id="skills" />
        </div>

        {/* Skills Bento Grid - 4 Columns */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => {
            const Icon = icons[category.icon];

            return (
              <div
                key={category.id}
                className="os-window flex flex-col justify-between group hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-neo-lg transition-all duration-300 bg-neo-surface"
              >
                {/* Folder Header */}
                <div className={`border-b-[2px] border-black px-4 py-2 ${category.colorClass} font-mono text-xs font-bold text-black flex justify-between items-center select-none`}>
                  <div className="flex items-center gap-2">
                    <FolderOpen size={13} className="text-black" aria-hidden="true" />
                    <span>{category.id}.sys</span>
                  </div>
                  <Icon size={14} className="text-black" aria-hidden="true" />
                </div>

                {/* Folder Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-display text-lg font-bold text-black ">
                      {category.title}
                    </h3>
                    <p className="font-body text-xs text-black/70 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Skills Badges Grid */}
                  <div className="space-y-2 pt-4 border-t border-black/10">
                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="font-mono text-[10px] text-black bg-black/5 border border-black/10 px-2 py-0.5 font-bold hover:bg-black hover:text-white transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
