// Source: resume "Certifications & Achievements". Issuer names confirmed by Om (Nov 2026).

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  /** TODO Om: public credential URL. Empty = the badge is not a link. */
  credentialUrl?: string;
}

export const certifications: Certification[] = [
  { id: 'nvidia_dl', name: 'Fundamentals of Deep Learning', issuer: 'NVIDIA Deep Learning Institute' },
  { id: 'nptel_ml', name: 'Introduction to Machine Learning', issuer: 'NPTEL (IIT Kharagpur)' },
  { id: 'cloud_data', name: 'Data Engineering in Cloud Environment Training', issuer: 'Cloud Data Academy' },
  { id: 'genai_devops', name: 'Generative AI & DevOps Faculty Development Program', issuer: 'National Faculty Development Program' },
];
