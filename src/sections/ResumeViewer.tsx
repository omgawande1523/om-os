import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, ShieldCheck, Download, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ResumeViewer() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
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
      id="resume"
      className="w-full py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-silver">
          <span>05 / RESUME_VIEWER.EXE</span>
        </div>

        {/* Outer Doc Window */}
        <div
          ref={containerRef}
          className="os-window flex flex-col bg-neo-surface max-w-4xl mx-auto"
          style={{ opacity: 0 }}
        >
          {/* Header */}
          <div className="os-window-header-blue">
            <div className="flex items-center gap-2 font-mono text-sm">
              <FileText size={14} />
              <span>resume_viewer.sys</span>
            </div>
            <div className="window-dots">
              <span className="window-dot bg-red-400"></span>
              <span className="window-dot bg-yellow-400"></span>
              <span className="window-dot bg-emerald-400"></span>
            </div>
          </div>

          {/* Doc Toolbar */}
          <div className="border-b-[2px] border-black bg-[#FFFDF9] px-4 py-2 flex items-center justify-between font-mono text-xs select-none">
            <div className="flex items-center gap-2 text-black/60 font-semibold">
              <span className="bg-black/10 px-2 py-0.5 rounded-sm">PAGE 1 / 1</span>
              <span>100% Zoom</span>
              <span className="hidden sm:inline">| Format: A4_Standard</span>
            </div>
            <span className="text-[10px] text-silver font-bold uppercase hidden sm:inline">SHA256: VERIFIED_SIGNED</span>
          </div>

          {/* Doc Body */}
          <div className="p-6 md:p-8 bg-neo-bg flex flex-col md:flex-row items-center md:items-stretch gap-8">
            {/* Visual PDF Preview */}
            <div className="w-full md:w-1/2 border-[2.5px] border-black shadow-neo bg-white overflow-hidden relative flex items-center justify-center min-h-[500px]">
              <img
                src="/Resume_Updated_preview.jpg"
                alt="Om Gawande Resume Preview"
                className="w-full h-auto max-h-[550px] object-contain select-none p-2"
              />
            </div>

            {/* Resume Summary Info & Meta Actions */}
            <div className="w-full md:w-1/2 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 border border-black/10 bg-neo-yellow/20 px-2.5 py-1 text-xs font-mono text-black font-semibold">
                  <ShieldCheck size={12} className="text-black" />
                  <span>Resume Updated.pdf</span>
                </div>
                
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-black uppercase">
                  Verify Qualifications
                </h3>
                
                <p className="font-body text-sm text-black/70 leading-relaxed">
                  Need a printable document / copy for HR databases, recruiters, or reference portfolios? Download my full, verified resume containing comprehensive details about my technical skill levels, project impact metrics, academic timelines, and leadership logs.
                </p>

                <div className="border-y border-black/15 py-4 font-mono text-xs text-black/60 space-y-2">
                  <p className="flex justify-between">
                    <span>File size:</span>
                    <span className="font-bold text-black">77.6 KB</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Target position:</span>
                    <span className="font-bold text-black">AI & Machine Learning Engineer</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Updates logs:</span>
                    <span className="font-bold text-black">Jun 2026</span>
                  </p>
                </div>
              </div>

              {/* PDF Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="/Resume Updated.pdf"
                  download="Resume Updated.pdf"
                  className="flex-1 inline-flex items-center justify-center gap-2 font-mono text-xs bg-black text-neo-bg px-4 py-3 border-2 border-black hover:bg-neo-bg hover:text-black transition-all font-bold shadow-neo hover:shadow-none"
                  data-cursor="OPEN"
                >
                  <Download size={14} />
                  DOWNLOAD RESUME
                </a>
                <a
                  href="/Resume Updated.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 font-mono text-xs bg-neo-surface text-black px-4 py-3 border-2 border-black hover:bg-black hover:text-neo-bg transition-all font-bold"
                  data-cursor="OPEN"
                >
                  <Eye size={14} />
                  VIEW FULL PDF
                </a>
              </div>
            </div>
          </div>

          {/* Doc Status Footer */}
          <div className="border-t-[2.5px] border-black bg-black text-neo-bg px-4 py-2 font-mono text-[10px] text-right flex justify-between select-none">
            <span>SIGNATURE: om.gawande_sys</span>
            <span>SYSTEM_OUT: READY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
