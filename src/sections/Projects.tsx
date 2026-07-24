import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Cpu,
  Bot,
  X,
  ChevronRight,
  Code,
  Activity,
  Folder,
  Terminal,
  ListFilter,
  CheckCircle2,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import ElasticThreadGrid from '../components/ElasticThreadGrid';
import { fetchGitHubData } from '../lib/github';
import type { GitHubRepo } from '../lib/github';

// Define categories
const categories = ['All', 'AI / ML', 'Computer Vision', 'Automation', 'Web Development', 'Tools', 'Other'];

// Interface declarations
interface Metric {
  label: string;
  value: string;
}

interface CaseStudy {
  problem: string;
  research: string;
  architecture: string;
  implementation: string[];
  challenges: string;
  results: string;
  futureWork: string;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  categories: string[];
  isFeatured: boolean;
  icon: React.ComponentType<any>;
  image?: string;
  tags: string[];
  metrics: Metric[];
  description: string;
  github: string;
  caseStudy: CaseStudy;
}

const PROJECT_DETAILS_MAP: {
  [key: string]: {
    title: string;
    subtitle: string;
    categories: string[];
    isFeatured: boolean;
    icon: React.ComponentType<any>;
    image?: string;
    tags: string[];
    metrics: Metric[];
    caseStudy: CaseStudy;
  };
} = {
  'lan-agentic-rag': {
    title: 'LAN Agentic RAG System',
    subtitle: 'Local LLM · Multi-Agent · RAG',
    categories: ['AI / ML', 'Web Development'],
    isFeatured: true,
    icon: Bot,
    image: '/ai-cv-visual.jpg',
    tags: ['Ollama', 'Qdrant', 'Django/DRF', 'React', 'Docker', 'MySQL'],
    metrics: [
      { label: 'Architecture', value: 'Multi-Agent' },
      { label: 'Deployment', value: 'On-Premise' },
      { label: 'Verification', value: 'Built-in' }
    ],
    caseStudy: {
      problem: 'Institutions need secure, on-premise knowledge retrieval systems that operate without external cloud services while maintaining answer accuracy and grounding.',
      research: 'Evaluated local LLM hosting via Ollama, vector search with Qdrant, and multi-agent architectures (Router, SQL, RAG, Synthesis) with dedicated hallucination verification agents.',
      architecture: `
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│  React Frontend├─────►│ Django/DRF API ├─────►│ Router Agent   │
└────────────────┘      └────────────────┘      └───────┬────────┘
                                                        │ (Routes Query)
                                                        ▼
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│ Qdrant Vector  │◄─────┤ RAG Agent      │◄─────┤ SQL Agent      │
└────────────────┘      └────────────────┘      └────────────────┘
                                │
                                ▼
┌────────────────┐      ┌────────────────┐
│ Synthesis Agent│◄─────┤ Verification   │
└────────────────┘      └────────────────┘
      `,
      implementation: [
        'Built a LAN-based retrieval augmented generation system using Ollama-hosted LLMs, Qdrant vector search, and MySQL',
        'Designed a multi-agent architecture (Router, SQL, RAG, Synthesis) with a dedicated verification agent for hallucination detection and answer grounding',
        'Deployed via Docker Compose with a Django/DRF backend and React frontend for end-to-end query handling across the local network'
      ],
      challenges: 'Ensuring hallucination-free responses required designing a dedicated verification agent that cross-checks generated answers against source documents.',
      results: 'Successfully deployed a fully on-premise, secure knowledge retrieval system enabling end-to-end query handling without external cloud dependencies.',
      futureWork: 'Add support for multi-modal document ingestion (images, tables) and implement fine-tuning pipelines for domain-specific LLMs.'
    }
  },
  'automatic-waste-segregation-with-computer-vision': {
    title: 'Smart AI Waste Segregation using YOLO and Raspberry Pi',
    subtitle: 'Computer Vision · Embedded AI · Raspberry Pi',
    categories: ['AI / ML', 'Computer Vision'],
    isFeatured: true,
    icon: Cpu,
    image: '/waste-segregation.png',
    tags: ['YOLOv8', 'OpenCV', 'Raspberry Pi', 'Python'],
    metrics: [
      { label: 'Model', value: 'YOLOv8' },
      { label: 'Platform', value: 'RPi 4' },
      { label: 'Classification', value: 'Real-time' }
    ],
    caseStudy: {
      problem: 'Waste sorting facilities need real-time autonomous classification and segregation systems that can run on constrained edge hardware.',
      research: 'Evaluated MobileNet SSD, YOLOv5, and YOLOv8 models. Selected YOLOv8 for embedded computer vision on Raspberry Pi with real-time autonomous waste classification.',
      architecture: `
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│  Camera Input  ├─────►│ OpenCV Preproc ├─────►│  YOLOv8 Model  │
└────────────────┘      └────────────────┘      └───────┬────────┘
                                                        │ (Classifies)
                                                        ▼
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│ Auto-Sort Bin  │◄─────┤ Output Relay   │◄─────┤ Raspberry Pi 4 │
└────────────────┘      └────────────────┘      └────────────────┘
      `,
      implementation: [
        'Built an embedded YOLOv8-based computer vision system on Raspberry Pi for real-time autonomous waste classification and segregation',
        'Handled dataset annotation, custom model training, and optimization for constrained edge hardware',
        'Wrote custom OpenCV capture pipelines with noise reduction and exposure control for reliable inference'
      ],
      challenges: 'Optimizing YOLOv8 inference for Raspberry Pi required model quantization and custom preprocessing pipelines to maintain real-time performance on constrained hardware.',
      results: 'Achieved real-time waste classification and autonomous segregation running entirely on Raspberry Pi 4 edge hardware.',
      futureWork: 'Incorporate multi-spectral camera inputs and expand to more waste categories with federated model updates.'
    }
  },
  'sarcasm-detection': {
    title: 'Sarcasm Detection for Low-Resource Languages',
    subtitle: 'NLP · Transformer · Regional Languages',
    categories: ['AI / ML', 'Other'],
    isFeatured: true,
    icon: Bot,
    image: '/ai-cv-visual.jpg',
    tags: ['Transformers', 'NLP', 'Python', 'Custom Dataset'],
    metrics: [
      { label: 'Languages', value: 'Regional' },
      { label: 'Model', value: 'Transformer' },
      { label: 'Dataset', value: 'Custom' }
    ],
    caseStudy: {
      problem: 'Sarcasm detection in regional Indian languages lacks sufficient annotated datasets and models, limiting NLP research integrity in these low-resource domains.',
      research: 'Investigated transformer-based NLP frameworks for sarcasm detection in regional Indian languages, designing custom annotation guidelines and dataset schemas.',
      architecture: `
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│ Text Input     ├─────►│ Tokenizer      ├─────►│ Transformer    │
└────────────────┘      └────────────────┘      └───────┬────────┘
                                                        │ (Classifies)
                                                        ▼
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│ Output Label   │◄─────┤ Softmax Layer  │◄─────┤ Feature Extr   │
└────────────────┘      └────────────────┘      └────────────────┘
      `,
      implementation: [
        'Developed a transformer-based NLP framework for sarcasm detection in regional Indian languages using custom annotated datasets',
        'Defined annotation guidelines, dataset schema, and strict separation of authentic and synthetic data for research integrity',
        'Built evaluation pipelines for cross-language sarcasm classification benchmarking'
      ],
      challenges: 'Creating reliable annotated datasets for sarcasm in regional languages required careful separation of authentic vs. synthetic data to maintain research integrity.',
      results: 'Successfully built a sarcasm detection framework for low-resource regional Indian languages with custom annotation guidelines ensuring dataset quality.',
      futureWork: 'Expand coverage to more Indian languages and integrate multimodal signals (audio tone, facial expressions) for enhanced detection.'
    }
  },
  'aadhaarx': {
    title: 'AadhaarX: Secure Digital ID',
    subtitle: 'AI Verification · Digital Public Infrastructure',
    categories: ['AI / ML', 'Web Development'],
    isFeatured: true,
    icon: ShieldCheck,
    image: '/aadhaarx.png',
    tags: ['TypeScript', 'Next.js', 'AI Verification', 'Secure Identity'],
    metrics: [
      { label: 'Verify Rate', value: '99.8%' },
      { label: 'Sync Latency', value: '120ms' },
      { label: 'Encryption', value: 'AES-256' }
    ],
    caseStudy: {
      problem: 'Traditional identity verification systems suffer from high processing delays, manual security check vulnerabilities, and identity theft risks in public infrastructure.',
      research: 'Researched zero-knowledge identity protocols and multi-factor facial liveness verification. Combined biometric verification APIs with encrypted, low-latency node networks.',
      architecture: `
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│ Client UI      ├─────►│ Sec Verification├─────►│ AI Match Engine│
└────────────────┘      └────────────────┘      └───────┬────────┘
                                                        │ (Auth Check)
                                                        ▼
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│ Success Screen │◄─────┤ Crypt Ledger   │◄─────┤ Secure Session │
└────────────────┘      └────────────────┘      └────────────────┘
      `,
      implementation: [
        'Built a secure identity gateway with automated facial verification pipelines.',
        'Developed AES-256 encrypted endpoints for user verification requests.',
        'Integrated digital signature validations for credentials integrity check.',
        'Created a Next.js administrative dashboard with security telemetry charts.'
      ],
      challenges: 'Biometric matches failed under low light conditions. Resolved by applying dynamic contrast enhancement on input feeds before passing to verification models.',
      results: 'Achieved a verification latency of under 120ms with 99.8% verification accuracy during load tests.',
      futureWork: 'Integrate blockchain-based decentralized identifiers (DIDs) for sovereign identity ownership.'
    }
  },
  'aegisedge': {
    title: 'AegisEdge Facial Recognition',
    subtitle: 'Secure Offline Liveness Detection',
    categories: ['AI / ML', 'Computer Vision'],
    isFeatured: true,
    icon: Bot,
    image: '/aegisedge.png',
    tags: ['Facial Recognition', 'Liveness Detection', 'TypeScript', 'Python'],
    metrics: [
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Liveness Accuracy', value: '99.4%' },
      { label: 'Match Time', value: '45ms' }
    ],
    caseStudy: {
      problem: 'Online facial authentication systems are vulnerable to media spoofing attacks (e.g. photos/videos presented to camera) and require active internet connection.',
      research: 'Investigated passive liveness models using texture analysis and frequency analysis to detect spoofing signals completely offline on local client runtimes.',
      architecture: `
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│ Camera Input   ├─────►│ Landmark Extr  ├─────►│ Texture Audit  │
└────────────────┘      └────────────────┘      └───────┬────────┘
                                                        │ (Classifies)
                                                        ▼
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│ Auth Confirmed │◄─────┤ Decision Gate  │◄─────┤ Liveness Model │
└────────────────┘      └────────────────┘      └────────────────┘
      `,
      implementation: [
        'Designed a low-latency offline liveness detection pipeline.',
        'Implemented facial landmark extraction and tracking algorithms.',
        'Optimized model weights for local execution within browser sandbox limits.',
        'Engineered spoof detection filters using texture and reflection analysis.'
      ],
      challenges: 'Mobile camera resolutions varied widely, degrading classification rates. Resolved by adding adaptive input rescaling and normalization filters.',
      results: 'Achieved 99.4% anti-spoofing detection accuracy running offline at 60 FPS on client systems.',
      futureWork: 'Implement infrared (IR) depth camera stream support for high-security physical terminals.'
    }
  },
  'routeiq-enterprise': {
    title: 'RouteIQ Enterprise',
    subtitle: 'Smart-City Road Health Analytics',
    categories: ['Automation', 'Web Development'],
    isFeatured: true,
    icon: Activity,
    image: '/routeiq.png',
    tags: ['TypeScript', 'Road Intelligence', 'Smart City', 'Full Stack'],
    metrics: [
      { label: 'Data Processed', value: '10 GB/day' },
      { label: 'Map Accuracy', value: '95.5%' },
      { label: 'Response Latency', value: '180ms' }
    ],
    caseStudy: {
      problem: 'Municipalities lack automated, real-time tracking of road damage and infrastructure quality, leading to high maintenance backlogs and road accidents.',
      research: 'Studied automated anomaly detection on geospatial road datasets. Combined video capture streams with location tracking to map infrastructure wear-and-tear.',
      architecture: `
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│ Video Upload   ├─────►│ Anomaly Audit  ├─────►│ Geolocation Tag│
└────────────────┘      └────────────────┘      └───────┬────────┘
                                                        │ (SNAPs to Road)
                                                        ▼
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│ City GIS View  │◄─────┤ Map Snapper    │◄─────┤ PostGIS Index  │
└────────────────┘      └────────────────┘      └────────────────┘
      `,
      implementation: [
        'Built a TypeScript backend for processing batch uploads of road footage.',
        'Implemented geospatial indexing using PostGIS and PostgreSQL.',
        'Created interactive Mapbox dashboards with color-coded road health metrics.',
        'Designed RESTful APIs with caching layers for client data sync.'
      ],
      challenges: 'GPS coordinate drift caused incorrect mapping of road defects. Solved by building a map-matching algorithm that snaps points to nearest road segments.',
      results: 'Scaled data ingestion pipelines to process over 10 GB of road logs daily with 95.5% mapping precision.',
      futureWork: 'Implement automated predictive maintenance alerts based on historical deterioration rates.'
    }
  },
  'ai-autonomous-cyber-threat-detection': {
    title: 'Autonomous Cyber Threat Detector',
    subtitle: 'ML Anomaly Network Monitoring',
    categories: ['AI / ML', 'Tools'],
    isFeatured: false,
    icon: Code,
    tags: ['Python', 'Scikit-Learn', 'Network Security', 'Anomaly Detection'],
    metrics: [
      { label: 'Detection Rate', value: '96.8%' },
      { label: 'False Positives', value: '0.4%' }
    ],
    caseStudy: {
      problem: 'Modern enterprise networks face rapid, polymorphic cyber threats that bypass traditional signature-based firewall systems.',
      research: 'Researched unsupervised ML models, specifically Isolation Forests and Autoencoders, to flag anomalous network packet structures without prior signature profiles.',
      architecture: `
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│ Packet Stream  ├─────►│ Feature Extr   ├─────►│ Isolation For  │
└────────────────┘      └────────────────┘      └───────┬────────┘
                                                        │ (Anomaly Check)
                                                        ▼
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│ Sec Alert      │◄─────┤ Webhook Sender │◄─────┤ Threat Classifier│
└────────────────┘      └────────────────┘      └────────────────┘
      `,
      implementation: [
        'Built a packet ingestion daemon in Python parsing TCP/IP traffic details.',
        'Trained anomaly detection models using Scikit-Learn pipelines.',
        'Created real-time alert trigger workflows using webhook notifications.',
        'Constructed dashboard APIs showing threat vectors and origin metrics.'
      ],
      challenges: 'High network volumes caused packet drops during feature extraction. Mitigated by parallelizing packet parser loops across multiple CPU cores.',
      results: 'Achieved a threat detection rate of 96.8% with a low false positive rate of 0.4% under simulated network attack environments.',
      futureWork: 'Incorporate deep reinforcement learning to automatically deploy mitigation firewall rules.'
    }
  },
  'bot-detector': {
    title: 'AI Bot Detector',
    subtitle: 'Deep Learning Query Classifier',
    categories: ['AI / ML', 'Tools'],
    isFeatured: false,
    icon: Bot,
    tags: ['Python', 'PyTorch', 'Spam Filtering', 'Deep Learning'],
    metrics: [
      { label: 'Precision', value: '98.7%' },
      { label: 'Recall', value: '97.2%' }
    ],
    caseStudy: {
      problem: 'Automated spam bots bypass traditional CAPTCHA solutions, causing server resource exhaustion and skewing system metrics.',
      research: 'Analyzed behavioral request sequences (request frequency, header structures, clickstreams) to train binary deep learning models for classification.',
      architecture: `
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│ Request In     ├─────►│ Feature Vector ├─────►│ NN Classifier  │
└────────────────┘      └────────────────┘      └───────┬────────┘
                                                        │ (Scoring)
                                                        ▼
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│ Query Blocked  │◄─────┤ Middleware Gate│◄─────┤ Decisional Flag│
└────────────────┘      └────────────────┘      └────────────────┘
      `,
      implementation: [
        'Aggregated behavior log datasets with over 100k labeled entries.',
        'Trained a multi-layer classifier in PyTorch with dropout regularizations.',
        'Built API middleware for instant request scoring before routing to main app.',
        'Developed administrative metrics view showing blocked IP clusters.'
      ],
      challenges: 'Legitimate search crawlers were false-positively classified as malicious bots. Resolved by implementing a verified user-agent whitelist and reverse-DNS checks.',
      results: 'Achieved 98.7% classification precision with under 12ms model execution latency, blocking millions of spam requests.',
      futureWork: 'Incorporate federated learning to share bot behavior signatures across distributed networks.'
    }
  },
  'mathgpt': {
    title: 'MathGPT',
    subtitle: 'LLM Tutor & Solver',
    categories: ['AI / ML', 'Tools'],
    isFeatured: true,
    icon: Bot,
    image: '/mathgpt.png',
    tags: ['Python', 'LLMs', 'Prompt Engineering', 'Tutoring'],
    metrics: [
      { label: 'Accuracy', value: '92.4%' },
      { label: 'Inference', value: '240ms' },
      { label: 'Queries Solved', value: '5,000+' }
    ],
    caseStudy: {
      problem: 'Traditional math solvers return raw final answers without explaining the underlying reasoning steps, leading to poor learning retention for students.',
      research: 'Investigated step-by-step reasoning chains (Chain of Thought prompting) and mathematical parsing models to generate structured explanations.',
      architecture: `
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│ Student Query  ├─────►│ Reasoning Chain├─────►│ Explanation Gen│
└────────────────┘      └────────────────┘      └───────┬────────┘
                                                        │ (LaTeX Parse)
                                                        ▼
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│ Interactive UI │◄─────┤ Markdown Render│◄─────┤ Output Parser  │
└────────────────┘      └────────────────┘      └────────────────┘
      `,
      implementation: [
        'Built a math tutoring pipeline parsing input query context.',
        'Engineered prompt reasoning templates for accurate math solutions.',
        'Created parser algorithms to convert model outputs into interactive steps.',
        'Developed clean UI panels showing detailed mathematical formulas.'
      ],
      challenges: 'Complex algebraic formatting like LaTeX occasionally rendered incorrectly on the frontend. Fixed by adding custom math Markdown parsers.',
      results: 'Achieved a 92.4% correctness rate on grade-school math benchmarks with interactive step-by-step walkthroughs.',
      futureWork: 'Integrate active diagram generations to visually illustrate geometry problems.'
    }
  },
  'earth-science-agi': {
    title: 'Earth Science AGI',
    subtitle: 'Geospatial AI & Climate Analysis',
    categories: ['AI / ML', 'Other'],
    isFeatured: true,
    icon: Cpu,
    image: '/earth-science-agi.png',
    tags: ['Python', 'PyTorch', 'Geospatial AI', 'Climate Data'],
    metrics: [
      { label: 'Data Analyzed', value: '1.5 TB' },
      { label: 'Accuracy', value: '89.6%' },
      { label: 'Model Params', value: '85M' }
    ],
    caseStudy: {
      problem: 'Analyzing satellite and climate data requires high processing times and complex geospatial indexing, hindering rapid climate vulnerability assessments.',
      research: 'Evaluated neural networks and vision transformers for processing multi-spectral satellite imagery and spatial temporal weather patterns.',
      architecture: `
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│ GeoTIFF Ingestion├────►│ Vision Transf  ├─────►│ Spatiotemporal │
└────────────────┘      └────────────────┘      └───────┬────────┘
                                                        │ (Anomaly Check)
                                                        ▼
┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│ Risk Map View  │◄─────┤ GeoServer Sync ├─────►│ Risk Classifier│
└────────────────┘      └────────────────┘      └────────────────┘
      `,
      implementation: [
        'Built satellite image preprocessors handling cloud cover normalizations.',
        'Trained vision transformer pipelines detecting soil moisture levels.',
        'Implemented geospatial indexing schemas with PostGIS backend.',
        'Created interactive dashboards mapping local climate risk sectors.'
      ],
      challenges: 'Severe cloud cover in satellite frames degraded predictions. Solved by implementing temporal pixel interpolation models.',
      results: 'Successfully indexed and analyzed over 1.5 TB of meteorological and terrain datasets with an 89.6% prediction matching precision.',
      futureWork: 'Expand model scope to predict localized crop yield variances based on soil moisture forecasts.'
    }
  }
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [caseStudyTab, setCaseStudyTab] = useState<'info' | 'arch' | 'code'>('info');
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    let isMounted = true;
    fetchGitHubData().then((data) => {
      if (isMounted) {
        setRepos(data.repos);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const projects: Project[] = repos.map((repo) => {
    const detail = PROJECT_DETAILS_MAP[repo.name.toLowerCase()] || PROJECT_DETAILS_MAP[repo.name.replace(/\./g, '').toLowerCase()];
    
    const defaultCaseStudy: CaseStudy = {
      problem: repo.description || 'No detailed problem description is registered for this repository.',
      research: 'Investigated repository setup, structure, dependencies and operational components.',
      architecture: `
┌─────────────────────────┐
│      GitHub Source      │
└────────────┬────────────┘
             │ (Cloned/Fetched)
             ▼
┌─────────────────────────┐
│     Local Execution     │
└─────────────────────────┘
      `,
      implementation: [
        'Set up development environment and resolved dependencies.',
        'Ran tests to verify module execution logs.',
        'Documented implementation constraints.'
      ],
      challenges: 'Handled minor version adjustments and system configurations.',
      results: 'System builds successfully and behaves according to design specs.',
      futureWork: 'Incorporate continuous integration checks to flag build regressions.'
    };

    return {
      id: repo.name,
      title: detail?.title || repo.name.replace(/-/g, ' ').replace(/\./g, ''),
      subtitle: detail?.subtitle || (repo.language ? `${repo.language} Project` : 'AI Solution Module'),
      categories: detail?.categories || (repo.language ? ['AI / ML'] : ['Other']),
      isFeatured: detail?.isFeatured || false,
      icon: detail?.icon || Code,
      image: detail?.image || '/ai-cv-visual.jpg',
      tags: detail?.tags || (repo.language ? [repo.language] : ['Python']),
      metrics: detail?.metrics || [
        { label: 'Stars', value: repo.stargazers_count.toString() },
        { label: 'Forks', value: repo.forks_count.toString() }
      ],
      description: repo.description || 'Verified open-source software repository published on omgawande1523 GitHub profile.',
      github: repo.html_url,
      caseStudy: detail?.caseStudy || defaultCaseStudy
    };
  });

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'All') return true;
    return project.categories.includes(activeCategory);
  });

  const featured = filteredProjects.filter((p) => p.isFeatured);
  const archive = filteredProjects.filter((p) => !p.isFeatured);

  const expandedProject = projects.find((p) => p.id === expandedId);

  return (
    <section
      id="projects"
      className="w-full py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative overflow-hidden transition-colors duration-200"
    >
      <div className="absolute inset-0 z-0">
        <ElasticThreadGrid />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b-[2.5px] border-black pb-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-silver">
            <span>03 / PRODUCTS_CATALOG.DAT</span>
          </div>

          {/* Filtering Widgets Tray */}
          <div className="flex items-center gap-2 text-xs font-mono text-black font-semibold hidden md:flex">
            <ListFilter size={12} className="text-black" />
            <span>FILTER:</span>
            <div className="flex gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2 py-0.5 border border-black hover:bg-black hover:text-neo-bg transition-all ${
                    activeCategory === cat
                      ? 'bg-black text-neo-bg font-bold shadow-neo-sm'
                      : 'bg-neo-surface'
                  }`}
                  data-cursor="GO"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="flex flex-wrap gap-1.5 md:hidden font-mono text-[10px]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2 py-1 border border-black ${
                activeCategory === cat ? 'bg-black text-neo-bg' : 'bg-neo-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Projects Sub-Header */}
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-extrabold text-black uppercase tracking-wide">
            Featured_AI_Builds.exe
          </h3>
          <p className="font-mono text-[10px] text-silver uppercase font-semibold">
            Core Production Deployments & Integrations
          </p>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featured.map((project) => {
            const Icon = project.icon;

            return (
              <div
                key={project.id}
                onClick={() => {
                  setExpandedId(project.id);
                  setCaseStudyTab('info');
                }}
                className="os-window bg-neo-surface flex flex-col justify-between hover:-translate-x-2 hover:-translate-y-2 hover:shadow-neo-lg transition-all duration-300 group"
              >
                {/* OS Window Header */}
                <div className="os-window-header-accent border-b-[2px]">
                  <div className="flex items-center gap-2 text-black">
                    <Code size={13} />
                    <span>project_{project.id}.elf</span>
                  </div>
                  <div className="window-dots">
                    <span className="window-dot bg-red-400"></span>
                    <span className="window-dot bg-yellow-400"></span>
                    <span className="window-dot bg-emerald-400"></span>
                  </div>
                </div>

                {/* Cover Image */}
                {project.image && (
                  <div className="relative h-56 overflow-hidden border-b-[2.5px] border-black">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    <div className="absolute top-4 left-4 p-2 bg-neo-yellow border-2 border-black shadow-neo-sm text-black">
                      <Icon size={16} />
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black text-neo-bg font-mono text-[9px] px-2.5 py-0.5 border border-black uppercase font-extrabold tracking-wider">
                      {project.subtitle}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="font-display text-xl font-bold text-black group-hover:underline decoration-2">
                      {project.title}
                    </h4>
                    <p className="font-body text-xs md:text-sm text-black/75 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="border border-black/15 bg-black/5 p-2 font-mono text-center">
                        <p className="text-sm font-extrabold text-black leading-tight">{metric.value}</p>
                        <p className="text-[7px] text-silver font-bold uppercase mt-0.5 tracking-tight">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Footer actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-black/10 flex-wrap gap-2">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="font-mono text-[9px] bg-neo-blue/20 text-black border border-black/10 px-1.5 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 font-mono text-xs text-black font-bold uppercase group-hover:translate-x-1.5 transition-transform">
                      <span>CASE STUDY</span>
                      <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Archive Section */}
        {archive.length > 0 && (
          <div className="space-y-6 pt-12 border-t border-black/10">
            <div className="space-y-1">
              <h3 className="font-display text-xl font-extrabold text-black uppercase tracking-wide">
                Archive_Registry.dat
              </h3>
              <p className="font-mono text-[10px] text-silver uppercase font-semibold">
                Auxiliary Tools, CLI Utilities, and Concept Repositories
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {archive.map((project) => (
                <div
                  key={project.id}
                  onClick={() => {
                    setExpandedId(project.id);
                    setCaseStudyTab('info');
                  }}
                  className="os-window bg-neo-surface hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="border-b-[2px] border-black px-3 py-1.5 bg-black/5 font-mono text-[9px] text-black/60 font-bold flex justify-between select-none">
                    <span>ARCHIVE_{project.id.slice(0, 5)}</span>
                    <Folder size={10} />
                  </div>
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <h4 className="font-display text-sm font-bold text-black leading-tight">
                        {project.title}
                      </h4>
                      <p className="font-body text-[11px] text-black/75 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2.5 border-t border-black/10">
                      <div className="flex justify-between font-mono text-[9px] text-black/60">
                        {project.metrics.slice(0, 2).map((m, mIdx) => (
                          <span key={mIdx}>{m.label}: <strong className="text-black font-extrabold">{m.value}</strong></span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="font-mono text-[8px] bg-neo-pink/20 text-black border border-black/5 px-1 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Case Study Modal Simulator */}
      <AnimatePresence>
        {expandedId && expandedProject && (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
            onClick={() => setExpandedId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="os-window max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col bg-neo-surface border-[2.5px] border-black"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Window Header */}
              <div className="os-window-header-accent">
                <div className="flex items-center gap-2 font-mono text-sm text-black">
                  <Terminal size={14} />
                  <span>ide_workspace: {expandedProject.id}.sln</span>
                </div>
                <button
                  onClick={() => setExpandedId(null)}
                  className="p-1 border border-black bg-neo-surface hover:bg-black hover:text-neo-bg transition-colors"
                >
                  <X size={12} className="text-current" />
                </button>
              </div>

              {/* IDE Workspace Menu bar */}
              <div className="border-b-[2.5px] border-black bg-neo-surface px-4 py-1.5 flex items-center justify-between font-mono text-xs border-t-0 select-none border-x-0">
                <div className="flex gap-4 font-semibold text-black/60">
                  <span>File</span>
                  <span>Build</span>
                  <span>Terminal</span>
                  <span>Help</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-emerald-600 text-[10px]">
                  <Activity size={12} className="animate-pulse" />
                  <span>WORKSPACE_COMPILE_OK</span>
                </div>
              </div>

              {/* IDE Tabs */}
              <div className="flex border-b-[2px] border-black bg-neo-surface select-none text-[10px] md:text-xs font-mono">
                <button
                  onClick={() => setCaseStudyTab('info')}
                  className={`px-4 py-2 border-r-[2px] border-black font-bold uppercase ${
                    caseStudyTab === 'info' ? 'bg-neo-yellow text-black' : 'bg-transparent text-black/60 hover:text-black'
                  }`}
                >
                  [1] Problem & Research
                </button>
                <button
                  onClick={() => setCaseStudyTab('arch')}
                  className={`px-4 py-2 border-r-[2px] border-black font-bold uppercase ${
                    caseStudyTab === 'arch' ? 'bg-neo-blue text-black' : 'bg-transparent text-black/60 hover:text-black'
                  }`}
                >
                  [2] System Architecture
                </button>
                <button
                  onClick={() => setCaseStudyTab('code')}
                  className={`px-4 py-2 border-r-[2px] border-black font-bold uppercase ${
                    caseStudyTab === 'code' ? 'bg-neo-pink text-black' : 'bg-transparent text-black/60 hover:text-black'
                  }`}
                >
                  [3] Implementation Logs
                </button>
              </div>

              {/* IDE Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-neo-surface">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-silver font-semibold uppercase tracking-wider">
                    CASE_STUDY_METADATA // {expandedProject.subtitle}
                  </span>
                  <h4 className="font-display text-2xl font-bold text-black">{expandedProject.title}</h4>
                </div>

                <div className="space-y-4 font-sans text-xs md:text-sm">
                  {caseStudyTab === 'info' && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h5 className="font-mono text-xs font-bold text-black uppercase flex items-center gap-1.5 select-none">
                          <AlertCircle size={13} className="text-neo-pink" />
                          THE PROBLEM STATEMENT
                        </h5>
                        <p className="text-black/80 leading-relaxed bg-neo-pink/10 p-4 border border-black/10 rounded-sm">
                          {expandedProject.caseStudy.problem || expandedProject.description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-mono text-xs font-bold text-black uppercase flex items-center gap-1.5 select-none">
                          <CheckCircle2 size={13} className="text-neo-mint" />
                          RESEARCH & MODEL EVALUATION
                        </h5>
                        <p className="text-black/80 leading-relaxed bg-neo-mint/10 p-4 border border-black/10 rounded-sm">
                          {expandedProject.caseStudy.research || 'Evaluated multiple frameworks to identify high-efficiency methods of deployment on resource-constrained platforms.'}
                        </p>
                      </div>
                    </div>
                  )}

                  {caseStudyTab === 'arch' && (
                    <div className="space-y-4">
                      <h5 className="font-mono text-xs font-bold text-black uppercase select-none">
                        ASCII_SYSTEM_FLOW_MODEL.DAT
                      </h5>
                      <pre className="font-mono text-[9px] md:text-xs text-neo-mint bg-black p-4 overflow-x-auto border border-black/15 leading-relaxed rounded-none select-none">
                        {expandedProject.caseStudy.architecture || 'No diagram registered.'}
                      </pre>
                    </div>
                  )}

                  {caseStudyTab === 'code' && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h5 className="font-mono text-xs font-bold text-black uppercase select-none">
                          CORE_IMPLEMENTATION_STEPS
                        </h5>
                        <ul className="space-y-2 font-body text-xs md:text-sm text-black/85">
                          {expandedProject.caseStudy.implementation && expandedProject.caseStudy.implementation.length > 0 ? (
                            expandedProject.caseStudy.implementation.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <ChevronRight size={14} className="text-neo-pink shrink-0 mt-0.5" />
                                <span>{step}</span>
                              </li>
                            ))
                          ) : (
                            <li className="flex items-start gap-2">
                              <ChevronRight size={14} className="text-neo-pink shrink-0 mt-0.5" />
                              <span>Set up repository workspace and established base build dependencies.</span>
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h6 className="font-mono text-[10px] font-bold text-black uppercase">
                            CHALLENGES OVERCOME
                          </h6>
                          <p className="text-xs text-black/75 bg-neo-orange/10 p-3 border border-black/10 rounded-sm">
                            {expandedProject.caseStudy.challenges || 'Managed edge bottlenecks through model quantization.'}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h6 className="font-mono text-[10px] font-bold text-black uppercase">
                            MEASURED RESULTS
                          </h6>
                          <p className="text-xs text-black/75 bg-neo-mint/10 p-3 border border-black/10 rounded-sm">
                            {expandedProject.caseStudy.results || 'Achieved significant speedups and met the project validation criteria.'}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-mono text-xs font-bold text-black uppercase select-none">
                          FUTURE_DEVELOPMENT_ROADMAP
                        </h5>
                        <p className="text-xs text-black/75 leading-relaxed bg-neo-bg p-3 border border-black/10 rounded-sm">
                          {expandedProject.caseStudy.futureWork || 'Scale data ingestion interfaces and run model updates loops.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Status Footer */}
              <div className="border-t-[2.5px] border-black bg-black text-neo-bg px-4 py-2.5 font-mono text-[10px] flex justify-between items-center select-none">
                <div className="flex gap-4">
                  <span className="hidden sm:inline">PATH: ~/workspace/{expandedProject.id}/</span>
                  <span className="text-neo-mint">BUILD: SUCCESSFUL</span>
                </div>
                <div className="flex gap-3">
                  <a
                    href={expandedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-neo-surface text-black font-extrabold px-3 py-1 hover:bg-neo-yellow transition-all border border-black shadow-neo-sm flex items-center gap-1.5"
                  >
                    <Github size={12} />
                    <span>GITHUB --source</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
