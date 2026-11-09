// Source: public/Om_Gawande_Resume.pdf. Om confirmed (Nov 2026): use the resume's dates.
// The resume gives no dates for Acube AI or RNR, so `period` is omitted for them.

export interface Role {
  id: string;
  fileName: string;
  title: string;
  org: string;
  shortOrg: string;
  period?: string;
  highlights: string[];
}

export interface Education {
  id: string;
  fileName: string;
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
    fileName: 'MRSAC_Internship.cfg',
    title: 'Research and Development Intern',
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
    id: 'acube_ai',
    fileName: 'Acube_AI_Internship.cfg',
    title: 'Data Analytics and AI Engineering Intern',
    org: 'Acube AI',
    shortOrg: 'Acube AI',
    highlights: [
      'Developed AI-powered applications by integrating machine learning models, LLMs and backend APIs into production-ready systems.',
      'Designed prompt engineering workflows, automated business processes and collaborated on end-to-end AI solution deployment.',
    ],
  },
  {
    id: 'rnr',
    fileName: 'RNR_Internship.cfg',
    title: 'AI and ERP Solution Intern',
    org: 'RNR',
    shortOrg: 'RNR',
    highlights: [
      'Developed AI modules for enterprise ERP applications, including machine learning pipelines, NLP workflows and intelligent business automation features.',
      'Worked with cross-functional teams to design, implement, test and deploy AI solutions for real-world business use cases.',
    ],
  },
];

export const education: Education = {
  id: 'edu_btech',
  fileName: 'BTech_AI_SVPCET.cfg',
  degree: 'B.Tech in Artificial Intelligence',
  institution: 'St. Vincent Pallotti College of Engineering and Technology',
  shortName: 'SVPCET',
  city: 'Nagpur',
  period: '2023 – 2027',
  classOf: 2027,
  cgpa: '8.68 / 10',
};
