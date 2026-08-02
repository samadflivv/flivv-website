<!-- GSD:project-start source:PROJECT.md -->

## Project

**Flivv Developers Website**

Public marketing website for Flivv Developers, a real-estate developer, showcasing every project the company manages. It's a Next.js 15 (plain JavaScript) static-export site on S3/CloudFront with ~21 routes — project showcase pages, an event calendar, construction-progress dashboards, and enquiry forms. New projects are added to the site by building new project pages; existing pages are updated frequently.

**Core Value:** Visitors can quickly understand each project Flivv manages — what it is, where it is, how construction is progressing, and how to enquire — and adding a new project must be fast and low-risk.

### Constraints

- **Tech stack**: Next.js 15 + React 18, plain JS/JSX, Tailwind v4 — do not introduce TypeScript or a different framework.
- **Hosting**: Static export to S3 + CloudFront — API routes and dynamic features must not depend on a Node server at runtime beyond what already exists.
- **Performance**: Existing repo already carries heavy images; template sections must use `next/image` and the existing S3 manifest pipeline, not add more unoptimized assets.
- **Security**: Keep the public site safe; do not expand the unauthenticated API surface in v1.
- **Compatibility**: Must preserve the ~21 existing routes and their URLs (live site, indexed) when migrating pages onto the template.

<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->

## Technology Stack

## Languages

- JavaScript (ES Modules) - all source code in `src/` uses `.js`/`.jsx`; the project is not TypeScript (no `tsconfig.json`, uses `jsconfig.json` instead)
- CSS - Tailwind v4 CSS-first configuration in `src/app/globals.css`
- JSON - config and data files (`package.json`, `components.json`, `data/events.json`)

## Runtime

- Node.js - required for Next.js; no pinned version (no `.nvmrc`, `.node-version`, or `engines` field in `package.json`)
- npm
- Lockfile: `package-lock.json` present (lockfileVersion 3)

## Frameworks

- Next.js 15.5.9 (installed; `package.json` declares `^15.3.6`) - App Router, static export workflow (`out/` directory produced by prior `next build`)
- React 18.2.0 (`react` and `react-dom` pinned at 18.2.0)
- Not detected - no test framework, no `*.test.*`/`*.spec.*` files, no jest/vitest config
- Tailwind CSS 4.1.18 - CSS-first styling via `@tailwindcss/postcss` plugin in `postcss.config.mjs`; legacy `tailwind.config.js` still present but content globs only cover `pages/**` and `components/**` (does not include `src/**`)
- shadcn/ui - `components.json` (style: new-york, RSC enabled, no TSX) with aliases `@/components`, `@/lib/utils`, `@/components/ui`, `@/lib`, `@/hooks`
- next/font - Geist and Geist_Mono loaded in `src/app/layout.js`

## Key Dependencies

- `next` ^15.3.6 (15.5.9 installed) - framework; `next.config.mjs` configures `images.remotePatterns` for `flivv-web-cdn.s3.ap-south-1.amazonaws.com`
- `react` / `react-dom` 18.2.0 - UI runtime
- `@aws-sdk/client-s3` ^3.930.0 - S3 uploads for media pipeline (`tools/generate-thumbs-upload.js`)
- `tailwindcss` ^4.1.18 - styling engine
- `framer-motion` ^12.23.26 - page/section animations (used across `src/components/*.jsx`)
- `gsap` ^3.13.0 - advanced scroll/video animations (`src/components/ScrollVideoSection.jsx`, etc.)
- `@studio-freight/lenis` ^1.0.42 - smooth scrolling (`src/lib/useLenisScroll.js`, `src/components/SmoothScrollWrapper.jsx`)
- `lucide-react` ^0.503.0 - icon library (configured in `components.json` as `iconLibrary: "lucide"`)
- `@radix-ui/react-slot` ^1.2.0, `class-variance-authority` ^0.7.1, `clsx` ^2.1.1, `tailwind-merge` ^3.2.0 - shadcn/ui primitives (`src/components/button.jsx`, `src/lib/utils.js` `cn()` helper)
- `swr` ^2.4.0 - client-side data fetching with polling (`src/components/*ProgressRoadmap.jsx` use `useSWR` with 20s refresh)
- `axios` ^1.11.0 - HTTP client for Meta CAPI (`pages/api/meta-events.js`)
- `date-fns` ^4.1.0 - event date handling (`src/app/api/events/route.js`, `src/lib/events.js`)
- `crypto-js` ^4.2.0 - SHA256 hashing of emails for Meta Pixel CAPI (`pages/api/meta-events.js`)
- `uuid` ^11.1.0 - event_id generation (`pages/api/meta-events.js`)
- `lodash` ^4.17.21 - general utilities
- `sharp` ^0.34.5 - server-side image resize/thumbnail generation (`tools/generate-thumbs-upload.js`)
- `glob` ^11.0.3 - file discovery in tools
- `mime-types` ^3.0.1 - content-type lookup in upload tool
- `react-country-flag` ^3.1.0 - country flags in event UI (`src/components/EventCalendar.jsx`)
- `react-router-dom` ^7.5.2 - declared dependency, used for in-app navigation patterns
- `@tailwindcss/forms` ^0.5.11, `@tailwindcss/typography` ^0.5.19, `@tailwindcss/postcss` ^4, `tw-animate-css` ^1.2.8

## Configuration

- `.env.local` and `.env.production` present (git-ignored via `.gitignore` `*.env*` pattern; contents not inspected)
- Env vars referenced in code: `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` (`src/app/layout.js`), `FACEBOOK_PIXEL_ID` + `FACEBOOK_ACCESS_TOKEN` (`pages/api/meta-events.js`), `S3_BUCKET`, `S3_PREFIX`, `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` (`tools/generate-thumbs-upload.js`)
- `next.config.mjs` - images remotePatterns only (static-export config is commented out in the file)
- `postcss.config.mjs` - `@tailwindcss/postcss`
- `jsconfig.json` - path alias `@/*` → `./src/*`
- `components.json` - shadcn/ui aliases and icon library
- `tailwind.config.js` - legacy config with custom colors (`workshop`, `lecture`, `meetup`, `conference`, `sales`) and backdrop-blur scale
- No ESLint or Prettier config files detected (`.eslintrc*`, `eslint.config.*`, `.prettierrc*` absent); `package.json` has a `lint` script (`next lint`)
- No CI workflow files - `.github/workflows/` exists but is empty

## Platform Requirements

- `npm run dev` (Next.js dev server), `npm run build`, `npm run start`, `npm run lint`
- Default port 3000
- Static export (Next.js `output: 'export'` configuration is commented out in `next.config.mjs` but the `out/` directory contains a prior full static build) hosted on AWS S3 + CloudFront
- Deployment infrastructure configs at repo root: `cloudfront-config.json`, `dist-config-with-logging.json`, `bucket-policy.json`, `lightsail-cors.json`, `waf-rules.json`, `webacl.json` (empty)
- Live site: `flivvdevelopers.com`

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

## Language & Tooling Baseline

- **Language:** Plain JavaScript (JSX) — **no TypeScript** anywhere in `src/`. No `.ts`/`.tsx` files exist; `jsconfig.json` (not `tsconfig.json`) defines the path aliases.
- **Framework:** Next.js 15 App Router (`src/app/`), React 18.
- **Path alias:** `@/*` → `./src/*` defined in `jsconfig.json`. Use `@/` for all internal imports — this is the one consistently followed rule in the codebase.
- **Linting:** None configured. No `.eslintrc*` file, `eslint` is NOT installed in `node_modules`, and no Prettier config (`.prettierrc*`) or `.editorconfig` exists. The `"lint": "next lint"` script in `package.json` is broken — `next lint` was removed in Next.js 15.2+ and the dependency is absent.
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"` in `src/app/globals.css`) with shadcn-style CSS variables (`@theme inline`, oklch colors). `components.json` declares shadcn "new-york" style with `tsx: false`.

## Naming Patterns

- Components: PascalCase `.jsx` — `Herosection.jsx`, `AboutpageHeroSection.jsx`, `FaqSection.jsx`, `PopupModal.jsx`. Note `AboutpageHeroSection` (uncapitalized "p" in "page") — naming is not normalized.
- Exceptions: `src/components/button.jsx` (lowercase, shadcn-generated), `src/components/AnimatedBTN.jsx` (abbreviation).
- Hooks: camelCase `useXxx.js` — `usePrefersReducedMotion.js`, `useScrollSpy.js` (also exports `useSmoothScroll`), `src/lib/useLenisScroll.js`.
- Pages: Next.js convention `page.js` / `page.jsx` per route directory. Extensions are mixed even within one directory: `src/app/` contains both `page.js` (home) and `page.jsx` (subroutes), plus `Home.jsx` as a shared section-composer.
- API routes: `route.js` in App Router (`src/app/api/events/route.js`, `src/app/api/events/[id]/route.js`); one legacy Pages Router handler `pages/api/meta-events.js`.
- Event handlers prefixed `handle*` — `handleMouseMove`, `handleSubmit`, `handleAddEvent`, `handleEditEvent`, `handleDeleteEvent`, `handleMonthChange`, `closePopup` (exception).
- Data/derive helpers are plain `camelCase` functions — `getTypeColor`, `getTypeLabel`, `formatDateForInput`, `getCurrentDateTime`, `gvizFetcher`, `parseDateVal`, `clamp`.
- camelCase throughout (`isVisible`, `mobileProjectsOpen`, `currentDate`, `filteredEvents`).
- `UPPER_SNAKE_CASE` for module-level constants — `API_BASE` (`EventCalendar.jsx`), `SPREADSHEET_ID`, `SHEET_NAME`, `REFRESH_INTERVAL`, `GVIZ_URL` (`GVProgressRoadmap.jsx`).
- Not applicable (no TypeScript). Component props are destructured inline at the function signature, e.g. `function Button({ className, variant, size, asChild = false, ...props })` in `src/components/button.jsx` and `({ event, onClick, isActive, priority = false })` in `src/components/EventCard.jsx`. Default props via destructuring defaults, not `defaultProps`.

## Component Definition Styles (3 coexist — pick one per file)

## Client vs Server Components

- Add `'use client'` (single quotes preferred) as the **first line** of any component that uses hooks, event handlers, or browser APIs. 52 of ~57 component files are client components.
- Server components are the thin `page.js`/`page.jsx` wrappers that import client sections and compose them, e.g. `src/app/page.js` and `src/app/about/page.jsx`:
- Quote style for the directive is mixed (`"use client"` in `src/components/PopupModal.jsx`, `src/lib/useLenisScroll.js`); prefer single quotes for new files.
- Wrap client components that call `useSearchParams()` in `<Suspense>` in the parent server page — pattern in `src/app/salesmeets/page.jsx` with a `EventCalendarLoading` fallback.

## Code Style

- No formatter configured. Existing files are hand-formatted: 2-space indent, JSX attributes on one line when short, broken onto separate lines when long.
- Semicolons: **mixed and inconsistent.** `src/lib/useScrollSpy.js` and `src/lib/events.js` use semicolons; `Footer.jsx`, `page.js`, `Navigation.jsx` mostly omit them. `EventCalendar.jsx` mixes both within one file. Pick one (omit — the majority style in pages/components) and stay consistent.
- Double quotes dominate overall (≈10,600 double vs ≈3,300 single across `src/`), but the split is **per-file and inconsistent**: `Home.jsx`, `EventCalendar.jsx`, `PopupModal.jsx` use double quotes; `Navigation.jsx`, `Footer.jsx`, `EventCard.jsx`, `Herosection.jsx` use single quotes for imports/strings. JSX attributes are always double-quoted. Prefer double quotes for new files (majority), single quotes are also acceptable — do not mix within one file.
- None enforced. `npm run lint` fails (see Language & Tooling Baseline). Recommended: add `eslint@9` + `eslint-config-next` and replace the script with `"lint": "eslint ."`.

## Import Organization

- `@/components/*` — shared components
- `@/lib/*` — utilities (`@/lib/utils` for `cn`, `@/lib/events` for data layer)
- `@/app/*` — cross-page imports (e.g. `import Home from '@/app/Home'` in `src/app/page.js`)
- Never use relative `../../` imports for cross-directory code.

## Error Handling

- Whole-handler `try/catch`; catch logs `console.error('<METHOD> error:', error)` and returns JSON error response.
- Status codes: `400` validation, `404` not found, `405` wrong method, `500` internal, `201` created, `200` success.
- Response shape: `new Response(JSON.stringify({ error: '...' }), { status, headers: { 'Content-Type': 'application/json' } })`.
- Field validation is manual array loop over `requiredFields` (`route.js` POST).
- `try/catch` around async handlers → `console.error` + `alert(err.message)` for user feedback.
- Loading + error UI states with a Retry button (`fetchEvents` re-invoked).
- Bare `catch {}` / `catch { return false }` used for tolerant date parsing in calendar logic.
- Avoid swallowing errors: `src/components/RFSForm.jsx` uses empty `catch (e) {}` blocks — do not copy this.
- `try/catch` with `console.error` and graceful fallback values (`return []`, `return false`).

## Logging

- No logging framework. Use `console.error` for failures (24 occurrences), `console.log` sparingly (5), `console.warn` occasionally (3).
- Prefix server logs with context: `'GET error:'`, `'POST error:'`, `'Error fetching events:'`.
- `src/app/layout.js` injects GTM/GA4/HubSpot/Clarity/Meta Pixel scripts via `next/script` — no application-level analytics logging in code.

## Comments

- **File-header comments** on shared modules: `// lib/events.js`, `// app/api/events/route.js`, `// EventCard.jsx`, `// components/ScrollVideo.jsx`.
- **Section comments** inside JSX: `{/* Header */}`, `{/* Main Content */}`, `{/* Projects Mega Menu */}`, `{/* Desktop Menu */}`.
- **JSDoc-style block comments** on custom hooks:
- **UPPERCASE section banners** in data-driven components: `/* ======= CONFIG ======= */` in `src/components/GVProgressRoadmap.jsx`.
- **Anti-pattern — dead code in comments:** large commented-out blocks remain in source: `src/components/Footer.jsx` (lines 1–78), `next.config.mjs` (entire file commented), `tailwind.config.js` (top block), `src/components/Navigation.jsx` (commented menu items). Remove dead code instead of commenting it out.

## Function Design

## Module Design

## State Management & Data Fetching

- **Local state only:** `useState`/`useEffect`/`useRef`. No Context, Redux, Zustand, or React Query. `useMemo`/`useCallback` for derived values.
- **URL params as state:** `EventCalendar.jsx` reads `?country=` via `useSearchParams` and clears it via `router.push(pathname)`.
- **Session state:** `PopupModal.jsx` uses `sessionStorage` key `popupShown` for once-per-session display.
- **SWR data fetching:** `useSWR` with a custom fetcher and `refreshInterval` in the 5 progress-roadmap components: `src/components/GVProgressRoadmap.jsx`, `GHProgressRoadmap.jsx`, `ATProgressRoadmap.jsx`, `NSHdevprogress.jsx`, `NSH2devprogress.jsx`. Fetcher throws on `!res.ok` and returns parsed data.
- **Native fetch:** `src/components/EventCalendar.jsx` uses `fetch` with `cache: 'no-store'` against `/api/events`.

## Styling Patterns

- Tailwind utility classes inline on elements; arbitrary values heavily used: `bg-[#03045e]`, `bg-[#0192D3]`, `bg-[#ff002b]`, `py-35`, `w-[95%]`.
- Template-literal className composition with conditional `${...}` (260 template literals in `src/`), e.g. `src/components/Navigation.jsx` lines 77–79 and `EventCard.jsx` lines 61–65.
- `cn()` (`src/lib/utils.js`) reserved for shadcn-style components (`src/components/button.jsx`); section components use raw template literals.
- Brand colors via `tailwind.config.js` `theme.extend.colors` (`workshop`, `lecture`, `meetup`, `conference`, `sales`) — defined but rarely used; components hardcode hex arbitrary values instead.
- Event-type color maps: lookup objects keyed by type string with fallback, e.g. `getTypeColor` in `src/components/EventCard.jsx` and `EventCalendar.jsx`.

## Animation Conventions

- **framer-motion** (~30 files): `motion.div` with `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true }}`, `whileHover`, `whileTap`, `AnimatePresence` — see `src/components/EventCard.jsx`, `GVProgressRoadmap.jsx`.
- **GSAP + ScrollTrigger** (~12 files): registered at module scope (`gsap.registerPlugin(ScrollTrigger)` in `src/components/ScrollVideoSection.jsx`); cleanup via `ScrollTrigger.getAll().forEach(t => t.kill())` in effect teardown.
- **Lenis smooth scroll:** `src/lib/useLenisScroll.js` instantiated once in `src/components/SmoothScrollWrapper.jsx`, which wraps `{children}` in `src/app/layout.js`.
- **Reduced motion:** hook `usePrefersReducedMotion` exists (`src/components/usePrefersReducedMotion.js`) but is not referenced by animation components.
- **Video handling:** refs + `IntersectionObserver` to pause/play (`src/components/Herosection.jsx`); GSAP scrub timeline drives `video.currentTime` (`ScrollVideoSection.jsx`).

## Forms

- **HubSpot embeds** for lead capture: script injected in `useEffect` (`src/components/RFSForm.jsx`, `PopupModal.jsx`) or `next/script` + `window.hbspt.forms.create` polling (`src/components/EventFormPage.jsx`); target div `.hs-form-frame` with `data-form-id`/`data-portal-id`.
- **Manual form state** for the events admin modal: single `formData` object + `handleChange` reading `e.target.name` (`src/components/EventCalendar.jsx` `AddEditEventModal`). No react-hook-form / zod anywhere.
- **Meta pixel proxy:** `pages/api/meta-events.js` POSTs hashed email (`crypto-js/sha256`) + event data to Graph API v18.0.

## Accessibility

- `EventCard.jsx` is the only component with deliberate a11y: `role="button"`, `tabIndex={0}`, `onKeyDown` Enter/Space, `aria-label`s.
- Everything else uses native `<button>`/`<a>` elements with visible text — no form labels (`label` elements are used in the events modal), no `alt` text gaps on marketing imagery.

## Git Conventions

- Branch: `main` only. Commit messages are terse single words ("changes", "events", "evtform", "evt2", "evts", "faqs", "gmt") — no convention enforced; prefer short imperative descriptions for new work.

<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

## System Overview

```text

```

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

- `'use client'` at the top of ~50 of 75 components in `src/components/`; server components are limited to `src/app/*/page.jsx` wrappers and `src/app/layout.js`
- Route pages are purely compositional (5–30 lines): import, render `<Navigation/>`, section component(s), `<Footer/>`
- Section components are self-contained monoliths (300–1100 lines) bundling markup, Tailwind classes, framer-motion/GSAP animation, inline styles, and data fetching
- Static export to S3/CloudFront (`out/` directory exists; `next.config.mjs` has the `output: 'export'` block commented out) — the S3 bucket hosts the same routes the app router defines
- API surface is minimal: one CRUD resource (`/api/events`) plus one third-party proxy (`/api/meta-events` via Pages Router)

## Layers

- Purpose: Declare routes and compose page sections
- Location: `src/app/**/page.jsx`, `src/app/layout.js`, `src/app/page.js`
- Contains: JSX wrappers only; no data fetching, no business logic
- Depends on: `src/components/*`
- Used by: Next.js router
- Purpose: All UI, animation, form embedding, and client-side data fetching
- Location: `src/components/` (75 files)
- Contains: Section components (`*.jsx`), shared UI (`Navigation.jsx`, `Footer.jsx`, `PopupModal.jsx`, `button.jsx`), client hooks (`useScrollSpy.js`, `usePrefersReducedMotion.js`)
- Depends on: `src/lib/*`, framer-motion, GSAP, Lenis, SWR, lucide-react, Tailwind
- Used by: Route layer
- Purpose: Server-side file persistence for events
- Location: `src/lib/events.js`
- Contains: `readEvents()`, `writeEvents()` using `fs` against `data/events.json`
- Depends on: Node `fs`/`path` (server-only)
- Used by: `src/app/api/events/route.js`, `src/app/api/events/[id]/route.js`
- Purpose: HTTP endpoints for client consumption
- Location: `src/app/api/events/route.js` (GET/POST), `src/app/api/events/[id]/route.js` (PUT/DELETE), `pages/api/meta-events.js` (POST proxy)
- Contains: Route handlers; manual JSON parsing; no framework validation
- Depends on: `src/lib/events.js`, `axios`, `crypto-js`, `uuid`
- Used by: Client components (`EventCalendar.jsx`), tracking code

## Data Flow

### Primary Request Path (page render)

### Events flow (CRUD)

### Progress dashboard flow

### Meta conversion flow

### Image manifest flow (S3 gallery)

- No global state library. Component-local `useState`/`useEffect` only.
- Server state via `swr` for the Google Sheets feed and manual `fetch` + `useState` for `/api/events`.
- The event JSON file is the single source of truth for the calendar (updated in place, no versioning).

## Key Abstractions

- Purpose: Uniform page skeleton across the site
- Examples: `src/app/projects/page.jsx`, `src/app/sukoonvillas/page.jsx`, `src/app/contact/page.jsx`
- Pattern: Server component → `<Navigation/>` + section components + `<Footer/>`
- `useScrollSpy` / `useSmoothScroll` — scrollspy + programmatic scroll with optional GSAP (`src/components/useScrollSpy.js`)
- `usePrefersReducedMotion` — motion-preference detection (`src/components/usePrefersReducedMotion.js`)
- `useLenisScroll` — smooth scrolling lifecycle (`src/lib/useLenisScroll.js`)
- Local `useInView` in `FlivvConnectPage.jsx` for lazy image loading
- Purpose: Per-project construction progress dashboards fed by a shared Google Sheet
- Examples: `src/components/GVProgressRoadmap.jsx`, `GHProgressRoadmap.jsx`, `ATProgressRoadmap.jsx`, `NSHdevprogress.jsx`, `NSH2devprogress.jsx`
- Pattern: Copy-pasted component with a different `SPREADSHEET_ID` / `SHEET_NAME` config block at the top
- Purpose: Embed HubSpot portal forms without a backend
- Examples: `src/components/HubspotForm.jsx`, `RFSForm.jsx`, `EventFormPage.jsx`, `OmnRegistrationform.jsx`
- Pattern: Inject `js.hsforms.net` script, call `window.hbspt.forms.create({ portalId: '21626983', formId: '...', target: '#...' })`
- `cn(...inputs)` — `clsx` + `tailwind-merge` (`src/lib/utils.js`), used by shadcn-style components (`src/components/button.jsx`)

## Entry Points

- Location: `src/app/layout.js`
- Triggers: Every page in the app
- Responsibilities: Fonts (Geist via `next/font/google`), `globals.css`, GTM (`GTM-TGRWCJ9M`), GA4 (`G-2EBCG8YCRC`), HubSpot tracking (`21626983.js`), Microsoft Clarity, Meta Pixel (`NEXT_PUBLIC_FACEBOOK_PIXEL_ID`), and the `<SmoothScrollWrapper>` around `{children}`
- Location: `src/app/page.js` → `src/app/Home.jsx`
- Responsibilities: `<PopupModal/>` + landing composition
- `GET/POST /api/events` — `src/app/api/events/route.js`
- `PUT/DELETE /api/events/[id]` — `src/app/api/events/[id]/route.js`
- `POST /api/meta-events` (Pages Router) — `pages/api/meta-events.js`
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

### Copy-Paste Progress Roadmaps

### `'use client'` Everywhere

### Commented-Out Config Blocks

### Hardcoded Third-Party Identifiers

### Mixed Hook Placement

## Error Handling

- API routes wrap every handler in `try/catch`, returning `{ error: '...' }` with 400/404/500 (`src/app/api/events/route.js:30`, `src/app/api/events/[id]/route.js:41`)
- File access failures degrade to `[]` (read) or `false` (write) with console logging (`src/lib/events.js:29`)
- SWR feeds render dedicated error/loading states: "Connection Error..." banner and spinner (`src/components/GVProgressRoadmap.jsx:74`)
- `EventCalendar.jsx` tracks `error` state from failed fetches and surfaces it in the UI
- HubSpot script load failures only log to console (e.g., `EventFormPage.jsx:41`)

## Cross-Cutting Concerns

<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
