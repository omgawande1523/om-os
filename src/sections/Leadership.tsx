import SectionHeading from '../components/SectionHeading';
import { leadership } from '../data/leadership';

const top = leadership.filter((r) => r.featured);

export default function Leadership() {
  return (
    <section id="leadership" aria-labelledby="leadership-title" className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-neo-bg text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        <SectionHeading id="leadership" />

        <ul className="border-t-[2.5px] border-black">
          {top.map((r) => (
            <li key={r.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 py-3 border-b border-black/15">
              <span className="font-display text-sm md:text-base font-bold text-black">{r.role}</span>
              <span className="font-body text-sm text-black/80">{r.org}</span>
              <span className="font-mono text-xs text-black/70 md:ml-auto">{r.period}</span>
            </li>
          ))}
        </ul>

        <details className="group border-[2px] border-black bg-neo-surface">
          <summary className="cursor-pointer select-none px-4 py-2.5 font-mono text-xs font-bold uppercase text-black hover:bg-neo-yellow">
            Show all {leadership.length} roles with details
          </summary>
          <ul className="px-4 pb-4 space-y-5">
            {leadership.map((r) => (
              <li key={r.id} className="pt-4 border-t border-black/15 first:border-t-0">
                <p className="font-display text-sm font-bold text-black">
                  {r.role} <span className="font-body font-normal text-black/80">· {r.org}</span>{' '}
                  <span className="font-mono text-xs font-normal text-black/70">· {r.period}</span>
                </p>
                <ul className="mt-2 space-y-1 font-body text-sm text-black/80">
                  {r.details.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span className="text-black/50" aria-hidden="true">–</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
