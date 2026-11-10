// Typed access to the build-time GitHub snapshot (scripts/snapshot-github.mjs).
// The site never calls the GitHub API at runtime.
import raw from '../data/github.snapshot.json';

export interface SnapshotRepo {
  name: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  pushedAt: string;
  url: string;
}

export interface SnapshotLanguage {
  name: string;
  percent: number;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface GitHubSnapshot {
  generatedAt: string;
  user: string;
  profileUrl: string;
  publicRepos: number;
  followers: number | null;
  totalStars: number;
  languages: { method: 'bytes' | 'repo-count' | 'none'; items: SnapshotLanguage[] };
  contributions: { lastYear: number; days: ContributionDay[] } | null;
  recentPushes: { repo: string; message: string; date: string }[];
  repos: SnapshotRepo[];
}

export const github = raw as GitHubSnapshot;

export const languageMethodLabel: Record<GitHubSnapshot['languages']['method'], string> = {
  bytes: 'share of code by bytes across public repos',
  'repo-count': 'share of public repos by primary language',
  none: 'not available',
};

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

/** "—" for missing values. */
export function display(value: number | null | undefined): string {
  return value === null || value === undefined ? '—' : String(value);
}
