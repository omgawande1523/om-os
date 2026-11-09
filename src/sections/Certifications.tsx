import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, FileBadge, CheckCircle, ExternalLink } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { certifications } from '../data/certifications';

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const [selectedCertId, setSelectedCertId] = useState(certifications[0].id);

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

  const currentCert = certifications.find((c) => c.id === selectedCertId) || certifications[0];

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="w-full py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div ref={headingRef}>
          <SectionHeading id="certifications" />
        </div>

        {/* Explorer OS Window */}
        <div
          ref={windowRef}
          className="os-window flex flex-col bg-neo-surface"
          style={{ opacity: 0 }}
        >
          {/* Header */}
          <div className="os-window-header-pink">
            <div className="flex items-center gap-2 font-mono text-sm text-black">
              <Award size={14} className="text-black" />
              <span>cert_manager.exe --database=credentials</span>
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
              <span>Registry</span>
              <span>Status</span>
            </div>
            <span>{certifications.length} CREDENTIALS</span>
          </div>

          {/* File Explorer Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-t-0 bg-neo-surface min-h-[400px]">
            {/* Sidebar Column: Credentials List */}
            <div className="md:col-span-4 p-4 border-r-[2.5px] border-black bg-neo-bg/50 font-mono text-xs space-y-4">
              <p className="font-bold text-black/60 uppercase text-[10px] tracking-wider">
                CERTIFICATE_FILES
              </p>
              
              <div className="space-y-1.5">
                {certifications.map((cert) => (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => setSelectedCertId(cert.id)}
                    aria-pressed={selectedCertId === cert.id}
                    className={`flex items-center gap-2 w-full text-left py-2 px-3 border border-transparent font-bold transition-colors ${
                      selectedCertId === cert.id
                        ? 'bg-black text-neo-bg border-black'
                        : 'hover:bg-black/5 text-black'
                    }`}
                  >
                    <FileBadge size={13} />
                    <span className="truncate">{cert.fileName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Viewer Pane Column: Selected Certificate Details */}
            <div className="md:col-span-8 p-6 md:p-8 bg-neo-surface flex flex-col justify-between space-y-6">
              {/* File Info Bar */}
              <div className="flex items-center justify-between border-b border-black/10 pb-4 font-mono text-[10px] text-silver select-none">
                <span>CREDENTIAL: {currentCert.id.toUpperCase()}</span>
                <span>STATUS: LOADED</span>
              </div>

              {/* Certificate Details */}
              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl md:text-2xl font-extrabold text-black leading-tight">
                      {currentCert.name}
                    </h3>
                  </div>
                  <p className="font-mono text-xs text-black/60 font-semibold uppercase">
                    ISSUER: {currentCert.issuer}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="font-mono text-[10px] font-bold text-silver uppercase">
                      CREDENTIAL_INFORMATION
                    </p>
                    <p className="font-body text-sm text-black/85 leading-relaxed bg-neo-bg p-4 border border-black/10 rounded-none font-semibold">
                      {currentCert.summary}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <p className="font-mono text-[10px] font-bold text-silver uppercase">
                      SKILLS_COVERED_STREAM
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {currentCert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="font-mono text-[9px] font-bold text-black bg-black/5 border border-black/10 px-2 py-1 flex items-center gap-1"
                        >
                          <CheckCircle size={9} className="text-emerald-600" aria-hidden="true" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Node status indicators */}
              <div className="border-t border-black/10 pt-4 flex justify-between items-center font-mono text-[9px] text-silver select-none">
                <span>SYSTEM_LOG: CERTIFICATE_LOADED</span>
                {currentCert.credentialUrl && (
                  <a
                    href={currentCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-black text-neo-bg px-2 py-0.5 uppercase hover:bg-neo-yellow hover:text-black"
                  >
                    View credential <ExternalLink size={9} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
