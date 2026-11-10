import { BookOpen, ExternalLink, FileText } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { visiblePublications, type PublicationStatus } from '../data/publications';
import { getSection } from '../data/sections';

const badge: Record<Exclude<PublicationStatus, 'TODO'>, { label: string; className: string }> = {
  published: { label: 'Published', className: 'bg-neo-mint' },
  accepted: { label: 'Accepted', className: 'bg-neo-blue' },
  'under review': { label: 'Under review', className: 'bg-neo-yellow' },
  submitted: { label: 'Submitted', className: 'bg-neo-orange' },
  preprint: { label: 'Preprint', className: 'bg-neo-pink' },
};

/** Hidden entirely while every entry is still `status: 'TODO'`. */
export default function Publications() {
  if (!getSection('publications') || visiblePublications.length === 0) return null;

  return (
    <section id="publications" className="w-full py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative">
      <div className="max-w-7xl mx-auto space-y-12">
        <SectionHeading id="publications" />
        <ol className="space-y-4">
          {visiblePublications.map((pub) => {
            const b = badge[pub.status as Exclude<PublicationStatus, 'TODO'>];
            const link = pub.doi ? `https://doi.org/${pub.doi}` : pub.url;
            return (
              <li key={pub.id} className="os-window bg-neo-surface p-5 md:p-6 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 border border-black text-black ${b.className}`}>
                    {b.label}
                  </span>
                  {pub.year && <span className="font-mono text-xs text-black/70">{pub.year}</span>}
                </div>
                <h3 className="font-display text-lg font-bold text-black flex items-start gap-2">
                  <BookOpen size={16} className="shrink-0 mt-1" aria-hidden="true" />
                  <span>{pub.title}</span>
                </h3>
                {pub.authors.length > 0 && <p className="font-body text-sm text-black/80">{pub.authors.join(', ')}</p>}
                {pub.venue && <p className="font-body text-sm italic text-black/70">{pub.venue}</p>}
                <div className="flex flex-wrap gap-3 pt-1 font-mono text-xs font-bold">
                  {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline">
                      <ExternalLink size={12} aria-hidden="true" /> {pub.doi ? `doi:${pub.doi}` : 'Link'}
                    </a>
                  )}
                  {pub.pdf && (
                    <a href={pub.pdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline">
                      <FileText size={12} aria-hidden="true" /> PDF
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
