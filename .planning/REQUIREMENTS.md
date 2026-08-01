# Requirements: Flivv Developers Website

**Defined:** 2026-08-01
**Core Value:** Visitors can quickly understand each project Flivv manages — what it is, where it is, how construction is progressing, and how to enquire — and adding a new project must be fast and low-risk.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Template & Data Model

- [ ] **TMPL-01**: Per-project content data modules exist (`src/content/projects/*.js`) with a schema validated at build time
- [ ] **TMPL-02**: Generic page renderer composes sections from data via a section registry
- [ ] **TMPL-03**: Adding a new project = adding a data file; route derived automatically from a registry (`[slug]` route + `generateStaticParams`), no manual route
- [ ] **TMPL-04**: All 8 existing project pages migrate onto the template with identical URLs and no lost content

### Page Sections

- [ ] **SECT-01**: Hero — project name, location, one-line positioning, primary CTA, all from data
- [ ] **SECT-02**: Highlights / key-facts strip from data
- [ ] **SECT-03**: Overview / about section from data
- [ ] **SECT-04**: Gallery — S3-manifest images, lazy-loaded, from data
- [ ] **SECT-05**: Amenities icon list from data
- [ ] **SECT-06**: Location + map embed + landmarks with drive times, from data
- [ ] **SECT-07**: Enquiry / CTA section (HubSpot form) from data
- [ ] **SECT-08**: Data-driven FAQ (optional per project; empty renders nothing)
- [ ] **SECT-09**: Pricing context (`priceFrom`, note, date; "price on request" supported)
- [ ] **SECT-10**: Empty sections render nothing; template degrades gracefully per project

### Progress Unification

- [ ] **PROG-01**: One configurable progress component replaces the five copy-pasted components
- [ ] **PROG-02**: Per-project progress config (sheet ID, sheet name, refresh interval, labels, colors) lives in project data
- [ ] **PROG-03**: Live Google Sheets + GViz polling preserved; per-instance defaults match current live values (real tab names verified before any change)
- [ ] **PROG-04**: Visible "last updated" timestamp on the progress dashboard
- [ ] **PROG-05**: No live-page regression — loading text, sheet names, and accent colors verified per project after unification

### SEO

- [ ] **SEO-01**: Per-project metadata (title, description, OG tags) via `generateMetadata` from data
- [ ] **SEO-02**: `sitemap.xml` generated covering all routes

### Events (Static Snapshot)

- [ ] **EVNT-01**: Events data generated into a static JSON snapshot at build time
- [ ] **EVNT-02**: Public event calendar renders read-only from the snapshot
- [ ] **EVNT-03**: Admin CRUD UI and `/api/events` write routes retired
- [ ] **EVNT-04**: `data/events.json` is a build-time input only (no runtime writes)

### CI/CD Deploy

- [ ] **DEPL-01**: GitHub Actions workflow: checkout → `npm ci` → lint → build → deploy to S3/CloudFront
- [ ] **DEPL-02**: CloudFront invalidation runs after deploy
- [ ] **DEPL-03**: Correct cache headers on deployed assets (hashed assets long-TTL, HTML short-TTL)
- [ ] **DEPL-04**: Build-time env vars supplied in CI (pixel ID etc.)
- [ ] **DEPL-05**: `output: 'export'` + `trailingSlash` enabled; output paths identical to today's URLs

### CDN Fixes

- [ ] **CDN-01**: Replace the 403/404→200 homepage custom-error behavior with a real 404
- [ ] **CDN-02**: CloudFront Function URL rewrite for clean URLs
- [ ] **CDN-03**: Distribution config verified against the production bucket name

### Foundation Hygiene

- [ ] **HYGN-01**: ESLint installed and configured; lint gate passes
- [ ] **HYGN-02**: `.env.example` added listing all required env vars
- [ ] **HYGN-03**: No runtime writes to `data/events.json`

## v2 Requirements

Deferred to a future release. Tracked but not in the current roadmap.

### Project Sections (deferred)

- **SECT-11**: Floor plans / typology table (type, area, price, status) + floor-plan image viewer — the confirmed content gap; deferring per user scoping
- **SECT-12**: Trust block — registration/approval numbers, disclaimers, render-vs-real labeling — deferring per user scoping
- **SECT-13**: WhatsApp CTA (one-tap, prefilled with project context) — trigger: sales confirms they answer WhatsApp enquiries
- **SECT-14**: Gallery categorization (exterior / interiors / progress) + dated media labels — trigger: manifest pipeline refactor lands
- **SECT-15**: Availability categories (available / limited / waitlist / sold out) — trigger: sales commits to monthly maintenance

### SEO (deferred)

- **SEO-03**: JSON-LD structured data (RealEstateListing + FAQPage) — trigger: per-page metadata ships and rankings are monitored

### Site-level (deferred)

- **SITE-01**: Developer track-record section (completed projects, years, delivered units) — trigger: projects index/homepage refresh
- **SITE-02**: Video walkthrough fields on the template — trigger: a project has a produced walkthrough
- **SITE-03**: NRI / investor section (remote buying path, PoA guidance) — trigger: Gulf event enquiry volume justifies it
- **SITE-04**: EMI calculator — trigger: a project with published pricing requests it
- **SITE-05**: AI chat widget — trigger: v1 FAQ + enquiry routing metrics prove the gap
- **SITE-06**: Multi-language (Urdu/Arabic) — trigger: proven audience demand; large content-governance cost

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| CMS / admin UI for non-technical editors | Editors are developers; CI deploy makes publishing fast |
| TypeScript migration | Plain-JS project; schema validated at build time instead |
| Live unit-level inventory / booking / payment | Requires secure backend + conflict handling; impossible on static export; expands unauthenticated API surface |
| Moving progress data out of Google Sheets | Sheets + GViz is live and trusted; no user-visible gain |
| Interactive 3D / WebGL unit selectors | Heavy assets on an image-heavy site; breaks template simplicity |
| Gating floor plans behind sign-up | Documented anti-pattern; buyers bounce, low-quality leads |
| Artificial urgency (countdowns, "few left") | Legal/compliance risk in regulated markets; destroys trust |
| Stock photos / unlabeled renders as delivered work | #1 trust killer; legal exposure |
| Dozens of near-identical "property in X" SEO pages | Thin/duplicate content, doorway pages, buyer distrust |
| Live event admin CRUD (pre-v1 capability) | Retired deliberately — events become a build-time static snapshot |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| TMPL-01 | — | Pending |
| TMPL-02 | — | Pending |
| TMPL-03 | — | Pending |
| TMPL-04 | — | Pending |
| SECT-01 | — | Pending |
| SECT-02 | — | Pending |
| SECT-03 | — | Pending |
| SECT-04 | — | Pending |
| SECT-05 | — | Pending |
| SECT-06 | — | Pending |
| SECT-07 | — | Pending |
| SECT-08 | — | Pending |
| SECT-09 | — | Pending |
| SECT-10 | — | Pending |
| PROG-01 | — | Pending |
| PROG-02 | — | Pending |
| PROG-03 | — | Pending |
| PROG-04 | — | Pending |
| PROG-05 | — | Pending |
| SEO-01 | — | Pending |
| SEO-02 | — | Pending |
| EVNT-01 | — | Pending |
| EVNT-02 | — | Pending |
| EVNT-03 | — | Pending |
| EVNT-04 | — | Pending |
| DEPL-01 | — | Pending |
| DEPL-02 | — | Pending |
| DEPL-03 | — | Pending |
| DEPL-04 | — | Pending |
| DEPL-05 | — | Pending |
| CDN-01 | — | Pending |
| CDN-02 | — | Pending |
| CDN-03 | — | Pending |
| HYGN-01 | — | Pending |
| HYGN-02 | — | Pending |
| HYGN-03 | — | Pending |

**Coverage:**
- v1 requirements: 36 total
- Mapped to phases: 0
- Unmapped: 36 ⚠️

---
*Requirements defined: 2026-08-01*
*Last updated: 2026-08-01 after initial definition*
