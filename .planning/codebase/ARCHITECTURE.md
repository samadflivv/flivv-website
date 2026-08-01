<!-- refreshed: 2026-08-01 -->
# Architecture

**Analysis Date:** 2026-08-01

## System Overview

The site is a **Next.js 15 (App Router) marketing site in plain JavaScript (no TypeScript)** for Flivv Developers, a real-estate developer. Each route is a thin server component that composes a set of large **client-side section components** (`'use client'`). Almost all rendering, animation, and data fetching happens client-side. A small server API layer manages an event registry persisted to a JSON file, and a legacy Pages Router API route proxies conversion events to Meta's Conversions API.

```text
┌─────────────────────────────────────────────────────────────────────┐
│                    BROWSER (client-rendered UI)                      │
│  page.jsx (thin server wrapper) ──┬─ Navigation / Footer (shared)    │
│                                   └─ Section components (client)     │
│   `src/app/**/page.jsx`            `src/components/*.jsx`            │
└──────┬──────────────────────────────┬──────────────────────────┬─────┘
       │                              │                          │
       │ fetch()/SWR                  │ POST Meta events         │ fetch() CRUD
       ▼                              ▼                          ▼
┌──────────────┐            ┌──────────────────┐       ┌────────────────────┐
│ App Router   │            │ Pages Router API │       │ Google Sheets GViz │
│ API routes   │            │ `pages/api/      │       │ JSON feed          │
│ `src/app/api/│            │  meta-events.js` │       │ (progress bars,    │
│  events/*`   │            └────────┬─────────┘       │  20s SWR poll)     │
└──────┬───────┘                     │                 └────────────────────┘
       │ fs read/write               ▼
       ▼                 ┌───────────────────────────┐
┌──────────────┐         │ Meta Graph API v18.0      │
│ `data/       │         │ (Conversion Events)       │
│  events.json │         └───────────────────────────┘
└──────────────┘
```

Supporting infra (see `tools/` and root JSON configs): static export output to `out/`, image pipeline (sharp + S3 uploader + manifest.json) consumed at runtime from the S3 bucket `flivv-web-cdn` (Lightsail-compatible endpoint).

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Root layout | Fonts, global CSS, GTM/GA4/HubSpot/Clarity/Meta Pixel scripts, Lenis smooth-scroll wrapper | `src/app/layout.js` |
| Route pages | Thin server wrappers; compose `<Navigation/>` + section components + `<Footer/>` | `src/app/**/page.jsx` |
| Home page | Landing composition (hero, about, projects, stats, CTA, FAQ) | `src/app/Home.jsx` |
| Navigation | Mega-menu nav with hardcoded project catalog; mobile drawer | `src/components/Navigation.jsx` |
| Footer | Global footer on most pages | `src/components/Footer.jsx` |
| Event calendar | Full CRUD calendar UI + admin modals; fetches `/api/events` | `src/components/EventCalendar.jsx` |
| Event API routes | JSON-file-backed REST endpoints (GET/POST, PUT/DELETE) | `src/app/api/events/route.js`, `src/app/api/events/[id]/route.js` |
| Events data access | File read/write to `data/events.json` | `src/lib/events.js` |
| Progress dashboards | SWR polling of Google Sheets GViz feed; renders milestone/progress cards | `src/components/GVProgressRoadmap.jsx`, `GHProgressRoadmap.jsx`, `ATProgressRoadmap.jsx`, `NSHdevprogress.jsx`, `NSH2devprogress.jsx` |
| S3 gallery | Fetches `manifest.json` from S3; lazy-loads thumbnails with placeholders | `src/components/FlivvConnectPage.jsx` |
| HubSpot forms | Embeds HubSpot portal forms (portal 21626983) | `src/components/HubspotForm.jsx`, `RFSForm.jsx`, `EventFormPage.jsx`, `OmnRegistrationform.jsx` |
| Meta conversion proxy | SHA256-hashes email, forwards to Meta Graph API | `pages/api/meta-events.js` |
| Image pipeline | sharp resize → S3 upload → manifest.json generation | `tools/generate-thumbs-upload.js` |
| Smooth scroll | Lenis wrapper + hook used app-wide | `src/components/SmoothScrollWrapper.jsx`, `src/lib/useLenisScroll.js` |
| Scroll spy | IntersectionObserver scrollspy + smooth scroll helpers | `src/components/useScrollSpy.js` |
| Motion accessibility | prefers-reduced-motion hook | `src/components/usePrefersReducedMotion.js` |
| Tailwind helper | `cn()` class merge utility | `src/lib/utils.js` |

## Pattern Overview

**Overall:** Next.js App Router with **thin server page wrappers over monolith client section components** — a "client-first marketing site" pattern. Data lives in external sources (JSON file, Google Sheets, S3 manifest, HubSpot) consumed directly by client components.

**Key Characteristics:**
- `'use client'` at the top of ~50 of 75 components in `src/components/`; server components are limited to `src/app/*/page.jsx` wrappers and `src/app/layout.js`
- Route pages are purely compositional (5–30 lines): import, render `<Navigation/>`, section component(s), `<Footer/>`
- Section components are self-contained monoliths (300–1100 lines) bundling markup, Tailwind classes, framer-motion/GSAP animation, inline styles, and data fetching
- Static export to S3/CloudFront (`out/` directory exists; `next.config.mjs` has the `output: 'export'` block commented out) — the S3 bucket hosts the same routes the app router defines
- API surface is minimal: one CRUD resource (`/api/events`) plus one third-party proxy (`/api/meta-events` via Pages Router)

## Layers

**Route layer (server):**
- Purpose: Declare routes and compose page sections
- Location: `src/app/**/page.jsx`, `src/app/layout.js`, `src/app/page.js`
- Contains: JSX wrappers only; no data fetching, no business logic
- Depends on: `src/components/*`
- Used by: Next.js router

**Component layer (client):**
- Purpose: All UI, animation, form embedding, and client-side data fetching
- Location: `src/components/` (75 files)
- Contains: Section components (`*.jsx`), shared UI (`Navigation.jsx`, `Footer.jsx`, `PopupModal.jsx`, `button.jsx`), client hooks (`useScrollSpy.js`, `usePrefersReducedMotion.js`)
- Depends on: `src/lib/*`, framer-motion, GSAP, Lenis, SWR, lucide-react, Tailwind
- Used by: Route layer

**Data access layer:**
- Purpose: Server-side file persistence for events
- Location: `src/lib/events.js`
- Contains: `readEvents()`, `writeEvents()` using `fs` against `data/events.json`
- Depends on: Node `fs`/`path` (server-only)
- Used by: `src/app/api/events/route.js`, `src/app/api/events/[id]/route.js`

**API layer:**
- Purpose: HTTP endpoints for client consumption
- Location: `src/app/api/events/route.js` (GET/POST), `src/app/api/events/[id]/route.js` (PUT/DELETE), `pages/api/meta-events.js` (POST proxy)
- Contains: Route handlers; manual JSON parsing; no framework validation
- Depends on: `src/lib/events.js`, `axios`, `crypto-js`, `uuid`
- Used by: Client components (`EventCalendar.jsx`), tracking code

## Data Flow

### Primary Request Path (page render)

1. Browser requests `/nshomes` → Next.js matches `src/app/nshomes/page.jsx` (server component) (`src/app/nshomes/page.jsx:1`)
2. `page.jsx` renders `<Navigation/>`, `<NSHomes/>`, `<Footer/>`; `NSHomes` is a client component and hydrates in the browser (`src/components/NSHomes.jsx:28`)
3. The client component runs its own `useEffect`/`useState` logic and renders fully in the browser — no server data fetching occurs

### Events flow (CRUD)

1. `EventCalendar.jsx` mounts and calls `fetch('/api/events', { cache: 'no-store' })` (`src/components/EventCalendar.jsx:46`)
2. `GET /api/events` handler calls `readEvents()`, filters past events with `date-fns`, sorts, returns JSON (`src/app/api/events/route.js:5`)
3. `readEvents()` reads and parses `data/events.json` (`src/lib/events.js:16`)
4. Admin actions POST/PUT/DELETE against the same routes; `writeEvents()` persists the whole array back to the JSON file (`src/app/api/events/[id]/route.js:34`)

### Progress dashboard flow

1. Client component (`GVProgressRoadmap.jsx`) calls `useSWR(GVIZ_URL, gvizFetcher, { refreshInterval: 20000 })` (`src/components/GVProgressRoadmap.jsx:42`)
2. `gvizFetcher` fetches Google Sheets GViz JSON (`https://docs.google.com/spreadsheets/d/{ID}/gviz/tq?tqx=out:json&sheet=...`), strips the `google.visualization.Query.setResponse(...)` wrapper, and JSON-parses the payload (`src/components/GVProgressRoadmap.jsx:15`)
3. `useMemo` maps GViz columns (activity/start/end/status/progress) into card data; renders progress cards (`src/components/GVProgressRoadmap.jsx:44`)
4. Polls every 20 seconds for fresh data

### Meta conversion flow

1. Tracking code posts to `pages/api/meta-events.js` (Pages Router) with `{ event_name, user_data, custom_data }` (`pages/api/meta-events.js:12`)
2. Handler SHA256-hashes the email (`crypto-js/sha256`), generates a UUID event id, forwards to `https://graph.facebook.com/v18.0/{PIXEL_ID}/events` via axios (`pages/api/meta-events.js:23`)
3. Auth uses `FACEBOOK_PIXEL_ID` and `FACEBOOK_ACCESS_TOKEN` server env vars; responds with the Graph API result

### Image manifest flow (S3 gallery)

1. `FlivvConnectPage.jsx` fetches `https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/ksa-gallery/manifest.json` (`src/components/FlivvConnectPage.jsx:7`)
2. Each gallery entry carries `{ variants: { webp, jpg }, low, placeholder }`; an `useInView` IntersectionObserver + `<picture>` combo lazy-loads the right variant (`src/components/FlivvConnectPage.jsx:38`)
3. The manifest is generated offline by `tools/generate-thumbs-upload.js`, which resizes `tools/source_images/` with sharp and uploads variants to S3

**State Management:**
- No global state library. Component-local `useState`/`useEffect` only.
- Server state via `swr` for the Google Sheets feed and manual `fetch` + `useState` for `/api/events`.
- The event JSON file is the single source of truth for the calendar (updated in place, no versioning).

## Key Abstractions

**Route/page composition:**
- Purpose: Uniform page skeleton across the site
- Examples: `src/app/projects/page.jsx`, `src/app/sukoonvillas/page.jsx`, `src/app/contact/page.jsx`
- Pattern: Server component → `<Navigation/>` + section components + `<Footer/>`

**Shared hooks:**
- `useScrollSpy` / `useSmoothScroll` — scrollspy + programmatic scroll with optional GSAP (`src/components/useScrollSpy.js`)
- `usePrefersReducedMotion` — motion-preference detection (`src/components/usePrefersReducedMotion.js`)
- `useLenisScroll` — smooth scrolling lifecycle (`src/lib/useLenisScroll.js`)
- Local `useInView` in `FlivvConnectPage.jsx` for lazy image loading

**Progress roadmap components:**
- Purpose: Per-project construction progress dashboards fed by a shared Google Sheet
- Examples: `src/components/GVProgressRoadmap.jsx`, `GHProgressRoadmap.jsx`, `ATProgressRoadmap.jsx`, `NSHdevprogress.jsx`, `NSH2devprogress.jsx`
- Pattern: Copy-pasted component with a different `SPREADSHEET_ID` / `SHEET_NAME` config block at the top

**HubSpot form wrapper:**
- Purpose: Embed HubSpot portal forms without a backend
- Examples: `src/components/HubspotForm.jsx`, `RFSForm.jsx`, `EventFormPage.jsx`, `OmnRegistrationform.jsx`
- Pattern: Inject `js.hsforms.net` script, call `window.hbspt.forms.create({ portalId: '21626983', formId: '...', target: '#...' })`

**Utility:**
- `cn(...inputs)` — `clsx` + `tailwind-merge` (`src/lib/utils.js`), used by shadcn-style components (`src/components/button.jsx`)

## Entry Points

**Root layout:**
- Location: `src/app/layout.js`
- Triggers: Every page in the app
- Responsibilities: Fonts (Geist via `next/font/google`), `globals.css`, GTM (`GTM-TGRWCJ9M`), GA4 (`G-2EBCG8YCRC`), HubSpot tracking (`21626983.js`), Microsoft Clarity, Meta Pixel (`NEXT_PUBLIC_FACEBOOK_PIXEL_ID`), and the `<SmoothScrollWrapper>` around `{children}`

**Home page:**
- Location: `src/app/page.js` → `src/app/Home.jsx`
- Responsibilities: `<PopupModal/>` + landing composition

**API endpoints:**
- `GET/POST /api/events` — `src/app/api/events/route.js`
- `PUT/DELETE /api/events/[id]` — `src/app/api/events/[id]/route.js`
- `POST /api/meta-events` (Pages Router) — `pages/api/meta-events.js`

**Content routes (21):**
- `about`, `airporttown`, `contact`, `dohaoffice`, `eventsform`, `faqs`, `flivvbahrainvisit`, `flivvksaevent`, `flivvomanevent`, `flivvqatarevent`, `gulmoharhomes`, `gulmoharvillas`, `nshomes`, `nshomes2`, `projects`, `resale`, `rivendellfarms`, `sadhanacity`, `salesmeets`, `sukoonvillas` — all under `src/app/<route>/page.jsx`

## Architectural Constraints

- **Threading:** Single-threaded; all client logic runs in the browser event loop. Server routes are simple async handlers. No worker threads, no edge runtime configuration.
- **Global state:** Module-level singletons only in the data layer: the hardcoded `eventsFilePath` in `src/lib/events.js:5`. No global stores. `window.hbspt` is relied upon after script injection in form components.
- **Circular imports:** None detected; dependencies flow one-way `src/app → src/components → src/lib`.
- **Server/client boundary:** Nearly all components are client components; only `page.jsx` wrappers and `layout.js` are server. Any new component with hooks/animations must start with `'use client'`.
- **No TypeScript:** The project is `.js`/`.jsx` only; `jsconfig.json` maps `@/*` → `./src/*` and is the only path alias configuration.
- **Static export history:** `out/` contains a static export snapshot (S3 + CloudFront target). `next.config.mjs` currently has `output: 'export'` commented out but retains S3 image `remotePatterns` (`flivv-web-cdn.s3.ap-south-1.amazonaws.com`).

## Anti-Patterns

### Monolithic Section Components

**What happens:** Single components of 700–1100 lines mix markup, Tailwind, inline `<style>` blocks, framer-motion, GSAP ScrollTrigger, and data fetching — e.g. `src/components/NSH20LandingPage.jsx` (1076 lines), `GulmoharHomes.jsx` (984), `NSHomes.jsx` (966), `EventCalendar.jsx` (960), `AirportTown.jsx` (733).
**Why it's wrong:** Hard to test, review, and reuse; any change to animation or data logic risks unrelated sections; components cannot be composed at a granular level.
**Do this instead:** Split into per-section components (as `RivendellHeader.jsx`/`RivendellAbout.jsx`/`RFSgallery.jsx` do for Rivendell Farms) and lift data fetching into hooks (`src/lib/useLenisScroll.js` style).

### Copy-Paste Progress Roadmaps

**What happens:** Five near-identical components (`GVProgressRoadmap.jsx`, `GHProgressRoadmap.jsx`, `ATProgressRoadmap.jsx`, `NSHdevprogress.jsx`, `NSH2devprogress.jsx`) differ only in the config block (SPREADSHEET_ID, SHEET_NAME, colors).
**Why it's wrong:** A bug fix must be repeated five times; drift is inevitable (see different `REFRESH_INTERVAL`/`parseDateVal` handling).
**Do this instead:** One parameterized `<ProgressRoadmap spreadsheetId={...} sheetName={...} />` component consuming a config map.

### `'use client'` Everywhere

**What happens:** Roughly 50 of 75 components in `src/components/` declare `'use client'`, including mostly-static sections that only need a single event listener.
**Why it's wrong:** The whole app hydrates client-side, negating App Router benefits (RSC streaming, smaller JS), and it silently grew as components were added.
**Do this instead:** Keep static sections server-rendered; add a client entry point only where interactivity begins (mirroring `AboutMD.jsx`'s `"use client"` at the top vs. small non-hook components).

### Commented-Out Config Blocks

**What happens:** `next.config.mjs` and `tailwind.config.js` retain large commented-out configs (export config, remotePatterns, plugins).
**Why it's wrong:** Ambiguous intent — future readers cannot tell whether static export or the S3 image setup is active.
**Do this instead:** Delete dead config; keep the S3 `remotePatterns` since `next/image` remote usage exists (`next.config.mjs:38`).

### Hardcoded Third-Party Identifiers

**What happens:** HubSpot portal/form IDs (`21626983`, `fe48d8bb-...`, etc.) and pixel IDs are hardcoded across `src/components/HubspotForm.jsx`, `RFSForm.jsx`, `EventFormPage.jsx`, `OmnRegistrationform.jsx`, `src/app/layout.js`.
**Why it's wrong:** Changing a form requires editing multiple files; secrets/pixel IDs are mixed with layout code.
**Do this instead:** Centralize in `src/lib/config.js` or env vars, imported by all form components.

### Mixed Hook Placement

**What happens:** Client hooks live in two places: `src/components/useScrollSpy.js`, `src/components/usePrefersReducedMotion.js` but `src/lib/useLenisScroll.js`.
**Why it's wrong:** Inconsistent; `components.json` even declares `"hooks": "@/hooks"` (no such dir exists).
**Do this instead:** Move all hooks to `src/lib/` or create `src/hooks/` per `components.json` and import from there.

## Error Handling

**Strategy:** Per-function try/catch with `console.error` and graceful fallback UI. No centralized error boundary or error logging service.

**Patterns:**
- API routes wrap every handler in `try/catch`, returning `{ error: '...' }` with 400/404/500 (`src/app/api/events/route.js:30`, `src/app/api/events/[id]/route.js:41`)
- File access failures degrade to `[]` (read) or `false` (write) with console logging (`src/lib/events.js:29`)
- SWR feeds render dedicated error/loading states: "Connection Error..." banner and spinner (`src/components/GVProgressRoadmap.jsx:74`)
- `EventCalendar.jsx` tracks `error` state from failed fetches and surfaces it in the UI
- HubSpot script load failures only log to console (e.g., `EventFormPage.jsx:41`)

## Cross-Cutting Concerns

**Logging:** `console.error` / `console.log` throughout; no structured logging or observability tooling.
**Validation:** Manual field-presence checks in `POST /api/events` (`src/app/api/events/route.js:44`); no schema library (zod/yup absent).
**Authentication:** None on `/api/events` — the calendar's admin CRUD is gated only by a client-side `enableAdmin` prop on `EventCalendar.jsx`. `/api/meta-events` uses server env secrets (`FACEBOOK_ACCESS_TOKEN`).
**Analytics/tracking:** GTM, GA4, HubSpot, Clarity, Meta Pixel injected in `src/app/layout.js`; Meta conversion events proxied through `pages/api/meta-events.js`.
**Environment config:** `.env.local` and `.env.production` files exist (contents not inspected); the only in-code reference is `process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID` (`src/app/layout.js:83`); the Meta proxy uses `FACEBOOK_PIXEL_ID` / `FACEBOOK_ACCESS_TOKEN`; the S3 tool uses `S3_BUCKET`, `S3_PREFIX`, `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` (`tools/generate-thumbs-upload.js:18`).

---

*Architecture analysis: 2026-08-01*
