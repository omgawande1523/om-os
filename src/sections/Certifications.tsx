import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, FileBadge, CheckCircle, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certificationsData = [
  {
    id: 'nvidia_dl',
    fileName: 'NVIDIA_Deep_Learning.crt',
    name: 'Fundamentals of Deep Learning — NVIDIA',
    issuer: 'NVIDIA Deep Learning Institute',
    credentialInfo: 'Completed hands-on training in deep learning fundamentals, neural networks, and AI model development.',
    skills: ['Deep Learning', 'Neural Networks', 'AI Model Development'],
    colorClass: 'bg-neo-mint',
  },
  {
    id: 'nptel_ml',
    fileName: 'NPTEL_Machine_Learning.crt',
    name: 'Introduction to Machine Learning — NPTEL',
    issuer: 'NPTEL (IIT Kharagpur)',
    credentialInfo: 'Learned core machine learning concepts, supervised learning algorithms, and model evaluation techniques.',
    skills: ['Machine Learning', 'Supervised Learning', 'Model Evaluation'],
    colorClass: 'bg-neo-blue',
  },
  {
    id: 'cloud_data',
    fileName: 'Cloud_Data_Engineering.crt',
    name: 'Data Engineering in Cloud Environment Training',
    issuer: 'Cloud Data Academy',
    credentialInfo: 'Acquired practical experience in cloud-based data pipelines, data processing, and modern data engineering workflows.',
    skills: ['Cloud Pipelines', 'Data Processing', 'Data Engineering Workflows'],
    colorClass: 'bg-neo-yellow',
  },
  {
    id: 'genai_devops',
    fileName: 'GenAI_DevOps_FDP.crt',
    name: 'Generative AI & DevOps Faculty Development Program',
    issuer: 'National Faculty Development Program',
    credentialInfo: 'Explored Generative AI applications, DevOps methodologies, automation, and AI-powered development practices.',
    skills: ['Generative AI', 'DevOps Methodologies', 'Automation', 'AI Development'],
    colorClass: 'bg-neo-orange',
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const [selectedCertId, setSelectedCertId] = useState(certificationsData[0].id);

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

  const currentCert = certificationsData.find((c) => c.id === selectedCertId) || certificationsData[0];

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="w-full py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div ref={headingRef} className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-silver">
          <span>06 / CERTIFICATIONS_REGISTRY.EXE</span>
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
              <span>Verify</span>
              <span>Keys</span>
              <span>Status</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <ShieldCheck size={12} />
              <span>ALL_SIGNATURES_VALID</span>
            </div>
          </div>

          {/* File Explorer Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-t-0 bg-neo-surface min-h-[400px]">
            {/* Sidebar Column: Credentials List */}
            <div className="md:col-span-4 p-4 border-r-[2.5px] border-black bg-neo-bg/50 font-mono text-xs space-y-4">
              <p className="font-bold text-black/60 uppercase text-[10px] tracking-wider">
                CERTIFICATE_FILES
              </p>
              
              <div className="space-y-1.5">
                {certificationsData.map((cert) => (
                  <button
                    key={cert.id}
                    onClick={() => setSelectedCertId(cert.id)}
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
                <div>
                  <span>REGISTRY_ID: {currentCert.id.toUpperCase()}</span>
                  <span className="ml-4">FORMAT: X.509/SECURE</span>
                </div>
                <span>STATUS: ACTIVE_VERIFIED</span>
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
                      {currentCert.credentialInfo}
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
                          <CheckCircle size={9} className="text-emerald-600" />
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
                <span className="bg-black text-neo-bg px-2 py-0.5 uppercase">verified_log</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
