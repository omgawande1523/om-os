import { motion } from 'framer-motion';
import { Award, Users, Briefcase, Zap, Github, Layers, Target, ShieldCheck } from 'lucide-react';

const impactItems = [
  {
    title: 'President — AI Prabodha Forum',
    subtitle: 'COMMUNITY_LEADERSHIP',
    icon: Award,
    description: 'Pioneered SVPCET AI student society, growing the community to 150+ active participants. Spearheaded Python bootcamps, ML workshops, and local hardware training bootcamps.',
    colorClass: 'bg-neo-mint',
    spanClass: 'lg:col-span-8 md:col-span-12',
    tags: ['Community Building', 'Technical Mentorship', 'Event Operations'],
    metric: '150+ Members'
  },
  {
    title: 'Elected Class Representative',
    subtitle: 'STUDENT_ADMINISTRATION',
    icon: Users,
    description: 'Elected for 3 consecutive years. Liaison between departmental heads and 70+ students. Optimized compute allocation hours in college ML laboratories.',
    colorClass: 'bg-neo-blue',
    spanClass: 'lg:col-span-4 md:col-span-6',
    tags: ['Liaison', 'Coordination', 'Operations'],
    metric: '3-Year CR'
  },
  {
    title: 'AI Intern @ RNR Innotech',
    subtitle: 'INDUSTRY_EXPERIENCE',
    icon: Briefcase,
    description: 'Developed and optimized AI-enabled ERP system modules. Created automated intelligent workflows and integrated AI capabilities to drive business process optimization.',
    colorClass: 'bg-neo-pink',
    spanClass: 'lg:col-span-6 md:col-span-6',
    tags: ['ERP Automation', 'AI Integration', 'Intelligent Workflows'],
    metric: 'Internship'
  },
  {
    title: 'ML Intern @ Acube AI',
    subtitle: 'INDUSTRY_EXPERIENCE',
    icon: Zap,
    description: 'Collaborated on developing applied machine learning models and AI solution projects. Designed and implemented custom AI workflows for applied AI systems.',
    colorClass: 'bg-neo-orange',
    spanClass: 'lg:col-span-6 md:col-span-12',
    tags: ['AI Solutions', 'AI Workflows', 'Applied AI Systems'],
    metric: 'Internship'
  },
  {
    title: 'Dataventics GenAI Hackathon Lead',
    subtitle: 'HACKATHON_CHAIR',
    icon: Layers,
    description: 'Chaired challenge design and server resource allocations for campus-wide hackathon. Configured server compute slots and API gateways for 200+ competitors.',
    colorClass: 'bg-neo-yellow',
    spanClass: 'lg:col-span-4 md:col-span-6',
    tags: ['Server Orchestration', 'Challenge Design', 'Logistics'],
    metric: '200+ Competitors'
  },
  {
    title: 'AI Verse Organizer',
    subtitle: 'HACKATHON_OPERATIONS',
    icon: Target,
    description: 'Coordinated operational design for the campus prompt engineering challenge. Crafted evaluation schemas and scoring matrices for complex LLM outputs.',
    colorClass: 'bg-neo-mint',
    spanClass: 'lg:col-span-4 md:col-span-6',
    tags: ['Schema Design', 'LLM Prompting', 'Assessment'],
    metric: 'Challenge Lead'
  },
  {
    title: 'Open Source Contribution Index',
    subtitle: 'DEVELOPER_METRICS',
    icon: Github,
    description: 'Published 15+ public repositories on GitHub. Actively maintaining specialized camera packages, custom PyTorch templates, and CLI dataset annotators for community developers.',
    colorClass: 'bg-neo-blue',
    spanClass: 'lg:col-span-4 md:col-span-12',
    tags: ['Git & GitHub', 'Library Publishing', 'Open Source'],
    metric: '15+ Repositories'
  }
];

export default function ImpactDashboard() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section
      id="impact"
      className="w-full py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-silver">
          <span>02 / IMPACT_DASHBOARD.SYS</span>
        </div>

        {/* Impact Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {impactItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`${item.spanClass} os-window bg-neo-surface flex flex-col justify-between hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-neo-lg transition-all duration-300`}
              >
                {/* Header bar */}
                <div className={`border-b-[2.5px] border-black px-4 py-2 ${item.colorClass} font-mono text-[10px] font-bold text-black flex justify-between items-center select-none`}>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={11} className="text-black" />
                    <span>{item.subtitle}</span>
                  </div>
                  <span className="bg-black text-white px-2 py-0.5 text-[8px] font-extrabold shadow-neo-sm uppercase">
                    {item.metric}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-extrabold leading-tight text-black flex items-center gap-2">
                      <Icon size={18} className="text-black shrink-0" />
                      {item.title}
                    </h3>
                    <p className="font-body text-xs md:text-sm text-black/75 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/10">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] font-bold text-black bg-black/5 border border-black/10 px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
