# v3 decisions

Choices made while implementing `REDESIGN_PLAN.md` (approved by Om, 2026-11-09), so they can be reviewed without reading the diff. Rule applied each time: simpler, honest, within budget.

## Part B: simplify

| # | Decision | Why |
|---|---|---|
| B-1 | Section ids are now `work`, `experience`, `publications`, `skills`, `leadership`, `contact`. Numbers go to visible sections only, so with Publications hidden: 01 Work, 02 Experience, 03 Skills, 04 Leadership, 05 Contact. | `sections.ts` stays the single source; no gaps in numbering |
| B-2 | Section label and title merged into one heading line, `01 / Work` (number `aria-hidden`). | "01 / WORK" above "Work" said the same thing twice |
| B-3 | Featured-card title bar shows the project's categories + status badge instead of a `slug.elf` filename. | B3 rule: chrome keeps the OS look, every visible string is information |
| B-4 | Card facts (model / dataset / platform) became one mono line instead of three tiles. | Same information, about a third of the height |
| B-5 | "All projects" list: all 15 rows are in the HTML; rows 7–15 are hidden by CSS until `Show all 15` (or until a row is the URL `:target`, or the terminal/palette asks for it). | Crawlable and short at the same time |
| B-6 | Live links read `Demo (sample data)` for krishna-river-flood and MathGPT (data field `sampleData`), `Live` for the rest. | Om's decision |
| B-7 | Certification badges are not links yet: no `credentialUrl` is set. | No invented URLs |
| B-8 | Leadership: the 3 featured roles are one line each; `Show all 6 roles with details` opens all six roles with their approved bullets, unchanged. | One disclosure instead of two lists |
| B-9 | Experience order MRSAC → RNR Innotech → Acube AI, as specified in the brief, with the dates Om confirmed. | Brief |
| B-10 | Skills: 5 groups drawn as one grid (cells on a black background with 2.5 px gaps, so the grid lines work at 1, 2 and 5 columns). | One component instead of eight boxes |
| B-11 | The footer line includes `last updated <snapshot date>` already in Part B. | It replaced the old footer; it costs nothing |
| B-12 | Kept in Contact: one location line (`Nagpur, Maharashtra, India (IST, UTC+5:30)`). | Real information (time zone) |
| B-13 | Header: removed `System: Online` and the decorative Wi-Fi/CPU icons; kept the clock (real time, hidden below 768 px). Added `Resume ↓` in the header (≥ 640 px) and in the mobile menu. | B3 rule; resume reachable everywhere |
| B-14 | Portrait now displays at ≤ 176 px, so the image pipeline outputs 352 px (27 KB) instead of 640 px (59 KB). | Smaller first load |
| B-15 | Removed UI-only data fields (`fileName`, `colorClass`, certification `summary`/`skills`, skill descriptions/icons). | They only fed deleted UI |
| B-16 | `CustomCursor`, `ElasticThreadGrid`, `ThreadGridBackground`, `three`, `meshline`, `@types/three` deleted; the hero keeps the static CSS grid texture. | Approved (Q1) |
| B-17 | Deleted `About`, `Certifications`, `GitHubStats`, `ResumeViewer`, `Footer` sections and the resume preview images; their remaining content moved into Hero / Work / Experience / Contact. | Plan §2 |
