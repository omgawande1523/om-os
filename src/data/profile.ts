// Single source of truth for personal details. Sources: public/Om_Gawande_Resume.pdf
// and Om's confirmations logged in CLAIMS_TO_VERIFY.md. Do not add unsourced claims.

export interface Profile {
  name: string;
  role: string;
  /** ≤ 3 lines, shown in the Hero. */
  heroBio: string;
  location: { city: string; region: string; country: string; countryCode: string };
  email: string;
  siteUrl: string;
  links: {
    github: string;
    linkedin: string;
    orcid: string;
    /** TODO Om: add a Google Scholar profile URL once it exists. Empty = hidden. */
    googleScholar: string;
  };
  githubUsername: string;
  /** From the resume summary. */
  researchInterests: string[];
  /** Shown in About as plain paragraphs. Keep factual. */
  aboutParagraphs: string[];
  /**
   * TODO Om: what you are looking for (e.g. MS programmes, internships, roles).
   * Empty string = the "Looking for" block is hidden.
   */
  lookingFor: string;
}

export const profile: Profile = {
  name: 'Om Gawande',
  role: 'AI Engineer',
  heroBio:
    'B.Tech AI student (SVPCET Nagpur, class of 2027) building computer vision and NLP systems for embedded and fully offline hardware. Most recently an R&D intern at MRSAC on a flood-nowcasting digital twin.',
  location: { city: 'Nagpur', region: 'Maharashtra', country: 'India', countryCode: 'IN' },
  email: 'gawandeom2005@gmail.com',
  siteUrl: 'https://om-os.vercel.app/',
  links: {
    github: 'https://github.com/omgawande1523',
    linkedin: 'https://www.linkedin.com/in/om-gawande-601081242',
    orcid: 'https://orcid.org/0009-0004-8574-9084',
    googleScholar: '',
  },
  githubUsername: 'omgawande1523',
  researchInterests: ['Applied AI', 'Computer vision', 'Scalable intelligent systems'],
  aboutParagraphs: [
    'Most of my work sits where models meet constrained conditions: a YOLOv8 classifier that has to run on a Raspberry Pi, a retrieval-augmented assistant that cannot send data to the cloud, a flood nowcast that has to cope with incomplete satellite and ground data.',
    'I try to report what a system actually does, not what it was meant to do. The MRSAC flood prototype README states its measured skill against the one available Sentinel-1 observation, shows that a naive baseline beats it, and explains why.',
  ],
  lookingFor: '',
};
