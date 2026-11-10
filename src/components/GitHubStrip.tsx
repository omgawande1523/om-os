import { ArrowUpRight } from 'lucide-react';
import { github, formatDate } from '../lib/github';

const levelClass = [
  'bg-black/5 dark:bg-white/5',
  'bg-emerald-200 dark:bg-emerald-900/50',
  'bg-emerald-400 dark:bg-emerald-700',
  'bg-emerald-600 dark:bg-emerald-500',
  'bg-emerald-800 dark:bg-emerald-300',
];

type Day = { date: string; count: number; level: number } | null;

// Group the snapshot's days into week columns (Sunday first).
const weeks: Day[][] = [];
if (github.contributions) {
  const days = github.contributions.days;
  const firstDow = days.length ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0;
  let week: Day[] = Array.from({ length: firstDow }, () => null);
  for (const d of days) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push([...week, ...Array.from({ length: 7 - week.length }, () => null)]);
}

const snapshotDate = formatDate(github.generatedAt);

/** Weeks kept on narrow screens (< 640 px), most recent last. */
const MOBILE_WEEKS = 26;

/** One strip: contribution calendar + count + snapshot date + profile link. */
export default function GitHubStrip() {
  if (!github.contributions) return null;
  const total = github.contributions.lastYear;
  const firstRecent = weeks.length - MOBILE_WEEKS;

  return (
    <div className="os-window bg-neo-surface p-4 md:p-5 space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-xs">
        <p className="font-bold text-black">
          {total} contributions in the last year <span className="font-normal text-black/70">· snapshot {snapshotDate}</span>
          <span className="sm:hidden font-normal text-black/70"> · last {MOBILE_WEEKS} weeks shown</span>
        </p>
        <a
          href={github.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-bold text-black underline decoration-2 underline-offset-2 hover:bg-neo-yellow"
        >
          Full profile <ArrowUpRight size={12} aria-hidden="true" />
        </a>
      </div>
      {/* Cells scale with the container (CSS grid + aspect-ratio): no scrollbar at any width. */}
      <div
        className="gh-cal"
        style={{ '--gh-weeks': weeks.length, '--gh-weeks-mobile': MOBILE_WEEKS } as React.CSSProperties}
        role="img"
        aria-label={`GitHub contribution calendar: ${total} contributions in the year to ${snapshotDate}`}
      >
        {weeks.map((week, wi) => (
          <div key={wi} className={`gh-week${wi < firstRecent ? ' gh-week-old' : ''}`}>
            {week.map((day, di) =>
              day ? (
                <div key={day.date} title={`${day.date}: ${day.count}`} className={`gh-day ${levelClass[Math.min(day.level, 4)]}`} />
              ) : (
                <div key={`e${di}`} className="gh-day" />
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
