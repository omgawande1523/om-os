// Om confirmed (Nov 2026): keep the leadership roles and counts as they were.
// The resume lists only the President and Class Representative roles; the rest are Om's statements.
// Wording changed only where it read as a verification claim. See CLAIMS_TO_VERIFY.md.

export type LeadershipIcon = 'flag' | 'users' | 'trophy' | 'target' | 'sparkles' | 'brain';

export interface LeadershipRole {
  id: string;
  icon: LeadershipIcon;
  role: string;
  org: string;
  period: string;
  details: string[];
  color: string;
}

export const leadershipIntro =
  'Alongside engineering work I run the AI student forum at SVPCET, represent my class, and organise campus AI events.';

export const leadership: LeadershipRole[] = [
  {
    id: 'ai-prabodha',
    icon: 'flag',
    role: 'President (prev. Secretary & Founding Member)',
    org: 'AI Prabodha Student Forum',
    period: '2023 – Present',
    details: [
      'Pioneered the SVPCET AI student society, growing the active member base to 150+ active participants.',
      'Organized multiple Python development bootcamps and artificial intelligence starter seminars.',
      'Mentored 50+ junior engineering students in setting up local Jupyter notebooks and training models.',
    ],
    color: 'bg-neo-mint',
  },
  {
    id: 'class-rep',
    icon: 'users',
    role: 'Class Representative',
    org: 'AI Department, SVPCET',
    period: '2023 – Present (elected 3 consecutive years)',
    details: [
      'Elected peer representative coordinating scheduling, syllabus alignments, and resource distributions.',
      'Liaison between department faculty heads and 70+ students to smooth academic operations.',
      'Managed event feedback loops resulting in improved laboratory compute hour allocations.',
    ],
    color: 'bg-neo-blue',
  },
  {
    id: 'dataventics',
    icon: 'trophy',
    role: 'Dataventics GenAI Hackathon Lead',
    org: 'SVPCET AI Campus Events',
    period: '2024 – 2025',
    details: [
      'Chaired logistics and challenge design for campus-wide hackathons attracting 200+ competitors.',
      'Configured server compute slots and API access keys for student hackathon teams.',
      'Maintained uptime of assessment web app during concurrent grading checks by judges.',
    ],
    color: 'bg-neo-yellow',
  },
  {
    id: 'ai-verse',
    icon: 'target',
    role: 'AI Verse Organizer',
    org: 'Department Technical Board',
    period: '2024',
    details: [
      'Coordinated challenge rules and evaluation metrics for the campus-wide prompt engineering competition.',
      'Designed evaluation schemas and reference prompts to assess model compliance and efficiency.',
      'Evaluated 40+ competitor submissions, checking execution pipelines and response accuracy.',
    ],
    color: 'bg-neo-pink',
  },
  {
    id: 'community',
    icon: 'sparkles',
    role: 'Community Builder',
    org: 'Open Source Education',
    period: 'Ongoing',
    details: [
      'Advocate for open-source AI utilities, publishing custom Python wrappers and CLI tools on GitHub.',
      'Host weekend code reviews and hardware debugging sessions for student builders.',
      'Organize technical visits to local tech hubs to inspect real-world automated pipelines.',
    ],
    color: 'bg-neo-orange',
  },
  {
    id: 'tech-lead',
    icon: 'brain',
    role: 'Technical Leader',
    org: 'Research & Project Teams',
    period: '2023 – Present',
    details: [
      'Directing core development groups for student projects, establishing coding styles and lint rules.',
      'Guiding model optimization methodologies (quantization, RAG pipeline fine-tuning).',
      'Orchestrated multi-disciplinary teams across frontend, backend, and embedded edge systems.',
    ],
    color: 'bg-neo-surface',
  },
];
