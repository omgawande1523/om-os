// Source: resume "Certifications & Achievements". Issuer names confirmed by Om (Nov 2026).

export interface Certification {
  id: string;
  fileName: string;
  name: string;
  issuer: string;
  summary: string;
  skills: string[];
  colorClass: string;
  /** TODO Om: public credential URL. Empty = no "View credential" link. */
  credentialUrl?: string;
}

export const certifications: Certification[] = [
  {
    id: 'nvidia_dl',
    fileName: 'NVIDIA_Deep_Learning.crt',
    name: 'Fundamentals of Deep Learning',
    issuer: 'NVIDIA Deep Learning Institute',
    summary: 'Hands-on training in deep learning fundamentals, neural networks and AI model development.',
    skills: ['Deep Learning', 'Neural Networks', 'AI Model Development'],
    colorClass: 'bg-neo-mint',
  },
  {
    id: 'nptel_ml',
    fileName: 'NPTEL_Machine_Learning.crt',
    name: 'Introduction to Machine Learning',
    issuer: 'NPTEL (IIT Kharagpur)',
    summary: 'Core machine learning concepts, supervised learning algorithms and model evaluation.',
    skills: ['Machine Learning', 'Supervised Learning', 'Model Evaluation'],
    colorClass: 'bg-neo-blue',
  },
  {
    id: 'cloud_data',
    fileName: 'Cloud_Data_Engineering.crt',
    name: 'Data Engineering in Cloud Environment Training',
    issuer: 'Cloud Data Academy',
    summary: 'Cloud-based data pipelines, data processing and data engineering workflows.',
    skills: ['Cloud Pipelines', 'Data Processing', 'Data Engineering Workflows'],
    colorClass: 'bg-neo-yellow',
  },
  {
    id: 'genai_devops',
    fileName: 'GenAI_DevOps_FDP.crt',
    name: 'Generative AI & DevOps Faculty Development Program',
    issuer: 'National Faculty Development Program',
    summary: 'Generative AI applications, DevOps methods and automation.',
    skills: ['Generative AI', 'DevOps', 'Automation'],
    colorClass: 'bg-neo-orange',
  },
];
