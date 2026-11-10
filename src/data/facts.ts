// Derived, never typed: the hero fact line and the "Now:" items come from the other data files.
import { education, experience } from './experience';
import { forumRoleShort } from './leadership';
import { projects } from './projects';

const mrsac = experience[0];

/** At most three facts. */
export const heroFacts = [`${mrsac.shortTitle} @ ${mrsac.shortOrg}`, `CGPA ${education.cgpa.split(' ')[0]}`, forumRoleShort];

/** In-progress projects with a short label. */
export const nowProjects = projects.filter((p) => p.status === 'in progress' && p.shortTitle);
