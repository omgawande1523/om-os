// Seeded from Om's brief. None of these appear on the resume, so every entry stays
// `status: 'TODO'` (hidden) until Om confirms the venue, authors and status.
// Do not guess venues, years or statuses.

export type PublicationStatus = 'published' | 'accepted' | 'under review' | 'submitted' | 'preprint' | 'TODO';

export interface Publication {
  id: string;
  title: string;
  /** TODO Om: full author list in order. */
  authors: string[];
  /** TODO Om: confirmed venue. Empty until confirmed. */
  venue: string;
  year?: number;
  status: PublicationStatus;
  doi?: string;
  url?: string;
  pdf?: string;
  /** Internal note, never rendered. */
  note?: string;
}

export const publications: Publication[] = [
  {
    id: 'ppe-yolov11',
    title: 'PPE compliance monitoring with YOLOv11',
    authors: [],
    venue: '',
    status: 'TODO',
    note: 'Brief says ICSIT 2026. Confirm venue, status and authors.',
  },
  {
    id: 'firevisionnet',
    title: 'FireVisionNet: forest-fire detection with YOLOv11s',
    authors: [],
    venue: '',
    status: 'TODO',
    note: 'Brief says Kufa Journal of Engineering. Confirm venue, status and authors.',
  },
  {
    id: 'retail-supply-chain',
    title: 'AI-Driven Predictive Analytics and Supply Chain Resilience in Indian Organized Retail',
    authors: [],
    venue: '',
    status: 'TODO',
  },
  {
    id: 'snakevisionedge',
    title: 'SnakeVisionEdge: two-stage cascade for Indian snake species recognition',
    authors: [],
    venue: '',
    status: 'TODO',
  },
  {
    id: 'hybrid-agentic-rag-review',
    title: 'Hybrid Agentic RAG and Text-to-SQL Systems (review)',
    authors: [],
    venue: '',
    status: 'TODO',
  },
  {
    id: 'eeg-anaesthesia',
    title: 'EEG-Based Depth of Anaesthesia Estimation using Bi-LSTM & RAG Models',
    authors: [],
    venue: '',
    status: 'TODO',
  },
];

export const visiblePublications = publications.filter((p) => p.status !== 'TODO');
