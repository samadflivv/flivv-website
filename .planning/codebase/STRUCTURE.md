# Codebase Structure

**Analysis Date:** 2026-08-01

## Directory Layout

```
flivvdevelopers/
├── src/
│   ├── app/                  # Next.js App Router: routes, layout, API routes
│   │   ├── layout.js         # Root layout (fonts, tracking scripts, Lenis)
│   │   ├── page.js           # Home route wrapper
│   │   ├── Home.jsx          # Home page composition (imported by page.js)
│   │   ├── globals.css       # Global Tailwind CSS
│   │   ├── <route>/page.jsx  # 20+ content routes
│   │   └── api/events/       # App Router API: GET/POST + PUT/DELETE by [id]
│   ├── components/           # 75 client components (sections, shared UI, hooks)
│   ├── lib/                  # Shared utilities: events.js, utils.js, useLenisScroll.js
│   ├── api/                  # events.example.json (example only — not loaded at runtime)
│   └── assets/               # Local static assets (muscat-hero.jpg)
├── pages/
│   └── api/meta-events.js    # Pages Router API: Meta Conversions API proxy
├── data/
│   └── events.json           # Event registry (JSON file store, committed)
├── public/                   # Static assets served at root (images, logos, sounds)
├── tools/
│   ├── source_images/        # Raw source images for the KSA gallery pipeline
│   └── generate-thumbs-upload.js  # sharp resize + S3 upload + manifest generator
├── ksaimages_resized/        # Optional local output of the image pipeline
├── out/                      # Static export build output (gitignored)
├── .next/                    # Next.js build cache (gitignored)
├── node_modules/             # Dependencies (gitignored)
├── package.json              # Dependencies + scripts (dev/build/start/lint)
├── next.config.mjs           # Next.js config (S3 image remotePatterns)
├── jsconfig.json             # Path alias: "@/*" -> "./src/*"
├── tailwind.config.js        # Tailwind content globs + theme colors
├── postcss.config.mjs        # PostCSS config
├── components.json           # shadcn/ui config (new-york style, lucide)
├── .env.local / .env.production  # Environment config (do not read/commit)
├── bucket-policy.json        # S3 bucket policy (deployment)
├── cloudfront-config.json    # CloudFront distribution config (deployment)
├── dist-config-with-logging.json  # Distribution config w/ logging (deployment)
├── lightsail-cors.json       # AWS Lightsail CORS config (deployment)
├── waf-rules.json            # AWS WAF rules (deployment)
├── webacl.json               # AWS Web ACL config (deployment)
└── README.md                 # Default create-next-app README (not updated)
```

## Directory Purposes

**`src/app/` (App Router routes + layout):**
- Purpose: All route declarations, the root layout, and App Router API endpoints
- Contains: `layout.js`, `globals.css`, `Home.jsx`, 21 content-route directories, `api/events/`
- Key files: `src/app/layout.js` (root layout, tracking scripts, smooth scroll), `src/app/page.js` (home wrapper)

**`src/app/<route>/` (content routes):**
- Purpose: One thin `page.jsx` per URL; server component composing `<Navigation/>` + section components + `<Footer/>`
- Contains: `about`, `airporttown`, `contact`, `dohaoffice`, `eventsform`, `faqs`, `flivvbahrainvisit`, `flivvksaevent`, `flivvomanevent`, `flivvqatarevent`, `gulmoharhomes`, `gulmoharvillas`, `nshomes`, `nshomes2`, `projects`, `resale`, `rivendellfarms`, `sadhanacity`, `salesmeets`, `sukoonvillas`
- Key files: `src/app/salesmeets/page.jsx` (wraps `EventCalendar` in `<Suspense>` with a loading fallback)

**`src/app/api/` (App Router API):**
- Purpose: JSON-file-backed events REST API
- Contains: `events/route.js` (GET, POST), `events/[id]/route.js` (PUT, DELETE)

**`src/components/` (client components):**
- Purpose: All UI. Section components for each page plus shared components (Navigation, Footer, PopupModal) and client hooks
- Contains: 75 `.jsx`/`.js` files; see "Naming Conventions"
- Key files: `src/components/Navigation.jsx`, `src/components/Footer.jsx`, `src/components/EventCalendar.jsx`, `src/components/button.jsx` (shadcn/ui-style), `src/components/useScrollSpy.js`

**`src/lib/` (utilities):**
- Purpose: Shared server/client helpers
- Contains: `events.js` (file store access), `utils.js` (`cn()` helper), `useLenisScroll.js` (smooth scroll hook)
- Note: `useLenisScroll.js` is a client hook living in `lib/`, while other hooks (`useScrollSpy.js`, `usePrefersReducedMotion.js`) live in `src/components/` — see ARCHITECTURE.md anti-pattern "Mixed Hook Placement"

**`pages/api/` (Pages Router API):**
- Purpose: Legacy-route API endpoint that cannot live in the App Router (kept for the Meta proxy)
- Contains: `meta-events.js` (POST proxy to Meta Graph API v18.0)

**`data/`:**
- Purpose: Runtime data store for the events feature; committed to git
- Contains: `events.json` (~1400 lines, array of event objects with `id`, `title`, `start`, `country`, `venue`, `isPublished`, ...)

**`public/`:**
- Purpose: Static assets served at `/` (no build processing)
- Contains: 80+ images (`flivv-logo.png`, `herosection-home.JPG`, per-project photos), `favicon.ico`, subdirs `avatars/`, `gvimages/`, `icons/`, `images/`, `logos/`, `sounds/`

**`tools/`:**
- Purpose: Offline build/ops scripts for the KSA gallery
- Contains: `generate-thumbs-upload.js` (sharp resize → S3 upload → manifest.json), `source_images/` (riyadh/jeddah/event/alkhobar raw images)

**Root config/ops files:**
- `package.json` — scripts `dev`/`build`/`start`/`lint`; deps: next 15.3.6, react 18.2.0, framer-motion, gsap, swr, axios, @aws-sdk/client-s3, sharp, date-fns, lucide-react, @studio-freight/lenis
- `next.config.mjs` — S3 image `remotePatterns`; `output: 'export'` currently commented out
- `jsconfig.json` — `@/*` → `./src/*`
- `tailwind.config.js` — content globs (`./pages/**/*`, `./components/**/*` — note: `src/**` is commented out), theme colors, `backdropBlur` extension
- `postcss.config.mjs` — PostCSS pipeline
- `components.json` — shadcn/ui settings (new-york style, `rsc: true`, lucide icons, aliases `@/components`, `@/lib/utils`, `@/hooks`)
- `bucket-policy.json`, `cloudfront-config.json`, `dist-config-with-logging.json`, `lightsail-cors.json`, `waf-rules.json`, `webacl.json` — AWS deployment configuration snapshots
- `.env.local`, `.env.production` — environment configuration (existence noted; contents must not be read)

## Key File Locations

**Entry Points:**
- `src/app/layout.js`: Root layout — fonts, global CSS, all tracking scripts, `<SmoothScrollWrapper>`
- `src/app/page.js`: Home route → renders `PopupModal` + `Home.jsx`
- `src/app/Home.jsx`: Home page section composition

**Configuration:**
- `next.config.mjs`: Next.js config (image remote patterns)
- `jsconfig.json`: `@/*` path alias
- `tailwind.config.js` + `src/app/globals.css`: Styling system
- `components.json`: shadcn/ui configuration
- `package.json`: Dependencies and scripts

**Core Logic:**
- `src/lib/events.js`: Event file-store read/write (the only shared "business logic")
- `src/app/api/events/route.js` + `src/app/api/events/[id]/route.js`: Events REST API
- `pages/api/meta-events.js`: Meta Conversions API proxy (SHA256 email hashing)
- `tools/generate-thumbs-upload.js`: Image pipeline (sharp + S3)

**Testing:**
- None. No test framework, no test files, no CI workflow (`.github/` directory exists but contains no workflow files)

## Naming Conventions

**Files:**
- Route pages: lowercase `page.js` or `page.jsx` inside route dirs (both extensions in use; `page.js` for home, `page.jsx` elsewhere)
- Components: `PascalCase.jsx` (e.g., `GulmoharHomes.jsx`, `Navigation.jsx`)
  - Exception: `src/components/button.jsx` (lowercase, shadcn convention)
  - Acronyms preserved as-is (`RFSForm.jsx`, `NSHomes.jsx`, `GVcta.jsx`, `ATProgressRoadmap.jsx`)
- Hooks: `useCamelCase.js` (e.g., `useScrollSpy.js`, `useLenisScroll.js`)
- API routes: `route.js` (App Router), `meta-events.js` (Pages Router)
- Extensions: `.js` and `.jsx` both used; no TypeScript anywhere

**Directories:**
- Routes: lowercase, no separators (`sukoonvillas`, `gulmoharhomes`, `flivvksaevent`)
- Content grouping: route directories under `src/app/`, components flat under `src/components/` (no subdirectories for sections; `src/components/ui/` does not exist despite `components.json` alias)

## Where to Add New Code

**New Feature (new page/route):**
1. Create `src/app/<route>/page.jsx` — thin server component
2. Import existing shared `<Navigation/>` and `<Footer/>` from `src/components/`
3. Build the page's section components in `src/components/<PascalCase>.jsx` with `'use client'` at the top
4. Follow the composition pattern: `<Navigation/>` → sections → `<Footer/>` (see `src/app/projects/page.jsx`, `src/app/nshomes/page.jsx`)

**New Shared Component:**
- Implementation: `src/components/` (flat, PascalCase, e.g., `src/components/NewFeatureCard.jsx`)
- Add `'use client'` as the first line if it uses hooks, animation (framer-motion/GSAP), or event handlers
- Use `cn()` from `src/lib/utils.js` for conditional classes; lucide-react for icons; Tailwind utility classes for styling

**New Client Hook:**
- Preferred location: `src/components/useXxx.js` to match existing hooks (`useScrollSpy.js`, `usePrefersReducedMotion.js`), OR `src/lib/useXxx.js` to match `useLenisScroll.js`. Keep consistent with the existing pattern you are extending; note the codebase currently has both.

**New API Endpoint:**
- App Router: `src/app/api/<resource>/route.js` (GET/POST) and `src/app/api/<resource>/[id]/route.js` (PUT/DELETE); wrap in try/catch and return `Response(JSON.stringify(...), { status, headers })`
- Pages Router (legacy, e.g., third-party proxies): `pages/api/<name>.js` with `export default async function handler(req, res)`

**New Utility:**
- Shared helpers: `src/lib/<name>.js` (e.g., `src/lib/events.js` for file-backed data)

**New Static Asset:**
- Images referenced via `/path/from/public` go in `public/` (or a subdirectory like `public/images/`, `public/gvimages/`)
- App-only assets can go in `src/assets/`

**New Data Store:**
- For JSON-file-backed data, mirror `src/lib/events.js`: a lib module with `read<Name>()`/`write<Name>()` using `path.join(process.cwd(), 'data', ...)`, plus API routes. Only server code may use it (Node `fs`).

**New Ops Script:**
- `tools/<name>.js` (Node script, CommonJS style as in `tools/generate-thumbs-upload.js`)

## Special Directories

**`node_modules/`:**
- Purpose: Installed dependencies
- Generated: Yes
- Committed: No (gitignored)

**`.next/`:**
- Purpose: Next.js dev/build cache
- Generated: Yes
- Committed: No (gitignored)

**`out/`:**
- Purpose: Static export output (S3/CloudFront deployment snapshot)
- Generated: Yes
- Committed: No (gitignored)
- Note: Contains a stale snapshot of the site (404.html, route folders, `_next/`)

**`ksaimages_resized/`:**
- Purpose: Local output for `tools/generate-thumbs-upload.js`
- Generated: Yes (by the script)
- Committed: No (empty at analysis time)

**`data/`:**
- Purpose: Committed runtime data for the events feature
- Generated: No (seeded and edited via the events API)
- Committed: Yes — `data/events.json` is tracked in git (see `src/lib/events.js` which reads/writes it at runtime)

**`src/api/`:**
- Purpose: Example payload reference only (`events.example.json`)
- Generated: No
- Committed: Yes
- Note: Not imported anywhere at runtime — do not place live code here

**`public/sounds/`:**
- Purpose: Audio assets (referenced by animation/scroll components)

---

*Structure analysis: 2026-08-01*
