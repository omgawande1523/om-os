import SectionHeading from '../components/SectionHeading';
import { skillGroups } from '../data/skills';

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black">
      <div className="max-w-7xl mx-auto space-y-8">
        <SectionHeading id="skills" />
        {/* Cells sit on a black background; the 2.5px gaps draw the grid lines at every breakpoint. */}
        <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[2.5px] bg-black border-[2.5px] border-black shadow-nb">
          {skillGroups.map((g) => (
            <div key={g.id} className="p-4 md:p-5 space-y-3 bg-neo-surface">
              <dt className="font-mono text-xs font-bold uppercase tracking-wider text-black">{g.title}</dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5">
                  {g.skills.map((s) => (
                    <li key={s} className="font-mono text-[11px] text-black bg-black/5 border border-black/15 px-1.5 py-0.5">
                      {s}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
