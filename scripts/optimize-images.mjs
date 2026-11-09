#!/usr/bin/env node
// Converts source images in assets-src/images/ to AVIF + WebP under public/,
// within a byte budget, and writes src/data/images.generated.json
// (width/height/paths) for the <Picture> component.
//
// Usage: npm run optimize-images   (outputs are committed; run again after changing a source)

import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'assets-src', 'images');
const PUBLIC = path.join(ROOT, 'public');
const MANIFEST = path.join(ROOT, 'src', 'data', 'images.generated.json');

const KB = 1024;

/** key → source file, output path (without extension, relative to public/), max width, byte budget. */
const IMAGES = {
  portrait: { src: 'om-gawande-photo.jpg', out: 'img/om-gawande-portrait', maxWidth: 640, budget: 60 * KB },
  resumePreview: { src: 'Om_Gawande_Resume_preview.jpg', out: 'Om_Gawande_Resume_preview', maxWidth: 800, budget: 100 * KB },
  mrsacOverview: { src: 'mrsac-flood-overview.png', out: 'img/mrsac-flood-overview', maxWidth: 1200, budget: 120 * KB },
};

async function encodeWithinBudget(input, format, width, budget) {
  for (let quality = 80; quality >= 25; quality -= 5) {
    const pipeline = sharp(input).resize({ width, withoutEnlargement: true });
    const buf =
      format === 'avif'
        ? await pipeline.avif({ quality, effort: 6 }).toBuffer()
        : await pipeline.webp({ quality, effort: 6 }).toBuffer();
    if (buf.length <= budget) return { buf, quality };
  }
  return null;
}

async function main() {
  const manifest = {};
  for (const [key, cfg] of Object.entries(IMAGES)) {
    const input = path.join(SRC, cfg.src);
    await stat(input);
    let width = Math.min(cfg.maxWidth, (await sharp(input).metadata()).width ?? cfg.maxWidth);
    let avif;
    let webp;
    // Shrink width by 10 % steps if quality alone cannot meet the budget.
    while (width >= 200) {
      avif = await encodeWithinBudget(input, 'avif', width, cfg.budget);
      webp = await encodeWithinBudget(input, 'webp', width, cfg.budget);
      if (avif && webp) break;
      width = Math.round(width * 0.9);
    }
    if (!avif || !webp) throw new Error(`${cfg.src}: cannot meet ${cfg.budget / KB} KB budget`);

    const outBase = path.join(PUBLIC, cfg.out);
    await mkdir(path.dirname(outBase), { recursive: true });
    await writeFile(`${outBase}.avif`, avif.buf);
    await writeFile(`${outBase}.webp`, webp.buf);
    const meta = await sharp(webp.buf).metadata();
    manifest[key] = {
      width: meta.width,
      height: meta.height,
      avif: `/${cfg.out}.avif`,
      webp: `/${cfg.out}.webp`,
    };
    console.log(
      `${cfg.src.padEnd(32)} → ${meta.width}×${meta.height}  avif ${(avif.buf.length / KB).toFixed(1)} KB (q${avif.quality})  webp ${(webp.buf.length / KB).toFixed(1)} KB (q${webp.quality})  budget ${cfg.budget / KB} KB`
    );
  }
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
