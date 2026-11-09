// Section order, numbering and nav are generated from this one array.
// Numbers are given to *visible* sections only, so hiding Publications
// (all entries still TODO) keeps the sequence 01, 02, 03… without gaps.

import { visiblePublications } from './publications';

export type SectionId = 'work' | 'experience' | 'publications' | 'skills' | 'leadership' | 'contact';

interface SectionDef {
  id: SectionId;
  /** Human title, used in nav and as the section heading. */
  title: string;
  /** Short nav label. */
  nav: string;
  enabled: boolean;
}

const sectionDefs: SectionDef[] = [
  { id: 'work', title: 'Work', nav: 'Work', enabled: true },
  { id: 'experience', title: 'Experience', nav: 'Experience', enabled: true },
  {
    id: 'publications',
    title: 'Publications & Research',
   
    nav: 'Research',
    enabled: visiblePublications.length > 0,
  },
  { id: 'skills', title: 'Skills', nav: 'Skills', enabled: true },
  { id: 'leadership', title: 'Leadership', nav: 'Leadership', enabled: true },
  { id: 'contact', title: 'Contact', nav: 'Contact', enabled: true },
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
