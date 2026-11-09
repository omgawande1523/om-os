import { useSyncExternalStore } from 'react';
import { profile } from '../data/profile';
import Picture from '../components/Picture';
import { education, experience } from '../data/experience';
import { leadership } from '../data/leadership';
import { projects, featuredProjects } from '../data/projects';
import { Terminal, ArrowDown, MapPin, GraduationCap, Command, Cpu, Briefcase, Award } from 'lucide-react';

const noopSubscribe = () => () => {};
const getToday = () => new Date().toDateString();

export default function Hero() {
  // Visitor's date, client-only (the prerendered HTML shows a dash).
  const today = useSyncExternalStore(noopSubscribe, getToday, () => null);

  const metrics = [
    { label: 'CGPA', value: education.cgpa.split(' ')[0], detail: `${education.degree.replace('B.Tech in ', 'B.Tech ')}, class of ${education.classOf}`, color: 'bg-neo-yellow' },
    { label: 'Leadership', value: 'President', detail: leadership[0].org, color: 'bg-neo-mint' },
    { label: 'Internships', value: String(experience.length), detail: experience.map((r) => r.shortOrg).join(' · '), color: 'bg-neo-blue' },
    { label: 'Projects', value: String(projects.length), detail: `${featuredProjects.length} featured`, color: 'bg-neo-pink' },
  ];

  return (
    <section
      className="min-h-screen w-full pt-20 pb-16 px-4 md:px-8 lg:px-16 flex flex-col justify-center bg-neo-bg text-black overflow-hidden relative transition-colors duration-200"
    >
      {/* Decorative Grid Lines to give OS look */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-8">
        {/* Title Banner */}
        <div className="border-[2.5px] border-black bg-neo-yellow p-4 md:p-6 shadow-neo flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Command className="w-6 h-6 animate-spin text-black" style={{ animationDuration: '6s' }} />
            <h1 className="font-display text-lg md:text-xl font-bold tracking-wider uppercase text-black">
              {profile.name}
              <span className="sr-only">, {profile.role}</span>
              <span aria-hidden="true" className="hidden sm:inline"> // SYSTEM MAIN_CONSOLE //</span>
            </h1>
          </div>
          <div className="font-mono text-xs font-semibold hidden md:flex items-center gap-4 text-black">
            <span>SYS_STATUS: ACTIVE</span>
            <span className="bg-black text-neo-yellow px-2 py-0.5">{profile.role.toUpperCase()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Welcome Terminal Window */}
          <div
            className="lg:col-span-7 os-window flex flex-col h-full"
          >
            <div className="os-window-header-accent">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-black" />
                <span className="text-black">om_os_terminal.sh</span>
              </div>
              <div className="window-dots">
                <span className="window-dot bg-red-400"></span>
                <span className="window-dot bg-yellow-400"></span>
                <span className="window-dot bg-emerald-400"></span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between font-mono !bg-[#111111] !text-[#FAF6EE] space-y-6">
              <div className="space-y-4">
                <div className="text-neo-mint text-xs">Last login: {today ?? '—'} on ttys001</div>
                <div className="space-y-1">
                  <p className="text-neo-blue"><span className="text-neo-pink">~/omgawande</span> $ cat identity.json</p>
                  <pre className="text-xs md:text-sm text-neo-mint leading-relaxed overflow-x-auto !bg-black/50 p-3 border border-white/10 rounded-sm">
{JSON.stringify(
  { name: profile.name, role: profile.role, interests: profile.researchInterests },
  null,
  2
)}
                  </pre>
                </div>
                
                <p className="text-sm !text-[#FAF6EE]/85 leading-relaxed font-sans">
                  {profile.heroBio}
                </p>

                <div className="flex flex-wrap gap-3 pt-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 border border-white/20 px-2.5 py-1 !bg-white/5 !text-[#FAF6EE]">
                    <MapPin size={11} className="text-neo-pink" />
                    {profile.location.city}, {profile.location.region}
                  </span>
                  <span className="inline-flex items-center gap-1.5 border border-white/20 px-2.5 py-1 !bg-white/5 !text-[#FAF6EE]">
                    <GraduationCap size={11} className="text-neo-blue" />
                    {education.shortName} {education.city}
                  </span>
                  <span className="inline-flex items-center gap-1.5 border border-white/20 px-2.5 py-1 !bg-white/5 !text-[#FAF6EE]">
                    <Briefcase size={11} className="text-neo-yellow" />
                    Interned @ {experience.map((r) => r.shortOrg).join(', ')}
                  </span>
                </div>
              </div>

              {/* Console Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 font-mono text-xs !bg-[#FAF6EE] !text-[#111111] px-4 py-2.5 border-2 border-transparent hover:!bg-[#111111] hover:!text-[#FAF6EE] hover:border-[#FAF6EE]/50 transition-all duration-200 font-bold"
                  data-cursor="VIEW"
                >
                  EXECUTE --projects
                  <ArrowDown size={12} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 font-mono text-xs bg-transparent !text-[#FAF6EE] px-4 py-2.5 border-2 border-white/20 hover:border-white hover:bg-white/5 transition-all duration-200"
                  data-cursor="HELLO"
                >
                  CONNECT --contact
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: User Portrait Window */}
          <div
            className="lg:col-span-5 os-window flex flex-col justify-between"
          >
            <div className="os-window-header">
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-black" />
                <span className="text-black">portrait_viewer.app</span>
              </div>
              <div className="window-dots">
                <span className="window-dot bg-red-400"></span>
                <span className="window-dot bg-yellow-400"></span>
                <span className="window-dot bg-emerald-400"></span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col items-center justify-center bg-neo-surface space-y-6">
              <div className="relative group">
                {/* Layered Neo-Brutalist Elements Behind */}
                <div className="absolute inset-0 border-[2.5px] border-black bg-neo-blue translate-x-2 translate-y-2 select-none pointer-events-none" />
                <div className="absolute inset-0 border-[2.5px] border-black bg-neo-pink -translate-x-1.5 -translate-y-1.5 select-none pointer-events-none" />
                
                {/* Main Frame */}
                <div className="relative border-[2.5px] border-black p-2 bg-neo-surface hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 shadow-none z-10">
                  <div className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 overflow-hidden border border-black">
                    <Picture
                      name="portrait"
                      alt={`Portrait of ${profile.name}`}
                      priority
                      sizes="288px"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                {/* Deco tape */}
                <div className="absolute -top-4 left-4 bg-neo-yellow border border-black px-3 py-0.5 text-[9px] font-mono font-extrabold -rotate-3 select-none z-20 text-black">
                  SYS_ADMIN: OM_GAWANDE
                </div>
              </div>
              <div className="w-full text-center space-y-1">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                  PROFILE: OM GAWANDE
                </p>
                <p className="font-mono text-[10px] text-silver font-semibold uppercase">
                  {profile.role.toUpperCase()} // {education.shortName} {education.classOf}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key facts, all derived from src/data */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className={`os-window hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo-lg transition-all duration-300 ${metric.color}`}
            >
              <div className="border-b-[2px] border-black px-3 py-1 bg-black/5 font-mono text-[9px] font-bold text-black/70 flex justify-between select-none">
                <span>{metric.label.toUpperCase()}</span>
                <Award size={10} className="text-black/50" />
              </div>
              <div className="p-4 space-y-1">
                <p className="font-display text-lg md:text-xl font-extrabold text-black truncate leading-tight">
                  {metric.value}
                </p>
                <p className="font-sans text-[9px] text-black/70 leading-none">
                  {metric.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
