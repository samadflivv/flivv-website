# Pitfalls Research

**Domain:** Real-estate developer marketing website — Next.js 15 (plain JS) static export on S3/CloudFront; data-driven project page template migration; unification of copy-pasted Google-Sheets/GViz progress components; automated CI/CD to S3/CloudFront.

**Researched:** 2026-08-01

**Confidence:** HIGH for repo-grounded findings (verified directly in this codebase); MEDIUM for general domain patterns (cross-checked across AWS/Next.js official docs, GitHub issues, and multiple practitioner sources; official docs used where available).

---

## Critical Pitfalls

Mistakes that cause broken production sites, silent SEO loss, or rewrite-scale rework.

### Pitfall 1: Clean URLs silently serve the homepage — soft-404 trap on S3/CloudFront

**What goes wrong:**
S3 serves exact keys only. A request for `/gulmoharhomes` (no trailing slash) or any deep link that doesn't match a stored key returns 403/404 from S3 — and this repo's `cloudfront-config.json` maps both 403 and 404 to a 200 response of `/index.html` (the homepage). The visitor and Google both get the homepage with HTTP 200 for a URL that should be a project page. Broken links are invisible, Google indexes soft-404s, and users land on the wrong page with no explanation.

**Why it happens:**
Next.js static export emits `/gulmoharhomes/index.html` (with `trailingSlash: true`) or `/gulmoharhomes.html` (without). CloudFront's `DefaultRootObject: "index.html"` applies **only** to `/`. Nothing auto-appends `index.html` for nested paths on a REST S3 origin, and the classic "map 404 → index.html" custom-error hack (present in `cloudfront-config.json`) converts every routing miss into a fake homepage hit. With `trailingSlash: true` exported links work only if every inbound URL carries the trailing slash — any missing slash 403s. Documented repeatedly in Next.js/S3/CloudFront discussions (eams.dev, dev.to, StackOverflow; GitHub issue vercel/next.js#77359).

**How to avoid:**
- Pick **one** canonical URL shape (`trailingSlash: true` + `output: 'export'`) and make the CDN match it: attach a CloudFront Function (or Lambda@Edge on the origin request) that rewrites `/{page}` → `/{page}/index.html` and `/{page}/` → `/{page}/index.html`. This is the reliable fix; the custom-error 200 hack is not.
- Keep the custom error response (403/404 → `/404.html` with **404** status, not 200 homepage). Do not swallow 404s into a 200 homepage.
- Verify every one of the ~21 routes by direct URL fetch (no referer, fresh edge location) after deploy: `https://flivvdevelopers.com/<route>/` must return the project page and a 200, and a bogus URL must return 404.

**Warning signs:**
- Clicking a project link from a search result or external site shows the homepage with no error.
- Google Search Console shows "Soft 404" / "Crawled – currently not indexed" for project URLs.
- Navigation works but hard refresh or direct URL doesn't.
- Requesting the URL without a trailing slash renders the homepage.

**Phase to address:**
P4 (CI/CD — the deploy must assert route parity) and P5 (post-deploy verification). The `cloudfront-config.json` custom-error 200 behavior is a pre-existing landmine that P4 must fix before or while switching the pipeline to static export.

---

### Pitfall 2: Enabling `output: 'export'` silently kills the server API surface

**What goes wrong:**
Next.js static export produces only HTML/JS/CSS — there is **no Node runtime** and **no route handlers**. The unauthenticated `/api/events` CRUD (`src/app/api/events/route.js`, `[id]/route.js`) and the Meta Conversions API proxy (`pages/api/meta-events.js`) will not be built at all. Requests to `/api/events` will hit S3, 403, and — with the custom-error 200 hack — return the homepage with a 200. The events admin UI and Meta CAPI tracking break silently. The docs are explicit: route handlers only render static GET responses; POST/PUT/DELETE are unsupported (Next.js static-exports docs; GitHub discussion vercel/next.js#56731).

**Why it happens:**
`next.config.mjs` today has the static-export block commented out and only `images.remotePatterns` active; the site currently runs server-side (`next start` on Lightsail per `.github/workflows/deploy.yml`). The milestone target is static export to S3/CloudFront, but nothing in the current code accounts for where the events API and Meta proxy go. The API surface is just dropped by flipping the config.

**How to avoid:**
- Decide the API's fate **before** enabling `output: 'export'`: (a) move `/api/events` + `meta-events` to a serverless function (Lambda + API Gateway / CloudFront origin behavior for `/api/*`), or (b) keep a small server for API and serve pages from S3, or (c) explicitly ship the events calendar as a static build-time snapshot and drop live CRUD (matches "do not expand the unauthenticated API surface in v1").
- Add a CI check that greps the build output: `out/api/` must not exist, and the workflow must assert the site's API contract is served by whatever replaced it.
- Never rely on "it builds locally" — a static export build succeeding is exactly the failure mode (the API routes are simply absent).

**Warning signs:**
- Build log shows no `/api/*` routes in the static export listing.
- After deploy, `curl -X POST https://flivvdevelopers.com/api/events` returns the homepage HTML or a 403/404 instead of JSON.
- Event calendar admin silently can't save (looks like a client bug).

**Phase to address:**
P4 (CI/CD) — the deploy-target decision is a prerequisite for the pipeline. Flag for the orchestrator: this is a design decision, not just a build step.

---

### Pitfall 3: Template migration flattens per-page uniqueness — duplicate/thin project pages and SEO loss

**What goes wrong:**
The site's only `metadata` export is the single global one in `src/app/layout.js:16` — there is no per-page `metadata`/`generateMetadata`, no JSON-LD schema, no `sitemap`, no `robots.txt` anywhere in the repo (verified). A data-driven template that renders every project from one component with generic headings ("View our homes", identical CTA copy, same gallery layout) turns eight bespoke pages into eight near-identical pages. Real-estate is a YMYL vertical where duplicate and thin pages are a documented, top cause of core-update traffic loss (thatdevpro real-estate SEO framework; IDX duplicate-content guides; dewebsolutions 2026 guide). Every project page loses its ranking signal — unique title, unique description, unique local copy, unique schema.

**Why it happens:**
Template-first migrations optimize for "fewer components" and forget that each project page's SEO value is in its **differences**: hero copy, location, price ranges, unique amenities, FAQ, project-specific images. Copy-pasting a template shell and filling in data makes everything feel interchangeable; because the old pages had no per-page metadata to migrate, the template is built without a metadata slot and the gap is invisible until rankings drop.

**How to avoid:**
- Build the template with a per-project data contract that **requires** unique SEO fields: `title`, `description`, `ogTitle/ogImage`, `canonical`, and JSON-LD (`RealEstateListing`/`Place`/`Residence` + `LocalBusiness`/`Organization` for the developer, `FAQPage` where a FAQ exists). Fail the build if a project entry is missing required fields.
- During migration, move each page's copy **verbatim** (see Pitfall 4); treat copy improvements as a separate change.
- Add `sitemap.js` (all ~21 routes) and `robots.txt`; per Next.js App Router, `generateMetadata` per project page.
- Never ship a template section with placeholder/default text ("Your project here", generic CTA) — make empty sections render nothing or require content.

**Warning signs:**
- After migration, `grep '<title>' out/**/*.html` shows the same title on every page.
- Search Console: impressions flat while clicks drop; "Duplicate without user-chosen canonical" warnings.
- All project pages have the same H1 pattern with only the project name swapped.

**Phase to address:**
P2 (template + data contract) and P3 (migration). Verification in P5: crawl the built site and diff per-page `<title>`, meta description, and H1 across all project pages.

---

### Pitfall 4: Breaking existing URLs / route renames without redirects

**What goes wrong:**
The constraint is explicit: preserve the ~21 existing routes and URLs (indexed, live). A slug mismatch — e.g., the template's data model names projects `ns-homes` or `projects/nshomes` while the live URL is `/nshomes` — produces 404s (→ homepage 200, per Pitfall 1) for every indexed URL. Rank resets, and with no server there is no `next.config` `redirects()` (unsupported in static export) to recover.

**Why it happens:**
It's natural to normalize URLs ("let's make them all lowercase-hyphenated under /projects") during a data-modeling exercise. Renaming a route is a one-line change that looks harmless in a diff.

**How to avoid:**
- Make the template's data model carry the **explicit route** (slug) per project, and keep the slug identical to today's path (`nshomes`, `nshomes2`, `gulmoharhomes`, ...). The new dynamic route (e.g. `/[project]`) is populated by `generateStaticParams` with exactly those slugs; the old thin `page.jsx` files can be deleted only after the new route emits the same path.
- Before deleting any `src/app/*/page.jsx`, list all current routes (`git ls-files src/app/**/page.jsx` + the layout) and diff against the new build's `out/` directories 1:1.
- If a rename is unavoidable, implement redirects at the CDN (CloudFront Function 301) — never rely on a custom-error 200.

**Warning signs:**
- A route file is renamed/removed in the same commit as the template change.
- Post-deploy crawl (screaming-frog / `curl -I`) shows 200-from-homepage or 404 for previously-indexed URLs.

**Phase to address:**
P3 (migration) with the route-parity check in P5. The generateStaticParams route registration happens in P2.

---

### Pitfall 5: Unifying the five progress components flattens hidden differences

**What goes wrong:**
The five components are **not** identical: verified in this repo —
- Only `GVProgressRoadmap.jsx` carries `'use client'` at line 1; `GH`, `AT`, `NSHdevprogress`, `NSH2devprogress` do not (they currently work only because their import chain lands in a client component).
- `GVProgressRoadmap.jsx` uses sheet name `'Gumohar_Villas'` (typo for "Gulmohar") while `GHProgressRoadmap.jsx` uses `'Gulmohar_Homes'` — a real config divergence.
- `ATProgressRoadmap.jsx` (Airport Town) and `GVProgressRoadmap.jsx` (Gulmohar Villas) both render the loading string DATA_7Kq2mXzr_START"Syncing Gulmohar Homes Data..."DATA_7Kq2mXzr_END — the wrong project name on two live pages.
- Imports differ (`GH` imports `ArrowUpRight` unused), header titles are hardcoded per component, status-theme maps are duplicated.

A "unify into one component with a config prop" merge that assumes the five differ only in the config block will silently change what at least one project renders (sheet name correction without verifying the actual tab, losing `'use client'` behavior, swapping a loading string that a designer intentionally varied).

**Why it happens:**
Copy-paste starts identical and drifts. When merging, developers diff the config block, assume that's the only delta, and build the unified component around the "canonical" version — discarding the accumulated per-instance quirks that live pages depend on.

**How to avoid:**
- Before writing the unified component, diff all five files programmatically and catalog every divergence (directive, config values, strings, styling constants, imports, error/loading copy, status mapping). Grep-level audit: `SPREADSHEET_ID`, `SHEET_NAME`, `REFRESH_INTERVAL`, `'use client'`, `Syncing`, `Connection Error`.
- Extract per-instance config into props/data: `{ spreadsheetId, sheetName, projectName, refreshInterval, accentColor?, heading? }` with the **current value of each instance as the default** so rendering is byte-for-byte preserved until explicitly changed.
- Verify each sheet's actual tab name before "correcting" the typo — the typo may be what matches the real sheet; a wrong "fix" breaks the project. This is a data question, not a code question.
- Add snapshot tests per instance (default/loading/error/empty states) before merging; the merge must not change any snapshot.
- Keep the five original file names as thin wrappers around the unified component (import sites don't change).

**Warning signs:**
- The five files already differ beyond the config block (directives, strings) — they do in this repo today.
- A "simple" unification diff also touches strings or styling.
- After merge, one project page shows the wrong project's loading text or fails to fetch (wrong sheet name).

**Phase to address:**
P1 (progress component unification) — first phase, since it's self-contained and de-risks the template work that follows.

---

### Pitfall 6: Config drift and the fragile GViz data path

**What goes wrong:**
All five components hardcode the same `SPREADSHEET_ID` with different `SHEET_NAME` values, fetched via the unofficial, deprecated Google `gviz/tq` endpoint and parsed by substringing between the first `{` and last `}` (GHProgressRoadmap.jsx:14-23 pattern repeated in all five). Any Google-side format change, tab rename, or permission flip breaks all five at once — and the failure is user-visible on the public construction-progress dashboards that are this business's core "live data" selling point. 20s polling from every visitor amplifies the blast radius (see Performance Traps).

**Why it happens:**
The GViz endpoint is free and needs no auth, so it was copied five times. The sheet is world-readable by design ("anyone with the link"), and the parsing assumes a stable undocumented payload shape.

**How to avoid:**
- In P1, centralize the fetch/parse in one module behind a single config table `{ project: { spreadsheetId, sheetName } }`; keep Google format assumptions in exactly one place.
- Route sheet reads through a server-side proxy with an allowlist of sheet IDs (per CONCERNS.md recommendation) so restrictions don't break the site and sensitive data is never exposed.
- Treat sheet names as data, not code: verify the real tab name in the spreadsheet during migration.
- Add an error state that distinguishes "sheet unreachable" from "data source broke" and surfaces it (currently everything shows one generic Connection Error string).

**Warning signs:**
- A rename in Google Sheets silently flips a dashboard to the error state.
- The same parsing code exists in N files (it exists in 5 today).
- `docs.google.com/.../gviz/tq` appears in the client bundle of every progress page.

**Phase to address:**
P1 (unification) — the single fetch/parse module is the deliverable; the server proxy is a flagged follow-up.

---

### Pitfall 7: Deploy pipeline that can fail on unrelated runtime data and ships without a gate

**What goes wrong:**
The existing `.github/workflows/deploy.yml` (Lightsail target) runs, verbatim: DATA_9pLx4TvZ_START`git pull origin main / npm install / npm run build / pm2 restart`DATA_9pLx4TvZ_END. `git pull` **refuses to run when the working tree is dirty** — and `data/events.json` is written at runtime by the events API (`src/lib/events.js`), so any recent event edit makes every deploy fail. `npm install` (not `npm ci`) is non-reproducible; the build runs on the server, so nothing verifies it before production; there is no lint, no test, no health check, no rollback, and the only thing between a bad commit and production is a push to `main`.

**Why it happens:**
This workflow was hand-assembled at the start of the project. It "works" when nothing changes — the failure appears only when the calendar was edited or a build breaks.

**How to avoid:**
- The new S3/CloudFront pipeline must: (a) build on the runner (not the server), (b) gate on lint + tests + a smoke check of the static export (assert `out/` exists, routes present), (c) use `npm ci`, (d) upload via `aws s3 sync out/ s3://...`, (e) invalidate CloudFront, (f) never run `git pull` against a tree that runtime code mutates.
- Resolve the `data/events.json` runtime-write problem first (gitignore + seed copy, or move writes off the repo) — otherwise the CI checkouts themselves can be polluted on shared runners and the git history stays dirty.
- Add a health check after deploy (fetch homepage + a sample project route + an API contract endpoint).

**Warning signs:**
- Deploy failures that say the working tree has uncommitted changes (event edits).
- "Build passes on the server, breaks in CI" or vice versa (env drift — see Pitfall 10).
- No CI step runs `npm run lint` (today `npm run lint` fails because eslint isn't installed — `next lint` declared in package.json but no eslint config/dependency exists).

**Phase to address:**
P4 (CI/CD), with the `data/events.json` hygiene as a P0 prerequisite. The existing deploy.yml must be replaced, not edited in place, when the S3/CloudFront target becomes authoritative.

---

### Pitfall 8: Stale content after deploy — cache invalidation and missing Cache-Control headers

**What goes wrong:**
`cloudfront-config.json` attaches the managed `CachingOptimized` cache policy (MinTTL 1s, DefaultTTL 24h, MaxTTL 365d) to the default behavior. If the upload does not set `Cache-Control` on HTML objects, project pages and the progress dashboards are cached **up to 24 hours** at the edge. Deploy the new site, "verify" it, and visitors still see yesterday's construction progress for a day — a direct hit to the site's core value (live progress). Conversely, `aws s3 sync out/ s3://bucket/` with one blanket `--cache-control` stamps hashed assets and HTML alike, and `s3 sync --delete` with a missing/empty `out/` directory deletes the entire bucket.

**Why it happens:**
S3 objects have no `Cache-Control` by default; CloudFront's policy defaults fill in 24h. Deploy scripts commonly run a single `aws s3 sync` (one header value for everything) and either forget invalidation or invalidate `/*` without realizing propagation takes 5–15 minutes.

**How to avoid:**
- Two-pass upload (the AWS-documented tiered-TTL pattern): pass 1 — hashed `/out/_next/static/**` and other immutable assets with `Cache-Control: public, max-age=31536000, immutable`; pass 2 — HTML files (`index.html` everywhere, `404.html`) with `public, max-age=60` (or `max-age=0, no-cache, must-revalidate`) and correct `Content-Type: text/html`.
- Set `Content-Type` explicitly on HTML uploads (a common S3/CloudFront failure is browsers downloading `.txt`/octet-stream for HTML — see GitHub issue vercel/next.js#77359).
- Invalidate after every deploy: `aws cloudfront create-invalidation --paths "/*"` (simplest, fine at this scale) or target the discovered `index.html` paths; check the invalidation reaches `Completed` in CI before reporting success.
- Guard `--delete`: abort the sync if `out/` is missing or empty.

**Warning signs:**
- "I deployed but still see the old version" — check S3 object metadata (is `Cache-Control` present?) and CloudFront invalidation status.
- Hard refresh fixes it → browser/CDN cache headers are missing or too long for HTML.
- Only some regions show new content → CloudFront propagation, not an S3 upload problem.

**Phase to address:**
P4 (CI/CD). Verification in P5: `curl -I` the homepage and a project page after deploy — assert `Cache-Control` values and fresh content.

---

### Pitfall 9: IAM over-privilege for deploy credentials

**What goes wrong:**
The GitHub Actions identity needs only `s3:PutObject` + `s3:DeleteObject` on `arn:aws:s3:::<bucket>/*`, `s3:ListBucket` on the bucket, and `cloudfront:CreateInvalidation` on the **one** distribution ARN. Common failures: the workflow user is given `s3:*` / `cloudfront:*` on `*`, a long-lived admin access key is pasted into GitHub secrets, the bucket is made publicly readable with a `Principal: "*"` policy, or `cloudfront:CreateInvalidation` is left at `Resource: "*"`. A leaked over-privileged key means the bucket (and other distributions/buckets) can be wiped or modified.

**Why it happens:**
"Make it work" IAM: attach `AmazonS3FullAccess` / `CloudFrontFullAccess` to the CI user because it's faster than writing a scoped policy, and admin keys already exist in the account.

**How to avoid:**
- Create a dedicated IAM user (or, better, an OIDC role scoped to this repo + `main` branch) with exactly the four actions above, resource-scoped to the bucket (both `bucket` and `bucket/*` ARNs) and the distribution ARN (no region in CloudFront ARNs).
- Keep the bucket private; let CloudFront read via OAC/OAI (the existing `bucket-policy.json` already does the OAC-style service-principal+source-ARN pattern — keep it, never fall back to public reads).
- Store the key in GitHub Actions secrets; never commit `.env.production` or keys (CONCERNS confirms `.env.*` are gitignored — keep it that way).
- Add an explicit `Deny` on `s3:DeleteBucket` as a guardrail (defense in depth; it's implicitly denied otherwise).

**Warning signs:**
- The workflow's AWS user is a human-admin or has full-access policies.
- Bucket policy has `"Principal": "*"`.
- The same key is used for other projects/accounts.

**Phase to address:**
P4 (CI/CD). This is setup work that belongs in the pipeline phase's first plan.

---

### Pitfall 10: NEXT_PUBLIC env vars baked at build — missing env in CI silently breaks tracking

**What goes wrong:**
`NEXT_PUBLIC_*` values are string-replaced into the client bundle **at build time** (official Next.js env docs; multiple 2026 post-mortems). `src/app/layout.js:83` renders `fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}')`; if the CI runner doesn't export that variable, the shipped bundle contains `fbq('init', undefined)` and Meta tracking silently breaks — while every other tracking ID (GTM, GA4, HubSpot, Clarity) is hardcoded. There is no `.env.example` documenting required vars (verified: absent), and the current workflow passes **no** environment at all.

**Why it happens:**
Local `.env.local`/`.env.production` make the build work on the developer machine; the CI runner has neither, and Next.js does not fail the build for a missing env var — it just inlines `undefined`.

**How to avoid:**
- Document all required vars in `.env.example` (`FACEBOOK_PIXEL_ID`, `FACEBOOK_ACCESS_TOKEN`, `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` at minimum).
- Pass envs explicitly into the CI build step (GitHub Actions `env:` / secrets) — never rely on the runner's environment.
- Prefer hardcoding the pixel ID like the other tracking IDs (consistent with the codebase's own pattern), or fail the build when the var is missing (`if (!process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID) throw`).
- Never put secrets in `NEXT_PUBLIC_` — anything with that prefix ships to the browser.

**Warning signs:**
- Browser console shows `fbq('init', undefined)`.
- Build works locally, tracking breaks in production (classic "works on my machine" — the machine had the env file).
- Grep the built bundle in CI: `grep -r "fbq('init', undefined)" out/`.

**Phase to address:**
P0 (foundation — add `.env.example`, harden layout.js) and P4 (CI must supply envs). Verification in P5: grep built output for the literal pixel ID.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Build on the server (`git pull && npm run build && pm2 restart` on Lightsail) | No CI setup needed | No gate, no artifact, deploy breaks on dirty `data/events.json`, env drift | Never — replaced by runner-side build in P4 |
| `npm install` instead of `npm ci` | Faster first install | Non-reproducible builds; lockfile drift | Never in CI |
| Custom error 403/404 → 200 homepage | SPA-like UX for missing URLs | Soft-404s, hides broken links, SEO damage, masks API outages | Never — use a 404 page with 404 status + CloudFront Function URL rewrite |
| Copy-pasting a component instead of parameterizing | Fast page launch | Config/behavior drift across N copies (already N=5 in this repo) | Only with per-instance snapshot tests and a config table |
| Hardcoding sheet names / spreadsheet IDs in client components | No backend needed | Silent breakage on rename; single point of failure ×5 | Short-term only; centralize in P1 |
| Committing runtime-written `data/events.json` | No DB to run | Dirty tree blocks deploys; non-atomic writes lose data | Never — gitignore + seed copy |
| `NEXT_PUBLIC_` for the only variable tracking ID | Follows "env config" habit | Missing env in CI silently kills tracking | Prefer hardcoding (consistent with the other 4 IDs) or fail-fast on missing |
| Single blanket `--cache-control` on `s3 sync` | One command, done | HTML cached 24h; stale progress dashboards | Never — two-pass upload |
| `s3 sync --delete` with no guard | Clean bucket | Empty/missing `out/` wipes the whole site | Never — guard `out/` existence first |

---

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Google Sheets via `gviz/tq` | Substring-parsing the undocumented payload in 5 components; relying on a world-readable sheet | One shared fetch/parse module with an allowlist config; server-side proxy; verify tab names before correcting "typos" |
| S3/CloudFront HTML upload | Forgetting `Content-Type: text/html` → browsers download `.txt`/octet-stream (vercel/next.js#77359) | Set `--content-type text/html` on HTML uploads (or per-file metadata) |
| CloudFront caching | No `Cache-Control` on S3 objects → 24h default TTL on HTML | Two-pass sync: `immutable` on hashed assets, short/no-cache on HTML; invalidate `/*` after deploy |
| Clean URLs on S3 | Custom-error 200 homepage hack | CloudFront Function rewriting `/{page}` → `/{page}/index.html` |
| HubSpot form loader (5 copies) | Script injection + `Math.random()` ids + `setTimeout(100)`; cleanup via `innerHTML = ''` | Extract a shared `useHubSpotForm` hook; guard on script load; never interpolate user input into `innerHTML` |
| Meta CAPI proxy | Unvalidated `event_name`; token passed as query param (leaks into logs); raw email hashing | Validate allowlist; token in headers; `String(em).trim().toLowerCase()` before SHA-256; skip empty |
| Route handlers + static export | Expecting `/api/events` to keep working under `output: 'export'` | Route `GET`-only static output; move POST/PUT/DELETE to Lambda/API Gateway or accept a static snapshot |

---

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| 5 progress components × 20s GViz polling per visitor | Continuous requests to `docs.google.com`; Google throttling; battery/bandwidth cost | Single shared fetcher with longer TTL; server-side cache proxy; `revalidateOnFocus` instead of fixed interval | ~dozens of concurrent visitors (already a concern at current traffic) |
| ~229 MB unoptimized images in `public/` (149 files, individual JPGs up to 19.2 MB) served raw | Multi-MB images on every project page; LCP failures; S3 egress costs | `next/image` with S3 CDN variants + sharp pre-optimization at build; delete full-size originals; `images.unoptimized: true` under static export (or custom loader) | Immediately — it's already live; worsens on mobile |
| `next/image` under static export | Build errors ("Image Optimization using the default loader is not compatible with export") or images silently missing | Set `images.unoptimized: true` (config already includes `remotePatterns` for the CDN) and pre-optimize at build with the existing sharp manifest pipeline | At first template build |
| Five third-party tracking scripts on every page | Startup jank, especially mobile | Consolidate via GTM; defer non-critical | At current traffic; worsens with ad campaigns |
| Render-blocking `@import` font URLs inside `<style jsx global>` | Slower FCP | `next/font` (already used for Geist) or preconnect + `<link>` | Every page load |
| KSA gallery manifest runtime fetch from S3 | All tiles stuck "Loading…" if manifest drifts (already a documented fragile area) | Generate manifest in CI from the same source; health-check the CDN URL in the pipeline | When S3/CDN misconfigured or manifest drifts |

---

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Unauthenticated `/api/events` POST/PUT/DELETE (live today) | Calendar defacement, spam events on the public sales-meets page | Admin token header validated server-side; rate limiting; never trust the client `enableAdmin` prop — but under static export the API must be moved (see Pitfall 2) |
| Open Meta CAPI proxy (unvalidated body, token in query param) | Event spoofing skewing ad optimization; token leak in logs | Allowlist `event_name`; rate limit; token in headers |
| Deploy IAM over-privilege (see Pitfall 9) | Compromised CI key wipes bucket / touches other resources | Least-privilege policy; OIDC role; no admin keys in secrets |
| Secrets in `NEXT_PUBLIC_*` | Any such value ships to every browser | Server-only vars for secrets; `.env.example` without real values |
| `dangerouslySetInnerHTML` / `innerHTML` sinks (layout.js pixel, HubSpot loaders, AirportTown) | Injection if future data interpolated | Keep sinks static; audit at every change; React refs/`createPortal` |
| World-readable Google Sheets with sheet IDs in client bundles | Sheet data exposed publicly; breakage if restricted | Route through server proxy with allowlist |
| No security headers (no CSP/HSTS/XFO in `next.config.mjs`) | Clickjacking, no HSTS; CSP needs care with 5 third-party scripts | Add HSTS/XFO at minimum via CloudFront response headers policy (already referenced in `cloudfront-config.json`) |

---

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| 404/403 → homepage with 200 | Visitor on a dead URL silently lands on the homepage; confusion, no path back | Real 404 page with 404 status + links to projects |
| Stale cached project pages after deploy (24h TTL) | Homebuyers see outdated construction progress — the site's core value | Short HTML TTL + invalidation (Pitfall 8) |
| Wrong project name in loading/error text (live today: Airport Town and Gulmohar Villas show "Syncing Gulmohar Homes Data...") | Users see another project's branding on their dashboard | Config-driven strings with per-project values (Pitfall 5) |
| No per-page titles (only layout-level metadata) | Every tab reads the generic site title; poor share cards | `generateMetadata` per project page |
| Gallery "fade-in" that never fades (`opacity: loaded ? 1 : 1` no-op) | Intended UX broken, indistinguishable from working | Fix the conditional or remove the effect |
| Generic template copy across projects | Projects feel interchangeable; buyers can't tell them apart | Per-project unique hero/description/amenities copy required by the data contract |
| Hardcoded dated marketing copy ("KSA SALES EVENT 2025", "October 2025") | Content rot: stale events shown as current | Data-driven date fields with fallback, or remove |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Static export:** build succeeded but `/api/events` POST returns homepage HTML (200) — verify the API surface has an explicit home before enabling `output: 'export'`.
- [ ] **Deploy:** `s3 sync` ran and "succeeded" but HTML objects have no `Cache-Control` and no invalidation ran — verify `curl -I` headers and invalidation status `Completed`.
- [ ] **Template migration:** all 8 project pages migrated but every `<title>`/meta description is identical and no sitemap exists — grep the `out/` HTML.
- [ ] **Unification:** five components merged to one, but one project's sheet now fails to fetch or shows the wrong loading text — fetch each sheet by its real tab name, not by the "corrected" name.
- [ ] **CI green:** `npm run build` passed on the runner, but `grep -r "fbq('init', undefined)" out/` hits — env vars weren't passed to the build step.
- [ ] **Lint:** `npm run lint` script exists in package.json but eslint isn't installed (live today) — the command fails; wire real lint into CI.
- [ ] **Routes:** old `src/app/*/page.jsx` files deleted, but no check proved the new dynamic route emits the same 21 URLs — diff `out/` directory names against the old route list.
- [ ] **CDN:** CloudFront URL rewriting configured, but only tested by clicking links (client nav) — test direct URL entry and refresh (the exact failure mode of export-on-S3).
- [ ] **Redirects:** any URL changed during migration, but no 301 exists at the CDN — verify with `curl -I` on the old URL.

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Stale content after deploy | LOW | Re-run invalidation (`/*`), wait for `Completed`, hard-refresh test; permanently fix with tiered TTLs |
| Bucket emptied by `s3 sync --delete` with empty `out/` | MEDIUM (HIGH without versioning) | Enable S3 versioning now; restore from previous version; always guard `out/` existence |
| Broken/indexed URLs after migration | HIGH | Re-deploy old routes; add CloudFront Function 301/rewrite; re-submit sitemap; request reindexing in GSC |
| Wrong sheet name breaking a dashboard | LOW | Fix config value (data, not code); verify against the actual spreadsheet |
| Missing env var baked as `undefined` (pixel dead) | LOW | Rebuild with env passed into CI; hardcode ID; verify bundle |
| Dirty `data/events.json` blocking deploy | LOW | `git checkout data/events.json`; move runtime data out of repo (gitignore + seed) |
| API silently gone under static export | MEDIUM | Stand up Lambda/API Gateway for `/api/*` or accept static snapshot; never rollback blindly to Lightsail (dual targets) |
| Duplicate-content drop after template migration | HIGH | Restore per-page unique copy + metadata; add schema; monitor GSC |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Clean URLs → homepage soft-404 | P4 (CDN: CloudFront Function rewrite + real 404) | P5: direct-URL fetch of every route returns the right page; bogus URL → 404 |
| Static export kills `/api/events` + Meta proxy | P4 (explicit API decision before enabling export) | P5: `POST /api/events` returns JSON from its new home, not homepage HTML |
| Duplicate/thin project pages | P2 (data contract: required unique metadata + schema) | P5: crawl `out/` — per-page unique title/description/H1; sitemap + robots present |
| Broken URLs / route renames | P3 (slugs = existing routes; old pages deleted only after parity) | P5: diff old route list vs `out/` dirs; `curl -I` old URLs |
| Unification flattens hidden differences | P1 (catalog divergences first; config defaults = current values; snapshots before merge) | P1: snapshot tests per instance unchanged; each sheet fetch verified |
| GViz config drift / fragile parsing | P1 (single fetch/parse module + config table) | P1: each of the 5 projects fetches its real sheet in the unified component |
| Deploy fails on dirty tree / no gate | P0 (`data/events.json` hygiene) + P4 (runner build, lint, tests, `npm ci`) | P4: deploy succeeds after event edits; workflow includes lint+test job |
| Stale content / missing cache headers | P4 (two-pass upload + invalidation + content-type) | P5: `curl -I` HTML = short TTL; assets = `immutable`; invalidation `Completed` |
| IAM over-privilege | P4 (scoped user/role; private bucket; OIDC preferred) | P4: `aws iam` policy review; leaked-key blast radius = one bucket |
| NEXT_PUBLIC env missing in CI | P0 (`.env.example`, harden layout.js) + P4 (envs into build) | P5: grep built bundle for real pixel ID; no `undefined` |
| Image bloat / next/image on export | P0 (image pipeline hygiene) + P2 (template uses CDN + manifest, `unoptimized: true`) | P5: page-weight budget; no raw multi-MB `<img>` on migrated pages |

Phase legend (recommended ordering): **P0** Foundation & hygiene (lint, `.env.example`, `data/events.json` fix, `out/`/config drift cleanup) → **P1** Progress component unification → **P2** Project template + data model → **P3** Project page migration → **P4** CI/CD to S3/CloudFront (incl. CDN config fixes, IAM, API decision) → **P5** Post-deploy verification (route parity, SEO, cache, tracking).

---

## Sources

- Next.js official docs — Static Exports (unsupported features, route handlers, image loader): https://nextjs.org/docs/app/guides/static-exports (HIGH)
- Next.js official docs — generateStaticParams: https://nextjs.org/docs/app/api-reference/functions/generate-static-params (HIGH)
- Next.js official docs — Image Component (unoptimized, remotePatterns): https://nextjs.org/docs/app/api-reference/components/image (HIGH)
- Next.js official docs — Environment Variables (build-time inlining): https://nextjs.org/docs/pages/guides/environment-variables (HIGH)
- AWS whitepaper — Controlling how long S3 content is cached by CloudFront: https://docs.aws.amazon.com/whitepapers/latest/build-static-websites-aws/controlling-how-long-amazon-s3-content-is-cached-by-amazon-cloudfront.html (HIGH)
- AWS blog — Host SPAs with Tiered TTLs on CloudFront and S3: https://aws.amazon.com/blogs/networking-and-content-delivery/host-single-page-applications-spa-with-tiered-ttls-on-cloudfront-and-s3/ (HIGH)
- CloudFront docs — Manage how long content stays in the cache: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html (HIGH)
- GitHub — vercel/next.js#77359: Next 15 static export on S3+CloudFront shows .txt files after update (MEDIUM)
- GitHub — vercel/next.js#56731 discussion: route handlers + output:export incompatibility (MEDIUM)
- GitHub — vercel/next.js#45032: useSearchParams skips prerendering without Suspense (MEDIUM)
- eams.dev — About Nextjs, Cloudfront and S3 (and caching) (MEDIUM)
- DEV Community (dhayv) — Next.js CloudFront permission denied / static export URL issues (MEDIUM)
- StackOverflow — Next.js static export routing on S3/CloudFront, trailingSlash handling (MEDIUM)
- ifty64bit.com — Deploying React SPAs to S3+CloudFront with tiered caching, two-pass sync + guarded --delete (MEDIUM)
- cyberwarbaby.hashnode.dev — S3/CloudFront/GitHub Actions deploy post-mortem (IAM least privilege, blank-secret failure) (MEDIUM)
- dev.to — GitHub Actions OIDC deploy to S3 (no long-lived credentials) (MEDIUM); escanut.dev OIDC+Terraform (MEDIUM); sosoka.io IAM scoping (MEDIUM)
- stevekinney.com — CloudFront cache behaviors, invalidation propagation (MEDIUM)
- thatdevpro.com — Real Estate SEO framework (canonical strategy, schema, YMYL) (MEDIUM)
- dewebsolutions.com — Real Estate SEO 2026 guide (duplicate content, schema, migration/redirects) (MEDIUM)
- onwardseo.com — Technical SEO for real-estate dynamic listings (MEDIUM)
- devstacked.tech — S3 images in Next.js (remotePatterns, unoptimized) (MEDIUM)
- codewithkarani.com, sewon.dev, phase.dev — NEXT_PUBLIC baked-at-build post-mortems (MEDIUM)
- Component duplication tooling — duplicalis, doppel-ts, react-unify; Lerian Studio visual-testing standard (snapshot states) (MEDIUM)
- **Repo-grounded evidence (HIGH):** `.planning/codebase/CONCERNS.md`, `.planning/PROJECT.md`, `next.config.mjs`, `cloudfront-config.json`, `bucket-policy.json`, `.github/workflows/deploy.yml`, `src/app/layout.js`, the five `*ProgressRoadmap.jsx` components, `src/app/*/page.jsx` wrappers, verified via direct inspection 2026-08-01.

---
*Pitfalls research for: Flivv Developers — real-estate developer marketing website (static-export Next.js, template migration, component unification, S3/CloudFront CI/CD)*
*Researched: 2026-08-01*
