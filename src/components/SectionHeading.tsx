import { getSection, type SectionId } from '../data/sections';

interface Props {
  id: SectionId;
  className?: string;
}

/** "01 / Work": number from src/data/sections.ts (hidden from screen readers) + the section title. */
export default function SectionHeading({ id, className = '' }: Props) {
  const section = getSection(id);
  if (!section) return null;
  return (
    <h2
      id={`${id}-title`}
      className={`font-display text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-black flex items-baseline gap-3 ${className}`}
    >
      <span className="font-mono text-sm md:text-base font-bold text-silver" aria-hidden="true">
        {section.number} /
      </span>
      {section.title}
    </h2>
  );
}
