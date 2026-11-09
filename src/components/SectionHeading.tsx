import { getSection, type SectionId } from '../data/sections';

interface Props {
  id: SectionId;
  className?: string;
}

/** "01 / PROJECTS.DAT" label + section title, generated from src/data/sections.ts. */
export default function SectionHeading({ id, className = '' }: Props) {
  const section = getSection(id);
  if (!section) return null;
  return (
    <div className={`space-y-1 ${className}`}>
      <p className="font-mono text-xs uppercase tracking-widest text-silver" aria-hidden="true">
        {section.number} / {section.file}
      </p>
      <h2 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-black">
        {section.title}
      </h2>
    </div>
  );
}
