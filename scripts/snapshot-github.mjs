#!/usr/bin/env node
// Build-time GitHub snapshot → src/data/github.snapshot.json
//
// The site renders this file and makes no GitHub API calls at runtime.
// Runs as `prebuild`. Never fails the build: on network errors it keeps the
// last committed value for each field and exits 0.
//
// Env:
//   GITHUB_TOKEN  optional, raises the REST rate limit (60/h → 5,000/h)
//   GITHUB_USER   optional, defaults to omgawande1523
//
// Only public, non-fork repos are ever written. Results from authenticated
// endpoints can include private repos, so everything is filtered on `private`.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const USER = process.env.GITHUB_USER || 'omgawande1523';
const TOKEN = process.env.GITHUB_TOKEN || '';
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'github.snapshot.json');
const API = 'https://api.github.com';
const TIMEOUT_MS = 15000;

const log = (...a) => console.log('[snapshot-github]', ...a);

async function getJson(url, { auth = true } = {}) {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'om-os-snapshot' };
  if (auth && TOKEN && url.startsWith(API)) headers.Authorization = `Bearer ${TOKEN}`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers, signal: ctrl.signal });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

/** Run `fn`; on failure log and return `fallback`. */
async function attempt(label, fn, fallback) {
  try {
    return await fn();
  } catch (err) {
    log(`${label} failed: ${err instanceof Error ? err.message : err}`);
    return fallback;
  }
}

async function readPrevious() {
  try {
    return JSON.parse(await readFile(OUT, 'utf8'));
  } catch {
    return null;
  }
}

const pickRepo = (r) => ({
  name: r.name,
  description: r.description ?? null,
  homepage: r.homepage || null,
  language: r.language ?? null,
  topics: Array.isArray(r.topics) ? r.topics : [],
  stars: r.stargazers_count ?? 0,
  pushedAt: r.pushed_at,
  url: r.html_url,
});

async function fetchRepos() {
  // Primary: REST list of the user's repos.
  const rest = await attempt(
    'repos (REST)',
    () => getJson(`${API}/users/${USER}/repos?per_page=100&type=owner&sort=pushed`),
    null
  );
  if (Array.isArray(rest)) return rest;
  // Fallback: search API (works where /users/* is blocked).
  const search = await attempt(
    'repos (search)',
    () => getJson(`${API}/search/repositories?q=${encodeURIComponent(`user:${USER} fork:false`)}&per_page=100&sort=updated`),
    null
  );
  return search?.items ?? null;
}

async function fetchLanguages(repos) {
  // Bytes per language via /repos/{r}/languages.
  const totals = {};
  let ok = 0;
  for (const r of repos) {
    const langs = await attempt(`languages ${r.name}`, () => getJson(`${API}/repos/${USER}/${r.name}/languages`), null);
    if (!langs) continue;
    ok++;
    for (const [lang, bytes] of Object.entries(langs)) totals[lang] = (totals[lang] || 0) + bytes;
  }
  if (ok === repos.length && ok > 0) return { method: 'bytes', totals };
  // Fallback: share of repos by primary language (labelled as such in the UI).
  log(`languages: ${ok}/${repos.length} repos answered; falling back to repo count by primary language`);
  const counts = {};
  for (const r of repos) if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
  return { method: 'repo-count', totals: counts };
}

function toShares(totals) {
  const sum = Object.values(totals).reduce((a, b) => a + b, 0);
  if (!sum) return [];
  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 6);
  const other = sorted.slice(6).reduce((a, [, v]) => a + v, 0);
  const rows = top.map(([name, v]) => ({ name, share: v / sum }));
  if (other > 0) rows.push({ name: 'Other', share: other / sum });
  return rows.map((r) => ({ name: r.name, percent: Math.round(r.share * 1000) / 10 }));
}

async function fetchContributions() {
  const data = await getJson(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`, { auth: false });
  const total = data?.total?.lastYear;
  if (typeof total !== 'number' || !Array.isArray(data.contributions)) throw new Error('unexpected shape');
  return {
    lastYear: total,
    days: data.contributions.map((d) => ({ date: d.date, count: d.count, level: d.level })),
  };
}

const firstLine = (msg) => String(msg || '').split('\n')[0].slice(0, 120);

async function fetchRecentPushes(publicNames) {
  const isPublic = (fullName) => publicNames.has(fullName.split('/')[1]);
  const events = await attempt('events (REST)', () => getJson(`${API}/users/${USER}/events/public?per_page=50`), null);
  if (Array.isArray(events)) {
    const pushes = events
      .filter((e) => e.type === 'PushEvent' && e.public && isPublic(e.repo.name))
      .map((e) => {
        const commits = e.payload?.commits ?? [];
        const last = commits[commits.length - 1];
        return { repo: e.repo.name, message: firstLine(last?.message ?? ''), date: e.created_at };
      })
      .filter((p) => p.message);
    if (pushes.length) return pushes.slice(0, 5);
  }
  // Fallback: commit search, public repos only.
  const search = await getJson(
    `${API}/search/commits?q=${encodeURIComponent(`author:${USER}`)}&sort=author-date&order=desc&per_page=50`
  );
  return (search.items ?? [])
    .filter((c) => c.repository && !c.repository.private && isPublic(c.repository.full_name))
    .map((c) => ({ repo: c.repository.full_name, message: firstLine(c.commit.message), date: c.commit.author.date }))
    .slice(0, 5);
}

async function main() {
  const prev = await readPrevious();
  const rawRepos = await fetchRepos();

  if (!rawRepos) {
    log(prev ? 'GitHub unreachable; keeping the last committed snapshot.' : 'GitHub unreachable and no snapshot exists yet.');
    return;
  }

  const repos = rawRepos.filter((r) => !r.fork && !r.private).map(pickRepo);
  repos.sort((a, b) => String(b.pushedAt).localeCompare(String(a.pushedAt)));
  const publicNames = new Set(repos.map((r) => r.name));

  const profile = await attempt('profile', () => getJson(`${API}/users/${USER}`), null);
  const languages = await attempt('languages', () => fetchLanguages(repos), null);
  const contributions = await attempt('contributions', fetchContributions, null);
  const recentPushes = await attempt('recent pushes', () => fetchRecentPushes(publicNames), null);

  const snapshot = {
    generatedAt: new Date().toISOString(),
    user: USER,
    profileUrl: `https://github.com/${USER}`,
    publicRepos: profile?.public_repos ?? repos.length,
    followers: profile ? profile.followers : (prev?.followers ?? null),
    totalStars: repos.reduce((a, r) => a + r.stars, 0),
    languages: languages
      ? { method: languages.method, items: toShares(languages.totals) }
      : (prev?.languages ?? { method: 'none', items: [] }),
    contributions: contributions ?? prev?.contributions ?? null,
    recentPushes: recentPushes ?? prev?.recentPushes ?? [],
    repos,
  };

  await writeFile(OUT, JSON.stringify(snapshot, null, 2) + '\n');
  log(
    `wrote ${path.relative(process.cwd(), OUT)}: ${snapshot.publicRepos} public repos, ` +
      `followers=${snapshot.followers ?? '—'}, contributions=${snapshot.contributions?.lastYear ?? '—'}, ` +
      `languages=${snapshot.languages.method}, pushes=${snapshot.recentPushes.length}`
  );
}

main().catch((err) => {
  // Never break the build.
  log(`unexpected error, keeping existing snapshot: ${err instanceof Error ? err.stack : err}`);
  process.exitCode = 0;
});
