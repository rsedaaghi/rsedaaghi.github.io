# PORTFOLIO_CAPTURE.md (v3)

You are standing in the root of exactly one project. Everything you need is inside it — code, `docs/`, feature checklists, audit reports, git history, env templates, logs. Work fully autonomously. **Never ask the user or any other agent anything.** If info is missing, note it in INTEGRATION.md and move on.

## STEP 0 — Map the project (root may not be a git repo)
1. Run `git rev-parse --show-toplevel` in the root.
   - If it resolves, the project is the root itself.
   - If it fails, run `Get-ChildItem -Path . -Directory -Filter .git -Force` (and one level deeper: `-Recurse -Depth 1 -Directory -Filter .git`). Each folder holding a `.git` belongs to this project. **The root is still one project — don't over-count.**
2. Group sub-repos into **ONE entry** when they form one deployable app: pairings like `*-core` + `*-panel`, `*-core` + `*-web`, `*-backend` + `*-frontend` (e.g. `his-admin-core` + `his-admin-panel`, `persianshine-core` + `persianshine-web`, `docs/`). Otherwise one entry per repo.
3. Read `RULES.md`, `AGENTS.md`, `docs/*.md` (master checklists, feature items), and any `*AUDIT*.md`/`*REPORT*.md`/`*ISSUE*.md` — these tell you what the project does and what real engineering it has.

## STEP 1 — Derive metadata (all local, in priority order)
- **title**: clean folder name (camelCase/Pascal → spaced words); refine with the README's H1.
- **dates**: `git log --reverse --format=%aI` (first commit = start), `git log -1 --format=%aI` (last = end). Spans >1 calendar year → `"startDate": "2023", "endDate": "2025"`; same year → single `"date": "2025"`.
- **url**: `git remote get-url origin`. Convert SSH → HTTPS (`git@github.com:o/r.git` → `https://github.com/o/r`). Strip trailing `.git`. If absent, leave out and note it.
- **description** (2-4 sentences, factual, no marketing fluff):
  1. `docs/` feature files + checklists first (best scope source),
  2. then README,
  3. then first commit message,
  4. then package.json `description`.
  - If an audit/report mentions real security/RBAC/architecture work, include it only if grounded there.
  - State what the app does, for whom, and its main modules.
- **technologies**: read every `package.json` in the repo; also scan for `Dockerfile`, `docker-compose*`, `requirements.txt`, `*.csproj`. Map to the canonical list:
  `Node.js, Python, React, PostgreSQL, Redis, RabbitMQ, gRPC, Docker, Material-UI, PWA, Vite, Zabbix, Linux, C++, PHP, WordPress, Bootstrap, JQuery, SCSS, Leaflet, WebSocket, Flutter, Android, Java, MATLAB, C, Fortran, HTML, CSS`
  Mappings: Express/Sequelize → `Node.js` + `PostgreSQL`; Socket.IO → `WebSocket`; Next.js → `React` (say SSR in description); Redux Toolkit → `React` + describe in description; Ant Design → add `Ant Design` tag (new, acceptable). **Never invent tags outside the list**; exotic-but-core stack → add the tag and flag it in INTEGRATION.md.

## STEP 2 — Run the app and take your own screenshots
Repos contain **no screenshots** — you produce them.
1. Find run method: package.json `scripts`, README, `RULES.md`, `docker-compose*`, `.env.example`/`.env.template`.
2. Copy an env template to real env **only if it doesn't exist** and is required to boot. Start app + its local DB service (never the demo/live site).
3. Poll `http://localhost:<port>` until it serves (port: script/README, else default: vite 5173, next 3000, webpack 8080).
4. Screenshot with Playwright/Chromium at **1280×800** desktop:
   - main/landing view
   - login screen
   - 2-4 feature views — use `docs/` to know what makes it special; actually interact (open menus, run a search, open a CRUD form, a chart, a report)
   - one **390×844** mobile view
5. Login: use credentials from the project's own `.env`/seeders/docs. If none exist, capture login + whatever else is reachable, and note the gap. **Do not ask.**
6. Export **WebP** to `images/works/<slug>/<slug>_<detail>.webp` (e.g. `his-admin_panel_main.webp`). Lowercase, hyphen-separated, descriptive. No placeholders.

## STEP 3 — Assemble `new_works.json`
Schema (exactly):
```json
{
  "title": "Human-readable Project Name",
  "date": "2025",
  "startDate": "2023",
  "endDate": "2025",
  "url": "https://github.com/org/repo",
  "description": "2-4 factual sentences.",
  "images": [
    { "src": "images/works/<slug>/<slug>_main.webp", "caption": "Dashboard" },
    { "src": "images/works/<slug>/<slug>_feature.webp", "caption": "Billing report" }
  ],
  "technologies": ["Node.js", "React", "PostgreSQL"]
}
```
- One of `date` OR (`startDate`+`endDate`), never both.
- `images` order: main → login → features → mobile last. Captions: 1-4 words describing the screen.
- Validate: `node -e "JSON.parse(require('fs').readFileSync('new_works.json','utf8'))"` and confirm every `src` resolves to a real file **inside `portfolio/`**.

## STEP 4 — Deliverables (all inside a folder named `portfolio`, created at the project root)

1. `portfolio/new_works.json` — keep image `src` paths relative, i.e. `images/works/<slug>/<slug>_main.webp` (unchanged from Step 3), so the folder can be copied into the target site as-is.
2. `portfolio/images/works/<slug>/*.webp` — same tree as the `src` paths.
3. `portfolio/INTEGRATION.md` — per work: fields used, which doc/commit backs each description claim, tags added outside the canonical list, and gaps (missing url, unreachable login, uncaptured screens), plus run commands used.

Nothing else is handed back or asked. Confirm before finishing: every `new_works.json` `src` resolves to a real file **inside `portfolio/`**.

## Hard rules
- **No asks, no confirmation-requests, no pauses between steps.**
- No unbacked claims (every description sentence traceable to a file or commit).
- No committing, pushing, or deploying.
- Missing field → note in INTEGRATION.md, continue anyway.