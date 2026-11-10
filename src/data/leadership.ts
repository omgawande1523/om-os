// Om confirmed (Nov 2026): keep the leadership roles and counts as they were,
// except the 'Python wrappers and CLI tools' bullet, removed at Om's request.
// The resume lists only the President and Class Representative roles; the rest are Om's statements.
// Wording changed only where it read as a verification claim. See CLAIMS_TO_VERIFY.md.

export type LeadershipIcon = 'flag' | 'users' | 'trophy' | 'target' | 'sparkles' | 'brain';

export interface LeadershipRole {
  id: string;
  /** Shown as a one-liner by default; the rest sit behind "Show all". */
  featured: boolean;
  icon: LeadershipIcon;
  role: string;
  org: string;
  period: string;
  details: string[];
}

export const leadershipIntro =
  'Alongside engineering work I run the AI student forum at SVPCET, represent my class, and organise campus AI events.';

export const leadership: LeadershipRole[] = [
  {
    id: 'ai-prabodha',
    featured: true,
    icon: 'flag',
    role: 'President (prev. Secretary & Founding Member)',
    org: 'AI Prabodha Student Forum',
    period: '2023 – Present',
    details: [
      'Pioneered the SVPCET AI student society, growing the active member base to 150+ active participants.',
      'Organized multiple Python development bootcamps and artificial intelligence starter seminars.',
      'Mentored 50+ junior engineering students in setting up local Jupyter notebooks and training models.',
    ],
  },
  {
    id: 'class-rep',
    featured: true,
    icon: 'users',
    role: 'Class Representative',
    org: 'AI Department, SVPCET',
    period: '2023 – Present (elected 3 consecutive years)',
    details: [
      'Elected peer representative coordinating scheduling, syllabus alignments, and resource distributions.',
      'Liaison between department faculty heads and 70+ students to smooth academic operations.',
      'Managed event feedback loops resulting in improved laboratory compute hour allocations.',
    ],
  },
  {
    id: 'dataventics',
    featured: true,
    icon: 'trophy',
    role: 'Dataventics GenAI Hackathon Lead',
    org: 'SVPCET AI Campus Events',
    period: '2024 – 2025',
    details: [
      'Chaired logistics and challenge design for campus-wide hackathons attracting 200+ competitors.',
      'Configured server compute slots and API access keys for student hackathon teams.',
      'Maintained uptime of assessment web app during concurrent grading checks by judges.',
    ],
  },
  {
    id: 'ai-verse',
    featured: false,
    icon: 'target',
    role: 'AI Verse Organizer',
    org: 'Department Technical Board',
    period: '2024',
    details: [
      'Coordinated challenge rules and evaluation metrics for the campus-wide prompt engineering competition.',
      'Designed evaluation schemas and reference prompts to assess model compliance and efficiency.',
      'Evaluated 40+ competitor submissions, checking execution pipelines and response accuracy.',
    ],
  },
  {
    id: 'community',
    featured: false,
    icon: 'sparkles',
    role: 'Community Builder',
    org: 'Open Source Education',
    period: 'Ongoing',
    details: [
      'Host weekend code reviews and hardware debugging sessions for student builders.',
      'Organize technical visits to local tech hubs to inspect real-world automated pipelines.',
    ],
  },
  {
    id: 'tech-lead',
    featured: false,
    icon: 'brain',
    role: 'Technical Leader',
    org: 'Research & Project Teams',
    period: '2023 – Present',
    details: [
      'Directing core development groups for student projects, establishing coding styles and lint rules.',
      'Guiding model optimization methodologies (quantization, RAG pipeline fine-tuning).',
      'Orchestrated multi-disciplinary teams across frontend, backend, and embedded edge systems.',
    ],
  },
];

/** Hero fact line label for the forum role (same role as leadership[0]). */
export const forumRoleShort = 'President, AI Prabodha';
