import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ChevronRight, Activity, Play, BarChart2, Calendar, GitCommit, GitBranch } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
import { fetchGitHubData } from '../lib/github';
import type { GitHubStatsData } from '../lib/github';

// Mock contributions grid (24 weeks x 7 days)
const contributionWeeks = 28;
const contributionGrid = Array.from({ length: 7 }).map((_, dayIdx) =>
  Array.from({ length: contributionWeeks }).map((_, weekIdx) => {
    // Generate organic patterns of activity (0 = none, 1-3 = varying density)
    const seed = Math.sin(weekIdx * 0.4) + Math.cos(dayIdx * 0.6) + Math.random() * 0.8;
    if (seed < 0.2) return 0;
    if (seed < 0.9) return 1;
    if (seed < 1.4) return 2;
    return 3;
  })
);

interface CommandLog {
  input: string;
  output: React.ReactNode;
}

export default function GitHubStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const [inputVal, setInputVal] = useState('');
  const [stats, setStats] = useState<GitHubStatsData | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchGitHubData().then((data) => {
      if (isMounted) {
        setStats(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const currentStats = stats || {
    reposCount: 15,
    starsCount: 2,
    followers: 5,
    contributions: 46,
    languages: [
      { name: 'Python', percentage: 60, color: 'bg-neo-blue' },
      { name: 'TypeScript', percentage: 25, color: 'bg-neo-mint' },
      { name: 'JavaScript', percentage: 10, color: 'bg-neo-pink' },
      { name: 'Other', percentage: 5, color: 'bg-neo-yellow' }
    ],
    repos: []
  };

  const topRepos = (currentStats.repos || []).slice(0, 4).map(r => ({
    name: r.name,
    desc: r.description || 'Verified repository published on omgawande1523 GitHub profile.',
    lang: r.language || 'Python'
  }));

  const githubData = {
    username: 'omgawande1523',
    repos: currentStats.reposCount,
    contributions: currentStats.contributions,
    followers: currentStats.followers,
    stars: currentStats.starsCount,
    languages: currentStats.languages,
    topRepos: topRepos.length > 0 ? topRepos : [
      { name: 'Automatic-waste-segregation-with-computer-vision', desc: 'YOLO waste classifier source script', lang: 'JavaScript' },
      { name: 'AadhaarX', desc: 'AI-Powered Secure Digital Identity & Verification Ecosystem', lang: 'TypeScript' },
      { name: 'AegisEdge', desc: 'Secure Offline Facial Recognition and Liveness Detection system', lang: 'TypeScript' },
      { name: 'routeiq-enterprise', desc: 'Enterprise smart-city road health intelligence platform RouteIQ', lang: 'TypeScript' },
    ]
  };

  const [logs, setLogs] = useState<CommandLog[]>([
    {
      input: 'ssh -T git@github.com',
      output: (
        <div className="space-y-1">
          <p className="text-neo-mint">Hi omgawande1523! You have successfully authenticated, but GitHub does not provide shell access.</p>
          <p className="text-silver">System: Loading local offline stats registry...</p>
        </div>
      ),
    },
  ]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        windowRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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

  const handleRunCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let resNode: React.ReactNode;

    switch (cleanCmd) {
      case 'help':
        resNode = (
          <div className="space-y-1.5 text-xs !text-[#FAF6EE]/80">
            <p className="text-neo-yellow font-bold">AVAILABLE COMMANDS:</p>
            <p><span className="text-neo-blue font-bold">stats</span> - Output core developer stats summary</p>
            <p><span className="text-neo-blue font-bold">languages</span> - Output primary coding languages check</p>
            <p><span className="text-neo-blue font-bold">repos</span> - Output top GitHub project repositories</p>
            <p><span className="text-neo-blue font-bold">clear</span> - Flush diagnostic terminal logs</p>
          </div>
        );
        break;
      case 'stats':
        resNode = (
          <div className="space-y-1 text-xs border border-white/10 p-3 bg-white/5 font-mono !text-[#FAF6EE]/90">
            <p className="text-neo-mint font-bold border-b border-white/10 pb-1 mb-1">GITHUB DEV METRICS:</p>
            <p>USER: {githubData.username}</p>
            <p>TOTAL_REPOSITORIES: {githubData.repos}</p>
            <p>CONTRIBUTIONS_2026: {githubData.contributions}</p>
            <p>TOTAL_STARS: {githubData.stars}</p>
            <p>FOLLOWERS: {githubData.followers}</p>
          </div>
        );
        break;
      case 'languages':
        resNode = (
          <div className="space-y-3 text-xs border border-white/10 p-3 bg-white/5 !text-[#FAF6EE]/90">
            <p className="text-neo-pink font-bold">PRIMARY LANGUAGE ALLOCATIONS:</p>
            <div className="flex h-3 border border-white/20 p-0.5 w-full bg-black/40">
              {githubData.languages.map((lang) => (
                <div
                  key={lang.name}
                  style={{ width: `${lang.percentage}%` }}
                  className={`h-full ${lang.color}`}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {githubData.languages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 border border-black inline-block ${lang.color}`} />
                  <span className="!text-[#FAF6EE]/80">{lang.name} ({lang.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;
      case 'repos':
        resNode = (
          <div className="space-y-2 text-xs !text-[#FAF6EE]/90">
            <p className="text-neo-blue font-bold">RECENT ACTIVE REPOSITORIES:</p>
            <div className="space-y-2">
              {githubData.topRepos.map((repo, idx) => (
                <div key={idx} className="border-l-2 border-neo-mint pl-3 py-0.5 bg-white/5">
                  <p className="font-bold text-neo-mint">{repo.name} <span className="text-[10px] text-white/40">({repo.lang})</span></p>
                  <p className="text-white/60 text-[11px]">{repo.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
        break;
      case 'clear':
        setLogs([]);
        setInputVal('');
        return;
      default:
        resNode = (
          <p className="text-red-400">
            command not found: '{cmd}'. Type 'help' to review available systems commands.
          </p>
        );
    }

    setLogs((prev) => [...prev, { input: cmd, output: resNode }]);
    setInputVal('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleRunCommand(inputVal);
  };

  return (
    <section
      ref={sectionRef}
      id="github"
      className="w-full py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div ref={headingRef} className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-silver">
          <span>08 / OPEN_SOURCE_METRICS.LOG</span>
        </div>

        {/* Outer Command Center Window */}
        <div
          ref={windowRef}
          className="os-window flex flex-col bg-neo-surface"
          style={{ opacity: 0 }}
        >
          {/* Header */}
          <div className="os-window-header-dark">
            <div className="flex items-center gap-2 font-mono text-sm text-neo-bg">
              <Github size={14} className="text-neo-bg" />
              <span>git_command_center.exe --session=active</span>
            </div>
            <div className="window-dots">
              <span className="window-dot bg-red-400"></span>
              <span className="window-dot bg-yellow-400"></span>
              <span className="window-dot bg-emerald-400"></span>
            </div>
          </div>

          {/* Sub-header info */}
          <div className="border-b-[2px] border-black bg-neo-surface px-4 py-2 flex items-center justify-between font-mono text-[10px] text-black/60 font-semibold select-none border-t-0">
            <div className="flex gap-4">
              <span>Command_Center</span>
              <span>Visual_Analytics</span>
              <span>Local_Link</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <Activity size={10} className="animate-pulse" />
              <span>CONNECTED: GITHUB_API_SYNC</span>
            </div>
          </div>

          {/* Command Center Layout Split */}
          <div className="grid grid-cols-1 xl:grid-cols-12 border-t-0 bg-neo-surface">
            
            {/* Left Column: Visual Analytics Panel (7 cols) */}
            <div className="xl:col-span-7 p-6 md:p-8 space-y-6 xl:border-r-[2.5px] border-black bg-neo-surface flex flex-col justify-between">
              
              {/* Top Stats Cards row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="border-[2px] border-black p-3 bg-neo-mint/20 shadow-neo-sm">
                  <p className="font-mono text-2xl font-extrabold text-black">{githubData.repos}</p>
                  <p className="font-mono text-[9px] font-bold text-black/60 uppercase">Repositories</p>
                </div>
                <div className="border-[2px] border-black p-3 bg-neo-blue/20 shadow-neo-sm">
                  <p className="font-mono text-2xl font-extrabold text-black">{githubData.contributions}</p>
                  <p className="font-mono text-[9px] font-bold text-black/60 uppercase">Contributions</p>
                </div>
                <div className="border-[2px] border-black p-3 bg-neo-pink/20 shadow-neo-sm">
                  <p className="font-mono text-2xl font-extrabold text-black">{githubData.stars}</p>
                  <p className="font-mono text-[9px] font-bold text-black/60 uppercase">Stars Earned</p>
                </div>
                <div className="border-[2px] border-black p-3 bg-neo-yellow/20 shadow-neo-sm">
                  <p className="font-mono text-2xl font-extrabold text-black">{githubData.followers}</p>
                  <p className="font-mono text-[9px] font-bold text-black/60 uppercase">Followers</p>
                </div>
              </div>

              {/* Language Distribution Block */}
              <div className="border-[2.5px] border-black bg-neo-surface p-4 shadow-neo-sm space-y-3">
                <h4 className="font-mono text-xs font-bold text-black uppercase flex items-center gap-1.5 select-none">
                  <BarChart2 size={13} className="text-neo-pink" />
                  Primary Language Allocations
                </h4>
                {/* Visual stacked bar chart */}
                <div className="flex h-4 border-[2px] border-black p-0.5 bg-neo-bg select-none">
                  {githubData.languages.map((lang) => (
                    <div
                      key={lang.name}
                      style={{ width: `${lang.percentage}%` }}
                      className={`h-full ${lang.color} border-r last:border-r-0 border-black`}
                      title={`${lang.name}: ${lang.percentage}%`}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  {githubData.languages.map((lang) => (
                    <div key={lang.name} className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 border border-black inline-block ${lang.color}`} />
                      <span className="font-semibold text-black/80">{lang.name} ({lang.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contribution Grid Graph */}
              <div className="border-[2.5px] border-black bg-neo-surface p-4 shadow-neo-sm space-y-3">
                <h4 className="font-mono text-xs font-bold text-black uppercase flex items-center gap-1.5 select-none">
                  <Calendar size={13} className="text-neo-blue" />
                  GitHub_Contributions_Calendar.cfg
                </h4>
                {/* Contribution cells */}
                <div className="overflow-x-auto select-none pt-1 scrollbar-thin">
                  <div className="flex flex-col gap-[3px] min-w-[340px]">
                    {contributionGrid.map((row, rIdx) => (
                      <div key={rIdx} className="flex gap-[3px]">
                        {row.map((cell, cIdx) => {
                          const bgColors = [
                            'bg-black/5 dark:bg-white/5', // 0
                            'bg-emerald-200 dark:bg-emerald-900/50', // 1
                            'bg-emerald-400 dark:bg-emerald-700', // 2
                            'bg-emerald-600 dark:bg-emerald-500', // 3
                          ];
                          return (
                            <div
                              key={cIdx}
                              className={`w-2.5 h-2.5 border-[0.5px] border-black/10 shrink-0 ${bgColors[cell]}`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-[9px] font-mono text-silver pt-1">
                  <span>Less active</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 border border-black/10 bg-black/5 dark:bg-white/5" />
                    <span className="w-2.5 h-2.5 border border-black/10 bg-emerald-200 dark:bg-emerald-900/50" />
                    <span className="w-2.5 h-2.5 border border-black/10 bg-emerald-400 dark:bg-emerald-700" />
                    <span className="w-2.5 h-2.5 border border-black/10 bg-emerald-600 dark:bg-emerald-500" />
                  </div>
                  <span>More active</span>
                </div>
              </div>

              {/* Recent Open Source Work Activity */}
              <div className="border-[2.5px] border-black bg-neo-surface p-4 shadow-neo-sm space-y-3">
                <h4 className="font-mono text-xs font-bold text-black uppercase flex items-center gap-1.5 select-none">
                  <GitBranch size={13} className="text-neo-yellow" />
                  Recent Open Source Activity
                </h4>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-start gap-2 border-b border-black/5 pb-2">
                    <GitCommit size={14} className="text-neo-pink shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-black">feat: optimized liveness detection inference loop</p>
                      <p className="text-[9px] text-silver font-semibold mt-0.5">omgawande1523/AegisEdge · 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <GitCommit size={14} className="text-neo-pink shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-black">refactor: optimized GIS map snap snappers logic for road segments mapping</p>
                      <p className="text-[9px] text-silver font-semibold mt-0.5">omgawande1523/routeiq-enterprise · 5 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Shell Simulator (5 cols) */}
            <div className="xl:col-span-5 p-6 md:p-8 !bg-[#111111] !text-[#FAF6EE] font-mono text-xs md:text-sm flex flex-col justify-between min-h-[350px] space-y-6">
              <div className="space-y-4 flex-1 overflow-y-auto">
                <div className="text-[#8a8a8a] border-b border-white/10 pb-2 mb-3">
                  <p>Om Gawande Operating System [Version 1.0.4]</p>
                  <p>Type 'help' to review available systems commands.</p>
                </div>

                {/* Logs output */}
                {logs.map((log, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center gap-1 text-neo-pink">
                      <ChevronRight size={14} />
                      <span>{log.input}</span>
                    </div>
                    <div className="pl-4 !text-[#FAF6EE]/90">{log.output}</div>
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleFormSubmit} className="flex items-center gap-2 pt-4 border-t border-white/10">
                <span className="text-neo-pink font-bold flex items-center select-none">
                  <span>om_os</span>
                  <ChevronRight size={14} className="mt-0.5" />
                </span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="type 'stats', 'languages', 'repos', 'clear'..."
                  className="flex-1 bg-transparent !text-[#FAF6EE] outline-none font-mono text-xs md:text-sm border-none placeholder-white/30"
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </div>
          </div>

          {/* Quick Click Shortcut Tray */}
          <div className="border-t-[2.5px] border-black bg-neo-bg p-4 flex flex-wrap items-center justify-between gap-4 font-mono select-none border-x-0 border-b-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] text-silver font-bold uppercase mr-1">RUN CLI SHORTCUT:</span>
              {['help', 'stats', 'languages', 'repos', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleRunCommand(cmd)}
                  className="px-3 py-1 bg-black text-neo-bg border border-black hover:bg-neo-bg hover:text-black transition-colors text-[10px] font-bold uppercase flex items-center gap-1 shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                  data-cursor="GO"
                >
                  <Play size={8} />
                  {cmd}
                </button>
              ))}
            </div>

            <a
              href="https://github.com/omgawande1523"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-black border-b-[2px] border-black pb-0.5 font-bold hover:text-silver hover:border-silver flex items-center gap-1"
            >
              <Github size={12} className="text-black" />
              <span>Full GitHub Profile</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
