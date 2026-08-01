# Research Summary: Flivv Developers — Data-Driven Project Pages + CI/CD

**Domain:** Real-estate developer marketing website (flivvdevelopers.com) — Next.js 15 (plain JS) static export on S3/CloudFront; data-driven project-page template; unification of 5 copy-pasted GViz progress components; automated deploy pipeline.

**Researched:** 2026-08-01
**Overall confidence:** HIGH (versions verified against npm registry + GitHub API on 2026-08-01; framework mechanics verified against official Next.js/AWS docs; repo-grounded findings verified by direct codebase inspection)

## Executive Summary

This milestone takes an existing, hand-built 21-route marketing site (Next 15, plain JS, Tailwind 4, S3/CloudFront images) and makes it **data-driven and deployable**. The research converges on one architectural invariant: *separate content data from presentation, derive routes from a registry, and never change a URL.* The target pattern is a root dynamic route (`src/app/[slug]/page.jsx`) fed by `generateStaticParams()` from a project registry (`src/content/projects/`), rendering one server `ProjectPage` template composed of a section registry — with `'use client'` islands only where hooks are needed (GViz progress polling, lazy gallery, HubSpot forms).

Three research findings dominate the roadmap:

1. **Static export is mandatory and currently half-configured.** `next.config.mjs` has the `output: 'export'` block commented out. Enabling it is required for the S3/CloudFront model and it emits identical output paths (URL-preserving), but it **silently drops the server API surface** (`/api/events` CRUD + the Meta CAPI proxy) and it is incompatible with several current config choices (default image optimizer, `redirects()`). The API decision is a prerequisite for the CI/CD phase, not a build detail.
2. **The existing deploy pipeline must be replaced, not patched.** `.github/workflows/deploy.yml` deploys to a **Lightsail server via SSH + pm2** — infrastructure that contradicts the S3/CloudFront hosting model and fails on any dirty working tree (`git pull` refuses, and `data/events.json` is mutated at runtime). The replacement is a runner-side build (`npm ci && npm run build`), gated two-pass `aws s3 sync` (immutable hashed assets, short-TTL HTML), `aws cloudfront create-invalidation "/*"` via the pre-installed AWS CLI, and OIDC least-privilege IAM. The official CloudFront invalidation action no longer exists (404); the CLI is the standard.
3. **The five copy-pasted progress components are not identical — and the differences are live production data.** Catalogued divergences: missing `'use client'` directives, a sheet-name typo that may actually match the real sheet, wrong project names in loading text on two live pages, and mixed accent hexes. Unification must extract per-instance config first (with current values as defaults), verify real sheet tab names before "correcting" anything, and gate on per-instance snapshot tests. One shared `src/lib/gviz.js` fetch/parse module is the deliverable.

Stack decisions are deliberately conservative: **zero new runtime dependencies** are required. Content is plain `.js` data modules (not a CMS, not MDX tooling — both explicitly out of scope); images stay on the existing sharp→S3 manifest pipeline with `images.unoptimized: true`; no third-party deploy actions (all unmaintained or unnecessary given the AWS CLI). The only recommended additions are dev-only (ESLint for a real CI gate, Dependabot).

## Key Findings

**Stack:** Next 15 (keep, enable `output: 'export'` + `trailingSlash: true`) · React 18 (pinned) · plain `src/content/projects/*.js` data + `generateStaticParams` · existing sharp manifest for images (`unoptimized: true`) · GitHub Actions: `checkout@v7` + `setup-node@v7` (Node 22) + `configure-aws-credentials@v6.2.3` (OIDC) + AWS CLI `s3 sync` / `create-invalidation` · zero new runtime deps.

**Architecture:** Registry (`src/content/projects/index.js`) → root `[slug]` route with `generateStaticParams` + `notFound()` guard → server `ProjectPage` template → section registry → client islands only at `ProjectProgress` / `ProjectGallery` / `ProjectCta`. Route-path stability is the migration invariant (no `redirects()` under static export — a CloudFront Function rewrite is the CDN fix for clean URLs).

**Critical pitfall:** Enabling `output: 'export'` drops the server API surface (`/api/events`, `pages/api/meta-events.js`) — combined with the existing `cloudfront-config.json` "map 403/404 → 200 homepage" custom-error hack, broken API calls and dead URLs silently serve the homepage. Both must be resolved **before** the pipeline goes green, and the custom-error behavior must change to a real 404.

## Implications for Roadmap

Based on research, the phases PITFALLS.md maps to (and ARCHITECTURE.md's build order corroborates):

1. **P0 — Foundation & hygiene** — resolve `data/events.json` runtime-write (dirty-tree deploys), add `.env.example` (missing `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` bakes `undefined` into the bundle in CI), install ESLint (script exists, package doesn't), make image/next-image export-safe.
   - Addresses: FEATURES.md dependency notes (freshness governance); avoids: PITFALLS 7, 10, image bloat.
2. **P1 — Progress component unification** — catalog all 5 components' divergences, extract per-instance config into data, one `src/lib/gviz.js` fetch/parse module, per-instance snapshot tests.
   - Addresses: the config-driven-component differentiator; avoids: PITFALL 5/6 (flattening live differences, fragile GViz path). Independent, shippable, de-risks everything after.
3. **P2 — Template + data model** — `src/content/projects/` schema + `validate.js` (build-time assertions), `[slug]` route, `ProjectPage` + section registry, server sections + client islands, `generateMetadata` per project, collision guard.
   - Addresses: FEATURES.md P1 items (schema, renderer, hero, gallery, overview, amenities, map, floor plans, CTA, FAQ, trust block, SEO metadata); avoids: PITFALL 3 (thin/duplicate pages — the data contract requires unique metadata), PITFALL 4 (slug = existing route, verbatim copy).
4. **P3 — Project-page migration** — migrate the 8 hand-built project pages onto the template, 1–2 per step, atomic commits (add data file + delete static `page.jsx` together), never change URLs.
   - Avoids: PITFALL 4 (route parity checked against `out/`), PITFALL 8 (stale content).
5. **P4 — CI/CD to S3/CloudFront** — decide API fate (recommendation: static snapshot for events, external endpoint for Meta CAPI), replace deploy.yml, OIDC least-privilege IAM, two-pass sync + invalidation, CloudFront Function URL rewrite + real 404, env supply to build.
   - Addresses: the milestone's core deploy value; avoids: PITFALLS 1, 2, 7, 8, 9, 10. Can start in parallel once P1 lands (ARCHITECTURE build order step 5).
6. **P5 — Post-deploy verification** — route parity crawl, per-page title/meta/H1 diff, cache-header checks, pixel presence, invalidation completion.
   - Addresses: the "Looks Done But Isn't" checklist in PITFALLS.md.

**Phase ordering rationale:**
- P0 must lead: every later phase's verification (lint, env, clean tree) depends on it, and it's cheap.
- P1 before P2 because the template's progress section renders the unified component, and P1 fixes live bugs immediately with no dependency risk.
- P2 before P3 because migration needs the full template + data model; P3's atomic per-project steps are only possible once the dynamic route exists.
- P4 is deliberately last-but-parallel-capable: it replaces the broken pipeline at the point where it becomes load-bearing, and its API-surface decision must be made before `output: 'export'` flips.
- P5 closes the loop on the two highest-severity risks (soft-404s, silent API loss) with crawl-level evidence.

**Research flags for phases:**
- Phase P4: **needs a design decision, not just research** — the `/api/events` + Meta CAPI replacement target (Lambda/API Gateway vs static snapshot vs external proxy) must be confirmed by the orchestrator before the pipeline is wired. Also confirm the AWS account can host an OIDC provider (else fall back to scoped access keys).
- Phase P1: verify the real Google Sheets tab names before "correcting" the `Gumohar_Villas` typo — a data question, not a code question.
- Phase P2/P3: per-page copy must migrate verbatim (SEO); distinct content per project is a YMYL requirement, not a nice-to-have.
- Phase P4/P5: confirm business/legal trust-block field labels (RERA-equivalent registration numbers) with the owner before requirements — India-specific examples generalize but labels differ per market (Pakistan/GCC).

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Versions verified against npm registry + GitHub API (2026-08-01); official actions are current (`checkout@v7.0.1`, `setup-node@v7.0.0`, `configure-aws-credentials@v6.2.3`); static-export constraints from official Next.js docs. |
| Features | MEDIUM | Feature presence across competitor/industry sources is highly consistent (cross-verified 3+ sources per claim); specific statistics are directional only. |
| Architecture | HIGH | Framework mechanics (generateStaticParams, RSC boundary, static-export limits) from official docs; codebase facts (5 components' divergences, config state, route inventory) from direct inspection. |
| Pitfalls | HIGH | Repo-grounded pitfalls (soft-404 config, API-surface loss, dirty-tree deploys, env baking) verified directly in `cloudfront-config.json`, `next.config.mjs`, `deploy.yml`, `layout.js`; general patterns cross-checked against AWS/Next.js docs + practitioner post-mortems. |

## Gaps to Address

- **API replacement target** (P4): Lambda/API Gateway vs static snapshot vs external proxy for `/api/events` and the Meta CAPI proxy — a business/architecture decision requiring the orchestrator, not more research.
- **OIDC provider availability** (P4): whether the AWS account can add an OIDC identity provider for this repo; fallback (scoped access keys in secrets) is documented either way.
- **Google Sheets tab names** (P1): the real tab names behind the five progress components must be confirmed against the live spreadsheets before unification changes anything.
- **Trust-block field labels** (P2): exact registration/approval terminology for the Pakistan/GCC markets needs business/legal confirmation; research found India RERA examples.
- **`cloudfront-config.json` full contents**: the custom-error 200 hack and cache policy were inspected; a complete audit of the distribution config (cache behaviors, response headers, Function attachments) is a P4 task.

## Files in This Research Set

| File | Content |
|------|---------|
| SUMMARY.md | This file — synthesis, roadmap implications, phase ordering |
| STACK.md | Technology decisions: versions, workflow pattern, image strategy, alternatives, what NOT to use |
| ARCHITECTURE.md | Registry → dynamic route → server template → client islands; data model; migration strategy; anti-patterns |
| FEATURES.md | Table stakes / differentiators / anti-features; MVP definition; competitor analysis |
| PITFALLS.md | 10 critical pitfalls + technical debt, security, performance, UX traps; pitfall→phase mapping |
