import { useEffect, useRef, useState } from 'react';
import { Github, X, ChevronRight, Code, Folder, Terminal, ListFilter, ExternalLink, Lock } from 'lucide-react';
import ElasticThreadGrid from '../components/ElasticThreadGrid';
import SectionHeading from '../components/SectionHeading';
import {
  featuredProjects,
  archiveProjects,
  projectCategories,
  statusLabel,
  type Project,
  type ProjectCategory,
  type ProjectStatus,
} from '../data/projects';

type Filter = 'All' | ProjectCategory;

const statusClass: Record<ProjectStatus, string> = {
  deployed: 'bg-neo-mint',
  prototype: 'bg-neo-yellow',
  research: 'bg-neo-blue',
  'in progress': 'bg-neo-pink',
};

function repoLabel(url: string) {
  return url.replace('https://github.com/', '');
}

function StatusBadge({ status }: { status?: ProjectStatus }) {
  if (!status) return null;
  return (
    <span
      className={`inline-block font-mono text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 border border-black text-black ${statusClass[status]}`}
    >
      {statusLabel[status]}
    </span>
  );
}

function ProjectLinks({ project, compact = false }: { project: Project; compact?: boolean }) {
  const linkClass = compact
    ? 'inline-flex items-center gap-1 font-mono text-[10px] font-bold text-black underline decoration-2 underline-offset-2 hover:bg-neo-yellow'
    : 'inline-flex items-center gap-1.5 font-mono text-xs font-bold text-black border-[2px] border-black px-2.5 py-1 bg-neo-surface hover:bg-neo-yellow transition-colors';
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.repoUrls.map((url) => (
        <a key={url} href={url} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <Github size={compact ? 10 : 12} aria-hidden="true" />
          <span>{compact ? 'Code' : repoLabel(url)}</span>
        </a>
      ))}
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <ExternalLink size={compact ? 10 : 12} aria-hidden="true" />
          <span>{project.liveNote ? `Live: ${project.liveNote}` : 'Live demo'}</span>
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Filter>('All');
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const matches = (p: Project) => activeCategory === 'All' || p.categories.includes(activeCategory);
  const featured = featuredProjects.filter(matches);
  const archive = archiveProjects.filter(matches);
  const openProject = [...featuredProjects, ...archiveProjects].find((p) => p.slug === openSlug && p.caseStudy);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openProject && !dialog.open) dialog.showModal();
    if (!openProject && dialog.open) dialog.close();
  }, [openProject]);

  const filters: Filter[] = ['All', ...projectCategories];

  return (
    <section
      id="projects"
      className="w-full py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative overflow-hidden transition-colors duration-200"
    >
      <div className="absolute inset-0 z-0">
        <ElasticThreadGrid />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-[2.5px] border-black pb-4">
          <SectionHeading id="projects" />

          <div className="flex flex-wrap items-center gap-1.5 text-[10px] md:text-xs font-mono text-black font-semibold" role="group" aria-label="Filter projects by category">
            <ListFilter size={12} className="text-black" aria-hidden="true" />
            <span>FILTER:</span>
            {filters.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-2 py-0.5 border border-black hover:bg-black hover:text-neo-bg transition-all ${
                  activeCategory === cat ? 'bg-black text-neo-bg font-bold shadow-neo-sm' : 'bg-neo-surface'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <div className="space-y-6">
            <h3 className="font-display text-xl font-extrabold text-black uppercase tracking-wide">Featured</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featured.map((project) => (
                <article
                  key={project.slug}
                  className="os-window bg-neo-surface flex flex-col justify-between hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo-lg transition-all duration-300"
                >
                  <div className="os-window-header-accent border-b-[2px]">
                    <div className="flex items-center gap-2 text-black min-w-0">
                      <Code size={13} aria-hidden="true" />
                      <span className="truncate">{project.slug}.elf</span>
                    </div>
                    <StatusBadge status={project.status} />
                  </div>

                  {project.image && (
                    <div className="relative h-56 overflow-hidden border-b-[2.5px] border-black">
                      <img
                        src={project.image}
                        alt={`Screenshot of ${project.title}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h4 className="font-display text-xl font-bold text-black">{project.title}</h4>
                      <p className="font-body text-xs md:text-sm text-black/75 leading-relaxed">{project.oneLiner}</p>
                    </div>

                    {project.facts.length > 0 && (
                      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                        {project.facts.map((fact) => (
                          <div key={fact.label} className="border border-black/15 bg-black/5 p-2 font-mono">
                            <dt className="text-[8px] text-silver font-bold uppercase tracking-tight">{fact.label}</dt>
                            <dd className="text-[11px] font-extrabold text-black leading-tight mt-0.5">{fact.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {project.stack.map((tag) => (
                        <span key={tag} className="font-mono text-[9px] bg-neo-blue/20 text-black border border-black/10 px-1.5 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.codeNote && (
                      <p className="flex items-start gap-1.5 font-mono text-[10px] text-black/70">
                        <Lock size={11} className="shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{project.codeNote}</span>
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-black/10 flex-wrap gap-3">
                      <ProjectLinks project={project} />
                      {project.caseStudy && (
                        <button
                          type="button"
                          onClick={() => setOpenSlug(project.slug)}
                          className="inline-flex items-center gap-1 font-mono text-xs text-neo-bg bg-black font-bold uppercase px-3 py-1.5 border-[2px] border-black hover:bg-neo-yellow hover:text-black transition-colors"
                        >
                          <span>Case study</span>
                          <ChevronRight size={12} aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Archive */}
        {archive.length > 0 && (
          <div className="space-y-6 pt-12 border-t border-black/10">
            <h3 className="font-display text-xl font-extrabold text-black uppercase tracking-wide">More projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {archive.map((project) => (
                <article
                  key={project.slug}
                  className="os-window bg-neo-surface hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="border-b-[2px] border-black px-3 py-1.5 bg-black/5 font-mono text-[9px] text-black/60 font-bold flex justify-between items-center select-none">
                    <Folder size={10} aria-hidden="true" />
                    <StatusBadge status={project.status} />
                  </div>
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <h4 className="font-display text-sm font-bold text-black leading-tight">{project.title}</h4>
                      <p className="font-body text-[11px] text-black/75 leading-relaxed">{project.oneLiner}</p>
                    </div>
                    <div className="space-y-3 pt-2.5 border-t border-black/10">
                      <div className="flex flex-wrap gap-1">
                        {project.stack.slice(0, 4).map((tag) => (
                          <span key={tag} className="font-mono text-[8px] bg-neo-pink/20 text-black border border-black/5 px-1 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <ProjectLinks project={project} compact />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {featured.length === 0 && archive.length === 0 && (
          <p className="font-mono text-xs text-black/70">No projects in this category.</p>
        )}
      </div>

      {/* Case study dialog (native <dialog>: focus trap + Escape built in) */}
      <dialog
        ref={dialogRef}
        onClose={() => setOpenSlug(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpenSlug(null);
        }}
        aria-labelledby="case-study-title"
        className="os-window p-0 max-w-3xl w-[calc(100%-2rem)] max-h-[85vh] bg-neo-surface border-[2.5px] border-black backdrop:bg-black/50"
      >
        {openProject?.caseStudy && (
          <div className="flex flex-col max-h-[85vh]">
            <div className="os-window-header-accent">
              <div className="flex items-center gap-2 font-mono text-sm text-black min-w-0">
                <Terminal size={14} aria-hidden="true" />
                <span className="truncate">case_study: {openProject.slug}</span>
              </div>
              <button
                type="button"
                onClick={() => setOpenSlug(null)}
                aria-label="Close case study"
                className="p-1 border border-black bg-neo-surface hover:bg-black hover:text-neo-bg transition-colors"
              >
                <X size={12} className="text-current" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-neo-surface font-sans text-xs md:text-sm">
              <div className="space-y-2">
                <StatusBadge status={openProject.status} />
                <h3 id="case-study-title" className="font-display text-2xl font-bold text-black">
                  {openProject.title}
                </h3>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold text-black uppercase">Problem</h4>
                <p className="text-black/80 leading-relaxed bg-neo-pink/10 p-4 border border-black/10">
                  {openProject.caseStudy.problem}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold text-black uppercase">Approach</h4>
                <ul className="space-y-2 text-black/85">
                  {openProject.caseStudy.approach.map((step) => (
                    <li key={step} className="flex items-start gap-2">
                      <ChevronRight size={14} className="text-neo-pink shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {openProject.caseStudy.results && (
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-bold text-black uppercase">Results</h4>
                  <ul className="space-y-2 text-black/85 bg-neo-mint/10 p-4 border border-black/10">
                    {openProject.caseStudy.results.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {openProject.caseStudy.limitations && (
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-bold text-black uppercase">Limitations</h4>
                  <ul className="space-y-2 text-black/85 bg-neo-orange/10 p-4 border border-black/10">
                    {openProject.caseStudy.limitations.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="font-mono text-[10px] text-black/60">
                Source:{' '}
                <a href={openProject.caseStudy.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
                  project README
                </a>
              </p>
            </div>

            <div className="border-t-[2.5px] border-black bg-black text-neo-bg px-4 py-2.5 font-mono text-[10px]">
              <div className="[&_a]:!bg-neo-surface">
                <ProjectLinks project={openProject} />
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
