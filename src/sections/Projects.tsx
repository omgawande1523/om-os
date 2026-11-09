import { lazy, Suspense, useState, useSyncExternalStore } from 'react';
import { ChevronRight, Code, Folder, ListFilter, Lock } from 'lucide-react';
import ThreadGridBackground from '../components/ThreadGridBackground';
import Picture from '../components/Picture';
import { StatusBadge, ProjectLinks } from '../components/ProjectBits';
import SectionHeading from '../components/SectionHeading';
import {
  featuredProjects,
  archiveProjects,
  projectCategories,
  type Project,
  type ProjectCategory,
} from '../data/projects';

const loadCaseStudyDialog = () => import('../components/CaseStudyDialog');
const CaseStudyDialog = lazy(loadCaseStudyDialog);

type Filter = 'All' | ProjectCategory;

const caseStudySlugs = new Set([...featuredProjects, ...archiveProjects].filter((p) => p.caseStudy).map((p) => p.slug));

const hashListeners = new Set<() => void>();
function subscribeHash(cb: () => void) {
  hashListeners.add(cb);
  window.addEventListener('hashchange', cb);
  return () => {
    hashListeners.delete(cb);
    window.removeEventListener('hashchange', cb);
  };
}
/** replaceState does not fire hashchange, so tell subscribers ourselves. */
function notifyHash() {
  hashListeners.forEach((cb) => cb());
}

function slugFromHash(): string | null {
  const m = window.location.hash.match(/^#project\/([a-z0-9-]+)$/);
  return m && caseStudySlugs.has(m[1]) ? m[1] : null;
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Filter>('All');
  // Shareable deep links: #project/<slug>. Unknown slugs are ignored. Null while hydrating.
  const openSlug = useSyncExternalStore(subscribeHash, slugFromHash, () => null);

  const openCaseStudy = (slug: string) => {
    window.location.hash = `project/${slug}`;
  };

  const closeCaseStudy = () => {
    if (!slugFromHash()) return;
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    notifyHash();
  };

  const matches = (p: Project) => activeCategory === 'All' || p.categories.includes(activeCategory);
  const featured = featuredProjects.filter(matches);
  const archive = archiveProjects.filter(matches);
  const openProject = [...featuredProjects, ...archiveProjects].find((p) => p.slug === openSlug && p.caseStudy);

  const filters: Filter[] = ['All', ...projectCategories];

  return (
    <section
      id="projects"
      className="w-full py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative overflow-hidden transition-colors duration-200"
    >
      <ThreadGridBackground />

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
                  <div className="os-window-header-accent border-b-[2px] min-h-[42px]">
                    <div className="flex items-center gap-2 text-black min-w-0">
                      <Code size={13} aria-hidden="true" />
                      <span className="truncate">{project.slug}.elf</span>
                    </div>
                    <StatusBadge status={project.status} />
                  </div>

                  {project.image && (
                    <div className="relative h-56 overflow-hidden border-b-[2.5px] border-black">
                      <Picture
                        name={project.image}
                        alt={project.imageAlt ?? `Screenshot of ${project.title}`}
                        sizes="(min-width: 1024px) 600px, 100vw"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col gap-4">
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

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-black/10 flex-wrap gap-3">
                      <ProjectLinks project={project} />
                      {project.caseStudy && (
                        <button
                          type="button"
                          onClick={() => openCaseStudy(project.slug)}
                          onPointerEnter={loadCaseStudyDialog}
                          onFocus={loadCaseStudyDialog}
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

      {openProject && (
        <Suspense fallback={null}>
          <CaseStudyDialog project={openProject} onClose={closeCaseStudy} />
        </Suspense>
      )}
    </section>
  );
}
