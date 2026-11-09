import { lazy, Suspense, useEffect, useId, useState } from 'react';
import { ChevronRight, Lock } from 'lucide-react';
import Picture from '../components/Picture';
import GitHubStrip from '../components/GitHubStrip';
import { StatusBadge, ProjectLinks } from '../components/ProjectBits';
import SectionHeading from '../components/SectionHeading';
import { profile } from '../data/profile';
import { featuredProjects, archiveProjects, statusLabel, type Project } from '../data/projects';
import { closeCaseStudy, EXPAND_PROJECTS_EVENT, openCaseStudy, useOpenCaseStudy } from '../lib/projectNav';

const loadCaseStudyDialog = () => import('../components/CaseStudyDialog');
const CaseStudyDialog = lazy(loadCaseStudyDialog);

/** Rows shown before "Show all". All rows are always in the HTML. */
const LIST_PREVIEW = 6;

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article
      id={`project-${project.slug}`}
      tabIndex={-1}
      aria-labelledby={`project-${project.slug}-title`}
      className="os-window bg-neo-surface flex flex-col"
    >
      <div className="os-window-header-accent border-b-[2px] min-h-[42px]">
        <span className="font-mono text-[11px] font-bold text-black truncate">{project.categories.join(' · ')}</span>
        <StatusBadge status={project.status} />
      </div>

      {project.image && (
        <div className="aspect-video overflow-hidden border-b-[2.5px] border-black bg-white">
          <Picture
            name={project.image}
            alt={project.imageAlt ?? `Screenshot of ${project.title}`}
            sizes="(min-width: 1024px) 600px, 100vw"
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}

      <div className="p-5 md:p-6 flex-1 flex flex-col gap-3">
        <h3 id={`project-${project.slug}-title`} className="font-display text-lg md:text-xl font-bold text-black">
          {project.title}
        </h3>
        <p className="font-body text-sm text-black/80 leading-relaxed">{project.oneLiner}</p>

        {project.facts.length > 0 && (
          <p className="font-mono text-[11px] text-black/80">
            {project.facts.map((f, i) => (
              <span key={f.label}>
                {i > 0 && <span aria-hidden="true"> · </span>}
                <span className="text-black/60">{f.label}:</span> <span className="font-bold text-black">{f.value}</span>
              </span>
            ))}
          </p>
        )}

        <ul className="flex flex-wrap gap-1" aria-label="Stack">
          {project.stack.map((tag) => (
            <li key={tag} className="font-mono text-[10px] bg-neo-blue/20 text-black border border-black/10 px-1.5 py-0.5">
              {tag}
            </li>
          ))}
        </ul>

        {project.codeNote && (
          <p className="flex items-start gap-1.5 font-mono text-[11px] text-black/70">
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
              className="nb-press inline-flex items-center gap-1 font-mono text-xs text-neo-bg bg-black font-bold uppercase px-3 py-1.5 border-[2px] border-black shadow-nb-sm hover:bg-neo-yellow hover:text-black"
            >
              Case study <ChevronRight size={12} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectList() {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();

  // Terminal / palette can ask to reveal a row that is collapsed.
  useEffect(() => {
    const expand = () => setExpanded(true);
    window.addEventListener(EXPAND_PROJECTS_EVENT, expand);
    return () => window.removeEventListener(EXPAND_PROJECTS_EVENT, expand);
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-extrabold text-black uppercase tracking-wide">All projects</h3>
      <ul id={listId} className={`border-t-[2.5px] border-black ${expanded ? '' : 'project-list-collapsed'}`}>
        {archiveProjects.map((p) => (
          <li
            key={p.slug}
            id={`project-${p.slug}`}
            tabIndex={-1}
            className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1.5 py-3 border-b border-black/15"
          >
            <div className="min-w-0 space-y-1">
              <p className="font-display text-sm font-bold text-black">
                {p.title}
                {p.status && <span className="ml-2 font-mono text-[10px] font-semibold text-black/60 uppercase">{statusLabel[p.status]}</span>}
              </p>
              <p className="font-body text-xs text-black/80 leading-relaxed">{p.oneLiner}</p>
              <p className="font-mono text-[10px] text-black/60">{p.stack.slice(0, 5).join(' · ')}</p>
            </div>
            <div className="md:pt-0.5">
              <ProjectLinks project={p} compact />
            </div>
          </li>
        ))}
      </ul>
      {archiveProjects.length > LIST_PREVIEW && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded((v) => !v)}
          className="nb-press font-mono text-xs font-bold uppercase border-[2px] border-black px-3 py-1.5 bg-neo-surface text-black shadow-nb-sm hover:bg-neo-yellow"
        >
          {expanded ? 'Show fewer' : `Show all ${archiveProjects.length}`}
        </button>
      )}
    </div>
  );
}

export default function Work() {
  const openSlug = useOpenCaseStudy();
  const openProject = featuredProjects.concat(archiveProjects).find((p) => p.slug === openSlug && p.caseStudy);

  return (
    <section id="work" aria-labelledby="work-title" className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black relative">
      <div className="max-w-7xl mx-auto relative space-y-10">
        <div className="space-y-4 max-w-3xl">
          <SectionHeading id="work" />
          {profile.aboutParagraphs.map((para) => (
            <p key={para} className="font-body text-base text-black/80 leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {featuredProjects.map((project) => (
            <FeaturedCard key={project.slug} project={project} />
          ))}
        </div>

        <ProjectList />
        <GitHubStrip />
      </div>

      {openProject && (
        <Suspense fallback={null}>
          <CaseStudyDialog project={openProject} onClose={closeCaseStudy} />
        </Suspense>
      )}
    </section>
  );
}
