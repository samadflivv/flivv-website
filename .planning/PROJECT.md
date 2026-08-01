# Flivv Developers Website

## What This Is

Public marketing website for Flivv Developers, a real-estate developer, showcasing every project the company manages. It's a Next.js 15 (plain JavaScript) static-export site on S3/CloudFront with ~21 routes — project showcase pages, an event calendar, construction-progress dashboards, and enquiry forms. New projects are added to the site by building new project pages; existing pages are updated frequently.

## Core Value

Visitors can quickly understand each project Flivv manages — what it is, where it is, how construction is progressing, and how to enquire — and adding a new project must be fast and low-risk.

## Business Context

- **Customer**: Homebuyers and investors viewing Flivv's projects; the site also captures sales enquiries and event registrations.
- **Revenue model**: Marketing/sales funnel — project enquiries, event registrations, and conversion tracking (Meta CAPI) for paid ads.
- **Success metric**: Speed of publishing new/updated project pages without breaking the live site.
- **Strategy notes**: none.

## Requirements

### Validated

- ✓ Public marketing site live at `flivvdevelopers.com` with ~21 content routes — existing
- ✓ Individual project showcase pages (nshomes, nshomes2, gulmoharhomes, gulmoharvillas, sukoonvillas, airporttown, sadhanacity, rivendellfarms) — existing
- ✓ Construction-progress dashboards fed live from Google Sheets (GViz) with 20s SWR polling — existing
- ✓ Event calendar with CRUD admin backed by `data/events.json` — existing
- ✓ HubSpot-powered enquiry/registration forms — existing
- ✓ S3-hosted image gallery with lazy loading and a sharp-generated manifest — existing
- ✓ Analytics/tracking: GTM, GA4, HubSpot, Clarity, Meta Pixel + Conversions API proxy — existing

### Active

- [ ] Reusable data-driven project page template (hero, gallery, progress, details/floor plans/amenities, map, CTA, highlights, FAQ) populated from per-project content data
- [ ] Registering a new project = adding content data + one route, no bespoke component
- [ ] Migrate existing hand-built project pages onto the template
- [ ] Unify the five copy-pasted progress-roadmap components into one configurable component (keep Google Sheets + GViz live data)
- [ ] Automated deploy pipeline: git push → build → publish to S3/CloudFront with cache invalidation

### Out of Scope

- CMS / admin UI for non-technical editors — developers edit content in code
- Moving progress data out of Google Sheets — Sheets + GViz stays the live source
- TypeScript migration — project remains plain `.js`/`.jsx`
- Changing the hosting model — stays static export on S3/CloudFront
- Bespoke pages for future projects — template covers them; per-project customization is a deliberate override, not the default

## Context

Brownfield project. A full codebase map exists in `.planning/codebase/`. Key state:

- Next.js 15 App Router, plain JS (no TypeScript, `jsconfig.json` maps `@/*` → `./src/*`), Tailwind v4, shadcn/ui aliases.
- Thin server `page.jsx` wrappers compose ~50 large client components (`'use client'`) in `src/components/` — many 300–1100 line monoliths mixing markup, animation, and data fetching.
- Five near-identical progress components differ only by a config block: `src/components/GVProgressRoadmap.jsx`, `GHProgressRoadmap.jsx`, `ATProgressRoadmap.jsx`, `NSHdevprogress.jsx`, `NSH2devprogress.jsx`.
- Static export to S3/CloudFront (`out/`); `next.config.mjs` has `output: 'export'` commented out but keeps S3 image `remotePatterns` for `flivv-web-cdn`.
- Deployment infra configs live at repo root (`cloudfront-config.json`, `bucket-policy.json`, `dist-config-with-logging.json`, etc.); `.github/workflows/` exists but is empty (no CI yet).
- Known concerns (from `.planning/codebase/CONCERNS.md`): unauthenticated `/api/events` CRUD, ~229 MB unoptimized images in `public/`, hardcoded HubSpot/pixel IDs, no ESLint despite `npm run lint` script, deprecated sync `params` access in `[id]/route.js`.

## Constraints

- **Tech stack**: Next.js 15 + React 18, plain JS/JSX, Tailwind v4 — do not introduce TypeScript or a different framework.
- **Hosting**: Static export to S3 + CloudFront — API routes and dynamic features must not depend on a Node server at runtime beyond what already exists.
- **Performance**: Existing repo already carries heavy images; template sections must use `next/image` and the existing S3 manifest pipeline, not add more unoptimized assets.
- **Security**: Keep the public site safe; do not expand the unauthenticated API surface in v1.
- **Compatibility**: Must preserve the ~21 existing routes and their URLs (live site, indexed) when migrating pages onto the template.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Reusable data-driven project template over bespoke pages | Adding a project becomes data + route; fixes the copy-paste monolith pattern and speeds publishing | — Pending |
| Developers edit content in code (no CMS) | Editors are developers; avoids CMS build and maintenance | — Pending |
| Keep Google Sheets + GViz for progress; unify the 5 components | Live data source already trusted; unification removes copy-paste drift | — Pending |
| Automated CI/CD to S3/CloudFront | Removes manual rebuild/upload/invalidate overhead — the stated pain point | — Pending |
| Keep static-export hosting model | Existing infra works; avoid re-architecture | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Business Context check (if present) — customer, revenue model, success metric still accurate?
4. Audit Out of Scope — reasons still valid?
5. Update Context with current state (users, feedback, metrics)

---
*Last updated: 2026-08-01 after initialization*
