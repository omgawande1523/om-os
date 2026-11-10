// Source: public/Om_Gawande_Resume.pdf. Dates and the "RNR Innotech" name confirmed by Om (Nov 2026);
// the resume itself only dates the MRSAC internship. Order = timeline order on the page.

export interface Role {
  id: string;
  title: string;
  /** Short form used in the hero fact line. */
  shortTitle: string;
  org: string;
  shortOrg: string;
  period?: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  shortName: string;
  city: string;
  period: string;
  classOf: number;
  cgpa: string;
}

export const experience: Role[] = [
  {
    id: 'mrsac',
    title: 'Research and Development Intern',
    shortTitle: 'R&D intern',
    org: 'Maharashtra Remote Sensing Application Centre (MRSAC)',
    shortOrg: 'MRSAC',
    period: 'Aug 2026',
    highlights: [
      'Contributed to a multi-hazard digital twin initiative under Maharashtra’s climate resilience program, building a flood nowcasting module for Kolhapur city.',
      'Applied AI to a real-world scenario with incomplete and inconsistently available data, integrating satellite and geospatial datasets into a working nowcasting pipeline.',
      'Integrated open Sentinel-1/2 imagery with LULC and DEM data, and built an ML-based nowcasting layer with a dashboard for visualising flood risk.',
    ],
  },
  {
    id: 'rnr',
    title: 'AI and ERP Solution Intern',
    shortTitle: 'AI & ERP intern',
    org: 'RNR Innotech',
    shortOrg: 'RNR Innotech',
    period: 'Jun 2026 – Nov 2026',
    highlights: [
      'Developed AI modules for enterprise ERP applications, including machine learning pipelines, NLP workflows and intelligent business automation features.',
      'Worked with cross-functional teams to design, implement, test and deploy AI solutions for real-world business use cases.',
    ],
  },
  {
    id: 'acube_ai',
    title: 'Data Analytics and AI Engineering Intern',
    shortTitle: 'Data & AI intern',
    org: 'Acube AI',
    shortOrg: 'Acube AI',
    period: 'Jun 2026',
    highlights: [
      'Developed AI-powered applications by integrating machine learning models, LLMs and backend APIs into production-ready systems.',
      'Designed prompt engineering workflows, automated business processes and collaborated on end-to-end AI solution deployment.',
    ],
  },
];

export const education: Education = {
  degree: 'B.Tech in Artificial Intelligence',
  institution: 'St. Vincent Pallotti College of Engineering and Technology',
  shortName: 'SVPCET',
  city: 'Nagpur',
  period: '2023 – 2027',
  classOf: 2027,
  cgpa: '8.68 / 10',
};
