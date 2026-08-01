# Technology Stack

**Analysis Date:** 2026-08-01

## Languages

**Primary:**
- JavaScript (ES Modules) - all source code in `src/` uses `.js`/`.jsx`; the project is not TypeScript (no `tsconfig.json`, uses `jsconfig.json` instead)

**Secondary:**
- CSS - Tailwind v4 CSS-first configuration in `src/app/globals.css`
- JSON - config and data files (`package.json`, `components.json`, `data/events.json`)

## Runtime

**Environment:**
- Node.js - required for Next.js; no pinned version (no `.nvmrc`, `.node-version`, or `engines` field in `package.json`)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present (lockfileVersion 3)

## Frameworks

**Core:**
- Next.js 15.5.9 (installed; `package.json` declares `^15.3.6`) - App Router, static export workflow (`out/` directory produced by prior `next build`)
- React 18.2.0 (`react` and `react-dom` pinned at 18.2.0)

**Testing:**
- Not detected - no test framework, no `*.test.*`/`*.spec.*` files, no jest/vitest config

**Build/Dev:**
- Tailwind CSS 4.1.18 - CSS-first styling via `@tailwindcss/postcss` plugin in `postcss.config.mjs`; legacy `tailwind.config.js` still present but content globs only cover `pages/**` and `components/**` (does not include `src/**`)
- shadcn/ui - `components.json` (style: new-york, RSC enabled, no TSX) with aliases `@/components`, `@/lib/utils`, `@/components/ui`, `@/lib`, `@/hooks`
- next/font - Geist and Geist_Mono loaded in `src/app/layout.js`

## Key Dependencies

**Critical:**
- `next` ^15.3.6 (15.5.9 installed) - framework; `next.config.mjs` configures `images.remotePatterns` for `flivv-web-cdn.s3.ap-south-1.amazonaws.com`
- `react` / `react-dom` 18.2.0 - UI runtime
- `@aws-sdk/client-s3` ^3.930.0 - S3 uploads for media pipeline (`tools/generate-thumbs-upload.js`)
- `tailwindcss` ^4.1.18 - styling engine

**Animation/UI:**
- `framer-motion` ^12.23.26 - page/section animations (used across `src/components/*.jsx`)
- `gsap` ^3.13.0 - advanced scroll/video animations (`src/components/ScrollVideoSection.jsx`, etc.)
- `@studio-freight/lenis` ^1.0.42 - smooth scrolling (`src/lib/useLenisScroll.js`, `src/components/SmoothScrollWrapper.jsx`)
- `lucide-react` ^0.503.0 - icon library (configured in `components.json` as `iconLibrary: "lucide"`)
- `@radix-ui/react-slot` ^1.2.0, `class-variance-authority` ^0.7.1, `clsx` ^2.1.1, `tailwind-merge` ^3.2.0 - shadcn/ui primitives (`src/components/button.jsx`, `src/lib/utils.js` `cn()` helper)

**Data/Utilities:**
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

**Dev Dependencies:**
- `@tailwindcss/forms` ^0.5.11, `@tailwindcss/typography` ^0.5.19, `@tailwindcss/postcss` ^4, `tw-animate-css` ^1.2.8

## Configuration

**Environment:**
- `.env.local` and `.env.production` present (git-ignored via `.gitignore` `*.env*` pattern; contents not inspected)
- Env vars referenced in code: `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` (`src/app/layout.js`), `FACEBOOK_PIXEL_ID` + `FACEBOOK_ACCESS_TOKEN` (`pages/api/meta-events.js`), `S3_BUCKET`, `S3_PREFIX`, `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` (`tools/generate-thumbs-upload.js`)

**Build:**
- `next.config.mjs` - images remotePatterns only (static-export config is commented out in the file)
- `postcss.config.mjs` - `@tailwindcss/postcss`
- `jsconfig.json` - path alias `@/*` → `./src/*`
- `components.json` - shadcn/ui aliases and icon library
- `tailwind.config.js` - legacy config with custom colors (`workshop`, `lecture`, `meetup`, `conference`, `sales`) and backdrop-blur scale

**Tooling:**
- No ESLint or Prettier config files detected (`.eslintrc*`, `eslint.config.*`, `.prettierrc*` absent); `package.json` has a `lint` script (`next lint`)
- No CI workflow files - `.github/workflows/` exists but is empty

## Platform Requirements

**Development:**
- `npm run dev` (Next.js dev server), `npm run build`, `npm run start`, `npm run lint`
- Default port 3000

**Production:**
- Static export (Next.js `output: 'export'` configuration is commented out in `next.config.mjs` but the `out/` directory contains a prior full static build) hosted on AWS S3 + CloudFront
- Deployment infrastructure configs at repo root: `cloudfront-config.json`, `dist-config-with-logging.json`, `bucket-policy.json`, `lightsail-cors.json`, `waf-rules.json`, `webacl.json` (empty)
- Live site: `flivvdevelopers.com`

---

*Stack analysis: 2026-08-01*
