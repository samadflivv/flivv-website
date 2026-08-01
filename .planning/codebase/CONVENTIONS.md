# Coding Conventions

**Analysis Date:** 2026-08-01

## Language & Tooling Baseline

- **Language:** Plain JavaScript (JSX) — **no TypeScript** anywhere in `src/`. No `.ts`/`.tsx` files exist; `jsconfig.json` (not `tsconfig.json`) defines the path aliases.
- **Framework:** Next.js 15 App Router (`src/app/`), React 18.
- **Path alias:** `@/*` → `./src/*` defined in `jsconfig.json`. Use `@/` for all internal imports — this is the one consistently followed rule in the codebase.
- **Linting:** None configured. No `.eslintrc*` file, `eslint` is NOT installed in `node_modules`, and no Prettier config (`.prettierrc*`) or `.editorconfig` exists. The `"lint": "next lint"` script in `package.json` is broken — `next lint` was removed in Next.js 15.2+ and the dependency is absent.
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"` in `src/app/globals.css`) with shadcn-style CSS variables (`@theme inline`, oklch colors). `components.json` declares shadcn "new-york" style with `tsx: false`.

## Naming Patterns

**Files:**
- Components: PascalCase `.jsx` — `Herosection.jsx`, `AboutpageHeroSection.jsx`, `FaqSection.jsx`, `PopupModal.jsx`. Note `AboutpageHeroSection` (uncapitalized "p" in "page") — naming is not normalized.
- Exceptions: `src/components/button.jsx` (lowercase, shadcn-generated), `src/components/AnimatedBTN.jsx` (abbreviation).
- Hooks: camelCase `useXxx.js` — `usePrefersReducedMotion.js`, `useScrollSpy.js` (also exports `useSmoothScroll`), `src/lib/useLenisScroll.js`.
- Pages: Next.js convention `page.js` / `page.jsx` per route directory. Extensions are mixed even within one directory: `src/app/` contains both `page.js` (home) and `page.jsx` (subroutes), plus `Home.jsx` as a shared section-composer.
- API routes: `route.js` in App Router (`src/app/api/events/route.js`, `src/app/api/events/[id]/route.js`); one legacy Pages Router handler `pages/api/meta-events.js`.

**Functions:**
- Event handlers prefixed `handle*` — `handleMouseMove`, `handleSubmit`, `handleAddEvent`, `handleEditEvent`, `handleDeleteEvent`, `handleMonthChange`, `closePopup` (exception).
- Data/derive helpers are plain `camelCase` functions — `getTypeColor`, `getTypeLabel`, `formatDateForInput`, `getCurrentDateTime`, `gvizFetcher`, `parseDateVal`, `clamp`.

**Variables:**
- camelCase throughout (`isVisible`, `mobileProjectsOpen`, `currentDate`, `filteredEvents`).
- `UPPER_SNAKE_CASE` for module-level constants — `API_BASE` (`EventCalendar.jsx`), `SPREADSHEET_ID`, `SHEET_NAME`, `REFRESH_INTERVAL`, `GVIZ_URL` (`GVProgressRoadmap.jsx`).

**Types:**
- Not applicable (no TypeScript). Component props are destructured inline at the function signature, e.g. `function Button({ className, variant, size, asChild = false, ...props })` in `src/components/button.jsx` and `({ event, onClick, isActive, priority = false })` in `src/components/EventCard.jsx`. Default props via destructuring defaults, not `defaultProps`.

## Component Definition Styles (3 coexist — pick one per file)

1. **Function declaration + default export** (most common in newer components):
```jsx
// src/components/Herosection.jsx
export default function Herosection() { ... }
```
Also `Home.jsx`, `Navigation.jsx`, `AnimatedBTN.jsx`, `GVProgressRoadmap.jsx`.

2. **Arrow function const + default export**:
```jsx
// src/components/Footer.jsx
const Footer = () => { ... }
export default Footer
```
Also `PopupModal.jsx`, `SmoothScrollWrapper.jsx`, `RFSForm.jsx`, `ScrollVideoSection.jsx`, `HubspotForm.jsx`.

3. **Named exports** (shadcn `button.jsx` and lib functions):
```jsx
// src/components/button.jsx
export { Button, buttonVariants }
```
Hooks use named exports: `export const useScrollSpy = ...` (`src/components/useScrollSpy.js`), `export const usePrefersReducedMotion = ...` (`src/components/usePrefersReducedMotion.js`).

**Prescription:** For new page-section components use style 1 (`export default function Name()`); for new hooks/lib modules use named exports (`export const`); keep shadcn `ui/*` components in style 3.

## Client vs Server Components

- Add `'use client'` (single quotes preferred) as the **first line** of any component that uses hooks, event handlers, or browser APIs. 52 of ~57 component files are client components.
- Server components are the thin `page.js`/`page.jsx` wrappers that import client sections and compose them, e.g. `src/app/page.js` and `src/app/about/page.jsx`:
```jsx
// src/app/about/page.jsx
import AboutMD from '@/components/AboutMD'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
// ...compose sections...
```
- Quote style for the directive is mixed (`"use client"` in `src/components/PopupModal.jsx`, `src/lib/useLenisScroll.js`); prefer single quotes for new files.
- Wrap client components that call `useSearchParams()` in `<Suspense>` in the parent server page — pattern in `src/app/salesmeets/page.jsx` with a `EventCalendarLoading` fallback.

## Code Style

**Formatting:**
- No formatter configured. Existing files are hand-formatted: 2-space indent, JSX attributes on one line when short, broken onto separate lines when long.
- Semicolons: **mixed and inconsistent.** `src/lib/useScrollSpy.js` and `src/lib/events.js` use semicolons; `Footer.jsx`, `page.js`, `Navigation.jsx` mostly omit them. `EventCalendar.jsx` mixes both within one file. Pick one (omit — the majority style in pages/components) and stay consistent.

**Quotes:**
- Double quotes dominate overall (≈10,600 double vs ≈3,300 single across `src/`), but the split is **per-file and inconsistent**: `Home.jsx`, `EventCalendar.jsx`, `PopupModal.jsx` use double quotes; `Navigation.jsx`, `Footer.jsx`, `EventCard.jsx`, `Herosection.jsx` use single quotes for imports/strings. JSX attributes are always double-quoted. Prefer double quotes for new files (majority), single quotes are also acceptable — do not mix within one file.

**Linting:**
- None enforced. `npm run lint` fails (see Language & Tooling Baseline). Recommended: add `eslint@9` + `eslint-config-next` and replace the script with `"lint": "eslint ."`.

## Import Organization

Observed order (not strictly enforced):
1. React (`import React from 'react'` / `import { useState, useEffect } from 'react'`)
2. Next.js (`next/link`, `next/navigation`, `next/script`, `next/font/google` in `src/app/layout.js`)
3. Third-party libs (alphabetical-ish): `framer-motion`, `gsap`, `date-fns`, `lucide-react`, `react-country-flag`, `swr`, `class-variance-authority`
4. Internal `@/` imports (alphabetical)
5. Local `./` relative imports (rare — mostly avoided)

Example from `src/app/salesmeets/page.jsx`:
```jsx
import { Suspense } from 'react'
import EventCalendar from '@/components/EventCalendar'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
```

**Path Aliases:**
- `@/components/*` — shared components
- `@/lib/*` — utilities (`@/lib/utils` for `cn`, `@/lib/events` for data layer)
- `@/app/*` — cross-page imports (e.g. `import Home from '@/app/Home'` in `src/app/page.js`)
- Never use relative `../../` imports for cross-directory code.

## Error Handling

**API route handlers** (`src/app/api/events/route.js`, `src/app/api/events/[id]/route.js`, `pages/api/meta-events.js`):
- Whole-handler `try/catch`; catch logs `console.error('<METHOD> error:', error)` and returns JSON error response.
- Status codes: `400` validation, `404` not found, `405` wrong method, `500` internal, `201` created, `200` success.
- Response shape: `new Response(JSON.stringify({ error: '...' }), { status, headers: { 'Content-Type': 'application/json' } })`.
- Field validation is manual array loop over `requiredFields` (`route.js` POST).

**Client components** (`src/components/EventCalendar.jsx`):
- `try/catch` around async handlers → `console.error` + `alert(err.message)` for user feedback.
- Loading + error UI states with a Retry button (`fetchEvents` re-invoked).
- Bare `catch {}` / `catch { return false }` used for tolerant date parsing in calendar logic.
- Avoid swallowing errors: `src/components/RFSForm.jsx` uses empty `catch (e) {}` blocks — do not copy this.

**Data layer** (`src/lib/events.js`):
- `try/catch` with `console.error` and graceful fallback values (`return []`, `return false`).

**Error-handling prescription:** Server handlers → keep try/catch + JSON error responses. Client components → prefer inline error state (`useState`) rendered in the UI over `alert()` (used only in `EventCalendar.jsx`; the rest of the site has no such pattern). Never use empty catches.

## Logging

- No logging framework. Use `console.error` for failures (24 occurrences), `console.log` sparingly (5), `console.warn` occasionally (3).
- Prefix server logs with context: `'GET error:'`, `'POST error:'`, `'Error fetching events:'`.
- `src/app/layout.js` injects GTM/GA4/HubSpot/Clarity/Meta Pixel scripts via `next/script` — no application-level analytics logging in code.

## Comments

- **File-header comments** on shared modules: `// lib/events.js`, `// app/api/events/route.js`, `// EventCard.jsx`, `// components/ScrollVideo.jsx`.
- **Section comments** inside JSX: `{/* Header */}`, `{/* Main Content */}`, `{/* Projects Mega Menu */}`, `{/* Desktop Menu */}`.
- **JSDoc-style block comments** on custom hooks:
```js
// src/components/useScrollSpy.js
/**
 * Custom hook for scrollspy functionality
 */
```
- **UPPERCASE section banners** in data-driven components: `/* ======= CONFIG ======= */` in `src/components/GVProgressRoadmap.jsx`.
- **Anti-pattern — dead code in comments:** large commented-out blocks remain in source: `src/components/Footer.jsx` (lines 1–78), `next.config.mjs` (entire file commented), `tailwind.config.js` (top block), `src/components/Navigation.jsx` (commented menu items). Remove dead code instead of commenting it out.

## Function Design

**Size:** No formal limit, but several files are very large single components: `src/components/NSH20LandingPage.jsx` (1076 lines), `src/components/GulmoharHomes.jsx` (984), `src/components/EventCalendar.jsx` (1033 — contains 3 components + modal). Prefer extracting sibling components into the same file (the existing pattern) or separate files once a file passes ~500 lines.

**Parameters:** Props destructured at signature with defaults. Callbacks passed down as props (`onEdit`, `onDelete`, `onDuplicate`, `onSave` — see `EventCalendar.jsx` → `EventCard`).

**Return Values:** Components return JSX; hooks return primitives/objects (`useScrollSpy` returns `activeSection` string, `useSmoothScroll` returns `{ scrollTo }`); data-layer functions return plain data or `false`/`[]` on failure (`src/lib/events.js`).

**Memoization:** Complex components memoize handlers with `useCallback` and derived data with `useMemo` — `src/components/EventCalendar.jsx` (fetch, CRUD handlers, calendar days, filtered events, page title) and `src/components/GVProgressRoadmap.jsx` (row parsing). Simple components skip it (`PopupModal.jsx`, `Navigation.jsx`).

## Module Design

**Exports:** One default export per component file. `button.jsx` and hooks are the named-export exceptions. `src/lib/utils.js` exports `cn(...inputs)` (clsx + tailwind-merge) — the shadcn utility used in `button.jsx`.

**Barrel files:** None. No `index.js` re-export files; import directly from file paths.

**Sibling components in one file:** Common pattern — `EventCalendar.jsx` defines `EventCard` and `AddEditEventModal` in the same file; helper render functions co-located (`getTypeColor`, `formatDateForInput`).

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

---

*Convention analysis: 2026-08-01*
