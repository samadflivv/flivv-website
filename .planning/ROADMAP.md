# Roadmap: Flivv Developers Website

## Overview

This milestone turns an existing hand-built 21-route marketing site (Next.js 15, plain JS, S3/CloudFront) into a data-driven, self-deploying one. We start by making the repo healthy — ESLint gate, documented environment variables, and events data frozen as a build-time input (no runtime writes, no unauthenticated write API). Next we unify the five copy-pasted GViz progress dashboards into one config-driven component while preserving live Google Sheets data and fixing visible per-project bugs. With progress unified, we build the data-driven project template (content data model, section registry, per-project SEO metadata, sitemap) and migrate all 8 project pages onto it without changing a single URL. Finally we ship the CI/CD pipeline to S3/CloudFront with tiered cache headers, real 404s, clean-URL rewriting, and a read-only events snapshot — verifying route parity, cache behavior, and tracking after deploy.

## Phases

- [ ] **Phase 1: Foundation & Hygiene** - ESLint gate, `.env.example`, and events data frozen as a build-time input (write API + admin UI retired)
- [ ] **Phase 2: Progress Unification** - One configurable GViz progress component replaces the five copy-pasted ones; live data preserved
- [ ] **Phase 3: Project Template & Migration** - Data-driven project template + section registry; all 8 project pages migrate with identical URLs
- [ ] **Phase 4: CI/CD, CDN & Events Snapshot** - Automated deploy to S3/CloudFront with correct caching, real 404s, clean URLs, and a read-only events calendar

## Phase Details

### Phase 1: Foundation & Hygiene
**Goal**: The repo is lint-clean, its required environment variables are documented, and events data can no longer be mutated at runtime — the events write API and admin UI are retired so `data/events.json` stays a clean committed input and deploys can never fail on a dirty tree.
**Mode**: mvp
**Depends on**: Nothing (first phase)
**Requirements**: HYGN-01, HYGN-02, HYGN-03, EVNT-03, EVNT-04
**Success Criteria** (what must be TRUE):
  1. Developer can run `npm run lint` and it passes — ESLint is installed, configured, and usable as a gate.
  2. New developer can discover every required env var (pixel ID, Meta access token, S3/CDN settings) in `.env.example`; a production build never bakes `fbq('init', undefined)`.
  3. `data/events.json` is never written at runtime — POST/PUT/DELETE endpoints and admin CRUD controls are removed, so no event edit dirties the git working tree.
  4. Visitor can still view the event calendar on the sales-meets page, now read-only without admin controls.
**Plans**: 3 plans

Plans:
- [ ] 01-01: Install and configure ESLint (`eslint` + `eslint-config-next`), fix existing lint failures, verify `npm run lint` passes
- [ ] 01-02: Add `.env.example` documenting all required vars; harden layout.js pixel handling against missing env
- [ ] 01-03: Retire `/api/events` write routes and admin CRUD UI; make `data/events.json` a build-time input (no runtime mutation, committed seed)

### Phase 2: Progress Unification
**Goal**: All five project dashboards run on one configurable progress component fed by live Google Sheets GViz data, with per-project config in project data and a visible last-updated timestamp — no visible regression on any live page.
**Mode**: mvp
**Depends on**: Phase 1
**Requirements**: PROG-01, PROG-02, PROG-03, PROG-04, PROG-05
**Success Criteria** (what must be TRUE):
  1. Visitor sees live construction progress on all five project pages, each polling Google Sheets GViz from one shared component (one fetch/parse module).
  2. Each dashboard shows the correct project name, sheet data, and accent color — no more "Syncing Gulmohar Homes Data..." on Gulmohar Villas or Airport Town.
  3. Each dashboard shows a visible "last updated" timestamp.
  4. Developer can change a project's sheet ID, sheet name, refresh interval, labels, or colors in one config place — defaults match current live values and real tab names were verified against the spreadsheets first — and all dashboards keep working.
**Plans**: 2 plans
**UI hint**: yes

Plans:
- [ ] 02-01: Catalog divergences across the five components; verify real Google Sheets tab names; extract per-instance config with current live values as defaults
- [ ] 02-02: Build unified `ProjectProgress` component + shared `src/lib/gviz.js` fetch/parse module; swap all five pages; per-instance snapshot checks; add last-updated timestamp

### Phase 3: Project Template & Migration
**Goal**: Adding a project = adding one content data file. A generic template renders every project's sections from data via a section registry, all 8 existing project pages migrate onto it with identical URLs and no lost content, and every project gets unique metadata plus a sitemap.
**Mode**: mvp
**Depends on**: Phase 2
**Requirements**: TMPL-01, TMPL-02, TMPL-03, TMPL-04, SECT-01, SECT-02, SECT-03, SECT-04, SECT-05, SECT-06, SECT-07, SECT-08, SECT-09, SECT-10, SEO-01, SEO-02
**Success Criteria** (what must be TRUE):
  1. Developer adds a new project by writing one schema-validated data file; the route is derived automatically (`[slug]` + `generateStaticParams`) — no component, no route file, no nav edit.
  2. Visitor sees all 8 project pages render from the template at identical URLs (`/nshomes`, `/gulmoharhomes`, ...) with hero, highlights, overview, gallery, amenities, map, pricing, and CTA — plus live progress from Phase 2 — with no lost content; sections with no data render nothing.
  3. Every project page has unique title/description/OG metadata in the browser tab and share cards; `sitemap.xml` lists all routes.
  4. A bad project entry (missing required field, unknown section key, slug colliding with a static route) fails the build with a readable message naming the project and field.
**Plans**: 3 plans
**UI hint**: yes

Plans:
- [ ] 03-01: Content data model + registry + build-time `validate.js` + `[slug]` route with `generateStaticParams` + collision guard + `generateMetadata` + sitemap
- [ ] 03-02: `ProjectPage` server template + section registry + all ten sections (hero, highlights, overview, gallery, amenities, map, CTA, FAQ, pricing, empty-state handling)
- [ ] 03-03: Migrate the 8 project pages 1–2 per atomic commit (add data file + delete static `page.jsx` together); verify `out/` parity; refactor Navigation to the registry; delete dead bespoke components

### Phase 4: CI/CD, CDN & Events Snapshot
**Goal**: `git push` to main triggers lint → build → deploy to S3/CloudFront with invalidation and tiered cache headers; the CDN serves clean URLs and real 404s; the events calendar renders from a build-time snapshot; static export (`output: 'export'`) emits paths identical to today's URLs.
**Mode**: mvp
**Depends on**: Phase 3 (also requires Phase 1's lint gate, env documentation, and events write retirement)
**Requirements**: EVNT-01, EVNT-02, DEPL-01, DEPL-02, DEPL-03, DEPL-04, DEPL-05, CDN-01, CDN-02, CDN-03
**Success Criteria** (what must be TRUE):
  1. Developer pushes to `main` and the site publishes automatically — checkout → `npm ci` → lint → build → S3 sync → CloudFront invalidation; a failed lint or build never reaches production, and the workflow reports success only after invalidation completes.
  2. Visitor sees fresh content after every deploy — HTML served short-TTL/no-cache, hashed assets long-TTL `immutable`, correct content types on upload.
  3. Every existing URL returns its page (200) after the static-export flip, with and without trailing slash (CloudFront Function rewrite); a bogus URL returns a real 404 page with 404 status — never the homepage with 200.
  4. Visitor can view the event calendar rendered read-only from the build-time snapshot; no `/api/events` server endpoints exist in the exported site; Meta pixel still fires on every page using the env-supplied pixel ID.
  5. The deployed distribution is verified against the real production bucket — no bucket-mismatch 403s, and cache behavior matches the intended tiered config.
**Plans**: 3 plans

Plans:
- [ ] 04-01: Generate events static JSON snapshot at build; make the public calendar render read-only from the snapshot; retire the Meta CAPI proxy (`pages/api/meta-events.js`)
- [ ] 04-02: GitHub Actions workflow (checkout → `npm ci` → lint → build → two-pass `s3 sync` → `create-invalidation`) with env supply to the build, guarded `--delete`, and least-privilege IAM/OIDC
- [ ] 04-03: Enable `output: 'export'` + `trailingSlash`; CloudFront Function URL rewrite; real 404 (drop the 403/404→200 homepage hack); verify distribution config against the production bucket

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Hygiene | 0/3 | Not started | - |
| 2. Progress Unification | 0/2 | Not started | - |
| 3. Project Template & Migration | 0/3 | Not started | - |
| 4. CI/CD, CDN & Events Snapshot | 0/3 | Not started | - |
