# OM_OS audit (Phase 0)

Audited on 2026-11-09 against branch `claude/om-os-portfolio-overhaul-ueks9n` (same tree as `main` @ `9e8ee41`),
the live site https://om-os.vercel.app/, the GitHub search API, and raw READMEs from `raw.githubusercontent.com`.

Legend: ✅ confirmed as briefed · ✏️ confirmed, details/line numbers corrected · ➕ new finding not in the brief

---

## 0. Baseline

| Check | Result |
|---|---|
| `npm run build` | ✅ passes. One JS chunk: **1,178 KB raw / 337 KB gzip**; CSS 108 KB / 17 KB gzip. Vite warns about chunk > 500 KB. |
| `npm run lint` | ➕ **fails: 10 errors, 10 warnings.** Errors: `src/lib/github.ts` (3× `any`, 2 unused `e`, empty block), `src/sections/Projects.tsx` L47/L62 (`any`), L565 (useless escape), `src/components/CustomCursor.tsx` L187 (`prefer-const`). Warnings are mostly in unused `src/components/ui/*`. Lint was already red before this work, so Phase 1 has to fix it before the first commit. |
| Live JS bundle | Same hash as the local build (`index-PyMWb4i9.js`). Contains **819 `code-path` attributes**. |
| Live headers | `/assets/*` served with `cache-control: public, max-age=0, must-revalidate`, so hashed assets are never cached long-term. No security headers. |
| `robots.txt`, `sitemap.xml` | Both **404** on the live site. |

## 1. Build / config

- ✏️ `vite.config.ts` L4, L9: `inspectAttr()` from `kimi-plugin-inspect-react` runs in every build. The attributes are compiled into the JS (`{"code-path":"src/components/Header.tsx:57:5", ...}`) and end up in the **rendered DOM**. The static `dist/index.html` has none, because `#root` is empty (see §7).
- ✅ `vite.config.ts` L8: `base: './'` turns `og:image` into `./og-image.png` in `dist/index.html`, and scripts/CSS become `./assets/...`. Crawlers need an absolute `og:image` URL.
- ➕ `public/og-image.png` is **already 1200×630**, so it only needs an absolute URL, not a new image.
- ✅ `package.json` L2: name is `my-app`.
- ✏️ `src/components/ui/`: **53 files, none imported** anywhere outside `ui/`. ➕ `src/hooks/use-mobile.ts` is also unused, and `components.json` (shadcn config) exists only for those files.
- ✅ Unused deps (no import outside `ui/`): all 27 `@radix-ui/*` (including `react-dialog`, which Phase 2 can reuse), `recharts`, `react-day-picker`, `date-fns`, `cmdk`, `embla-carousel-react`, `vaul`, `input-otp`, `react-hook-form`, `@hookform/resolvers`, `zod`, `sonner`, `next-themes`, `react-resizable-panels`, `class-variance-authority`. ➕ Also `tailwindcss-animate` **and** `tw-animate-css` are both installed. `tailwind.config.js` L109 uses `tailwindcss-animate`, so `tw-animate-css` is unused.
- ✅ `@types/three` is in `dependencies` (L39).
- ✅ `react-router` (`src/main.tsx`, `src/App.tsx`) serves one route (`/` and `*` both render `Home`).
- ✅ `info.md` is generator scaffolding ("Setup complete: /mnt/agents/output/app"). `README.md` is the Vite template.
- ✅ `index.html` L18 loads **Playfair Display** (plus Inter 300–700 and JetBrains Mono 400/500). `tailwind.config.js` L7-10 defines only JetBrains Mono (`display`, `mono`) and Inter (`body`). ➕ `font-display` maps to JetBrains Mono, so Playfair is never used.
- ➕ `src/App.css` contains a single comment line, so it can be deleted.
- ➕ `.gitignore` covers `*.local` but not `.env` / `.env.production`.

## 2. Broken / misleading behaviour

### Home / boot / cursor
- ✅ `src/pages/Home.tsx` L36-60: the boot loader returns early. It steps a random 0–15% every 100 ms, then waits 500 ms more, so **nothing is in the DOM for ~1–2 s**. The loader contains an `<h1>` (L40).
- ✅ `Home.tsx` L63: `cursor-none` on the root. ✏️ `src/index.css` **L364-370**: `.custom-cursor { cursor:none }` and `.cursor-none * { cursor: none !important }`.
- ➕ `src/components/CustomCursor.tsx` L39 disables itself on touch or `< 768px`, but the native cursor is hidden on every element anyway, and there is no reduced-motion check.

### Contact form
- ✏️ `src/sections/Footer.tsx` **L80-85** `handleSubmit`: `preventDefault`, set "sent" for 3 s, clear fields. **No message is delivered.**
- ➕ Labels (e.g. L138) have no `htmlFor`/`id` association with their inputs.

### GitHub data (`src/lib/github.ts`)
- ✅ L270 `contributions: 46` hardcoded. L268-269 `starsCount || 2`, `followers || 5`. ➕ Real total stars across public repos is **0**, so the site shows a made-up "2".
- ✅ `FALLBACK_REPOS` L21-162 has invented descriptions (Waste-Management "decentralized waste logistics", Urdu, AgroSense, Bot-Detector, cyber-threat, earth-science-agi, MathGPT…). It also has a fake `lan-agentic-rag` entry (L33-41). `FALLBACK_DATA` L164-176 has a made-up language split.
- ✅ Called independently from `Projects.tsx` L525 and `GitHubStats.tsx` L37. ✏️ There *is* a 1-hour `localStorage` cache (L178-204), but both components mount at the same time with a cold cache. Each endpoint is therefore fetched twice and unauthenticated on first visit, and nothing dedupes in-flight requests.
- ➕ Language % is computed **by repo count**, not bytes (L235-264).
- ➕ `localStorage` reads/writes are not wrapped in try/catch (throws in some private modes). The same applies in `ThemeProvider.tsx` L15/L32.

### `src/sections/GitHubStats.tsx`
- ✏️ Second hardcoded fallback **L47-59** (15 repos, 46 contributions, 2 stars, 5 followers, invented language %). Third fallback **L74-79** (fake `topRepos`, including "YOLO waste classifier source script", lang `JavaScript`).
- ✅ L63 filler "Verified repository published on omgawande1523 GitHub profile."
- ✏️ Hardcoded commits: L353-354 "feat: optimized liveness detection inference loop · AegisEdge · 2 days ago" and L360-361 "refactor: optimized GIS map snap snappers logic… · routeiq-enterprise · 5 days ago".
- ➕ **L9-20: the contribution calendar is generated with `Math.random()`.** It is a fake heatmap that changes on every page load.
- ➕ L84-90: fake terminal output "Hi omgawande1523! You have successfully authenticated…". L245 "CONNECTED: GITHUB_API_SYNC". L138 label "CONTRIBUTIONS_2026".
- ➕ L310 `min-w-[340px]` contribution row and the terminal panel are horizontal-scroll suspects at 360 px. The terminal `<input>` (L394) has no label.
- Real numbers: **34 public repos** ✅ (confirmed via search API), **0 stars**, 6 of 34 with a description, 13 with a homepage, 0 with topics. *610 contributions / 2 followers*: I can't check these from this sandbox (see §9). Taken from the brief.

### `src/sections/Projects.tsx` (1,049 lines)
- ✏️ **L535-560** injects `lan-agentic-rag` and `Kolhapur-Digital-Twin` when the API doesn't return them. ➕ `lan-agentic-rag` exists **neither as a public nor as a private repo** under `omgawande1523` (checked against all 44 repos via the authenticated search API). Private repos that might be this project: `College-Assistant`, `College-Assistant-Main` (both Python). **Question for Om.**
- ✅ `PROJECT_DETAILS_MAP` L56-515: `kolhapur-digital-twin` (L69) and `krishna-river-flood` (L108) are identical, which produces duplicate cards.
- ✅ Unsourced metrics. I grepped every public README for them and **none appear**: AadhaarX L269-271 (99.8%, 120 ms, and ➕ "AES-256": that string only appears in the *AegisEdge* README as AES-256-GCM), AegisEdge L306-308, routeiq L343-345, cyber-threat L379-380, bot-detector L414-415, MathGPT L450-452, earth-science-agi L487-489. Several case-study `results` strings repeat the same numbers (e.g. L511 "1.5 TB … 89.6%").
- ➕ Case studies for AadhaarX, AegisEdge, routeiq, cyber-threat, bot-detector, MathGPT and earth-science-agi also contain invented "challenges/results" narratives (e.g. L436 bot-detector "reverse-DNS checks"). These need the same README check.
- ✏️ `defaultCaseStudy` **L574-595** ("Ran tests to verify module execution logs", "System builds successfully and behaves according to design specs").
- ✅ L610 filler "Verified open-source software repository…". ➕ L604 every unmapped repo gets the stock `/ai-cv-visual.jpg`.
- ➕ The MRSAC flood card uses `/earth-science-agi.png` (L75, L114), which is a screenshot of a *different* project. LAN-RAG and Sarcasm use the stock `ai-cv-visual.jpg`.
- ➕ **10 entries are `isFeatured: true`**, not ≤ 6.
- ✏️ Name dedupe at **L563-569** only strips trailing `._0-9`. It merges the three `Automatic-waste-segregation-*` names but keeps `omgawande1523`, `om-os`, `New-Pro`, `SIH-NEW`, `Apache-Spark`, `AegisEdge`+`AegisEdge-Offline` (identical READMEs), `ADHYAYAN`+`Adhyayan-Simulation` (different READMEs), `gyrotex-social`, `Neonatal`, etc. Which waste repo survives depends on API order.
- ✅ L651-653 `ElasticThreadGrid` behind the whole section. ➕ `ElasticThreadGrid.tsx` runs `requestAnimationFrame` forever (L110), with no IntersectionObserver and no reduced-motion or pointer check. three.js + meshline are in the main chunk.
- ✏️ Cards are `div onClick` at **L716-718** (featured) and **L811-813** (archive). The modal overlay is at **L858-868** with no `role="dialog"`, `aria-modal`, focus trap, Escape or focus return. Category filters at L663 are `hidden md:flex` with a separate mobile copy.
- ➕ Framer Motion is used only here and in `ImpactDashboard.tsx`. GSAP is used in 10 files.

### `src/components/Header.tsx`
- ✅ L6-12: `⌘A ⌘S ⌘E ⌘P ⌘C` shortcut labels with no handlers. ➕ The nav lists only 5 sections (About, Skills, Experience, Projects, Contact).
- ✏️ The theme toggle (L141-152) has only a `title`, which works as a weak accessible-name fallback. The mobile menu button (**L167-172**) has no accessible name and no `aria-expanded`. The mobile social icons (L193-219) have no name at all. The desktop ones only have `title`.
- ➕ L60 `style={{ opacity: 0 }}` until GSAP runs. The header is invisible if JS is slow or fails.

### `src/sections/ResumeViewer.tsx`
- ✅ L72 "SHA256: VERIFIED_SIGNED". L105 "78.2 KB" (actual PDF is **86.0 KB / 88,066 B**). L113 "Aug 2026" (PDF metadata says **2026-09-10**). L121-122 and L130 link to `/Resume Updated.pdf`. L80 uses `/Resume_Updated_preview.jpg`. `public/Om_Gawande_Resume.pdf` is unused.
- ➕ L99 "Download my full, verified resume containing … project impact metrics…".

### Fake verification wording
- ✅ `Certifications.tsx` L119 "ALL_SIGNATURES_VALID", L157 "STATUS: ACTIVE_VERIFIED". ➕ L205 "verified_log".
- ✅ `Skills.tsx` L231 "VERIFIED DIAGNOSTIC MODULES". `Hero.tsx` L44 "Verified Public Repos".
- ➕ `Hero.tsx` L66-68 "SYS_STATUS: ACTIVE / BAUD_RATE: 115200 / SECURE" is decorative. It's fine to keep in the OS theme, but "SECURE" reads like a claim.
- ➕ `Leadership.tsx` L40 "verified target API access keys".

## 3. Content

- ✅ Inconsistent counts: `Hero.tsx` L43 "15+ Built", L44 "20+ Repos". `About.tsx` L40 "15+". `ImpactDashboard.tsx` L79/L83 "15+ repositories". Real count is 34 public.
- Claims **not on the resume** (resume text extracted from `public/Om_Gawande_Resume.pdf`):
  - ✅ `ImpactDashboard.tsx` L79 "maintaining specialized camera packages, custom PyTorch templates, and CLI dataset annotators".
  - ✅ `Leadership.tsx` L17 "Mentored 50+ junior engineering students".
  - ✅ `ImpactDashboard.tsx` L59 / `Leadership.tsx` L39-40 "200+ competitors", "Configured server compute slots…".
  - ✅ `Leadership.tsx` L64-65 "Host weekend code reviews", "Organize technical visits…". L29 "improved laboratory compute hour allocations". `ImpactDashboard.tsx` L19 "Optimized compute allocation hours".
  - ➕ "150+ active participants/members" (`Leadership.tsx` L15, `ImpactDashboard.tsx` L9/L13). "70+ students" (`Leadership.tsx` L28, `ImpactDashboard.tsx` L19). "Evaluated 40+ competitor submissions" (`Leadership.tsx` L53). "Maintained uptime of assessment web app" (L41).
  - ➕ The **Dataventics GenAI Hackathon Lead** and **AI Verse Organizer** roles are not on the resume. The "Community Builder" and "Technical Leader" roles (`Leadership.tsx` L58-80) are generic and unsourced ("establishing coding styles and lint rules", "quantization").
  - ➕ Class Representative: the resume says **"2023–Present"**. The site says "2023 - 2026 (3 Consecutive Years)" (`Leadership.tsx` L25) and "Elected for 3 consecutive years" (`ImpactDashboard.tsx` L19).
  - ➕ Certification issuers not on the resume: "NPTEL (IIT Kharagpur)", "Cloud Data Academy", "National Faculty Development Program" (`Certifications.tsx` L22/L31/L40).
- ➕ **Date conflicts in Experience.** The resume gives **no dates** for Acube AI or RNR. `Experience.tsx` L34 says Acube "Feb 2025 - Present" and L48 says RNR "Nov 2024 - Jan 2025". The brief says Acube "Jun 2026" and RNR "Jun–Nov". The resume calls the company "RNR", while the code's id/file name and the brief say "RNR Innotech". **Question for Om.**
- ✅ Repetition: the Hero bio (`Hero.tsx` L107) ≈ the About bio (`About.tsx` L141-144), and both ≈ the resume summary. President / CR / three internships / hackathon repeat across the Hero metric strip (L37-46), `ImpactDashboard`, `Leadership`, About and Experience.
- ✅ Section labels are hardcoded and out of order (render order from `Home.tsx` L66-78): ImpactDashboard **02** (L118), Projects **03** (L659), Leadership **04** (L121), About **05** (L81), Skills **06** (L120), GitHubStats **08** (L214), Experience **09** (L120), ResumeViewer **05** (L43), Certifications **06** (L87), Footer **08** (L96). There is no 01 or 07.
- ✅ Two `<h1>` (`Home.tsx` L40 boot screen, `Hero.tsx` L61) and zero `<h2>` in any section. ➕ The Hero `<h1>` text is "OM GAWANDE // SYSTEM MAIN_CONSOLE //".
- ✅ Missing: Publications, ORCID, Google Scholar slot. Education exists only as a file inside the Experience file tree (`Experience.tsx` L58-74). ➕ The resume lists **no publications**, so all six papers in the brief are unsourced until you confirm status/venue.
- ➕ Skills (`Skills.tsx` L25) list only Python and SQL as languages, with nothing from TypeScript/React even though about a third of the public repos are TS/JS. There is no C/C++ (good).
- ➕ Your phone number (+91 80101 73681) is shown in Header (L132, L216) and Footer (L43). Please confirm you want it public on the site (it's on the resume too).

## 4. Repos and links (checked 2026-11-09)

- 34 public + 10 private repos. Snapshot/UI code must **filter `private: true`** so private repo names never leak.
- Live demos returning **200**: krishna-river-flood, automatic-waste-segregation-with-co, major-project-simulation, math-gpt-frontend-two, urdu-violence-detection-ai, waste-sorting-simulation, clone-detector, adhyayan-simulation, sih-new-ten, apache-spark-rose, orcid.org/0009-0004-8574-9084.
- ➕ **404**: `earth-science-agi.vercel.app` (it's the repo's homepage) and `shri-gajanan-dental-clinic.vercel.app`.
- LinkedIn returns 999 (bot wall). `check-links` has to treat that as "unverifiable", not "broken".
- READMEs: `Bot-Detector` is 14 bytes (title only; the repo is size 0) → exclude. ✏️ `Waste-Management` has a **real 4 KB README** (a paper-style abstract, co-author Palak Khonde, April 2026), so it is not empty. `PPE`, `Major-Project-Simulation`, `Automatic-waste-segregation-with-computer-vision.` and `_01` have **no README**, so they get no case study. `AegisEdge` and `AegisEdge-Offline` READMEs are byte-identical.
- `Automatic-waste-segregation-with-computer-vision` description is the broken "Objectives Create a system that uses image recognition…".

## 5. Assets (`public/`, 6.8 MB on disk)

- ✅ PNG screenshots of 640–820 KB each: `aadhaarx.png` 815 KB, `aegisedge.png` 678 KB, `earth-science-agi.png` 821 KB, `mathgpt.png` 740 KB, `routeiq.png` 713 KB, `waste-segregation.png` 643 KB. Portrait `om-gawande-photo.jpg` 305 KB.
- ✅ The same 591 KB resume preview exists 3× (md5-identical): `Om_Gawande_Resume_preview.jpg`, `Resume_Updated_preview.jpg`, `om-gawande-resume-preview.jpg`. The resume PDF exists 3× (md5-identical): `public/Om_Gawande_Resume.pdf`, `public/Resume Updated.pdf`, `PDF/Resume Updated.pdf`.
- ✅ Unreferenced: `brainybees-bg.jpg`, `hero-portrait.jpg`, `jarvis-bg.jpg`, `medical-scribe-bg.jpg`, `waste-classifier-bg.jpg`, plus the two unused preview duplicates and `Om_Gawande_Resume.pdf` (unused today; it becomes canonical).
- ✅ No `robots.txt` or `sitemap.xml`.

## 6. Performance / motion / a11y extras

- ➕ **No `prefers-reduced-motion` handling anywhere** (GSAP reveals in 10 files, the Footer marquee `animate-marquee` at L255, the spinning Hero icon at L60, CustomCursor, ElasticThreadGrid).
- ➕ Many sections start at `style={{ opacity: 0 }}` and depend on ScrollTrigger to show. Content is invisible without JS or if a trigger misfires.
- ➕ No skip link, no visible custom focus style, and the marquee isn't `aria-hidden`.
- ➕ No pre-paint theme script, so dark-mode users may see a light flash.

## 7. SEO

- ✅ `index.html` has a relative `og:image` (`/og-image.png` → `./og-image.png` after build), no `og:url`, `og:site_name`, `twitter:title/description`, canonical, `theme-color` or JSON-LD.
- ➕ `<div id="root"></div>` is empty, so crawlers and link unfurlers without JS see only the `<title>`/meta.

## 8. Things in the brief I'd adjust

- `PDF/` is a top-level folder, not inside `public/`. It is still a duplicate and is pre-approved for deletion.
- `@radix-ui/react-dialog` is installed but unused today. Using it for the modal means keeping one Radix package and its peer deps. The alternative is a native `<dialog>` with zero deps. I'd recommend native `<dialog>`, decided in Phase 2.
- Standardise on **GSAP** (10 files vs 2 for Framer Motion).

## 9. Sandbox limitations to know about

- This cloud session's GitHub access is scoped to `om-os`: `/users/omgawande1523/*` API calls and `github.com` HTML pages return **403** here. The search API and `raw.githubusercontent.com` work. In practice:
  - `scripts/snapshot-github.mjs` will be written against the public REST endpoints from the brief and will run on Vercel / your machine. In this sandbox I'll seed the first `github.snapshot.json` from the search API (public repos only) plus the contributions API if it's reachable.
  - `scripts/check-links.mjs` can't confirm `github.com/...` URLs from here. It will fall back to the search API for repo existence, and I'll ask you to run it locally for a clean paste.
- Lighthouse and opengraph.xyz after deploy need you, or a run against `npm run preview` here (no network-dependent scores).
