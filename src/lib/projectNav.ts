// Shared project navigation used by Work, the hero terminal and the command palette.
// Case studies are deep-linkable as #project/<slug>; every project entry has id="project-<slug>".

import { useSyncExternalStore } from 'react';
import { projects } from '../data/projects';

const caseStudySlugs = new Set(projects.filter((p) => p.caseStudy).map((p) => p.slug));

const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener('hashchange', cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('hashchange', cb);
  };
}
/** pushState/replaceState don't fire hashchange, so tell subscribers ourselves. */
function notify() {
  listeners.forEach((cb) => cb());
}

function slugFromHash(): string | null {
  const m = window.location.hash.match(/^#project\/([a-z0-9-]+)$/);
  return m && caseStudySlugs.has(m[1]) ? m[1] : null;
}

/** Slug of the open case study (null while hydrating and when none is open). */
export function useOpenCaseStudy(): string | null {
  return useSyncExternalStore(subscribe, slugFromHash, () => null);
}

export const hasCaseStudy = (slug: string) => caseStudySlugs.has(slug);

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type StartViewTransition = (cb: () => void) => unknown;
/** Native View Transitions when supported and motion is allowed; otherwise a plain update. */
export function withViewTransition(update: () => void) {
  const start = (document as Document & { startViewTransition?: StartViewTransition }).startViewTransition;
  if (typeof start === 'function' && !reduceMotion()) start.call(document, update);
  else update();
}

export function openCaseStudy(slug: string) {
  if (!caseStudySlugs.has(slug)) return;
  window.history.pushState(null, '', `#project/${slug}`);
  notify();
}

export function closeCaseStudy() {
  if (!slugFromHash()) return;
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
  notify();
}

export const EXPAND_PROJECTS_EVENT = 'om:expand-projects';

/** Open the case study if there is one; otherwise scroll to the project's entry (expanding the list if needed). */
export function showProject(slug: string): boolean {
  if (!projects.some((p) => p.slug === slug)) return false;
  if (caseStudySlugs.has(slug)) {
    openCaseStudy(slug);
    return true;
  }
  window.dispatchEvent(new CustomEvent(EXPAND_PROJECTS_EVENT));
  requestAnimationFrame(() => {
    const el = document.getElementById(`project-${slug}`);
    if (!el) return;
    el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'center' });
    el.focus({ preventScroll: true });
  });
  return true;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}
