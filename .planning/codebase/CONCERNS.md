# Codebase Concerns

**Analysis Date:** 2026-08-01

## Tech Debt

**Events API — no authentication or rate limiting:**
- Issue: `POST /api/events`, `PUT /api/events/[id]`, and `DELETE /api/events/[id]` accept any request. Anyone on the internet can create, edit, or delete events in `data/events.json`. The admin UI in `EventCalendar.jsx` is gated only by the `enableAdmin` prop (`src/components/EventCalendar.jsx:11`), which defaults to `true` — a client-side flag, not a server-side permission check.
- Files: `src/app/api/events/route.js`, `src/app/api/events/[id]/route.js`, `src/components/EventCalendar.jsx`
- Impact: Event calendar defacement, spam events on the public sales-meets page (`src/app/salesmeets/page.jsx`), data tampering with no trace.
- Fix approach: Require an admin token/secret header validated server-side in all three routes; add rate limiting; never trust client-side `enableAdmin`.

**File-based event storage that is tracked in git:**
- Issue: `src/lib/events.js` writes runtime data to `data/events.json` via `fs.writeFileSync` — a file that is committed to the repository. Every API write dirties the git working tree.
- Files: `src/lib/events.js`, `data/events.json`
- Impact: `git pull origin main` in the deploy workflow (`.github/workflows/deploy.yml:20`) will refuse to run when `data/events.json` has local runtime modifications, causing deploy failures. Writes are non-atomic (whole-file rewrite) and race on concurrent requests, losing updates.
- Fix approach: Move runtime data out of the repo (gitignore `data/events.json`, ship a seed copy) or migrate to a database (SQLite/Postgres/S3+KV). Add a write lock or serialize writes.

**Mixed routing architectures:**
- Issue: App Router lives in `src/app/` while `pages/api/meta-events.js` uses the legacy Pages Router. Two routing paradigms, two different route-handler conventions in one codebase.
- Files: `src/app/api/events/route.js` vs `pages/api/meta-events.js`
- Impact: Inconsistent patterns; the Pages Router API cannot use App Router features; future maintainers must know both.
- Fix approach: Migrate `pages/api/meta-events.js` to `src/app/api/meta-events/route.js`.

**Duplicated HubSpot form loader logic:**
- Issue: The same script-injection + `innerHTML` cleanup + `setTimeout(100)` pattern for embedding HubSpot forms is copy-pasted across at least five components.
- Files: `src/components/GulmoharHomes.jsx:97-189`, `src/components/OmnRegistrationform.jsx`, `src/components/AirportTown.jsx`, `src/components/Omanpage.jsx`, `src/components/EventFormPage.jsx`, `src/components/RFSForm.jsx`
- Impact: Bug fixes must be applied in N places; magic timers are fragile; `PORTAL_ID` '21626983' is duplicated in `src/app/layout.js:54` and every component.
- Fix approach: Extract a shared `useHubSpotForm(portalId, formId, containerRef)` hook in `src/lib/` or `src/components/hooks/`.

**Commented-out Next config and stale build output:**
- Issue: `next.config.mjs` has the S3/CloudFront static-export config (`output: 'export'`, `images.unoptimized`, `trailingSlash`) fully commented out; only the `images.remotePatterns` block is active. The `out/` directory (229 files) is a stale static export from Dec 2025 that no longer matches the active server configuration.
- Files: `next.config.mjs`, `out/`
- Impact: Config drift — it is unclear which deployment target (Lightsail `next start` vs S3/CloudFront static export) is authoritative. The stale `out/` artifacts could be accidentally published.
- Fix approach: Delete `out/`, delete dead comments, and document the single deployment target (Lightsail per `.github/workflows/deploy.yml`).

**Deprecated sync `params` access (Next 15 async params):**
- Issue: `src/app/api/events/[id]/route.js` destructures `{ params }` synchronously (`const { id } = params`). In Next.js 15, route-handler `params` is a Promise; sync access relies on the temporary compatibility shim, logs deprecation warnings, and becomes `undefined` in Next 16 (PUT/DELETE will 404).
- Files: `src/app/api/events/[id]/route.js:4-6,49-51`
- Impact: Silent breakage on the next major upgrade; noisy build warnings today.
- Fix approach: `export async function PUT(request, { params }) { const { id } = await params; ... }` (same for DELETE).

**No linting configured:**
- Issue: `npm run lint` (`next lint`) is declared in `package.json:9` but `eslint` and `eslint-config-next` are not installed and no eslint config file exists. The command fails.
- Files: `package.json`, no `eslint.config.*` / `.eslintrc*` present
- Impact: Zero static analysis; issues like the duplicate import below ship silently.
- Fix approach: Add `eslint` + `eslint-config-next` devDependencies with a config, run in CI.

**Code-quality smells:**
- Duplicate import of the same module under two names in `src/components/GulmoharHomes.jsx:4-5` (`import ProgressRoadmap` and `import GHProgressRoadmap` both from `./GHProgressRoadmap` — one is dead).
- `"main": "tailwind.config.js"` in `package.json:44` — incorrect main field for an app.
- `react-router-dom` (`^7.5.2`) in `package.json:30` is never imported anywhere in `src/` — unused heavyweight dependency.
- Non-semantic commit history: the last 15 commits are all `changes` or `events`-type messages (`git log --oneline`), making history unreviewable and bisection painful.
- Unconventional entry file `src/app/Home.jsx` (should be `src/app/page.jsx`; `src/app/page.js` imports it at line 1).
- Hardcoded dated marketing copy ("KSA SALES EVENT 2025", "October 2025") in `src/components/FlivvConnectPage.jsx:245-255` — content rot.

## Known Bugs

**Gallery fade-in is a no-op:**
- Symptoms: `style={{ opacity: loaded ? 1 : 1 }}` — opacity is always `1`; the `loaded` state never affects rendering, so the fade-in never actually fades.
- File: `src/components/FlivvConnectPage.jsx:70`
- Trigger: Any KSA gallery image load.
- Workaround: None needed (images display), but the intended UX is broken.
- Fix: `style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}`.

**Thumbnail tool produces mislabeled placeholder format:**
- Symptoms: `tools/generate-thumbs-upload.js:50-56` chains `.jpeg({ quality: 75 }).webp({ quality: 70 })` on the same sharp pipeline — only the last format call wins, so the placeholder is WebP-encoded but declared as `data:image/jpeg;base64,...` in the manifest.
- Files: `tools/generate-thumbs-upload.js`
- Impact: Manifest placeholders served to `src/components/FlivvConnectPage.jsx:49` may fail to render in strict MIME contexts; inconsistent with their label.
- Fix: Pick one format in the placeholder chain (e.g., remove `.webp()`).

**Events API data-shape bugs:**
- Symptoms: `POST /api/events` does `parseInt(eventData.capacity)` on a possibly empty string → `NaN`, which JSON-serializes to `null`. Existing data shows the mismatch: 26 of 76 events in `data/events.json` have `"capacity": ""` while API-created events get `null`. `isPublished` is hardcoded to `true` and `end` may be dropped. `PUT /api/events/[id]` spreads client updates over the event without validation, so a client can overwrite `id`, `createdAt`, or `isPublished`, after which the event can no longer be found by its original id.
- Files: `src/app/api/events/route.js:67-77`, `src/app/api/events/[id]/route.js:23-29`, `data/events.json`
- Trigger: Creating an event with empty capacity, or PUTting an object containing an `id` field.
- Impact: Inconsistent schema, orphaned events, corrupt calendar entries.
- Fix: Coerce/validate `capacity` (Number, positive int or undefined); whitelist updatable fields in PUT; validate dates before `toISOString()`.

**Events API invalid-date handling:**
- Symptoms: `POST` with an unparseable `start` passes the `isPast(Invalid Date)` check (returns false) and then throws `RangeError` from `toISOString()` → 500 with a generic error. `GET` silently drops any event whose `start` fails `parseISO` (catch → `return false`), so bad data disappears from the calendar without any signal.
- Files: `src/app/api/events/route.js:12-17,55-56,75`
- Impact: Confusing 500s on bad input; silent data loss from the public view.
- Fix: Validate with `isValid(parseISO(...))` and return 400 on invalid dates.

**Meta Pixel init depends on an env var that may be unset:**
- Symptoms: `src/app/layout.js:83` renders `fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}')` — if the env var is missing at build time, the pixel emits `fbq('init', undefined)` and tracking silently breaks, while all other tracking IDs (GTM `GTM-TGRWCJ9M`, GA4 `G-2EBCG8YCRC`, HubSpot `21626983`, Clarity `s0w31v8v2n`) are hardcoded.
- Files: `src/app/layout.js`
- Fix: Hardcode the pixel ID like the others, or fail the build when the var is missing (`.env.example` would help).

**Meta events proxy hashes raw email without normalization:**
- Symptoms: `pages/api/meta-events.js:23` hashes `user_data?.em || ''` as-is. Meta expects SHA-256 of lowercased/trimmed email for deduplication; unnormalized or empty values (`SHA256('')`) yield near-zero match rates and hash events that pollute the pixel.
- Files: `pages/api/meta-events.js`
- Fix: `String(user_data?.em || '').trim().toLowerCase()` before hashing; skip the event when empty instead of hashing the empty string.

## Security Considerations

**Unauthenticated write API (critical):**
- Risk: `POST/PUT/DELETE` on `/api/events` are fully open — no auth, no origin check, no rate limit. An attacker can wipe or spam the sales-meet calendar that feeds the public page.
- Files: `src/app/api/events/route.js`, `src/app/api/events/[id]/route.js`
- Current mitigation: None server-side. Client UI hides admin buttons via `enableAdmin` prop on `src/app/salesmeets/page.jsx:23`, but direct API calls bypass that entirely.
- Recommendations: Admin bearer token checked in all mutating routes; rate limiting (e.g., in Next config `headers()` or a middleware); validate body size and fields.

**Open proxy to Facebook Graph (moderate):**
- Risk: `pages/api/meta-events.js` forwards any POST body to `graph.facebook.com` using the stored access token. Anyone can flood the pixel with fake `event_name` values (event spoofing, skewed ad optimization). `event_name`, `user_data`, and `custom_data` are unvalidated. The token is passed as a query parameter, which can leak into access logs.
- Files: `pages/api/meta-events.js`
- Current mitigation: Server-side token (env), POST-only, SHA-256 hashing of `em`.
- Recommendations: Validate `event_name` against an allowlist; rate-limit; hash and normalize `user_data`; consider POSTing the token in headers instead of the URL.

**`dangerouslySetInnerHTML` / innerHTML manipulation:**
- Risk: Used in `src/app/layout.js:73` (Meta pixel — static string), `src/components/EventFormPage.jsx:93`, `src/components/AirportTown.jsx:782`, and `innerHTML = ''`/`createElement` in HubSpot loaders (`GulmoharHomes.jsx:133-137`, `Omanpage.jsx:419`). All current usages are static/dynamic DOM built from constants, so XSS risk is low today — but any future data interpolation into these sinks would be an injection path.
- Files: `src/app/layout.js`, `src/components/EventFormPage.jsx`, `src/components/AirportTown.jsx`, `src/components/GulmoharHomes.jsx`
- Recommendation: Audit these sites during any change; never interpolate user input into them; prefer React refs/`createPortal` over `innerHTML`.

**Public Google Sheets data:**
- Risk: Spreadsheet IDs are hardcoded in client bundles and fetched via the undocumented `gviz/tq` endpoint (`src/components/GHProgressRoadmap.jsx:7-12`; same pattern in `ATProgressRoadmap.jsx`, `GVProgressRoadmap.jsx`, `NSHdevprogress.jsx`, `NSH2devprogress.jsx`). For this to work the sheets must be world-readable ("anyone with the link"). If a sheet is ever restricted for privacy, the component breaks; if it holds sensitive data, it is exposed.
- Files: `src/components/GHProgressRoadmap.jsx`, `src/components/ATProgressRoadmap.jsx`, `src/components/GVProgressRoadmap.jsx`, `src/components/NSHdevprogress.jsx`, `src/components/NSH2devprogress.jsx`
- Recommendation: Route sheet reads through a server endpoint with an allowlist of sheet IDs.

**Secret hygiene (positive finding + gap):**
- No AWS access keys, private keys, or obvious hardcoded secrets were found in tracked files (grep for `AKIA*`, `BEGIN *PRIVATE KEY`, `sk-*` returned nothing). `.env.local` and `.env.production` exist locally but are gitignored (`.gitignore:19-20`).
- Gap: No `.env.example` documents which variables are required (`FACEBOOK_PIXEL_ID`, `FACEBOOK_ACCESS_TOKEN`, `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` are referenced in `pages/api/meta-events.js` and `src/app/layout.js`).
- Recommendation: Add `.env.example`; verify `.env.production` is never committed.

**No security headers configured:**
- `next.config.mjs` has no `headers()` block — no CSP, HSTS, X-Frame-Options, or Referrer-Policy. The site loads five third-party scripts (`layout.js`) so a CSP needs careful tuning, but HSTS/XFO at minimum should be added.

## Performance Bottlenecks

**Unoptimized images shipped at full size (major):**
- Problem: `public/` contains ~229 MB of images. Individual files are massive: `RFSbreakfast.jpg` 19.2 MB, `SukoonVillas1.jpg` 12.3 MB, `ctaImage.JPG` 11.3 MB, `event4.jpg` 10.2 MB, `teamflivvimg2.JPG` 10 MB, `DSC00693.JPG` 9 MB, `herosection-home.JPG` 8.9 MB.
- Files: `public/` (147 image files, ~229 MB total; `public/images` alone 79.5 MB)
- Cause: Raw `<img>` tags outnumber `next/image` usage 31+ to 8 across `src/components/*.jsx`; raw tags bypass Next's image optimization entirely, so multi-MB JPEGs are delivered as-is.
- Improvement path: Convert to `next/image` (or at minimum compress/re-encode with `sharp` at build time), serve from the existing S3 CDN (`flivv-web-cdn`), and remove the full-size originals from `public/`.

**Triple storage of KSA gallery images:**
- Problem: The same KSA event photos exist as full-size JPGs in `public/images/` (27 files, 822 KB–3.7 MB each, ~37 MB), as resized variants in `ksaimages_resized/` at repo root (tracked, ~50 MB, not served by the app), and as S3 CDN variants used at runtime.
- Files: `public/images/alkhobar*.jpg`, `public/images/riyadh*.jpg`, `public/images/jeddah*.jpg`, `ksaimages_resized/`, `src/components/FlivvConnectPage.jsx`
- Impact: 308 MB tracked repo size (`git ls-files` total), slow clones, stale duplicate sets.
- Fix: Delete the local `ksaimages_resized/` output from git (it is a build artifact of `tools/generate-thumbs-upload.js`), keep only S3 variants, and drop the full-size `public/images` copies if the manifest approach is kept.

**Five tracking scripts on every page:**
- Problem: GTM, GA4, HubSpot, Microsoft Clarity, and Meta Pixel all load `afterInteractive` in the root layout.
- File: `src/app/layout.js:27-87`
- Impact: Added startup cost and jank on all pages, especially mobile.
- Fix: Audit necessity, defer non-critical ones, keep only GTM (which can host GA4) and Clarity/Pixel if required.

**Aggressive Google Sheets polling:**
- Problem: Five roadmap components each poll a Google Sheet every 20 seconds (`REFRESH_INTERVAL = 20000`, `src/components/GHProgressRoadmap.jsx:9`), client-side.
- Impact: Continuous background requests per visitor; risk of Google throttling/banning the public gviz endpoint; battery/bandwidth cost.
- Fix: Server-side caching proxy with a much longer TTL, or fetch once on page load with SWR `revalidateOnFocus` instead of a fixed interval.

**Render-blocking font imports in styled-jsx:**
- `@import url('https://fonts.googleapis.com/...')` appears inside `<style jsx global>` blocks (e.g., `src/components/GulmoharHomes.jsx:227`) — CSS `@import` is render-blocking and slow. Use `next/font` (already used for Geist in `src/app/layout.js`) or preconnect + `<link>`.

## Fragile Areas

**`src/app/api/events/[id]/route.js` (Next 16 upgrade):**
- Files: `src/app/api/events/[id]/route.js`
- Why fragile: Depends on deprecated sync `params` access (see Tech Debt). Any Next 15.x → 16 upgrade silently breaks PUT/DELETE with 404s, and there are no tests to catch it.
- Safe modification: `await params` now; add a route test asserting PUT/DELETE resolve ids.
- Test coverage: None.

**KSA gallery manifest dependency:**
- Files: `src/components/FlivvConnectPage.jsx`
- Why fragile: The whole gallery depends on a runtime fetch of `https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/ksa-gallery/manifest.json` (`MANIFEST_URL`, line 7). If S3/CDN is misconfigured or the manifest drifts from the local `ksaimages_resized/manifest.json`, every tile shows a permanent "Loading…" placeholder (`FlivvConnectPage.jsx:216-221`) and the lightbox falls back to multi-MB local JPGs. The committed manifest and the S3 manifest are maintained manually via `tools/generate-thumbs-upload.js` and can drift.
- Test coverage: None.

**`data/events.json` as a runtime-writable tracked file:**
- Files: `src/lib/events.js`, `data/events.json`
- Why fragile: Concurrent writes lose data (read-modify-write whole file); a malformed write corrupts the JSON and `readEvents` silently returns `[]` (`src/lib/events.js:31`), wiping the calendar view; runtime modifications break `git pull` during deploys.
- Test coverage: None.

**HubSpot form injection:**
- Files: `src/components/GulmoharHomes.jsx:97-189`, `src/components/OmnRegistrationform.jsx`, `src/components/AirportTown.jsx`, `src/components/Omanpage.jsx`, `src/components/EventFormPage.jsx`
- Why fragile: Relies on loading a third-party script at runtime, creating DOM nodes with `Math.random()` ids, and `setTimeout(..., 100)` to wait for mount. If the HubSpot script is blocked/slow, forms silently never appear. Cleanup sets `innerHTML = ''` on unmount to stop forms leaking across pages — this pattern was already a "CRITICAL FIX" per the comment at `GulmoharHomes.jsx:92-95`, implying prior cross-page leakage bugs.

**Google Sheets `gviz/tq` parsing:**
- Files: `src/components/GHProgressRoadmap.jsx:14-23` (repeated in the other roadmap components)
- Why fragile: Parses the unofficial GViz JSON by substringing between the first `{` and last `}`; any format change by Google breaks parsing. The endpoint is undocumented and deprecated by Google for new use.

## Scaling Limits

**Event storage:**
- Current capacity: `data/events.json` holds 76 events (~44 KB) and is rewritten in full on every mutation.
- Limit: At high write concurrency the read-modify-write loop loses updates; a large file makes every write O(n) and every request rewrites the whole file.
- Scaling path: Move to a real datastore or serialize writes with a queue; add pagination/rate limits on the API.

**Tracking/polling load:**
- 5 roadmap components × 20s polling × every concurrent visitor hits Google's public gviz endpoint — no server-side caching, so the load scales linearly with traffic.

## Dependencies at Risk

**`@studio-freight/lenis` (`^1.0.42`):**
- Risk: The `@studio-freight/lenis` package is deprecated; the library now publishes as `lenis`. It still installs and works, but receives no updates.
- Files: `package.json:14`, `src/lib/useLenisScroll.js`, `src/components/SmoothScrollWrapper.jsx`
- Migration plan: Switch the import to the `lenis` package (drop-in API) and remove the old name.

**Google `gviz/tq` endpoint:**
- Risk: Unofficial, undocumented, and effectively deprecated for new use; Google can disable it at any time, breaking all five roadmap components.
- Files: `src/components/GHProgressRoadmap.jsx`, `ATProgressRoadmap.jsx`, `GVProgressRoadmap.jsx`, `NSHdevprogress.jsx`, `NSH2devprogress.jsx`
- Migration plan: Use the official Google Sheets API through a server route, or cache the rendered roadmap at build time.

**`react-router-dom` (`^7.5.2`):**
- Risk: Installed but unused anywhere in `src/` — dead weight and an unnecessary attack surface.
- Fix: Remove from `package.json`.

**No error monitoring / logging:**
- All diagnostics are `console.error`/`console.warn` (38 occurrences across `src/`). There is no Sentry or equivalent, no structured logging, and no request logging. Production failures (e.g., the `[id]` route params issue) are invisible unless someone watches server stdout.
- Files: `src/app/api/events/route.js`, `src/app/api/events/[id]/route.js`, `src/lib/events.js`, `pages/api/meta-events.js`, components
- Recommendation: Add an error-tracking service or at minimum a server-side logging middleware.

## Missing Critical Features

**Automated testing (entirely absent):**
- Problem: No test files, no test framework config (`jest.config.*`, `vitest.config.*`, `playwright.config.*` all absent), no test step in `.github/workflows/deploy.yml`. The deploy pipeline is build-only: `git pull → npm install → npm run build → pm2 restart` (`.github/workflows/deploy.yml:18-23`).
- Impact: The unauthenticated API, the fragile `[id]` route, and the JSON store can break or regress silently in production.
- Fix: Add Vitest for API routes and core libs; add a `test` job to the deploy workflow before build; use `npm ci` instead of `npm install`.

**Auth for admin operations:**
- The events calendar has a full admin UI (`EventCalendar.jsx`) with zero authentication — see Tech Debt.

**Rate limiting / abuse protection:**
- No rate limiting anywhere (events API, meta-events proxy, gviz polling is client-side by design).

**`.env.example` / environment documentation:**
- Missing — new developers cannot know which env vars are required.

**Deploy safety:**
- `.github/workflows/deploy.yml` deploys on every push to `main` with no test gate, no build verification on the runner (build happens on the server), no health check after `pm2 restart`, and no rollback. Combined with `git pull` on a tree that `data/events.json` writes dirty, deploys can fail intermittently.

## Test Coverage Gaps

**Untested area: Events API routes.**
- What's not tested: GET/POST validation (`src/app/api/events/route.js`), PUT/DELETE id resolution and Next 15 async `params` behavior (`src/app/api/events/[id]/route.js`), JSON store read/write (`src/lib/events.js`).
- Files: `src/app/api/events/route.js`, `src/app/api/events/[id]/route.js`, `src/lib/events.js`
- Risk: The unauthenticated write surface and the 404-on-Next-16 bug ship unnoticed.
- Priority: High

**Untested area: Meta events proxy.**
- What's not tested: `pages/api/meta-events.js` — field validation, email hashing/normalization, error paths.
- Risk: Event spoofing and broken pixel matching go undetected.
- Priority: High

**Untested area: Client data flows.**
- What's not tested: `EventCalendar.jsx` CRUD handlers, `FlivvConnectPage.jsx` manifest loading and fallbacks, HubSpot form loaders, gviz parsing in the five roadmap components.
- Files: `src/components/EventCalendar.jsx`, `src/components/FlivvConnectPage.jsx`, `src/components/GulmoharHomes.jsx`, `src/components/GHProgressRoadmap.jsx` et al.
- Risk: Third-party and runtime-data regressions break the public site unnoticed.
- Priority: Medium

---

*Concerns audit: 2026-08-01*
