// Source: resume "Skills" section, plus tools that Om's public repos show
// (TypeScript, JavaScript, React, Next.js, PyTorch, YOLOv8/YOLOv11, Django/DRF, MySQL,
// Qdrant, Ollama, Docker, Git, FastAPI). No C / C++. Regrouped into 5 groups in v3
// (Om, Nov 2026): existing items only; "Soft Skills" dropped.

export interface SkillGroup {
  id: string;
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  { id: 'languages', title: 'Languages', skills: ['Python', 'SQL', 'TypeScript', 'JavaScript'] },
  {
    id: 'ml-cv',
    title: 'ML & Computer Vision',
    skills: [
      'PyTorch',
      'TensorFlow',
      'Keras',
      'CNNs',
      'YOLOv8 / YOLOv11',
      'Transfer learning',
      'Custom model training',
      'OpenCV',
      'Image preprocessing',
      'Dataset annotation',
      'Real-time detection',
      'scikit-learn',
      'NumPy',
      'Pandas',
      'Matplotlib',
    ],
  },
  {
    id: 'llm-rag',
    title: 'LLMs & RAG',
    skills: ['LLM applications', 'RAG pipelines', 'Ollama', 'Qdrant', 'Prompt engineering', 'Agentic workflow design'],
  },
  { id: 'web', title: 'Web & Backend', skills: ['React', 'Next.js', 'Django / DRF', 'FastAPI', 'MySQL'] },
  {
    id: 'tools-hw',
    title: 'Tools & Hardware',
    skills: ['Docker', 'Git', 'GitHub', 'Google Colab', 'Raspberry Pi 4', 'Camera module integration', 'IoT'],
  },
];
