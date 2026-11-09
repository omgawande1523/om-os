// Section order, numbering and nav are generated from this one array.
// Numbers are given to *visible* sections only, so hiding Publications
// (all entries still TODO) keeps the sequence 01, 02, 03… without gaps.

import { visiblePublications } from './publications';

export type SectionId =
  | 'projects'
  | 'experience'
  | 'publications'
  | 'skills'
  | 'leadership'
  | 'certifications'
  | 'github'
  | 'resume'
  | 'contact';

interface SectionDef {
  id: SectionId;
  /** Human title, used in nav and as the section heading. */
  title: string;
  /** OS-style file label shown after the number. */
  file: string;
  /** Short nav label. */
  nav: string;
  enabled: boolean;
}

const sectionDefs: SectionDef[] = [
  { id: 'projects', title: 'Projects', file: 'PROJECTS.DAT', nav: 'Projects', enabled: true },
  { id: 'experience', title: 'Experience & Education', file: 'EXPERIENCE.LOG', nav: 'Experience', enabled: true },
  {
    id: 'publications',
    title: 'Publications & Research',
    file: 'PUBLICATIONS.BIB',
    nav: 'Research',
    enabled: visiblePublications.length > 0,
  },
  { id: 'skills', title: 'Skills', file: 'SKILLS.CFG', nav: 'Skills', enabled: true },
  { id: 'leadership', title: 'Leadership', file: 'LEADERSHIP.CFG', nav: 'Leadership', enabled: true },
  { id: 'certifications', title: 'Certifications', file: 'CERTIFICATIONS.CRT', nav: 'Certs', enabled: true },
  { id: 'github', title: 'GitHub', file: 'GITHUB.LOG', nav: 'GitHub', enabled: true },
  { id: 'resume', title: 'Resume', file: 'RESUME.PDF', nav: 'Resume', enabled: true },
  { id: 'contact', title: 'Contact', file: 'CONTACT.EXE', nav: 'Contact', enabled: true },
];

export interface Section extends SectionDef {
  /** Two-digit number, e.g. "01". */
  number: string;
}

export const sections: Section[] = sectionDefs
  .filter((s) => s.enabled)
  .map((s, i) => ({ ...s, number: String(i + 1).padStart(2, '0') }));

export function getSection(id: SectionId): Section | undefined {
  return sections.find((s) => s.id === id);
}

/** Unnumbered entries shown in the nav before the numbered sections. */
export const preambleNav = [{ id: 'about', nav: 'About' }] as const;
