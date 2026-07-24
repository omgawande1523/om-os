import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Brain,
  Code2,
  Globe,
  Wrench,
  X,
  FolderOpen,
  Terminal,
  Activity,
  CheckCircle2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    id: 'programming',
    title: 'Programming Languages',
    icon: Code2,
    colorClass: 'bg-neo-blue',
    skills: ['Python', 'SQL'],
    description: 'Core languages for algorithm construction, neural network training, data engineering pipelines, and backend system scripting.'
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning',
    icon: Brain,
    colorClass: 'bg-neo-mint',
    skills: ['CNNs', 'YOLO Object Detection', 'Transfer Learning', 'Custom Model Training', 'TensorFlow', 'Keras'],
    description: 'End-to-end deep learning development including custom model training, object detection, transfer learning, and neural network optimization.'
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision',
    icon: Globe,
    colorClass: 'bg-neo-pink',
    skills: ['OpenCV', 'Image Preprocessing', 'Dataset Annotation', 'Real-time Detection', 'Camera Integration'],
    description: 'Real-time computer vision systems using OpenCV for image preprocessing, dataset annotation, object detection, and camera module integration.'
  },
  {
    id: 'generative-ai',
    title: 'Generative AI',
    icon: Brain,
    colorClass: 'bg-neo-yellow',
    skills: ['LLM Applications', 'RAG Pipelines', 'Ollama', 'Vector Databases (Qdrant)', 'Prompt Engineering', 'Agentic Workflow Design'],
    description: 'Building LLM applications, RAG pipelines, vector databases with Qdrant, prompt engineering, and agentic workflow design using local and cloud models.'
  },
  {
    id: 'libraries-tools',
    title: 'Libraries & Tools',
    icon: Wrench,
    colorClass: 'bg-neo-orange',
    skills: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'Docker', 'Google Colab', 'Git', 'GitHub'],
    description: 'Data science and ML toolchain including NumPy, Pandas, Matplotlib, Scikit-learn, Docker containerization, and version control with Git.'
  },
  {
    id: 'embedded-hardware',
    title: 'Embedded AI & Hardware',
    icon: Wrench,
    colorClass: 'bg-neo-surface',
    skills: ['Raspberry Pi 4', 'Camera Module Integration', 'IoT'],
    description: 'Deploying AI models on embedded hardware like Raspberry Pi 4, camera module integration, and IoT edge computing systems.'
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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

  const expandedCategory = skillCategories.find((c) => c.id === expandedId);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="w-full py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div ref={headingRef} className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-silver">
          <span>06 / SKILLS_INVENTORY.CFG</span>
        </div>

        {/* Skills Bento Grid - 4 Columns */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.id}
                onClick={() => setExpandedId(category.id)}
                className="os-window flex flex-col justify-between cursor-pointer group hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-neo-lg transition-all duration-300 bg-neo-surface"
              >
                {/* Folder Header */}
                <div className={`border-b-[2px] border-black px-4 py-2 ${category.colorClass} font-mono text-xs font-bold text-black flex justify-between items-center select-none`}>
                  <div className="flex items-center gap-2">
                    <FolderOpen size={13} className="text-black" />
                    <span>{category.id}.sys</span>
                  </div>
                  <Icon size={14} className="text-black" />
                </div>

                {/* Folder Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-display text-lg font-bold text-black group-hover:underline decoration-2">
                      {category.title}
                    </h3>
                    <p className="font-body text-xs text-black/70 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Skills Badges Grid */}
                  <div className="space-y-2 pt-4 border-t border-black/10">
                    <p className="font-mono text-[9px] text-silver uppercase font-bold select-none">
                      LOADED_MODULES:
                    </p>
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

      {/* Expanded Modal as OS Dialog */}
      {expandedCategory && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          onClick={() => setExpandedId(null)}
        >
          <div
            className="os-window max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col bg-neo-surface"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Window Header */}
            <div className="os-window-header-accent">
              <div className="flex items-center gap-2 font-mono text-sm text-black">
                <Terminal size={14} />
                <span>diag_tool_run: {expandedCategory.id}.sys</span>
              </div>
              <button
                onClick={() => setExpandedId(null)}
                className="p-1 border border-black bg-neo-surface hover:bg-black hover:text-neo-bg transition-colors"
              >
                <X size={12} className="text-current" />
              </button>
            </div>

            {/* Menu Bar */}
            <div className="border-b-[2px] border-black bg-neo-surface px-4 py-1.5 flex items-center justify-between font-mono text-[10px] text-black/60 font-semibold border-t-0 select-none">
              <div className="flex gap-4">
                <span>Diagnostics</span>
                <span>Logs</span>
                <span>Config</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 font-bold">
                <Activity size={10} className="animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 bg-[#FFFDF9] flex-1">
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold text-black">
                  {expandedCategory.title}
                </h3>
                <p className="font-body text-sm text-black/75 leading-relaxed">
                  {expandedCategory.description}
                </p>
              </div>

              {/* Detail list instead of percentage bars */}
              <div className="space-y-3 pt-4 border-t border-black/10">
                <p className="font-mono text-xs font-bold text-black uppercase select-none">
                  VERIFIED DIAGNOSTIC MODULES:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                  {expandedCategory.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 bg-black/5 p-2.5 border border-black/10 shadow-neo-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo transition-all"
                    >
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                      <span className="font-bold text-black">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status Footer */}
            <div className="border-t-[2px] border-black bg-black text-neo-bg px-4 py-2 font-mono text-[10px] text-right flex justify-between select-none">
              <span className="text-neo-yellow">SYS_CHECK: OK</span>
              <span>om_os_kernel_v1.0</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
