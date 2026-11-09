// Curated project list. Every sentence here comes from the project's README,
// the resume, or a confirmation from Om (see CLAIMS_TO_VERIFY.md).
// No metrics on cards. Case studies only where the README supports them.

import type { ImageKey } from '../components/Picture';

export type ProjectStatus = 'deployed' | 'prototype' | 'research' | 'in progress';

export type ProjectCategory = 'AI / ML' | 'Computer Vision' | 'NLP' | 'Geospatial' | 'Security' | 'Web';

export interface ProjectFact {
  label: string;
  value: string;
}

export interface CaseStudy {
  problem: string;
  approach: string[];
  results?: string[];
  limitations?: string[];
  /** README the case study is drawn from. */
  sourceUrl: string;
}

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  problem: string;
  whatIBuilt: string[];
  stack: string[];
  /** Omitted = no status badge (Om asked not to state one). */
  status?: ProjectStatus;
  /** Public repos only. Every URL must be checked by scripts/check-links.mjs. */
  repoUrls: string[];
  /** Shown when (part of) the code is not public. */
  codeNote?: string;
  liveUrl?: string;
  /** Note shown next to the live link, e.g. that it is a simulation. */
  liveNote?: string;
  /** Key from src/data/images.generated.json. Real screenshots only. */
  image?: ImageKey;
  imageAlt?: string;
  featured: boolean;
  archive: boolean;
  categories: ProjectCategory[];
  /** Model / dataset / platform facts shown on cards instead of metrics. */
  facts: ProjectFact[];
  caseStudy?: CaseStudy;
}

const gh = (repo: string) => `https://github.com/omgawande1523/${repo}`;
const readme = (repo: string) => `${gh(repo)}#readme`;

export const projects: Project[] = [
  // ───────────────────────────── Featured (order = display order) ─────────────────────────────
  {
    slug: 'mrsac-flood-twin',
    title: 'Flood Nowcasting Digital Twin for Kolhapur (MRSAC)',
    oneLiner:
      'Phase-1 pluvial-flood nowcasting module for Kolhapur city, built during my R&D internship at MRSAC. It runs end to end on open satellite, terrain and rainfall data.',
    problem:
      'Kolhapur and the Upper Krishna sub-basin flood repeatedly in the monsoon, and the data a nowcast needs is incomplete and inconsistently available.',
    whatIBuilt: [
      'A seven-layer pipeline from ingestion to dashboard that aligns Sentinel-1 SAR, Sentinel-2, SRTM terrain, ESA WorldCover land cover and IMD gridded rainfall on one grid.',
      'A physics baseline (SCS Curve Number runoff with cellular-automaton routing) plus a ConvLSTM correction layer, back-tested against SAR-derived flood extent.',
      'A FastAPI service with a Streamlit dashboard, and a separate static Leaflet simulation of the Upper Krishna basin deployed on Vercel.',
    ],
    stack: ['Python', 'PyTorch', 'FastAPI', 'Streamlit', 'rasterio', 'Leaflet', 'pytest'],
    status: 'prototype',
    repoUrls: [gh('Kolhapur-Digital-Twin'), gh('Krishna-River-Flood')],
    liveUrl: 'https://krishna-river-flood.vercel.app',
    liveNote: 'Upper Krishna basin simulation',
    image: 'mrsacOverview',
    imageAlt: 'Dashboard overview: Kolhapur nowcast map, rainfall and river-stage cards, and a banner stating the measured skill is low (CSI 0.0039)',
    featured: true,
    archive: false,
    categories: ['AI / ML', 'Geospatial'],
    facts: [
      { label: 'Data', value: 'Sentinel-1/2 · SRTM · IMD' },
      { label: 'Model', value: 'SCS-CN + ConvLSTM' },
      { label: 'Tests', value: '95 (pytest)' },
    ],
    caseStudy: {
      problem:
        'Build the flood-nowcasting module of a proposed multi-hazard (flood + landslide) digital twin for the Upper Krishna sub-basin, as specified in the MRSAC internship report, using only open data.',
      approach: [
        'Ingest and align SRTM 30 m terrain, ESA WorldCover 10 m land cover, IMD 0.25° daily rainfall and Sentinel-1 RTC / Sentinel-2 L2A scenes for a ~120 km² area around Kolhapur.',
        'Derive flood ground truth by Sentinel-1 pre/post differencing.',
        'Model runoff with SCS Curve Number and cellular-automaton fill-and-spill routing, then fit a ConvLSTM residual correction scored by spatial block cross-validation.',
        'Serve nowcasts, alerts, validation and data provenance through a REST API; every synthetic stand-in input is labelled in the output.',
      ],
      results: [
        'The pipeline runs end to end on real, open, keyless data.',
        'Back-tested with scripts/06_validate.py against the one usable Sentinel-1 observation (22 Jul 2021): CSI 0.0039 for the physics model and 0.0008 with the ConvLSTM correction, versus 0.1083 for a naive runoff-threshold baseline.',
      ],
      limitations: [
        '62.6 % of SAR-observed water lies within 90 m of permanent water and 0.0 % on built-up land: the observed flood is fluvial, while this module models pluvial urban ponding.',
        'There is only one usable SAR observation in total; no Sentinel-1 scene covers the 2019 flood, so a ConvLSTM fitted to it cannot generalise.',
        'The reservoir-release and landslide modules are explicitly unvalidated proxies.',
      ],
      sourceUrl: readme('Kolhapur-Digital-Twin'),
    },
  },
  {
    slug: 'offline-agentic-rag',
    title: 'Offline Agentic RAG for an Institutional Knowledge Base',
    oneLiner:
      'Question answering over college data that runs entirely on the local network: Ollama-hosted LLMs, Qdrant vector search and MySQL, with no external cloud services.',
    problem:
      'Institutional data should not leave the campus network, so the assistant has to answer questions with on-premise models only.',
    whatIBuilt: [
      'A multi-agent architecture (Router, SQL, RAG, Synthesis) with a dedicated verification agent for hallucination detection and answer grounding.',
      'A Django/DRF backend and React frontend, packaged with Docker Compose, for end-to-end query handling across the local network.',
      'A public interactive simulation (Next.js) that shows how a query moves through the agents.',
    ],
    stack: ['Python', 'Ollama', 'Qdrant', 'MySQL', 'Django / DRF', 'React', 'Docker Compose', 'Next.js'],
    repoUrls: [gh('Major-Project-Simulation')],
    codeNote: 'Main system is private (code on request). The linked repo is the public simulation.',
    liveUrl: 'https://major-project-simulation.vercel.app',
    liveNote: 'Interactive simulation',
    featured: true,
    archive: false,
    categories: ['AI / ML', 'NLP'],
    facts: [
      { label: 'Agents', value: 'Router · SQL · RAG · Synthesis · Verifier' },
      { label: 'Retrieval', value: 'Qdrant + MySQL (Text-to-SQL)' },
      { label: 'Runs', value: 'On-premise, no cloud APIs' },
    ],
  },
  {
    slug: 'smart-waste-segregation',
    title: 'Smart Waste Segregation (YOLOv8 + Raspberry Pi)',
    oneLiner:
      'A Raspberry Pi camera classifies each item with a custom-trained YOLOv8 model, and two servos route it into one of six bins.',
    problem:
      'Mixed waste is usually sorted by hand. The goal was real-time classification and segregation on low-cost edge hardware.',
    whatIBuilt: [
      'Dataset annotation, custom YOLOv8 training and optimisation for constrained edge hardware.',
      'A Flask server on the Pi that streams the camera feed, runs inference and drives the GPIO: an IR sensor plus two servos (bin router and lid/chute).',
      'A monitoring dashboard; the Vercel deployment runs it in a browser simulation mode because hosting cannot reach the hardware.',
    ],
    stack: ['Python', 'YOLOv8 (Ultralytics)', 'OpenCV', 'Flask', 'Raspberry Pi 4', 'JavaScript', 'Chart.js'],
    status: 'prototype',
    repoUrls: [gh('Automatic-waste-segregation-with-computer-vision')],
    liveUrl: 'https://automatic-waste-segregation-with-co.vercel.app',
    liveNote: 'Dashboard in simulation mode',
    featured: true,
    archive: false,
    categories: ['Computer Vision', 'AI / ML'],
    facts: [
      { label: 'Model', value: 'YOLOv8' },
      { label: 'Platform', value: 'Raspberry Pi 4' },
      { label: 'Classes', value: 'Metal · Organic · Plastic · Paper · E-waste · Reject' },
    ],
    caseStudy: {
      problem:
        'Classify waste (plastic, paper, metal, organic, e-waste) from a camera image and physically route it to the right bin in real time on a Raspberry Pi.',
      approach: [
        'Annotated a dataset and trained a custom YOLOv8 model; the Pi loads the trained checkpoint (best.pt) at runtime.',
        'Flask backend on the Pi runs inference on the camera stream and drives GPIO 17 (bin router servo), GPIO 27 (lid/chute servo) and GPIO 22 (IR sensor).',
        'The router servo maps each class to a fixed angle: reject 15°, metal 45°, organic 75°, plastic 105°, paper 135°, e-waste 165°.',
        'A static dashboard shows the live MJPEG stream, confidence, event log and bin-fill charts; without a backend it falls back to a client-side simulation.',
      ],
      sourceUrl: readme('Automatic-waste-segregation-with-computer-vision'),
    },
  },
  {
    slug: 'ppe-compliance',
    title: 'PPE Compliance Monitoring (YOLOv11)',
    oneLiner:
      'Checks a video feed for helmets, vests, gloves, boots and goggles with a YOLOv11 model and sends deduplicated Twilio alerts when PPE is missing.',
    problem:
      'Manual checks for protective equipment on work sites are inconsistent, and naive per-frame alerting floods supervisors with duplicates.',
    whatIBuilt: [
      'A YOLO-based detector (Ultralytics) for five PPE classes, run on a video source or single images with OpenCV.',
      'A violation state machine (new, active, expired, resolved) with cooldowns so the same violation does not trigger repeated alerts.',
      'Twilio message alerts for new violations.',
    ],
    stack: ['Python', 'YOLOv11 (Ultralytics)', 'OpenCV', 'Twilio'],
    status: 'research',
    repoUrls: [gh('PPE')],
    featured: true,
    archive: false,
    categories: ['Computer Vision', 'AI / ML'],
    facts: [
      { label: 'Model', value: 'YOLOv11' },
      { label: 'Classes', value: 'Helmet · Vest · Gloves · Boots · Goggles' },
      { label: 'Alerts', value: 'Twilio, deduplicated' },
    ],
  },
  {
    slug: 'sarcasm-detection',
    title: 'Sarcasm Detection for Low-Resource Indian Languages',
    oneLiner:
      'Transformer-based sarcasm detection for Marathi and other regional Indian languages, built on a custom annotated dataset.',
    problem:
      'Sarcasm flips the literal sentiment of a sentence, and regional Indian languages have very little labelled data for it.',
    whatIBuilt: [
      'Annotation guidelines, a dataset schema and strict separation of authentic and synthetic data for research integrity.',
      'Models combining XLM-RoBERTa with a BiLSTM-attention head, plus LIME/SHAP word-level explanations.',
      'Training and evaluation scripts, a FastAPI backend and a Docker Compose setup.',
    ],
    stack: ['Python', 'PyTorch', 'Hugging Face Transformers', 'FastAPI', 'PostgreSQL', 'Docker'],
    status: 'in progress',
    repoUrls: [gh('Sarcasm-Detection')],
    featured: true,
    archive: false,
    categories: ['NLP', 'AI / ML'],
    facts: [
      { label: 'Model', value: 'XLM-RoBERTa + BiLSTM' },
      { label: 'Data', value: 'Custom annotated' },
      { label: 'Explainability', value: 'LIME · SHAP' },
    ],
  },
  {
    slug: 'intrushield',
    title: 'IntruShield: Network Intrusion Detection on NSL-KDD',
    oneLiner:
      'Binary and 5-class intrusion detection on NSL-KDD with a leak-free evaluation against the official KDDTest+ and KDDTest-21 sets.',
    problem:
      'Intrusion-detection results are easy to inflate through leakage between training and test data, so the evaluation protocol matters as much as the model.',
    whatIBuilt: [
      'A pipeline that audits the data, tunes and cross-validates eight candidate models, picks a decision threshold on a validation split and writes a self-contained HTML report.',
      'SHAP-based reasons for individual predictions.',
      'A FastAPI app that serves live predictions alongside a Vite + Three.js site, with Docker and Render configs.',
    ],
    stack: ['Python', 'scikit-learn', 'SHAP', 'FastAPI', 'Vite', 'Three.js', 'Docker'],
    status: 'prototype',
    repoUrls: [gh('IntruShield')],
    featured: true,
    archive: false,
    categories: ['Security', 'AI / ML'],
    facts: [
      { label: 'Dataset', value: 'NSL-KDD' },
      { label: 'Tasks', value: 'Binary + 5-class' },
      { label: 'Explainability', value: 'SHAP' },
    ],
    caseStudy: {
      problem:
        'Detect network intrusions (normal vs attack, and Normal / DoS / Probe / R2L / U2R) without the train/test leakage that inflates many NSL-KDD results.',
      approach: [
        'Preprocessing and models are fit on KDDTrain+ only; KDDTest+ is first read in the evaluation step.',
        'Model selection, hyper-parameter search and the decision threshold use a 15 % validation split; random_state=42 throughout.',
        'Results are reported under two protocols: a random validation split and the official KDDTest+ / KDDTest-21 sets.',
        'Outputs include a data audit, per-model metrics, figures, an HTML report and deployable model bundles.',
      ],
      sourceUrl: readme('IntruShield'),
    },
  },

  // ───────────────────────────── Archive ─────────────────────────────
  {
    slug: 'edgeseiz-net',
    title: 'EdgeSeiz-Net: EEG Seizure Detection for Edge Devices',
    oneLiner:
      'Lightweight seizure detector aimed at ESP32 / Raspberry Pi-class hardware, trained and evaluated patient-independently on the CHB-MIT scalp EEG database.',
    problem: 'Seizure detection on cheap wearable-class hardware, evaluated on patients the model has never seen.',
    whatIBuilt: [
      'Patient-level train / validation / test split with evaluation on continuous recordings at natural class imbalance.',
      'Step-by-step experiments, with negative results recorded as such.',
    ],
    stack: ['Python', 'Google Colab', 'CHB-MIT EEG'],
    status: 'in progress',
    repoUrls: [gh('Neonatal')],
    featured: false,
    archive: true,
    categories: ['AI / ML'],
    facts: [{ label: 'Dataset', value: 'CHB-MIT' }],
  },
  {
    slug: 'adhyayan',
    title: 'ADHYAYAN: Offline AI Study Assistant',
    oneLiner:
      'A study-assistant agent that runs entirely on one laptop with a local Ollama model: no API key, no cloud calls, no internet after first setup.',
    problem: 'Help students learn from their own material without sending it to a cloud service.',
    whatIBuilt: ['Local ingestion and embeddings, an Ollama-hosted model and a FastAPI server.'],
    stack: ['Python', 'Ollama', 'FastAPI'],
    status: 'prototype',
    repoUrls: [gh('ADHYAYAN')],
    featured: false,
    archive: true,
    categories: ['AI / ML', 'NLP'],
    facts: [],
  },
  {
    slug: 'swarkavach',
    title: 'SwarKavach: On-Device Voice-Clone Shield (SIH 2026)',
    oneLiner:
      'Interactive simulation of an Android app concept that checks a phone call for an AI-cloned or impersonated voice entirely on the phone. Smart India Hackathon 2026, problem SIH26104.',
    problem: 'Detect voice-clone scams during a call without sending audio off the device.',
    whatIBuilt: ['A single-file, offline web simulation of the on-device workflow with keyboard-driven scenarios.'],
    stack: ['HTML', 'JavaScript'],
    status: 'prototype',
    repoUrls: [gh('Clone-Detector')],
    liveUrl: 'https://clone-detector.vercel.app',
    liveNote: 'Simulation',
    featured: false,
    archive: true,
    categories: ['Security', 'AI / ML'],
    facts: [],
  },
  {
    slug: 'aadhaarx',
    title: 'AadhaarX: Digital Identity Verification Platform',
    oneLiner:
      'Microservice prototype for identity verification: a Next.js console, NestJS API gateway, FastAPI face-liveness service and a proof-of-authority ledger.',
    problem: 'Privacy-first identity verification for digital public infrastructure.',
    whatIBuilt: ['Frontend console, API gateway with token rotation and consent checks, liveness service and ledger service.'],
    stack: ['TypeScript', 'Next.js', 'NestJS', 'FastAPI', 'PyTorch'],
    status: 'prototype',
    repoUrls: [gh('AadhaarX')],
    featured: false,
    archive: true,
    categories: ['Security', 'Web'],
    facts: [],
  },
  {
    slug: 'routeiq',
    title: 'RouteIQ: Road Health Intelligence',
    oneLiner:
      'Scores road segments with XGBoost and SHAP explanations, analyses Sentinel-2 imagery and plans repairs under a budget, behind a Next.js GIS dashboard.',
    problem: 'Help municipalities decide which road segments to repair first.',
    whatIBuilt: ['Health-scoring and forecasting service, satellite image pipeline, repair planner and dashboard.'],
    stack: ['TypeScript', 'Next.js', 'NestJS', 'FastAPI', 'XGBoost', 'PostGIS', 'Leaflet'],
    status: 'prototype',
    repoUrls: [gh('routeiq-enterprise')],
    featured: false,
    archive: true,
    categories: ['Geospatial', 'Web'],
    facts: [],
  },
  {
    slug: 'cyber-threat-detection',
    title: 'Autonomous Cyber Threat Detection',
    oneLiner:
      'Autoencoder anomaly detection, multi-class attack classification and a PPO reinforcement-learning agent that chooses mitigation actions, with a Streamlit dashboard.',
    problem: 'Detect, classify and respond to malicious network traffic in one pipeline.',
    whatIBuilt: ['Anomaly detector, attack classifiers, RL response agent and dashboard.'],
    stack: ['Python', 'PyTorch', 'XGBoost', 'Streamlit', 'FastAPI'],
    status: 'prototype',
    repoUrls: [gh('ai-autonomous-cyber-threat-detection')],
    featured: false,
    archive: true,
    categories: ['Security', 'AI / ML'],
    facts: [],
  },
  {
    slug: 'mathgpt',
    title: 'MathGPT: Neuro-Symbolic Math Assistant',
    oneLiner:
      'Combines LLM agents (LangGraph) with SymPy and Lean 4 so that mathematical answers can be checked symbolically or formally.',
    problem: 'LLM answers to maths questions are hard to trust without verification.',
    whatIBuilt: ['Agent graph, symbolic solver workspace, Lean 4 proof studio and theorem explorer.'],
    stack: ['Python', 'LangGraph', 'SymPy', 'Lean 4', 'Neo4j', 'React'],
    status: 'prototype',
    repoUrls: [gh('MathGPT')],
    liveUrl: 'https://math-gpt-frontend-two.vercel.app',
    featured: false,
    archive: true,
    categories: ['AI / ML', 'NLP'],
    facts: [],
  },
  {
    slug: 'earth-science-agi',
    title: 'Earth Science Research Assistant',
    oneLiner:
      'Multi-agent assistant for earth-science questions with runnable groundwater, erosion and seismic solvers and NDVI/NDWI raster processing.',
    problem: 'Bring domain-specific simulation and remote-sensing tools into one research assistant.',
    whatIBuilt: ['Specialist agents, finite-difference and USLE solvers, raster processing and a literature graph.'],
    stack: ['Python', 'FastAPI', 'Next.js', 'Neo4j', 'PostGIS', 'Leaflet'],
    status: 'prototype',
    repoUrls: [gh('earth-science-agi')],
    featured: false,
    archive: true,
    categories: ['Geospatial', 'AI / ML'],
    facts: [],
  },
  {
    slug: 'urdu-violence-detection',
    title: 'Explainable Violence-Incitation Detection (Urdu)',
    oneLiner:
      'Hierarchical classifier that flags and explains violence incitation in Urdu social-media text, packaged as Docker microservices.',
    problem: 'Moderation tools for Urdu text are scarce, and moderators need to see why a post was flagged.',
    whatIBuilt: ['AI inference service, FastAPI gateway, PostgreSQL storage and Redis, started together with Docker Compose.'],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    status: 'prototype',
    repoUrls: [gh('Urdu-Violence-Detection-AI')],
    liveUrl: 'https://urdu-violence-detection-ai.vercel.app',
    featured: false,
    archive: true,
    categories: ['NLP', 'AI / ML'],
    facts: [],
  },
  {
    slug: 'agrosense',
    title: 'AgroSense AI: Crop & Climate Risk for Vidarbha',
    oneLiner:
      'Rainfall forecasting, crop-yield prediction and drought/flood indices for the 11 districts of Vidarbha, with SHAP explanations.',
    problem: 'Give farmers and planners in Vidarbha early warning of climate risk to crops.',
    whatIBuilt: ['Forecasting and yield models, risk indices, explanation views and a simulated SMS alert flow.'],
    stack: ['Python', 'FastAPI', 'XGBoost', 'React', 'TypeScript', 'PostGIS'],
    status: 'prototype',
    repoUrls: [gh('AgroSense')],
    featured: false,
    archive: true,
    categories: ['AI / ML', 'Geospatial'],
    facts: [],
  },
  {
    slug: 'image-inspector',
    title: 'Image Quality & Defect Inspector',
    oneLiner:
      'Scores image quality and flags blur, exposure problems, noise, JPEG artefacts and anomalies (autoencoder heatmaps), using local models only.',
    problem: 'Catch defective images automatically without an external AI service.',
    whatIBuilt: ['Classical CV checks, a convolutional autoencoder for anomaly heatmaps, a FastAPI backend and a React front end.'],
    stack: ['Python', 'OpenCV', 'PyTorch', 'FastAPI', 'React'],
    status: 'prototype',
    repoUrls: [gh('Image-Inspector')],
    featured: false,
    archive: true,
    categories: ['Computer Vision'],
    facts: [],
  },
  {
    slug: 'waste-sorting-arm-simulation',
    title: 'Waste-Sorting Robotic Arm Simulation',
    oneLiner:
      'Browser simulation of a TensorFlow Lite vision engine driving an Arduino-controlled 6-DOF arm that sorts items into five bins.',
    problem: 'Explain a vision-guided sorting arm step by step in a presentation.',
    whatIBuilt: ['SVG kinematics renderer, simulated vision pipeline and serial-terminal view.'],
    stack: ['JavaScript', 'SVG'],
    status: 'prototype',
    repoUrls: [gh('Waste-Sorting-Simulation')],
    liveUrl: 'https://waste-sorting-simulation.vercel.app',
    liveNote: 'Simulation',
    featured: false,
    archive: true,
    categories: ['Computer Vision'],
    facts: [],
  },
  {
    slug: 'smart-waste-management-paper',
    title: 'Smart AI Waste Management System (write-up)',
    oneLiner:
      'Paper-style write-up, with Palak Khonde, of a smart bin that classifies dry and wet waste with computer vision and reports fill levels to a dashboard.',
    problem: 'Improve waste segregation, monitoring and collection in cities.',
    whatIBuilt: ['System design and write-up covering the camera classifier, ultrasonic fill sensing and the authority dashboard.'],
    stack: ['Computer vision', 'IoT'],
    status: 'research',
    repoUrls: [gh('Waste-Management')],
    featured: false,
    archive: true,
    categories: ['Computer Vision'],
    facts: [],
  },
  {
    slug: 'qr-menu',
    title: 'QR Menu: Restaurant Ordering',
    oneLiner:
      'QR-code menu and table ordering for Indian restaurants: menu in English, Hindi or Marathi, live orders board, kitchen display, GST bills with a UPI QR and a staff mobile app.',
    problem: 'Small restaurants need ordering and billing without expensive POS systems.',
    whatIBuilt: ['React client, Express/MongoDB API with Socket.io, Capacitor staff app and automated tests.'],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Capacitor', 'Playwright'],
    status: 'prototype',
    repoUrls: [gh('QR-Project')],
    featured: false,
    archive: true,
    categories: ['Web'],
    facts: [],
  },
  {
    slug: 'aegisedge',
    title: 'AegisEdge: Offline Face Verification (design)',
    oneLiner:
      'Design blueprint and roadmap for an offline face recognition and liveness module for a mobile app: React Native, TensorFlow Lite and SQLCipher storage.',
    problem: 'Verify faces on low-end phones without a network connection.',
    whatIBuilt: ['Architecture, model choices, folder structure and an implementation roadmap.'],
    stack: ['React Native', 'TensorFlow Lite', 'SQLCipher'],
    status: 'prototype',
    repoUrls: [gh('AegisEdge')],
    featured: false,
    archive: true,
    categories: ['Computer Vision', 'Security'],
    facts: [],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const archiveProjects = projects.filter((p) => p.archive);
export const projectCategories: ProjectCategory[] = ['AI / ML', 'Computer Vision', 'NLP', 'Geospatial', 'Security', 'Web'];

export const statusLabel: Record<ProjectStatus, string> = {
  deployed: 'Deployed',
  prototype: 'Prototype',
  research: 'Research',
  'in progress': 'In progress',
};

