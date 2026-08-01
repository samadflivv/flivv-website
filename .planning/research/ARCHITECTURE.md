# Architecture Research — Data-Driven Project Page System

**Domain:** Data-driven / content-driven static-export site (Next.js 15 App Router, plain JS, S3/CloudFront)
**Project:** Flivv Developers marketing website
**Researched:** 2026-08-01
**Confidence:** HIGH (framework mechanics + codebase facts), MEDIUM (pattern choices from ecosystem)

## Standard Architecture

Data-driven static sites follow one invariant: **data and presentation are separated, and routes are derived from a content registry.** The site compiles — you edit content data, rebuild, and static HTML files are emitted. Adding a page = adding a registry entry, not a new component.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         BUILD TIME (next build, server)                        │
│                                                                                │
│  content registry ──► generateStaticParams ──► [slug] page ──► ProjectPage     │
│  (src/content/        (emits one route per     (looks up project,   (server     │
│   projects/*.js)       project slug)            notFound() guard)    template)  │
│                                                                                │
│  ProjectPage ──► section registry ──► section components (server by default)   │
│  (maps ordered            (key → component     (render from data props;         │
│   project.sections)        map, no switches)    no data fetching)               │
│                                                                                │
│  static sections render to HTML; interactive sections become CLIENT ISLANDS    │
└──────────────────────────────────────────────────────────────────────────────┘
                              │  out/ (static HTML per route)
                              ▼
┌────────────────────────── BROWSER (runtime) ──────────────────────────────────┐
│  ProjectProgress (client) ──► SWR fetch GViz (docs.google.com) every 20s       │
│  ProjectGallery (client) ────► fetch S3 manifest.json (flivv-web-cdn)          │
│  ProjectCta (client) ─────────► HubSpot embed (js.hsforms.net)                 │
│  Everything else: server-rendered HTML, no JS hydration                        │
└──────────────────────────────────────────────────────────────────────────────┘
```

Key characteristics of the target pattern:

- **One template renders every project.** `ProjectPage` is a server component that takes a project data object and renders an ordered list of sections. No per-project components exist.
- **Routes are derived from data, not hand-written.** `generateStaticParams()` in a root `[slug]` route emits one static route per project slug. Adding a project = adding one data file. No route file, no component file.
- **Only interactive sections are client components.** Content sections (hero, highlights, details, floor plans, amenities, map, FAQ, CTA copy) render on the server from data props. The `'use client'` boundary sits at the few islands that need hooks: progress polling (SWR), gallery (IntersectionObserver lazy-load), HubSpot forms. This directly reverses the current ~50-client-monolith state.
- **Live external sources are unchanged.** Google Sheets GViz stays the live progress source (20s client polling), S3 manifest stays the gallery source, HubSpot stays the form source. The template only changes *how* their config reaches the client (data props instead of hardcoded constants).

## Component Responsibilities

| Component | Responsibility | Talks To | Server/Client |
|-----------|---------------|----------|---------------|
| `src/content/projects/<slug>.js` | One serializable content object per project (hero, sections order, accent, progress config, metadata) | `index.js` (import) | Build-time module |
| `src/content/projects/index.js` | Registry: ordered list + slug→project map; single source of truth for URLs | `generateStaticParams`, `[slug]` page, `Navigation` | Build-time module |
| `src/content/projects/validate.js` | Build-time assertions: required fields per included section; throws on bad data | all project files | Build-time module |
| `src/app/[slug]/page.jsx` | Dynamic route: `generateStaticParams()` from registry; looks up slug; `notFound()` guard; `generateMetadata` from project data | registry, `ProjectPage` | Server |
| `src/components/project/ProjectPage.jsx` | Template: renders `<Navigation/>` + ordered sections from `project.sections` + `<Footer/>` | section registry, sections | Server |
| `src/components/project/sections/index.js` | Section registry: maps section key → component | `ProjectPage` | Server |
| `src/components/project/sections/<Section>.jsx` | One section (hero, highlights, details, map, faq…) rendered from data props | — | Server (default) |
| `src/components/project/sections/ProjectProgress.jsx` | Live progress dashboard: SWR-polls GViz, renders bento grid from config props | `src/lib/gviz.js` | **Client** (only island) |
| `src/components/project/sections/ProjectGallery.jsx` | Lazy-loaded gallery from S3 manifest data | S3 manifest | **Client** (only island) |
| `src/components/project/sections/ProjectCta.jsx` | HubSpot form embed from `project.cta.formId` | js.hsforms.net | **Client** (only island) |
| `src/lib/gviz.js` | Pure GViz helpers: URL builder, JSONP fetcher/stripper, `parseDateVal`, row→item mapping, status themes, progress math | `ProjectProgress` | Shared lib |
| `Navigation` (refactored) | Project links derived from registry instead of hardcoded catalog | registry | Client (existing) |

The five copy-pasted progress components (`GVProgressRoadmap`, `GHProgressRoadmap`, `ATProgressRoadmap`, `NSHdevprogress`, `NSH2devprogress`) all collapse into `ProjectProgress` + one `progress` config block per project in the data registry.

## Recommended Project Structure

```
src/
├── app/
│   ├── [slug]/page.jsx          # NEW dynamic route: generateStaticParams + notFound guard
│   ├── layout.js                # unchanged (fonts, tracking, Lenis)
│   ├── page.js                  # home, unchanged
│   ├── about/, contact/, faqs/… # 13 non-project static routes, UNCHANGED
│   └── api/events/…             # unchanged
├── content/
│   └── projects/
│       ├── nshomes.js           # NEW: per-project data (one file per project)
│       ├── nshomes2.js
│       ├── gulmoharhomes.js
│       ├── gulmoharvillas.js
│       ├── sukoonvillas.js
│       ├── airporttown.js
│       ├── sadhanacity.js
│       ├── rivendellfarms.js
│       ├── index.js             # NEW: registry (ordered list + slug map)
│       └── validate.js          # NEW: build-time data validation
├── components/
│   ├── project/                 # NEW: template + section components
│   │   ├── ProjectPage.jsx      #   server template
│   │   └── sections/            #   section registry + one file per section
│   │       ├── index.js         #   section key → component map
│   │       ├── ProjectHero.jsx  #   server
│   │       ├── ProjectHighlights.jsx  # server
│   │       ├── ProjectGallery.jsx    # CLIENT (lazy images)
│   │       ├── ProjectProgress.jsx   # CLIENT (SWR + GViz)
│   │       ├── ProjectDetails.jsx    # server (details / floor plans / amenities)
│   │       ├── ProjectMap.jsx        # server (embedded map + address)
│   │       ├── ProjectFaq.jsx        # server
│   │       └── ProjectCta.jsx        # CLIENT (HubSpot)
│   ├── Navigation.jsx           # refactored to read registry
│   └── … (existing components, pruned after migration)
└── lib/
    └── gviz.js                  # NEW: extracted pure GViz helpers
```

### Structure Rationale

- **`src/content/projects/`** — content is deliberately *outside* `components/` so nothing in it can accidentally become a component. It holds only serializable plain-JS data (which is what crosses the server→client boundary).
- **`src/components/project/`** — the template and its sections are one cohesive, versioned unit, separate from the legacy flat `components/` directory. Migrated sections land here; legacy bespoke files stay in `components/` until deleted.
- **One file per section** — reverse of the current 300–1100-line monoliths. A section file's upper bound is "render this one data slice."
- **`validate.js` at build time** — plain JS project, no zod dependency; ~30 lines of assertions that make bad content a build error instead of a broken page.

## Key Architectural Decision: Root `[slug]` Dynamic Route

**Decision: Add `src/app/[slug]/page.jsx` and derive routes from the registry; delete the 8 project `page.jsx` files one at a time during migration.**

```jsx
// src/app/[slug]/page.jsx
import { notFound } from 'next/navigation'
import ProjectPage from '@/components/project/ProjectPage'
import { getProject } from '@/content/projects'

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }) {
  const project = getProject(params.slug)
  if (!project) return {}
  return { title: project.metadata.title, description: project.metadata.description }
}

export default function Page({ params }) {
  const project = getProject(params.slug)
  if (!project) notFound()
  return <ProjectPage project={project} />
}
```

Why this works with static export (verified against official Next.js docs, HIGH confidence):

1. **Static export requires dynamic routes to have `generateStaticParams`** — we return every project slug, so every project route is emitted as a plain HTML file at build. Unlisted slugs simply don't exist → 404. `export const dynamicParams = false` documents intent.
2. **Static route files win over the dynamic segment.** `/about`, `/contact`, `/faqs`, `/projects`, `/api/…` keep their existing static `page.jsx` files and are never shadowed by `[slug]`.
3. **Same route path ⇒ same output file path.** `/nshomes` was `out/nshomes.html` (or `out/nshomes/index.html` per the current trailing-slash config) and stays exactly that — the output shape and CloudFront setup don't change. No redirects are needed, which matters because **`output: 'export'` does not support `next.config` `redirects()` at all**.
4. **"Add a project" becomes "add one data file."** `generateStaticParams` picks it up automatically. This exceeds the stated requirement (data + route) — the route is derived, not written.

Two guards are mandatory (see Anti-Patterns):

- **Collision guard:** a build-time check that no project slug equals a static route directory (`about`, `contact`, `projects`, …) or the home route. If a future project is ever named `resale`, the static route would silently win — the guard turns that into a build error.
- **`notFound()` for unknown slugs:** dev mode allows unlisted dynamic routes; the guard keeps dev/prod behavior consistent.

**Conservative fallback** (if the team prefers explicit routing): keep one tiny `page.jsx` per project — `const project = getProject('nshomes'); return <ProjectPage project={project} />` — 3 lines, zero route ambiguity, same template/data. Trade-off: one file per new project and a second place to forget. Recommend the dynamic route.

**Migration nuance:** while a static project `page.jsx` still exists (e.g. `nshomes`), it shadows the dynamic slug. So each migration step is atomic: *add `nshomes.js` to the registry + delete `src/app/nshomes/page.jsx` in the same commit.* The registry only ever contains migrated projects, so the build never emits both.

## Content Data Model

Every project file exports one plain-JS object (must stay **serializable** — no functions, no class instances, since it crosses into client islands):

```js
// src/content/projects/nshomes.js
export const nshomes = {
  slug: 'nshomes',                    // must match a unique static-route-free path
  name: 'NS Homes',
  accent: '#E509EF',                  // single source; replaces 6 inline hex colors per component
  metadata: {                          // preserved verbatim from today's <title>/meta
    title: 'NS Homes | Flivv Developers',
    description: '…',
  },
  hero: { kicker: '…', title: '…', subtitle: '…', image: '/nshomes-hero.jpg' },
  highlights: [ '…', '…' ],
  gallery: { manifestUrl: 'https://flivv-web-cdn.s3…/nshomes-gallery/manifest.json' },
  details: { about: '…', units: '…' },       // details / floor plans / amenities arrays
  floorPlans: [ { name, image, size } ],
  amenities: [ '…' ],
  map: { address: '…', embedSrc: '…' },
  faq: [ { q: '…', a: '…' } ],
  cta: { heading: '…', buttonText: 'Enquire Now', hubspotFormId: '…' },
  progress: {                            // GViz config — the five components' only real difference
    spreadsheetId: '1PdnFzC_opkk_z9pn7Ba7o2TXH1h2qPeYAyNf-siGrOs',
    sheetName: 'NS_Homes',
    refreshInterval: 20000,
  },
  sections: [                            // explicit order + inclusion per project
    'hero', 'highlights', 'gallery', 'progress', 'details', 'map', 'faq', 'cta',
  ],
  overrides: {},                         // deliberate, data-level per-section props only
}
```

Design choices, with rationale:

- **Explicit `sections` array** over "render everything that has data." The array is the per-project ordering/inclusion decision, made in data — exactly the flexibility a data-driven template needs without forking components. Validation asserts every listed key exists in the section registry.
- **`progress` config lives in the project data**, not in a component. `ProjectProgress` receives it as a serializable prop; the spreadsheet ID/sheet name/interval stop being copy-pasted constants.
- **`accent` is one field.** Today each progress component hardcodes 5–6 hex literals, with drift already visible: `GHProgressRoadmap` mixes `#612437` and `#602437`; `ATProgressRoadmap` line 151 still carries Gulmohar's `#612437`. One field, one value, one place.
- **`metadata` per project** guarantees migrated pages keep their indexed titles/descriptions.

## Architectural Patterns

### Pattern 1: Content Registry + Derived Routes

**What:** One registry (`src/content/projects/index.js`) is the single source of truth for project content *and* URLs. Routes and nav links derive from it.
**When to use:** Any multi-page static site where pages share a template and are added frequently (the stated success metric).
**Trade-offs:** Adding a project is trivial and low-risk; in exchange, every project must fit the data model — bespoke content has to be expressed as data or registered as a deliberate override.

```js
// src/content/projects/index.js
import { nshomes } from './nshomes'
import { airporttown } from './airporttown'
// …one import per project

export const projects = [nshomes, airporttown, /* …ordered… */]
export const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]))
export const getProject = (slug) => projectBySlug[slug]
export const getProjectSlugs = () => projects.map((p) => p.slug)
```

### Pattern 2: Section Renderer Registry

**What:** A plain object mapping section key → component. The template iterates `project.sections`, looks up each key, and renders `<Section {...project.overrides?.[key]} />`. No `switch`, no conditional component imports in the template.
**When to use:** When a template renders a variable ordered set of section types. (The "component registry" pattern from the ecosystem; see Sources.)
**Trade-offs:** One indirection layer; pays for itself the first time a project reorders sections or omits one. Custom sections are added by registering a component, not by editing the template.

```js
// src/components/project/sections/index.js
import ProjectHero from './ProjectHero'
import ProjectProgress from './ProjectProgress'   // client island
// …
export const sections = {
  hero: ProjectHero,
  highlights: ProjectHighlights,
  gallery: ProjectGallery,
  progress: ProjectProgress,
  details: ProjectDetails,
  map: ProjectMap,
  faq: ProjectFaq,
  cta: ProjectCta,
}
```

```jsx
// inside ProjectPage.jsx (server component)
{project.sections.map((key) => {
  const Section = sections[key]
  if (!Section) return null          // validator already failed the build if key unknown
  return <Section key={key} project={project} />
})}
```

### Pattern 3: Config-Driven Component (the progress unification)

**What:** One parameterized component driven by a config object, instead of N copy-pasted components with different constants. This is the documented remedy for the current five-way drift (see Sources — config-driven UI).
**When to use:** Multiple components whose only differences are data values. Here, `SHEET_NAME` (5 values), accent color (5 values), and the hardcoded project name in the `<h1>` are the *only* differences — the data confirms it: all five share the same spreadsheet ID `1PdnFzC…`, `REFRESH_INTERVAL = 20000`, identical fetcher/parser/JSX.
**Trade-offs:** A config contract you must not break; validation on the config object catches typos at build time.

```jsx
// src/components/project/sections/ProjectProgress.jsx
'use client'
import useSWR from 'swr'
import { buildGvizUrl, gvizFetcher, mapRowsToItems, computeProgress, getStatusTheme } from '@/lib/gviz'

export default function ProjectProgress({ project }) {
  const { spreadsheetId, sheetName, refreshInterval } = project.progress
  const { data, error } = useSWR(buildGvizUrl(spreadsheetId, sheetName), gvizFetcher, {
    refreshInterval,
  })
  // …identical bento-grid markup as today, but accent/name/loading-text come from props:
  //   project.name, project.accent, `Syncing ${project.name} Data…`
}
```

This is a **drop-in replacement**: Phase 1 can swap the *bodies* of the five existing components to render `ProjectProgress` with their own config values, while pages remain bespoke. It also fixes the three latent bugs found in the code: loading text says "Syncing Gulmohar Homes Data…" in all five files (including Gulmohar **Villas** and Airport Town), and two files mix accent hex values (`#602437` vs `#612437`).

### Pattern 4: Server Template + Client Islands (RSC boundary)

**What:** The template and content sections are server components. `'use client'` appears only at interactive leaves. Server passes serializable data props into islands; server-rendered children can also be slotted into client components via `children`.
**When to use:** Always in this codebase — it reverses the "50 of 75 components are client" anti-pattern and shrinks the JS bundle to the islands that need it.
**Trade-offs:** Motion/GSAP sections need care: framer-motion `initial`/`animate` states render fine server-side, but **GSAP ScrollTrigger effects require a client island or a CSS/IntersectionObserver equivalent** — do not port ScrollTrigger logic into server sections (flag for the section-build phase).

### Pattern 5: Route-Path Stability Migration

**What:** Never change a URL; change only what renders at it. Because static export has no `redirects()`, URL preservation is route-path preservation — same paths emit same files, so CloudFront keeps serving them untouched. Migrate one project at a time, verify the `out/` tree, deploy.
**When to use:** Any live, indexed static site being refactored (see Sources — SEO-preserving migration playbooks).
**Trade-offs:** You cannot rename a URL during this work (e.g. `/nshomes2` stays `/nshomes2`). If a rename is ever required, do it as a separate CDN-level 301 (CloudFront) — never inside the exported site.

## Data Flow

### Build-time flow (how a page comes to exist)

```
src/content/projects/nshomes.js + index.js
    │  (import — static, serializable)
    ▼
src/app/[slug]/page.jsx  generateStaticParams() → emits /nshomes route
    │  generateMetadata() → <title>/<meta> from project.metadata
    ▼
ProjectPage (server) → sections[key] per project.sections → section components
    │  server sections render to HTML; islands render HTML + client bundle refs
    ▼
out/nshomes.html  ← identical output path to today's build
```

### Runtime flow (after hydration)

```
ProjectProgress (client island)
    │  props: project.progress {spreadsheetId, sheetName, refreshInterval, accent, name}
    ▼
useSWR(buildGvizUrl(id, sheet), gvizFetcher, { refreshInterval: 20000 })
    │  fetch → docs.google.com/spreadsheets/d/{id}/gviz/tq?tqx=out:json&sheet={sheet}
    │  strip JSONP wrapper (indexOf('{') → lastIndexOf('}')) → JSON.parse
    ▼
mapRowsToItems(table) → computeProgress(items) → getStatusTheme(status) → bento grid
```

```
ProjectGallery (client island)
    │  props: project.gallery.manifestUrl
    ▼
fetch(manifest.json from flivv-web-cdn) → IntersectionObserver lazy <picture> variants
```

```
ProjectCta (client island)
    │  props: project.cta.hubspotFormId
    ▼
js.hsforms.net script → window.hbspt.forms.create({ portalId: '21626983', formId, target })
```

### Direction of dependency (explicit)

One-way, acyclic: `content/projects → [slug] page → ProjectPage → section registry → sections → client islands → external sources`. Content is never fetched at runtime (static import). The only runtime fetches are the three live external sources — GViz, S3 manifest, HubSpot — all client-side, all identical to today. No global state; component-local `useState`/`useEffect`/SWR only, matching the existing convention.

## Build Order (dependencies for the roadmap)

| Step | Builds | Depends on | Why this order |
|------|--------|-----------|----------------|
| 1 | `src/lib/gviz.js` + unified `ProjectProgress` + `content/projects` scaffold + `validate.js` | nothing | Independent, low-risk de-drift. Replaces the 5 progress components (drop-in) and fixes 3 latent bugs immediately; the template's progress section needs it anyway. |
| 2 | Server section components + section registry + `ProjectPage` + `[slug]` route + collision guard + metadata | Step 1 | Template cannot render progress without Step 1; sections depend on the data model from Step 1. |
| 3 | Per-project migrations (extract bespoke JSX → data file; delete static `page.jsx` + bespoke components), 1–2 projects per step | Step 2 | Each migration needs the full template. Do the two Gulmohar projects first (progress configs already unified in Step 1) to prove the loop. |
| 4 | Delete dead bespoke components; refactor `Navigation` to registry; verify `out/` tree parity | Step 3 | Only safe after all 8 projects migrated. |
| 5 | CI/CD pipeline (git push → build → S3/CloudFront + invalidation) | Step 1+, parallel | Deploy automation reduces the risk cost of every earlier step; can start once Step 1 lands. |

**Phase-ordering note for the roadmap:** Step 1 should be its own phase (independent, shippable, immediately removes the worst copy-paste). Steps 2–4 are one template/migration phase family. Step 5 is orthogonal and can run in parallel.

## Migration Strategy (URL preservation)

Invariant: **route paths never change; therefore output files never change; therefore no redirects, no CloudFront rule changes, no 404 risk.**

1. **Inventory first.** Record the current 21 routes and each project page's `<title>`/meta description (they live in bespoke JSX today). These become each project's `metadata` — identical output, guaranteed.
2. **Build the template on a stub project** (or migrate the first project) while all 8 bespoke pages still render from their static files. Verify `/nshomes` etc. produce the same output path and content quality.
3. **Per-project atomic migration:** add `<slug>.js` to the registry and delete `src/app/<slug>/page.jsx` in the same commit (the static file would otherwise shadow the dynamic route). One or two projects per deploy.
4. **Verify after every step:** compare `out/` file sets before/after (identical set, only content of migrated pages differs); spot-check rendered HTML titles, hero, gallery, progress live fetch, CTA form.
5. **Non-project routes are never touched** — `about`, `contact`, `faqs`, `projects`, `resale`, `salesmeets`, `eventsform`, `dohaoffice`, `flivv*` event pages stay exactly as they are.
6. **Delete dead code at the end**, not before: all 5 progress files and the 8 bespoke page components (e.g. `NSHomes.jsx`, `GulmoharHomes.jsx`, `AirportTown.jsx`, `NSH20LandingPage.jsx`) are removed only when the build proves no imports remain.
7. **Nav swap as one step:** `Navigation.jsx`'s hardcoded project catalog becomes registry-derived links, so every new project automatically appears in the mega-menu (this is a second latent copy-paste source).

## Anti-Patterns

### Anti-Pattern 1: Slug collides with a static route (silent shadowing)

**What people do:** Add a project slug like `resale` or `dohaoffice` that already has a static `page.jsx`; the static route silently wins and the new project page never renders.
**Why it's wrong:** No error at build, no warning — just a missing page.
**Do this instead:** A 10-line build-time script asserting no project slug matches any static route dir (`src/app/<name>`) or the home route. Collisions fail the build.

### Anti-Pattern 2: Overrides become a bespoke-component backdoor

**What people do:** Use `overrides` to inject per-project JSX or start importing bespoke components from inside the template.
**Why it's wrong:** Recreates the bespoke-monolith pattern the template exists to kill; the template silently forks per project.
**Do this instead:** Overrides are **data-level props only** (e.g. `overrides: { gallery: { columns: 3 } }`). A genuinely custom section is a first-class registry entry: build `ProjectXxx.jsx`, register it in `sections/index.js`, reference it by key in `project.sections`. Explicit, visible, reviewable.

### Anti-Pattern 3: Making the template or static sections client components

**What people do:** Copy the old `'use client'` habit into every new section file.
**Why it's wrong:** Re-inflates the JS bundle and negates the RSC payoff of the whole refactor.
**Do this instead:** `'use client'` only at `ProjectProgress`, `ProjectGallery`, `ProjectCta` (and any motion island). Everything else is a server component rendering props.

### Anti-Pattern 4: Passing non-serializable values to client islands

**What people do:** Pass a function or component in `project` props (e.g. an on-click handler in the data model).
**Why it's wrong:** React throws on non-serializable props across the server→client boundary; the build fails or the page breaks at hydration.
**Do this instead:** Keep the data model plain JSON-safe (strings, numbers, arrays, objects). Behavior lives in components, not data.

### Anti-Pattern 5: Optional-field drift in the content model

**What people do:** Add fields as "optional," then each project fills in different subsets and validation is impossible.
**Why it's wrong:** Sections render broken/empty states inconsistently; the "fast, low-risk" publishing goal dies.
**Do this instead:** `validate.js` asserts, per section key, the fields that section requires. Missing fields fail the build with a readable message naming the project and field.

### Anti-Pattern 6: Porting GSAP ScrollTrigger into server sections

**What people do:** Move existing scroll-triggered animations into the new (server) section components.
**Why it's wrong:** ScrollTrigger needs `window`/DOM measurement — client-only. Breaks SSR/prerender or silently no-ops.
**Do this instead:** Use framer-motion `initial`/`animate` (SSR-safe) or CSS/IntersectionObserver in sections; keep GSAP inside a dedicated client island if a specific effect requires it. Decide this per section during Step 2, not during migration.

### Anti-Pattern 7: Leaving the five progress files "temporarily"

**What people do:** Unify into `ProjectProgress` but keep `GVProgressRoadmap.jsx` et al. "just in case."
**Why it's wrong:** The next dev fixes a bug in the copy and the drift returns.
**Do this instead:** Delete all five in the same commit as the swap. The build proves nothing references them.

### Anti-Pattern 8: "Fixing" URL changes with redirects

**What people do:** Move a route and plan a `next.config` redirect.
**Why it's wrong:** `output: 'export'` does not support `redirects()` — it silently won't work, breaking indexed URLs and bookmarks.
**Do this instead:** Never change route paths during this work. If a URL must ever change, implement the 301 at CloudFront (CDN layer), outside the exported site.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 8 projects (today) | Registry + template + `[slug]` route. Nothing else. |
| 30 projects | Still one template. Add section variants to the registry as needed; nav updates automatically. Consider generating `sitemap.xml` from the registry (cheap win). Registry index stays a hand-maintained array of imports. |
| 100+ projects | Static export scales fine (linear build-time growth, each project is ~1 HTML file + shared chunks). The first real bottleneck is *content consistency*, which is why validation is a build-time hard gate. If non-developers ever need to edit content, revisit the "no CMS" decision (out of scope per PROJECT.md) — that is the only trigger for re-architecture. |

**What breaks first:** not rendering, but data quality — a project with a missing required field or a typo'd slug. That's the case for build-time validation as a first-class component (Step 1), not an afterthought.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Google Sheets GViz | Client SWR fetch of `/gviz/tq?tqx=out:json&sheet=…`, strip JSONP wrapper, parse. URL built in `src/lib/gviz.js` from `project.progress` | Sheet must stay "Anyone with the link". The `X-DataSource-Auth` pure-JSON trick is unusable from browsers (CORS preflight) — keep the strip approach that already works in production. Dates arrive as `Date(y,m,d)` strings. |
| S3 manifest (flivv-web-cdn) | Client fetch of `manifest.json` → lazy `<picture>` variants | Same pattern as today's `FlivvConnectPage.jsx`; per-project galleries reuse it via `project.gallery.manifestUrl`. |
| HubSpot forms | Client embed via `js.hsforms.net` | Portal `21626983`; `project.cta.hubspotFormId` replaces hardcoded form IDs. |
| Meta proxy / analytics / GTM / GA4 / Clarity | Unchanged, in `layout.js` | Out of scope for this work. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `content/projects/*` ↔ `[slug]` page | Static import (build time) | Registry is the single source of truth for slugs/URLs |
| `[slug]` page ↔ `ProjectPage` | Props (`project` object) | Server→server, no boundary issue |
| `ProjectPage` ↔ section registry | Key lookup | Unknown key = build error via validator |
| Section (server) ↔ client islands | Serializable props (`project` or slices) | Only data crosses; no functions/components |
| `ProjectProgress` ↔ `src/lib/gviz.js` | Module import | Pure functions; unit-testable without React |

## Sources

- **Next.js official docs (fetched 2026-08-01, HIGH confidence):** *Static Exports* (https://nextjs.org/docs/app/building-your-application/deploying/static-exports — dynamic routes require `generateStaticParams`; redirects/rewrites/headers unsupported; one HTML file per route), *generateStaticParams* (https://nextjs.org/docs/app/api-reference/functions/generate-static-params — params from data; `dynamicParams`), *Server and Client Components* (https://nextjs.org/docs/app/getting-started/server-and-client-components — `'use client'` boundary, serializable props server→client, slot/children pattern).
- **GViz JSONP parsing (MEDIUM, multiple independent sources):** Stack Overflow 29202686 / 64381320 (strip `google.visualization.Query.setResponse` wrapper via `indexOf('{')`→`lastIndexOf('}')`; `X-DataSource-Auth` header not usable in browsers), hooshmand.net *Google Sheets as JSON Database* (2024). Corroborated by the production code in all five progress components.
- **Data-driven page architecture (MEDIUM):** zackproser.com *Building data-driven pages with Next.js* (2024 — separate data from presentation; compile not edit; prebuild automation), GitNation *Config-Driven UI using ReactJS* (Microsoft, 2023).
- **Config-driven component / registry patterns (MEDIUM):** ketankhairnar.com *Configuration-Driven React Components* (2025 — one config object vs boolean explosion), Medium *Building a Component Registry in React* (2019 — object registry over switches).
- **SEO-preserving static-site migration (MEDIUM):** pandacodegen.com *WordPress to Next.js Migration Without Losing SEO* (2026), MigrateLab *WordPress to Next.js guide* (2026 — preserve every URL, 301 anything changed, staged rollout, metadata parity).
- **Codebase verification (HIGH, direct read 2026-08-01):** all five progress components (`GVProgressRoadmap.jsx`, `GHProgressRoadmap.jsx`, `ATProgressRoadmap.jsx`, `NSHdevprogress.jsx`, `NSH2devprogress.jsx`), `src/app/{nshomes,gulmoharhomes,projects}/page.jsx`, `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/STRUCTURE.md`, `.planning/PROJECT.md`.

---
*Architecture research for: Flivv Developers data-driven project page system*
*Researched: 2026-08-01*
