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

## Part C: interactions

| # | Decision | Why |
|---|---|---|
| C-1 | Terminal commands: `help`, `whoami`, `ls projects` (alias `ls`), `open <slug>`, `cat resume` (alias `resume`), `contact`, `github`, `theme`, `clear`, `sudo hire om`. Any other `sudo …` prints "Permission denied". | Brief C2 |
| C-2 | `open <slug>` opens the case study when the project has one; otherwise it scrolls to and focuses the project's entry, expanding "All projects" if the row is collapsed. The ⌘K palette uses the same function (`showProject`). | One code path for terminal, palette and deep links |
| C-3 | Tab only completes while the prompt has text; with an empty prompt Tab moves focus normally (no keyboard trap). Completion: one match fills it, several matches fill the common prefix or list them. | Accessibility |
| C-4 | Output area is `role="log"` (polite live region) with its own scroll (max 16 rem), so the hero never grows. Command chips run the same commands. | Brief C2; page height |
| C-5 | `sudo hire om` pre-fills the contact message with a neutral sentence ("Hi Om, I found your portfolio and would like to talk about an opportunity.") only if the message box is empty, scrolls to Contact and focuses the name field. | No words put in a visitor's mouth beyond a greeting |
| C-6 | `github` prints the snapshot (repos, contributions, stars, followers, language split with its method, latest public commits). Numbers shown as "—" when the snapshot has none. | Brief; no invented numbers |
| C-7 | Command palette: `cmdk` (MIT) inside a native `<dialog>` instead of `Command.Dialog`, so Radix isn't pulled in. Lazy chunk 18.6 KB gzip, fetched on first open or on hover/focus of the `⌘K` hint. The hint always shows `⌘K` (no platform sniffing before hydration); its accessible name says "Ctrl+K or Command+K", and `?` help lists it. | Budget; hydration-safe |
| C-8 | After `showModal()` the palette focuses its search box explicitly (cmdk's root has a tabindex and would otherwise take focus). | Bug found in testing |
| C-9 | Demo loops recorded only for the two approved demos: the waste-segregation dashboard (simulation mode, after "Manual trigger") and major-project-simulation (after "Fire Query"). 6 s, 960×540, 24 fps, AV1 WebM 102–163 KB and H.264 MP4 121–163 KB. krishna-river-flood and the archive demos were not recorded (Om, Q2). | Honest demos only; ≤ 400 KB each |
| C-10 | Each video has a caption on the card ("Recorded from the live simulation" / "Recorded from the dashboard (simulation mode)") and a real poster frame (AVIF/WebP, 18–35 KB). The `<video>` element is only created once the card is 35 % in view; it pauses off-screen; never created under reduced motion or Data Saver. | Honesty and budget |
| C-11 | Press effect: `.nb-press` (buttons, 2 px shadow) and `.nb-press-lg` (featured cards, 4 px shadow), 100 ms, adapted from neobrutalism-components (MIT, attribution in `index.css` and `tailwind.config.js`). | Brief C5 |
| C-12 | View Transitions wrap opening (`flushSync` + `history.pushState`) and closing (`dialog.close()`) a case study, only when `document.startViewTransition` exists and motion is allowed; 160 ms cross-fade. Escape closes without a transition. | Feature-checked, skippable |
| C-13 | Name scramble written for this site (~40 lines): once per session (sessionStorage), 700 ms, starts after the boot overlay is gone; skipped under reduced motion or blocked storage. The `<h1>` keeps the real name in a screen-reader span and in the prerendered HTML. React Bits' DecryptedText / ScrambledText were rejected (Framer Motion / GSAP). | Brief C1, C5 |
| C-14 | React Bits SpotlightCard / TiltedCard not used (soft glows clash with flat neo-brutalism). | Quality over quantity |
