import { ShieldCheck, Flag, Users, Trophy, Sparkles, Target, Brain, type LucideIcon } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import SectionHeading from '../components/SectionHeading';
import { leadership, leadershipIntro, type LeadershipIcon } from '../data/leadership';


const icons: Record<LeadershipIcon, LucideIcon> = {
  flag: Flag,
  users: Users,
  trophy: Trophy,
  target: Target,
  sparkles: Sparkles,
  brain: Brain,
};

export default function Leadership() {
  const containerRef = useReveal<HTMLDivElement>({ stagger: true });


  return (
    <section
      id="leadership"
      className="w-full py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <SectionHeading id="leadership" />

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
          </div>

          {/* Window Body */}
          <div className="p-6 md:p-8 bg-[#FFFDF9]">
            <div className="max-w-3xl mb-8 space-y-2">
              <p className="font-body text-sm text-black/70 leading-relaxed">{leadershipIntro}</p>
            </div>

            {/* Roles Grid */}
            <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {leadership.map((item) => {
                const Icon = icons[item.icon];
                return (
                  <div
                    key={item.id}
                    className="os-window bg-neo-surface hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-neo-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Header bar of role window */}
                    <div className={`border-b-[2.5px] border-black px-4 py-2 ${item.color} font-mono text-xs font-bold text-black flex justify-between items-center`}>
                      <h3 className="uppercase">{item.role}</h3>
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
            <span>{leadership.length} roles</span>
            <span>SVPCET, Nagpur</span>
          </div>
        </div>
      </div>
    </section>
  );
}
