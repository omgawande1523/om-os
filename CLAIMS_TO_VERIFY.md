# Claims to verify

Every factual claim the site made (or now makes) that needs a source, checked against:
- **Resume**: `public/Om_Gawande_Resume.pdf` (text extracted with `pdftotext`, PDF dated 2026-09-10)
- **README**: the repo's README on GitHub (read via `raw.githubusercontent.com`, 2026-11-09)
- **Om**: Om's answers in this session (2026-11-09)

`file:line` refers to `main` @ `9e8ee41` (before this overhaul) unless it says `src/data/...`.

Status: ✅ resolved · ❓ **needs Om's answer** · 🗑 removed

---

## Answers from Om (2026-11-09)

| # | Question | Answer | Applied |
|---|---|---|---|
| Q1 | Featured order | "ok" | ✅ MRSAC · Agentic RAG · Waste Segregation · PPE · Sarcasm · IntruShield; AegisEdge in the archive |
| Q2 | ADHYAYAN vs Adhyayan-Simulation | "no simulation" | ✅ archive card links `ADHYAYAN` only, no live link |
| Q3 | Shri-Gajanan-Dental-Clinic | (not asked separately, defaulted) | ✅ excluded |
| Q4 | "Looking for" | "no looking for" | ✅ `profile.lookingFor` stays empty → hidden |
| Q5 | Sarcasm "Marathi and other regional Indian languages" | "ok" | ✅ |
| Q6 | Agentic RAG status | "dont mention" | ✅ no status badge, no "Deploy" fact (`status` is optional in `projects.ts`) |
| Q7 | FastAPI in Skills | "yes" | ✅ |
| Q8 | Publications | "no papers right now" | ✅ all stay `TODO` → section hidden |
| Q9 | Certification credential URLs | not given | `credentialUrl` left empty → no button |
| Q10 | Google Scholar | not given | empty → hidden |
| Q11 | About paragraphs | not answered | ❓ kept as drafted in `src/data/profile.ts`; edit freely |

## Projects (`src/sections/Projects.tsx` → now `src/data/projects.ts`)

| Claim | file:line | Source found | Action |
|---|---|---|---|
| AadhaarX "Verify Rate 99.8%", "Sync Latency 120ms" | Projects.tsx:269-270 | none (the README has *different* numbers: 97.83 % accuracy, 56.69 ms on 600 attempts) | 🗑 removed. No metrics on cards. |
| AadhaarX "Encryption AES-256" | Projects.tsx:271 | none for AadhaarX ("AES-256-GCM" appears only in the **AegisEdge** README) | 🗑 removed |
| AegisEdge "60 FPS", "99.4%", "45ms" | Projects.tsx:306-308 | none. The README is a design blueprint; its "99.68 %" is the published GhostFaceNet figure, not your measurement. | 🗑 removed |
| routeiq "10 GB/day", "95.5%", "180ms" | Projects.tsx:343-345 | none | 🗑 removed |
| cyber-threat "96.8%", "0.4%" | Projects.tsx:379-380 | none (the README reports XGBoost F1 0.9989 from 5-fold CV, not these) | 🗑 removed |
| bot-detector "98.7%", "97.2%" | Projects.tsx:414-415 | none (repo is empty) | 🗑 removed; Bot-Detector excluded |
| MathGPT "92.4%", "240ms", "5,000+ queries" | Projects.tsx:450-452 | none | 🗑 removed |
| earth-science-agi "1.5 TB", "89.6%", "85M params" (also in case study L511) | Projects.tsx:487-489, 511 | none | 🗑 removed |
| Every case study's "challenges / results / future work" for AadhaarX, AegisEdge, routeiq, cyber-threat, bot-detector, MathGPT, earth-science-agi | Projects.tsx:260-514 | none | 🗑 removed. Archive cards have no case study. |
| MRSAC "Successfully built and demonstrated an **operational** flood nowcasting layer" | Projects.tsx:104, 143 | **contradicted** by the README: "PROTOTYPE FOR INTERNAL MRSAC EVALUATION"; measured skill is low and the naive baseline wins | ✅ replaced with the README's own result: status Prototype, CSI table, limitations |
| MRSAC case-study CSI numbers (0.0039 / 0.0008 / 0.1083), "62.6 %", "one usable SAR observation", "95 tests" | `projects.ts` mrsac-flood-twin | README, measured with `scripts/06_validate.py` / `pytest` | ✅ kept, with the method named |
| MRSAC card image `/earth-science-agi.png` | Projects.tsx:75, 114 | wrong project's screenshot | 🗑 removed (no image until a real screenshot is added) |
| Duplicate cards `kolhapur-digital-twin` + `krishna-river-flood` | Projects.tsx:69-146 | same project | ✅ one card linking both repos + live demo |
| `lan-agentic-rag` repo link (404) | Projects.tsx:537-548, github.ts:33-41 | repo does not exist | ✅ **Om: it's College-Assistant (private).** One card: "private, code on request"; the public `Major-Project-Simulation` repo + live demo are linked; no deployment status (Q6) |
| LAN RAG description (Ollama, Qdrant, MySQL, Router/SQL/RAG/Synthesis + verifier, Docker Compose, Django/DRF + React) | Projects.tsx:147-187 | resume | ✅ kept |
| `defaultCaseStudy` ("Ran tests to verify module execution logs", "System builds successfully…") | Projects.tsx:574-595 | none | 🗑 deleted |
| Fallback filler "Verified open-source software repository…", stock image for every repo | Projects.tsx:604, 610 | none | 🗑 deleted (projects are no longer generated from the API) |
| Modal fallbacks "Managed edge bottlenecks through model quantization", "Achieved significant speedups and met the project validation criteria", "BUILD: SUCCESSFUL", "WORKSPACE_COMPILE_OK" | Projects.tsx:891-893, 999, 1007, 1029 | none | 🗑 deleted |
| Waste segregation description "Objectives Create a system that uses image recognition…" (GitHub repo description) | GitHub repo metadata | — | ✅ rewritten from the README + resume. A new GitHub description is proposed in Phase 8 |
| Waste segregation: YOLOv8, Raspberry Pi 4, six bin classes, servo angles, GPIO pins, Vercel simulation mode | `projects.ts` | README + resume | ✅ kept |
| PPE: YOLOv11, 5 classes (helmet, vest, gloves, boots, goggles), Twilio alerts, violation state machine | `projects.ts` | repo files (`main.py`, `PHASE2_IMPLEMENTATION_SUMMARY.md`, plot names); **no README** | ✅ kept; no case study |
| Sarcasm: XLM-RoBERTa + BiLSTM-attention, LIME/SHAP, FastAPI, Docker; annotation guidelines + authentic/synthetic separation | `projects.ts` | README + resume | ✅ kept |
| Sarcasm README "≥ 93.8 % validation accuracy" | Sarcasm-Detection README | no description of how it was measured | 🗑 not used |
| IntruShield: NSL-KDD, binary + 5-class, leak-free protocol, 8 candidate pipelines, SHAP, FastAPI + Vite/Three.js | `projects.ts` | README | ✅ kept |
| Archive one-liners (AadhaarX, RouteIQ, cyber-threat, MathGPT, earth-science, Urdu, AgroSense, Image-Inspector, QR Menu, SwarKavach, waste-sorting sim, Waste-Management write-up, EdgeSeiz-Net, ADHYAYAN, AegisEdge) | `projects.ts` | each repo's README | ✅ rewritten in 1-2 plain sentences, no metrics. Short "problem" lines on archive cards are my framing, not README quotes. |
| earth-science-agi live demo | repo homepage | **404** | ✅ no live link |
| Excluded repos: `omgawande1523`, `om-os`, `New-Pro`, `SIH-NEW`, `Apache-Spark`, `AegisEdge-Offline` (identical README), `Automatic-waste-segregation-with-computer-vision.` and `_01` (no README), `Bot-Detector` (empty), `gyrotex-social` (Instagram workspace), `Krishna-River-Flood` and `Major-Project-Simulation` (merged into other cards) | — | brief + README check | ✅ |
| `Waste-Management` | — | README is a real 4 KB paper-style write-up (with Palak Khonde) | ✅ kept in archive as "write-up" |
| "15+ Built", "20+ Repos", "Verified Public Repos" | Hero.tsx:43-44 | none (34 public repos) | ✅ replaced with `projects.length` (21) and derived counts |
| "15+ Projects Built" | About.tsx:40 | none | ✅ derived from `projects.length` |

## Experience & education (`src/data/experience.ts`)

| Claim | file:line | Source found | Action |
|---|---|---|---|
| MRSAC R&D Intern, Aug 2026, both bullets | Experience.tsx:12-25 | resume | ✅ kept. 3rd bullet rephrased from the resume's project section. |
| Acube AI "Feb 2025 - Present" | Experience.tsx:34 | none; the resume gives no dates | ✅ **Om: same as resume** → no date shown |
| RNR "Nov 2024 - Jan 2025" | Experience.tsx:48 | none | ✅ **Om: same as resume** → no date shown |
| Company name "RNR Innotech" | Experience.tsx:43 (id), ImpactDashboard.tsx:46 | resume says "RNR" | ✅ "RNR" |
| Locations "Nagpur, India", "Nagpur, India (Hybrid)", MRSAC "Nagpur, Maharashtra" | Experience.tsx:16, 32, 46 | none | 🗑 removed |
| Education description "Focusing on artificial intelligence models, deep neural networks…" and "Advanced Coursework: Computer Vision, Deep Learning, Edge Computing" | Experience.tsx:67-70 | none | 🗑 removed |
| B.Tech AI, SVPCET Nagpur, CGPA 8.68 / 10, class of 2027 | various | resume | ✅ one Education card |
| Start year 2023 | Experience.tsx:65 | implied by "Class Representative (2023–Present)" on the resume | ✅ kept ("2023 – 2027") |
| "Consistently strong performance in advanced computer science, neural networks, and statistics coursework" | About.tsx:34 | none | 🗑 removed |

## Leadership (`src/data/leadership.ts`; ImpactDashboard deleted)

**Om (2026-11-09): "leadership keep same".** Roles, counts and bullets are kept as they were. Only verification wording changed, and duplicates were merged.

| Claim | file:line | Source found | Action |
|---|---|---|---|
| President (prev. Secretary & Founding Member), AI Prabodha Student Forum | Leadership.tsx:11 | resume | ✅ |
| "150+ active participants", "Mentored 50+ junior engineering students" | Leadership.tsx:15, 17; ImpactDashboard.tsx:9, 13 | Om | ✅ kept per Om |
| Class Representative "2023 - 2026 (3 Consecutive Years)" | Leadership.tsx:25 | resume says "2023–Present" | ✅ **Om: yes** → "2023 – Present (elected 3 consecutive years)" |
| "70+ students", "improved laboratory compute hour allocations" | Leadership.tsx:28-29 | Om | ✅ kept per Om |
| Dataventics GenAI Hackathon Lead, "200+ competitors" | Leadership.tsx:36-41 | Om (not on resume) | ✅ kept per Om |
| "verified target API access keys" | Leadership.tsx:40 | — | ✅ reworded to "API access keys" (verification wording) |
| AI Verse Organizer, "Evaluated 40+ competitor submissions, verifying…" | Leadership.tsx:46-53 | Om | ✅ kept; "verifying" → "checking" |
| Community Builder ("publishing custom Python wrappers and CLI tools", "weekend code reviews", "technical visits") | Leadership.tsx:58-66 | Om | ✅ kept per Om. ⚠ Note: no public repo is a Python wrapper or CLI tool, so a reviewer who clicks through won't find one. Consider removing that bullet. |
| Technical Leader bullets (coding styles and lint rules, quantization, multi-disciplinary teams) | Leadership.tsx:70-78 | Om | ✅ kept per Om |
| ImpactDashboard "camera packages, custom PyTorch templates, CLI dataset annotators", "15+ repositories" | ImpactDashboard.tsx:79, 83 | none | 🗑 section deleted (roles appear once, in Leadership / Experience) |
| ImpactDashboard "Configured server compute slots and API gateways for 200+ competitors", "Optimized compute allocation hours" | ImpactDashboard.tsx:19, 59 | duplicates of Leadership | 🗑 duplicates removed |
| About "Leadership Roles: 3", "Events Organized: 10+" | About.tsx:41-42 | none | ✅ "Leadership roles" = `leadership.length`; "Events Organized" 🗑 removed |
| "SYSTEM_METRIC: EXCELLENT", "LIVE_INDEX_OK", "OFFICER_GRADE…" | Leadership.tsx:150, 208-209 | decoration that reads as a claim | 🗑 removed |

## Certifications (`src/data/certifications.ts`)

| Claim | file:line | Source found | Action |
|---|---|---|---|
| 4 certifications (NVIDIA, NPTEL, Data Engineering in Cloud, GenAI & DevOps FDP) | Certifications.tsx:8-45 | resume | ✅ |
| Issuers "NPTEL (IIT Kharagpur)", "Cloud Data Academy", "National Faculty Development Program" | Certifications.tsx:22, 31, 40 | Om | ✅ **Om: yes** |
| "ALL_SIGNATURES_VALID", "STATUS: ACTIVE_VERIFIED", "FORMAT: X.509/SECURE", "verified_log" | Certifications.tsx:119, 155-157, 205 | none | 🗑 → "N CREDENTIALS", "STATUS: LOADED", "View credential" only when `credentialUrl` is set |
| About "Certifications: 5+" | About.tsx:43 | resume lists 4 | ✅ `certifications.length` (4) |

## Skills (`src/data/skills.ts`)

| Claim | file:line | Source found | Action |
|---|---|---|---|
| Resume skill lists | Skills.tsx:19-75 | resume | ✅ kept |
| Added TypeScript, JavaScript, React, Next.js, PyTorch, YOLOv8/YOLOv11, Django/DRF, MySQL | — | your public repos + brief | ✅ added |
| Added FastAPI | — | repos | ✅ Om: yes |
| "VERIFIED DIAGNOSTIC MODULES", "SYS_CHECK: OK", "LOADED_MODULES" | Skills.tsx:231 + modal | none | 🗑 removed (the redundant skill modal is gone too) |
| No C / C++ | — | brief | ✅ |

## Hero / About / Contact / Resume / GitHub

| Claim | file:line | Source found | Action |
|---|---|---|---|
| Hero bio (5 sentences, ≈ About bio ≈ resume summary) | Hero.tsx:107, About.tsx:141-144 | resume | ✅ Hero: 2 sentences from the resume. About: new content (Q11) |
| identity.json "mission": "BUILDING PRODUCTION-GRADE AI SOLUTIONS" | Hero.tsx:100 | none | ✅ replaced by name, role and research interests from `profile.ts` |
| "SECURE", "BAUD_RATE: 115200" | Hero.tsx:67-68 | decoration that reads as a claim | 🗑 removed; role shown instead |
| `<h1>` "OM GAWANDE // SYSTEM MAIN_CONSOLE //" | Hero.tsx:61-63 | — | ✅ `<h1>` = name (+ visually hidden role); decoration `aria-hidden` |
| Phone number +91 8010173681 | Header.tsx:132, 216; Footer.tsx:43 | resume | ✅ **Om: no** → removed from the site (still on the resume PDF) |
| "STATUS: AVAILABLE FOR REMOTE / HYBRID ROLES" | Footer.tsx (location card) | none | 🗑 → shows `profile.lookingFor` only once set (Q4) |
| ORCID 0009-0004-8574-9084 | — | brief; URL returns 200 | ✅ added to About and Contact |
| Resume "SHA256: VERIFIED_SIGNED", "verified resume containing … project impact metrics", "SIGNATURE: om.gawande_sys" | ResumeViewer.tsx:72, 99, 145 | none | 🗑 removed |
| Resume "78.2 KB" | ResumeViewer.tsx:105 | file is 86.0 KB | 🗑 removed. Phase 2 computes size at build time. |
| Resume "Updates logs: Aug 2026" | ResumeViewer.tsx:113 | PDF metadata: 2026-09-10 | 🗑 removed. Phase 2 computes the date at build time. |
| Resume "Format: A4_Standard" | ResumeViewer.tsx:70 | PDF is US Letter (612×792 pt) | 🗑 removed |
| Resume links to `/Resume Updated.pdf` | ResumeViewer.tsx:121-130 | identical file (md5) | ✅ now `/Om_Gawande_Resume.pdf` |
| GitHub "Verified repository published on omgawande1523 GitHub profile." | GitHubStats.tsx:63 | none | ✅ → "No description on GitHub." |
| GitHub contributions 46, stars `|| 2`, followers `|| 5`, made-up language %, fallback repos, random contribution heatmap, hardcoded commits "AegisEdge · 2 days ago" / "routeiq-enterprise · 5 days ago", fake "successfully authenticated" | github.ts:21-176, 268-270; GitHubStats.tsx:9-20, 47-79, 84-90, 353-361 | none | ⏳ **Phase 2** replaces all of it with the build-time snapshot (not touched in Phase 1) |

## GitHub numbers (Phase 2 snapshot, 2026-11-09)

| Claim | Source found | Action |
|---|---|---|
| "610 contributions last year" (brief) | github-contributions-api.jogruber.de reports **265** for the last year. It reads the public contribution calendar; private contributions only count if "Include private contributions" is enabled on your profile | ✅ the site shows whatever the API returns at build time (265 today) |
| "2 followers" (brief) | `/users/omgawande1523` is not reachable from this sandbox | ✅ shown as "—" in the committed snapshot; filled automatically on the next Vercel build |
| Language split | `/repos/{r}/languages` not reachable here, so the committed snapshot uses "share of public repos by primary language" and says so on the page | ✅ Vercel builds use byte counts (method label switches automatically) |

## Images (Phase 4)

| Item | Finding | Action |
|---|---|---|
| Project card images `aadhaarx.png`, `aegisedge.png`, `earth-science-agi.png`, `mathgpt.png`, `routeiq.png`, `waste-segregation.png` | Not screenshots: 1024×1024 generated mock-up photos (e.g. a kitchen bin, a phone showing an invented person's ID card). They imply products that don't exist as shown. | Removed from cards. Sources kept in `assets-src/images/`. ❓ **Om:** send real screenshots, or OK to delete them in Phase 7? |
| MRSAC card | Real dashboard screenshot from `Kolhapur-Digital-Twin/docs/screenshots/01_overview.png` | ✅ used (AVIF/WebP, 1200×800) |
| PPE `alert_frame.jpg` (real detection output) | Shows an identifiable face | ❓ **Om:** OK to use it on the PPE card (is that you)? Not used for now |
