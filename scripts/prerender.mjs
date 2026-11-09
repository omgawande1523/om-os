#!/usr/bin/env node
// Writes the real page HTML into dist/index.html so crawlers, link unfurlers and
// no-JS visitors get the content. Runs after `vite build` and the SSR build of
// src/entry-server.tsx (into dist-ssr/). The client then hydrates it.

import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const INDEX = path.join(ROOT, 'dist', 'index.html');
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');

const { render, personJsonLd } = await import(pathToFileURL(SSR_ENTRY).href);

const template = await readFile(INDEX, 'utf8');
if (!template.includes('<!--app-html-->')) throw new Error('dist/index.html has no <!--app-html--> placeholder');

const appHtml = await render();
const jsonLd = `<script type="application/ld+json">${personJsonLd().replace(/</g, '\\u003c')}</script>`;

const html = template.replace('<!--app-html-->', appHtml).replace('<!--person-jsonld-->', jsonLd);
await writeFile(INDEX, html);
await rm(path.join(ROOT, 'dist-ssr'), { recursive: true, force: true });

const text = appHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
console.log(`[prerender] dist/index.html: ${(html.length / 1024).toFixed(1)} KB, ~${text.split(' ').length} words of content`);
