import { Github, ExternalLink } from 'lucide-react';
import { statusLabel, type Project, type ProjectStatus } from '../data/projects';

const statusClass: Record<ProjectStatus, string> = {
  deployed: 'bg-neo-mint',
  prototype: 'bg-neo-yellow',
  research: 'bg-neo-blue',
  'in progress': 'bg-neo-pink',
};

function repoLabel(url: string) {
  return url.replace('https://github.com/', '');
}

export function StatusBadge({ status }: { status?: ProjectStatus }) {
  if (!status) return null;
  return (
    <span
      className={`inline-block font-mono text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 border border-black text-black ${statusClass[status]}`}
    >
      {statusLabel[status]}
    </span>
  );
}

export function ProjectLinks({ project, compact = false }: { project: Project; compact?: boolean }) {
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

