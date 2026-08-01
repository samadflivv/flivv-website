# External Integrations

**Analysis Date:** 2026-08-01

## APIs & External Services

**Marketing & Analytics (client-side scripts, all loaded in `src/app/layout.js`):**
- Meta (Facebook) Pixel - conversion tracking
  - SDK/Client: inline `fbq` script from `https://connect.facebook.net/en_US/fbevents.js`
  - Auth/ID: `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` env var injected at build (`src/app/layout.js:83`)
- Meta Conversions API (CAPI) - server-side event forwarding
  - SDK/Client: `axios` POST to `https://graph.facebook.com/v18.0/{pixelId}/events` (`pages/api/meta-events.js:15`)
  - Auth: `FACEBOOK_ACCESS_TOKEN` + `FACEBOOK_PIXEL_ID` env vars; emails hashed with SHA256 (`crypto-js`) before sending
- Google Tag Manager - container `GTM-TGRWCJ9M` (`src/app/layout.js:28-33`)
- Google Analytics 4 - property `G-2EBCG8YCRC` via gtag (`src/app/layout.js:37-49`)
- Microsoft Clarity - project `s0w31v8v2n` (`src/app/layout.js:59-67`)
- HubSpot Tracking - `//js.hs-scripts.com/21626983.js`, portal `21626983` (`src/app/layout.js:52-56`)

**HubSpot Forms (lead capture):**
- `src/components/HubspotForm.jsx` - embedded form via `https://js.hsforms.net/forms/embed/21626983.js`, region `na1`, form `760bc3ed-5901-4e22-9d53-bdf02db591db`, portal `21626983`
- `src/components/EventFormPage.jsx` - programmatic form creation via `window.hbspt.forms.create` with region `na2`, portal `21626983`, form `32a66b29-2a52-4d80-8e72-a0f2226058f0`
- `src/components/GVcta.jsx` - loads `https://js.hsforms.net/forms/embed/v2.js`
- WAF allow rule `AllowHubSpot` in `waf-rules.json` permits referers `js.hsforms.net`, `api.hsforms.com`, `forms.hubspot.com`

**Google Sheets (GViz) - project progress tracking:**
- 5 components poll `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet={SHEET_NAME}` via `fetch` wrapped in `useSWR` with 20s `refreshInterval`
  - `src/components/ATProgressRoadmap.jsx` (sheet `Airport_Town`)
  - `src/components/GHProgressRoadmap.jsx` (sheet `Gulmohar_Homes`)
  - `src/components/GVProgressRoadmap.jsx` (sheet `Gumohar_Villas`)
  - `src/components/NSHdevprogress.jsx` (sheet `NS_Homes`)
  - `src/components/NSH2devprogress.jsx` (sheet `NS_Homes2`)
  - Shared SPREADSHEET_ID: `1PdnFzC_opkk_z9pn7Ba7o2TXH1h2qPeYAyNf-siGrOs`
- Public read-only (no API key required; GViz JSON endpoint)

**Google Maps:**
- Static embeds (`iframe` `google.com/maps/embed`) in `src/components/AirportTown.jsx`, `src/components/GulmoharHomes.jsx`, `src/components/GVLocationMapSection.jsx` (and related project pages)

**Google Fonts:**
- `next/font/google` Geist/Geist_Mono in `src/app/layout.js`
- CSS `@import url('https://fonts.googleapis.com/css2?family=Lancelot&family=Montserrat...')` inside `src/components/GulmoharHomes.jsx`

**Social Links (outbound only, `src/components/Footer.jsx`):**
- Instagram `instagram.com/flivvdevelopers`, X `x.com/Flivv`, Facebook `facebook.com/flivvdevelopers`, LinkedIn `linkedin.com/company/flivv`

## Data Storage

**Databases:**
- None. No SQL/NoSQL database dependency.

**File Storage (application data):**
- Local JSON file `data/events.json` - events store, read/written synchronously via `src/lib/events.js` (`fs.readFileSync`/`fs.writeFileSync`, path `path.join(process.cwd(), 'data', 'events.json')`). Served through Next.js route handlers `src/app/api/events/route.js` (GET/POST) and `src/app/api/events/[id]/route.js` (PUT/DELETE). Note: `data/` is committed and functions as the persistence layer for the site's events calendar.

**File Storage (media/CDN):**
- AWS S3 bucket `flivv-web-cdn` (region `ap-south-1`) - public media CDN for images and videos
  - Client: `@aws-sdk/client-s3` `S3Client` + `PutObjectCommand` (`tools/generate-thumbs-upload.js`)
  - Bucket URL pattern: `https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/...` referenced directly in `<img>`, `<source>`, and CSS across many components (`src/components/AboutMD.jsx`, `src/components/AirportTown.jsx`, `src/components/Exclusiveprojects.jsx`, `src/components/GVgallery.jsx`, `src/components/FlivvQatarEvent.jsx`, etc.)
  - Gallery manifest fetched at runtime: `https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/ksa-gallery/manifest.json` (`src/components/FlivvConnectPage.jsx:7`)
  - Configured as allowed image host in `next.config.mjs` `images.remotePatterns`
  - Upload tool env: `S3_BUCKET` (default `flivv-web-cdn`), `S3_PREFIX` (default `ksa-gallery`), `AWS_REGION` (default `ap-south-1`), `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`; uses `forcePathStyle: true` with a fixed endpoint (Lightsail-style)

**Caching:**
- None in app code. CDN-level caching configured via S3 `CacheControl: 'public, max-age=31536000, immutable'` on uploaded assets (`tools/generate-thumbs-upload.js:39`) and CloudFront cache behaviors for `/_next/static/*` and `/static/*`

## Authentication & Identity

**Auth Provider:**
- None. No user accounts, login, or session management. Meta CAPI uses a long-lived server access token (`FACEBOOK_ACCESS_TOKEN`); AWS uses static IAM access keys.

## Monitoring & Observability

**Error Tracking:**
- None (no Sentry/Bugsnag/etc.)

**Logs:**
- `console.error`/`console.log` throughout route handlers (`src/app/api/events/route.js`, `src/app/api/events/[id]/route.js`, `pages/api/meta-events.js`) and tools
- AWS CloudFront logging config present in `dist-config-with-logging.json` (`Logging.Bucket: flivv-cloudfront-logs.s3.amazonaws.com`, currently `Enabled: false`)
- WAF visibility config enables `SampledRequestsEnabled` and `CloudWatchMetricsEnabled` on all rules (`waf-rules.json`)

## CI/CD & Deployment

**Hosting:**
- AWS S3 static hosting + Amazon CloudFront CDN (configs at repo root)
  - `cloudfront-config.json` / `dist-config-with-logging.json` - CloudFront distribution for a Next.js static export, S3 origin `my-nextjs-app-static-1765633803.s3.us-east-1.amazonaws.com`, custom 403/404 → `/index.html` rewrite, HTTPS redirect, HTTP/2+3
  - `bucket-policy.json` - restricts the site bucket to CloudFront OAC via service principal with `s3:GetObject`
  - `lightsail-cors.json` - CORS rule (allows `http://localhost:3000`, `https://flivvdevelopers.com/`, `*`)
  - `waf-rules.json` - AWS WAF v2 web ACL: rate limit (100 req/5 min/IP), AWS managed rule sets (Common, KnownBadInputs, SQLi, AnonymousIpList, BotControl COMMON), path-traversal block, geo-block (KP, IR, SY), and HubSpot allow rule
  - `webacl.json` - empty placeholder

**CI Pipeline:**
- None. `.github/workflows/` exists but contains no workflow files. Build/deploy appears to be performed manually (`npm run build`, upload of `out/` to S3).

## Environment Configuration

**Required env vars (by usage site):**
- `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` - `src/app/layout.js` (client, must be public)
- `FACEBOOK_PIXEL_ID` - `pages/api/meta-events.js` (server)
- `FACEBOOK_ACCESS_TOKEN` - `pages/api/meta-events.js` (server, long-lived Meta token)
- `S3_BUCKET` - `tools/generate-thumbs-upload.js` (default `flivv-web-cdn`)
- `S3_PREFIX` - `tools/generate-thumbs-upload.js` (default `ksa-gallery`)
- `AWS_REGION` - `tools/generate-thumbs-upload.js` (default `ap-south-1`)
- `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` - `tools/generate-thumbs-upload.js`

**Secrets location:**
- `.env.local` and `.env.production` at repo root (git-ignored). AWS IAM access keys are the primary long-lived secrets; Meta token is passed as a URL query parameter to the Graph API.

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- Meta Conversions API event POSTs from `pages/api/meta-events.js` (endpoint `POST /api/meta-events` is the trigger, which itself calls `graph.facebook.com/v18.0`); email is SHA256-hashed, IP and user agent forwarded to Meta

---

*Integration audit: 2026-08-01*
