#!/usr/bin/env node
// Checks every outbound link defined in src/data/ (repos, live demos, README sources,
// profile links, credentials). Exit code 1 if any link is broken.
//
//   npm run check-links
//
// GitHub repo URLs are checked through the REST API (`/repos/{owner}/{repo}`), falling
// back to the search API and then the HTML page, so private/missing repos show up as 404.
// LinkedIn answers bots with HTTP 999; that is reported as "unverifiable", not broken.

import { projects } from '../src/data/projects.ts';
import { profile } from '../src/data/profile.ts';
import { certifications } from '../src/data/certifications.ts';

const TOKEN = process.env.GITHUB_TOKEN || '';
const UA = 'Mozilla/5.0 (compatible; om-os-link-check/1.0)';

const links = new Map(); // url -> where it is used
const add = (url, where) => {
  if (!url) return;
  const key = url.replace(/#.*$/, '');
  if (!links.has(key)) links.set(key, new Set());
  links.get(key).add(where);
};

for (const p of projects) {
  p.repoUrls.forEach((u) => add(u, `project:${p.slug}`));
  add(p.liveUrl, `project:${p.slug} (live)`);
  add(p.caseStudy?.sourceUrl, `project:${p.slug} (case study source)`);
}
Object.entries(profile.links).forEach(([k, u]) => add(u, `profile.${k}`));
add(profile.siteUrl, 'profile.siteUrl');
certifications.forEach((c) => add(c.credentialUrl, `certification:${c.id}`));

async function status(url, init = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(url, { redirect: 'follow', signal: ctrl.signal, ...init, headers: { 'User-Agent': UA, ...(init.headers || {}) } });
    return res.status;
  } catch (e) {
    return `ERR ${e.cause?.code || e.message}`;
  } finally {
    clearTimeout(t);
  }
}

async function checkGithubRepo(owner, repo) {
  const api = { Accept: 'application/vnd.github+json', ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}) };
  const viaApi = await status(`https://api.github.com/repos/${owner}/${repo}`, { headers: api });
  if (viaApi === 200 || viaApi === 404) return { code: viaApi, via: 'api' };
  // Fallback for restricted environments: the search API only returns repos visible to the caller.
  const q = encodeURIComponent(`repo:${owner}/${repo}`);
  const res = await fetch(`https://api.github.com/search/repositories?q=${q}`, { headers: { ...api, 'User-Agent': UA } }).catch(() => null);
  if (res?.ok) {
    const json = await res.json();
    const hit = json.items?.find((r) => r.full_name.toLowerCase() === `${owner}/${repo}`.toLowerCase() && !r.private);
    return { code: hit ? 200 : 404, via: 'search' };
  }
  return { code: await status(`https://github.com/${owner}/${repo}`), via: 'html' };
}

async function checkGithubUser(user) {
  const api = { Accept: 'application/vnd.github+json', ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}) };
  const viaApi = await status(`https://api.github.com/users/${user}`, { headers: api });
  if (viaApi === 200 || viaApi === 404) return { code: viaApi, via: 'api' };
  const res = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(`user:${user}`)}`, { headers: { ...api, 'User-Agent': UA } }).catch(() => null);
  if (res?.ok) {
    const json = await res.json();
    return { code: json.items?.some((u) => u.login.toLowerCase() === user.toLowerCase()) ? 200 : 404, via: 'search' };
  }
  return { code: await status(`https://github.com/${user}`), via: 'html' };
}

const results = [];
for (const [url, where] of links) {
  const gh = url.match(/^https:\/\/github\.com\/([^/]+)\/([^/#?]+)\/?$/);
  let code;
  let via = 'http';
  const ghUser = url.match(/^https:\/\/github\.com\/([^/#?]+)\/?$/);
  if (gh) ({ code, via } = await checkGithubRepo(gh[1], gh[2]));
  else if (ghUser) ({ code, via } = await checkGithubUser(ghUser[1]));
  else {
    code = await status(url, { method: 'HEAD' });
    if (code !== 200) code = await status(url); // some hosts reject HEAD
  }
  const verdict = code === 200 ? 'OK' : code === 999 ? 'UNVERIFIABLE' : 'BROKEN';
  results.push({ verdict, code, via, url, where: [...where].join(', ') });
}

const pad = (s, n) => String(s).padEnd(n);
for (const r of results.sort((a, b) => a.verdict.localeCompare(b.verdict) || a.url.localeCompare(b.url))) {
  console.log(`${pad(r.verdict, 13)} ${pad(r.code, 4)} ${pad(r.via, 6)} ${r.url}  [${r.where}]`);
}
const broken = results.filter((r) => r.verdict === 'BROKEN');
console.log(`\n${results.length} links: ${results.filter((r) => r.verdict === 'OK').length} OK, ${broken.length} broken, ${results.filter((r) => r.verdict === 'UNVERIFIABLE').length} unverifiable`);
process.exitCode = broken.length ? 1 : 0;
