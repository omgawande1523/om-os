import { useLayoutEffect, useRef } from 'react';
import { withViewTransition } from '../lib/projectNav';
import { ChevronRight, Terminal, X } from 'lucide-react';
import type { Project } from '../data/projects';
import { StatusBadge, ProjectLinks } from './ProjectBits';

interface Props {
  project: Project;
  onClose: () => void;
}

/** Case study in a native modal <dialog> (focus trap, Escape, focus return). Lazy-loaded. */
export default function CaseStudyDialog({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cs = project.caseStudy;
  // Every close path goes through dialog.close() so the browser returns focus to the opener;
  // the native `close` event then tells the parent.

  // Layout effect so the dialog is open in the same commit (lets a View Transition capture it).
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) withViewTransition(() => dialogRef.current?.close());
      }}
      aria-labelledby="case-study-title"
      className="os-window p-0 max-w-3xl w-[calc(100%-2rem)] max-h-[85vh] bg-neo-surface border-[2.5px] border-black backdrop:bg-black/50"
    >
      {cs && (
        <div className="flex flex-col max-h-[85vh]">
          <div className="os-window-header-accent">
            <div className="flex items-center gap-2 font-mono text-sm text-black min-w-0">
              <Terminal size={14} aria-hidden="true" />
              <span className="truncate">case_study: {project.slug}</span>
            </div>
            <button
              type="button"
              onClick={() => withViewTransition(() => dialogRef.current?.close())}
              aria-label="Close case study"
              className="p-1 border border-black bg-neo-surface hover:bg-black hover:text-neo-bg transition-colors"
            >
              <X size={12} className="text-current" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-neo-surface font-sans text-xs md:text-sm">
            <div className="space-y-2">
              <StatusBadge status={project.status} />
              <h3 id="case-study-title" className="font-display text-2xl font-bold text-black">
                {project.title}
              </h3>
            </div>

            <div className="space-y-2">
              <h4 className="font-mono text-xs font-bold text-black uppercase">Problem</h4>
              <p className="text-black/80 leading-relaxed bg-neo-pink/10 p-4 border border-black/10">
                {cs.problem}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-mono text-xs font-bold text-black uppercase">Approach</h4>
              <ul className="space-y-2 text-black/85">
                {cs.approach.map((step) => (
                  <li key={step} className="flex items-start gap-2">
                    <ChevronRight size={14} className="text-neo-pink shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {cs.results && (
              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold text-black uppercase">Results</h4>
                <ul className="space-y-2 text-black/85 bg-neo-mint/10 p-4 border border-black/10">
                  {cs.results.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            )}

            {cs.limitations && (
              <div className="space-y-2">
                <h4 className="font-mono text-xs font-bold text-black uppercase">Limitations</h4>
                <ul className="space-y-2 text-black/85 bg-neo-orange/10 p-4 border border-black/10">
                  {cs.limitations.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="font-mono text-[10px] text-black/60">
              Source:{' '}
              <a href={cs.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
                project README
              </a>
            </p>
          </div>

          <div className="border-t-[2.5px] border-black bg-black text-neo-bg px-4 py-2.5 font-mono text-[10px]">
            <div className="[&_a]:!bg-neo-surface">
              <ProjectLinks project={project} />
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
