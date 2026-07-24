import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Folder, FolderOpen, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const directoryData = {
  work: [
    {
      id: 'acube_ai',
      fileName: 'Acube_AI_Internship.cfg',
      type: 'work',
      title: 'Data Analytics and AI Engineering Intern',
      org: 'Acube AI',
      location: 'Nagpur, India',
      period: 'Feb 2025 - Present',
      description:
        'Developed AI-powered applications by integrating machine learning models, LLMs, and backend APIs into production-ready systems.',
      highlights: [
        'Developed AI-powered applications by integrating machine learning models, LLMs, and backend APIs into production-ready systems',
        'Designed prompt engineering workflows, automated business processes, and collaborated on end-to-end AI solution deployment',
        'Developed AI modules for enterprise ERP applications, including machine learning pipelines, NLP workflows, and intelligent business automation features',
        'Worked with cross-functional teams to design, implement, test, and deploy scalable AI solutions for real-world business use cases',
      ],
    },
    {
      id: 'rnr_innotech',
      fileName: 'RNR_Innotech_Internship.cfg',
      type: 'work',
      title: 'AI and ERP Solution Intern',
      org: 'RNR',
      location: 'Nagpur, India (Hybrid)',
      period: 'Nov 2024 - Jan 2025',
      description:
        'Developed AI modules for enterprise ERP applications, including machine learning pipelines, NLP workflows, and intelligent business automation features.',
      highlights: [
        'Developed AI modules for enterprise ERP applications, including machine learning pipelines, NLP workflows, and intelligent business automation features',
        'Worked with cross-functional teams to design, implement, test, and deploy scalable AI solutions for real-world business use cases',
      ],
    },
  ],
  education: [
    {
      id: 'edu_btech',
      fileName: 'BTech_AI_SVPCET.cfg',
      type: 'education',
      title: 'B.Tech in Artificial Intelligence (2027)',
      org: 'St. Vincent Pallotti College of Engineering and Technology, Nagpur',
      location: 'Nagpur, Maharashtra',
      period: '2023 - 2027',
      description:
        'Focusing on artificial intelligence models, deep neural networks, natural language processing, model optimization, and statistical modeling.',
      highlights: [
        'Current Cumulative CGPA: 8.68 / 10.00',
        'Advanced Coursework: Computer Vision, Deep Learning, Edge Computing',
        'Active Lead and President of the AI Prabodha Student Forum',
      ],
    },
  ],
};



export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const [activeFolder, setActiveFolder] = useState<'work' | 'education'>('work');
  const [selectedFileId, setSelectedFileId] = useState<string>('rnr_innotech');

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

  const currentFile = [...directoryData.work, ...directoryData.education].find((f) => f.id === selectedFileId) || directoryData.work[0];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="w-full py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div ref={headingRef} className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-silver">
          <span>09 / DIRECTORY_TREE.EXE</span>
        </div>

        {/* File Explorer OS Window */}
        <div
          ref={windowRef}
          className="os-window flex flex-col bg-neo-surface"
          style={{ opacity: 0 }}
        >
          {/* Header */}
          <div className="os-window-header-accent">
            <div className="flex items-center gap-2 font-mono text-sm text-black">
              <Folder size={14} className="text-black" />
              <span>explorer.exe --path C:\\omgawande\\experience</span>
            </div>
            <div className="window-dots">
              <span className="window-dot bg-red-400"></span>
              <span className="window-dot bg-yellow-400"></span>
              <span className="window-dot bg-emerald-400"></span>
            </div>
          </div>

          {/* Sub menu bar */}
          <div className="border-b-[2px] border-black bg-neo-surface px-4 py-2 flex items-center justify-between font-mono text-[10px] text-black/60 font-semibold border-t-0 select-none">
            <div className="flex gap-4">
              <span>View</span>
              <span>Go</span>
              <span>Tools</span>
              <span>Diagnostics</span>
            </div>
            <span>SYS_EXPLORER_STABLE</span>
          </div>

          {/* File Explorer Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-t-0 bg-neo-surface min-h-[450px]">
            {/* Sidebar Column: Folder Tree Directory */}
            <div className="md:col-span-4 p-4 border-r-[2.5px] border-black bg-neo-bg/50 font-mono text-xs space-y-4">
              <p className="font-bold text-black/60 uppercase text-[10px] mb-2 tracking-wider">
                FOLDERS_STRUCTURE
              </p>
              
              <div className="space-y-2">
                {/* Folder 1: Work Experience */}
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setActiveFolder('work');
                      setSelectedFileId(directoryData.work[0].id);
                    }}
                    className={`flex items-center gap-2 w-full text-left py-1.5 px-2.5 border border-transparent font-bold ${
                      activeFolder === 'work'
                        ? 'bg-black text-neo-bg border-black'
                        : 'hover:bg-black/5 text-black'
                    }`}
                  >
                    {activeFolder === 'work' ? <FolderOpen size={14} /> : <Folder size={14} />}
                    <span>Work_Experience</span>
                  </button>

                  {/* Folder 1 Files List */}
                  {activeFolder === 'work' && (
                    <div className="pl-6 border-l border-black/10 space-y-0.5 mt-0.5">
                      {directoryData.work.map((file) => (
                        <button
                          key={file.id}
                          onClick={() => setSelectedFileId(file.id)}
                          className={`flex items-center gap-1.5 w-full text-left py-1 px-2 border border-transparent text-[11px] ${
                            selectedFileId === file.id
                              ? 'bg-neo-blue border-black font-semibold'
                              : 'hover:bg-black/5 text-black'
                          }`}
                        >
                          <FileText size={11} />
                          <span>{file.fileName}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Folder 2: Education Milestones */}
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setActiveFolder('education');
                      setSelectedFileId(directoryData.education[0].id);
                    }}
                    className={`flex items-center gap-2 w-full text-left py-1.5 px-2.5 border border-transparent font-bold ${
                      activeFolder === 'education'
                        ? 'bg-black text-neo-bg border-black'
                        : 'hover:bg-black/5 text-black'
                    }`}
                  >
                    {activeFolder === 'education' ? <FolderOpen size={14} /> : <Folder size={14} />}
                    <span>Education_Milestones</span>
                  </button>

                  {/* Folder 2 Files List */}
                  {activeFolder === 'education' && (
                    <div className="pl-6 border-l border-black/10 space-y-0.5 mt-0.5">
                      {directoryData.education.map((file) => (
                        <button
                          key={file.id}
                          onClick={() => setSelectedFileId(file.id)}
                          className={`flex items-center gap-1.5 w-full text-left py-1 px-2 border border-transparent text-[11px] ${
                            selectedFileId === file.id
                              ? 'bg-neo-pink border-black font-semibold'
                              : 'hover:bg-black/5 text-black'
                          }`}
                        >
                          <FileText size={11} />
                          <span>{file.fileName}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Editor Pane Column: Selected File Contents */}
            <div className="md:col-span-8 p-6 md:p-8 bg-neo-surface flex flex-col justify-between space-y-6">
              {/* File Info Bar */}
              <div className="flex items-center justify-between border-b border-black/10 pb-4 font-mono text-[10px] text-silver select-none">
                <div>
                  <span>FILE_NAME: {currentFile.fileName}</span>
                  <span className="ml-4">TYPE: config/sys</span>
                </div>
                <span>STATUS: EXTRACTED</span>
              </div>

              {/* File Content */}
              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl font-bold text-black">
                      {currentFile.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold bg-neo-yellow/20 text-black border border-black/15 px-2 py-0.5">
                      {currentFile.period}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-black/60 font-semibold uppercase">
                    {currentFile.org} // {currentFile.location}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="font-mono text-[10px] font-bold text-silver uppercase">
                      DESCRIPTION_STREAM
                    </p>
                    <p className="font-body text-sm text-black/85 leading-relaxed bg-neo-bg p-4 border border-black/10 rounded-none">
                      {currentFile.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-mono text-[10px] font-bold text-silver uppercase">
                      KEY_OUTPUT_PARAMETERS
                    </p>
                    <ul className="space-y-1.5 font-body text-xs text-black/80">
                      {currentFile.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-neo-pink font-bold mt-0.5">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Node status indicators */}
              <div className="border-t border-black/10 pt-4 flex justify-between items-center font-mono text-[9px] text-silver select-none">
                <span>SYSTEM_LOG: END_OF_FILE</span>
                <span className="bg-black text-neo-bg px-2 py-0.5 uppercase">read_mode</span>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
