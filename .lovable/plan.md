# emt-sun Redesign — Compass × Vercel, Dark Only

Rebuild the emt-sun (DbSherpa) frontend inside this project, replacing the current Compass docs site. Every screen gets the hybrid aesthetic: Compass's pure-black, Satoshi, tight-tracking identity crossed with Vercel's crisp hairline borders, muted grays, geometric precision, and understated micro-interactions.

## Design language

- **Theme**: Dark only. Background `#000000`, surfaces `#0A0A0A` / `#111111`, hairline borders `#1F1F1F` (Vercel-style 1px), text `#EDEDED`, subtext `#A1A1A1`–`#D5D6DB`.
- **Accent**: Single restrained accent (Vercel-blue `#0070F3` or keep Compass neutral-white CTAs) + semantic green/amber/red for run statuses.
- **Typography**: Satoshi everywhere, tighter letter-spacing on headings; JetBrains Mono for IDs, cron strings, logs, and code.
- **Icons**: Lucide React throughout — replacing emt-sun's custom `arc` icon set with a consistent mapped set.
- **Motion**: Framer Motion — subtle fades/slides, no flashiness. Vercel-style hover states (border lightens, bg `#111` → `#161616`).
- **Components**: shadcn primitives restyled with the token set; rounded-lg cards, hairline dividers, command-palette (⌘K).

## Screens (all rebuilt)

1. **Login** — centered card on black, brand mark, email + SSO buttons, subtle grid/glow backdrop.
2. **Dashboard** (`/`) — sidebar + header shell; stat row with micro-sparklines, run-health card, run-activity calendar (GitHub-style heatmap), workflow grid cards, recent-runs rail, Sherpa prompt bar (AI input) pinned prominently.
3. **Workflow Studio** (`/studio`) — the five-region layout: left nav rail, topbar, node palette panel, canvas (React Flow with custom dark nodes + status pills), right panel with tabs (Config / Output / Run Log). Bottom output panel toggle.
4. **Drawers** — Vercel-style sheet/drawer treatments for: Automations (schedules, cron), Data Sources, Run History (timeline + status pills), Nodes catalog, Skills, Settings, User access.
5. **Copilot / Sherpa chat** — chat panel with thinking blocks, route chips, typewriter text, markdown rendering.
6. **Docs** (`/docs`) — simplified docs page reusing this template's proven docs layout.
7. **Command palette** — global ⌘K.

## Simplifications (dropped without killing core)

- No Python backend — all data mocked with realistic fixtures (workflows, runs, schedules, sources) so every screen is fully interactive-looking.
- Workflow code editor (Monaco) reduced to a styled read-only code view.
- Auth callback / SSO plumbing stubbed (login is visual).
- Webpack/nginx/deploy tooling irrelevant — stays Vite.

## Technical notes

- Remove Compass pages/components; keep the design tokens, Satoshi setup, and scrollbar/nav conventions as the base.
- New token set in `index.css` + `tailwind.config.ts` (surfaces, borders, status colors); zero hardcoded color classes.
- `@xyflow/react` for the studio canvas; `cmdk` for the palette; mock data in `src/data/`.
- Routes: `/login`, `/` (dashboard), `/studio`, `/docs`.

## Order of delivery

1. Token system + app shell (sidebar, topbar) + Dashboard
2. Workflow Studio canvas + panels
3. Drawers + Copilot chat
4. Login + Docs + command palette + polish pass
