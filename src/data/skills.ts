// Source: resume "Skills" section, plus tools that Om's public repos show
// (TypeScript, JavaScript, React, Next.js, PyTorch, YOLOv8/YOLOv11, Django/DRF, MySQL,
// Qdrant, Ollama, Docker, Git, FastAPI). No C / C++.

export type SkillIcon = 'code' | 'brain' | 'eye' | 'sparkles' | 'globe' | 'wrench' | 'cpu' | 'users';

export interface SkillCategory {
  id: string;
  title: string;
  icon: SkillIcon;
  colorClass: string;
  skills: string[];
  description: string;
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming Languages',
    icon: 'code',
    colorClass: 'bg-neo-blue',
    skills: ['Python', 'SQL', 'TypeScript', 'JavaScript'],
    description: 'Python for models, data pipelines and backends; TypeScript and JavaScript for dashboards and web front ends; SQL for relational data.',
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning',
    icon: 'brain',
    colorClass: 'bg-neo-mint',
    skills: ['PyTorch', 'TensorFlow', 'Keras', 'CNNs', 'YOLOv8 / YOLOv11', 'Transfer Learning', 'Custom Model Training'],
    description: 'Training and fine-tuning CNNs and object detectors on custom datasets, from annotation to an exported model.',
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision',
    icon: 'eye',
    colorClass: 'bg-neo-pink',
    skills: ['OpenCV', 'Image Preprocessing', 'Dataset Annotation', 'Real-time Detection', 'Camera Integration'],
    description: 'Real-time detection pipelines with OpenCV, dataset annotation and camera integration.',
  },
  {
    id: 'generative-ai',
    title: 'Generative AI',
    icon: 'sparkles',
    colorClass: 'bg-neo-yellow',
    skills: ['LLM Applications', 'RAG Pipelines', 'Ollama', 'Qdrant', 'Prompt Engineering', 'Agentic Workflow Design'],
    description: 'Local LLM applications with Ollama, retrieval over Qdrant, and multi-agent workflows with verification steps.',
  },
  {
    id: 'web-backend',
    title: 'Web & Backend',
    icon: 'globe',
    colorClass: 'bg-neo-orange',
    skills: ['React', 'Next.js', 'Django / DRF', 'FastAPI', 'MySQL'],
    description: 'APIs and dashboards around models: FastAPI and Django/DRF backends, React and Next.js front ends.',
  },
  {
    id: 'libraries-tools',
    title: 'Libraries & Tools',
    icon: 'wrench',
    colorClass: 'bg-neo-surface',
    skills: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'Docker', 'Google Colab', 'Git', 'GitHub'],
    description: 'Data science toolchain, containerisation with Docker and version control with Git.',
  },
  {
    id: 'embedded-hardware',
    title: 'Embedded AI & Hardware',
    icon: 'cpu',
    colorClass: 'bg-neo-blue',
    skills: ['Raspberry Pi 4', 'Camera Module Integration', 'IoT'],
    description: 'Running models on Raspberry Pi 4 with camera modules and GPIO-driven hardware.',
  },
  {
    id: 'soft-skills',
    title: 'Soft Skills',
    icon: 'users',
    colorClass: 'bg-neo-mint',
    skills: ['Leadership', 'Problem Solving', 'Strategic Thinking', 'Teamwork', 'Adaptability'],
    description: 'From the resume.',
  },
];
