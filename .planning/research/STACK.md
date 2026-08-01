# Stack Research

**Domain:** Real-estate developer marketing site — data-driven project pages + automated S3/CloudFront deploy (Next.js 15 static export, plain JS)
**Researched:** 2026-08-01
**Confidence:** HIGH (versions verified against npm registry + GitHub API on 2026-08-01; patterns verified against official Next.js/AWS docs)

> **Scope note:** This is a *subsequent* milestone. The existing stack (Next 15.3.6, React 18.2.0, Tailwind v4, `@aws-sdk/client-s3` ^3.930.0, `sharp` ^0.34.5, `glob` ^11, `mime-types` ^3) is already in the repo and is **not re-recommended**. This document covers only what the three new features need: (1) data-driven project template, (2) unified progress-roadmap component, (3) CI/CD build → S3/CloudFront + invalidation.

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js (keep, **un-comment `output: 'export'`**) | 15.5.22 (repo `^15.3.6` resolves here; latest 15.x) | Static export to `out/` | `output: 'export'` + `trailingSlash: true` is the officially documented way to emit folder-per-route HTML (`/projects/x/index.html`) that S3 serves correctly. `next export` command was removed in Next 14 — config flag is the only path. **Do not** upgrade to Next 16 (repo constraint, and 15 is fully supported). |
| GitHub Actions (workflow) | `.github/workflows/deploy.yml` (replace existing stale file) | git push → build → publish | The existing `deploy.yml` is a leftover **Lightsail SSH + pm2 deploy** (`appleboy/ssh-action`) that contradicts the S3/CloudFront hosting model. Replace it wholesale; do not patch it. |
| `actions/checkout` | v7.0.1 (latest, published 2026-07-20) | Check out repo | Standard first step. |
| `actions/setup-node` | v7.0.0 (latest, published 2026-07-14) | Node runtime for `next build` | Use `node-version: 22` (LTS, supported by Next 15 which requires Node ≥ 18.18) and `cache: 'npm'` to reuse `~/.npm` across runs. |
| `aws-actions/configure-aws-credentials` | v6.2.3 (latest, published 2026-07-22) | Authenticate CI to AWS | Official AWS action. Preferred mode: **OIDC** (`role-to-assume`) — no long-lived keys in GitHub secrets. Falls back to access-key secrets only if the AWS account can't host an OIDC provider. |
| AWS CLI (pre-installed on `ubuntu-latest` runners) | aws-cli 2.x | `s3 sync` + `cloudfront create-invalidation` | The AWS CLI is already on GitHub-hosted runners — **no action needed for sync or invalidation**. Do not add third-party sync/invalidation actions. |
| Content data files | plain `src/content/projects/<slug>.js` modules (per the architecture design; deliberately outside `components/`) | Project page content (hero, gallery, details, floor plans, amenities, FAQ, progress config) | Zero new dependencies. For ~8–10 structured records in a plain-JS repo, `import` + `generateStaticParams()` is the standard, simplest static-export pattern. JSON is fine too; `.js` allows comments and computed fields. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none new for the template) | — | Data-driven page template | The template needs only `generateStaticParams()` + `generateMetadata()` from `next`, plus existing `next/image`, `framer-motion`, `lucide-react`, shadcn/ui aliases already in `package.json`. |
| `sharp` (keep) | ^0.34.5 (latest 0.35.3 — bump optional) | Pre-optimize images at build time | The existing `tools/generate-thumbs-upload.js` (JPG+WebP variants → srcset → `manifest.json` → S3 `flivv-web-cdn`) is the correct pattern for static export. **Extend it for new project sections; do not replace it.** |
| GitHub Dependabot | GitHub built-in | Keep `npm` deps and pinned action major versions current | Add `version-updates` for `github-actions` + `npm` to avoid version rot. |
| ESLint (recommended add) | `eslint` + `eslint-config-next` | Catch build-breaking issues in CI | Repo already has `npm run lint` script but **no ESLint installed** (per PROJECT.md concerns). Add it so CI fails on lint before deploy. Optional but cheap. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| `.github/workflows/deploy.yml` (new) | Build + deploy + invalidate | Two-pass `s3 sync` for cache headers, then `cloudfront create-invalidation /*`. Full pattern below. |
| `.env.example` (commit) | Document required `NEXT_PUBLIC_*` vars | Without this, CI builds silently inline `undefined` for HubSpot/GA/Clarity/Meta pixel IDs. |
| AWS IAM policy (repo root, next to existing `cloudfront-config.json`) | Least-privilege deploy role | Single bucket + single distribution ARN. JSON below. |

## CI/CD Workflow Pattern (the standard 2025/2026 shape)

```yaml
name: Deploy to S3 + CloudFront

on:
  push:
    branches: [main]

permissions:
  id-token: write   # required for OIDC
  contents: read

concurrency:
  group: prod-deploy
  cancel-in-progress: false   # never cancel an in-flight prod deploy

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production   # optional approval gate + env-scoped secrets
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 22
          cache: npm
      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v6.2.3
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_TO_ASSUME }}
          aws-region: ${{ secrets.AWS_REGION }}
      - name: Install and build
        run: |
          npm ci
          npm run build      # requires output:'export' → produces out/
      - name: Verify build output (guard against --delete wiping the bucket)
        run: |
          test -d out && test -n "$(ls -A out)" || { echo "out/ missing or empty"; exit 1; }
          aws sts get-caller-identity
      - name: Sync assets (long-lived cache)
        run: aws s3 sync out/ s3://${{ secrets.S3_BUCKET }} --delete \
          --cache-control "public,max-age=31536000,immutable" --exclude "*.html"
      - name: Sync HTML (short cache)
        run: aws s3 sync out/ s3://${{ secrets.S3_BUCKET }} \
          --cache-control "public,max-age=60" --include "*.html" --exclude "*"
      - name: Invalidate CloudFront
        run: |
          INVALIDATION=$(aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CF_DISTRIBUTION_ID }} \
            --paths "/*" --query 'Invalidation.Id' --output text)
          aws cloudfront wait invalidation-completed \
            --distribution-id ${{ secrets.CF_DISTRIBUTION_ID }} --id "$INVALIDATION"
```

**Why this shape (rationale):**
- **Two-pass sync** is the load-bearing detail. Hashed `_next/static/*` assets get `max-age=31536000, immutable` (browser + CloudFront cache them forever; filenames change on rebuild). HTML pages get `max-age=60` so a deploy + `/*` invalidation refreshes them almost immediately. CloudFront honors `Cache-Control` within its min/max TTL bounds, so this works with the default cache policy.
- **Invalidate `/*` after every deploy** — counts as ONE path (first 1,000 paths/month are free), and it guarantees HTML is fresh even if a TTL was set higher. Invalidations take minutes to propagate; `wait invalidation-completed` makes the pipeline honest.
- **The `out/` empty-dir guard exists because `s3 sync --delete` will happily delete the entire bucket** if the build failed and `out/` is missing/empty. This is the #1 way teams brick their prod site with this pattern.
- **OIDC + `id-token: write`** avoids storing AWS keys in GitHub secrets. Trust policy scoped to `repo:samadflivv/flivv-website` (not the whole org).
- **`concurrency` + `environment: production`** prevents two pushes from racing into a half-uploaded state and gives an optional approval gate.

**Critical prerequisite — the `/api` routes block static export.** Official Next.js docs: in static export, pages-router API routes are unsupported, and Route Handlers render only static files — **only `GET` is supported, and handlers that read the `Request` are unsupported**. This repo has `src/app/api/events/route.js` (GET + POST) and `src/app/api/events/[id]/route.js` (PUT + DELETE), plus `pages/api/meta-events.js`. **Enabling `output: 'export'` will make `next build` fail on these.** The deploy phase must resolve this before the pipeline can go green:
- Events CRUD (`POST`/`PUT`/`DELETE`) is already flagged as an unauthenticated security concern in `.planning/codebase/CONCERNS.md` — recommended: delete these handlers, keep the events calendar reading a statically exported JSON (the `data/events.json` source already exists).
- The Meta CAPI proxy (`pages/api/meta-events.js`) cannot run on S3 — it must move to an external endpoint (Lambda@Edge / small function / third-party proxy) as a separate decision. Do not scope it into the static deploy.
- The build must be proven locally (`next build` with `output: 'export'`) **before** wiring the workflow.

## Image Optimization for Static Export

| Decision | Why |
|----------|-----|
| Set `images: { unoptimized: true }` in `next.config.mjs` | Static export has no image-optimizer server; the default loader throws on `next build`. This is mandatory, not optional. `next/image` still works (lazy loading, `priority`, intrinsic sizing) — it just serves the given src as-is. |
| Keep `images.remotePatterns` for `flivv-web-cdn` | Harmless and future-proof; with `unoptimized` the optimizer isn't invoked, but keeping the pattern avoids surprises if a section uses a remote src. |
| Keep the sharp manifest pipeline (`tools/generate-thumbs-upload.js`) and **extend it** for template sections | Pre-optimizing at build time (JPG + WebP srcsets → `manifest.json` → S3 CDN bucket) is *the* correct static-export image pattern: zero runtime cost, CDN-cached variants. New template gallery/hero sections must consume the manifest, not raw `public/` assets. |
| Do **not** add a runtime image-optimization service or third-party CDN transforms | The 229 MB of unoptimized images in `public/` is a known performance debt; adding a runtime optimizer re-introduces server costs and contradicts the static hosting model. |

## Installation

```bash
# No new runtime dependencies required for any of the three features.
# The existing stack already covers: next 15, react 18, tailwind 4, sharp, @aws-sdk/client-s3,
# framer-motion, lucide-react, swr, shadcn/ui aliases.

# Recommended dev-only additions (cheap, high value):
npm install -D eslint eslint-config-next

# Optional: bump sharp patch (repo ^0.34.5 → latest 0.35.3) only if the manifest
# tool benefits; not required for any feature.
```

No `npm install` is needed for the data template, the unified progress component, or the deploy workflow — all three are configuration/code-native.

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Content layer for project data | Plain `data/projects/*.js` modules + `generateStaticParams()` | `content-collections` (or `velite`) | Both are markdown/MDX-oriented, TS-first content frameworks. Repo is plain JS, content is structured JSON-like records (no prose/MDX), scale is ~10 projects. A content framework adds a build plugin + generated dir for zero benefit here. **Revisit only if markdown-heavy content arrives.** |
| Content layer | Plain data modules | `contentlayer` | **Abandoned/unmaintained** — community (2025–2026) has migrated off it; breaks with Turbopack and newer Next majors. Never start a new project on it. |
| Auth for CI | OIDC role assumption | Long-lived IAM access keys in GitHub secrets | OIDC is GitHub's documented recommendation, avoids key rotation, and the trust policy is revocable per repo. Fall back to keys only if the AWS account cannot add the OIDC provider (then scope keys to the single deploy policy below). |
| CloudFront invalidation | AWS CLI `create-invalidation` | Third-party actions (`chetan/invalidate-cloudfront-action`, `badsyntax/…`, `H3aven-Labs/…`); official `aws-actions/aws-cloudfront-invalidate-cloudfront-action` | The official AWS invalidation action is **no longer available (404 on its repo)**, and third-party equivalents are small/unmaintained. The CLI (pre-installed) is the standard. |
| S3 upload | AWS CLI `s3 sync` | `jakejarvis/s3-sync-action` and similar | Old, maintained intermittently, and it only wraps the CLI anyway. |
| Next.js major | Stay on Next 15 | Next 16 (current major, 16.2.12) | Repo constraint: "Next.js 15 … do not introduce a different framework." 15 is still receiving patches (15.5.22). Nothing in the three features requires 16. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| The existing `.github/workflows/deploy.yml` (appleboy/ssh-action → Lightsail → pm2) | Deploys a Node server that no longer matches the S3/CloudFront static model; would push the site to the wrong infrastructure | Replace with the workflow in this document |
| `contentlayer` | Abandoned; breaks on newer Next/Turbopack | Plain data modules (or `content-collections` if MDX appears) |
| Third-party GitHub Actions for S3 sync / CloudFront invalidation | Unmaintained, unnecessary indirection, supply-chain surface | AWS CLI steps (pre-installed on runners) |
| `next/image` default optimization (leaving `unoptimized` off) | Build error under static export ("Image Optimization with the default loader" is on the unsupported list) | `images.unoptimized: true` + existing sharp manifest pipeline |
| Adding a runtime image optimizer / third-party image CDN | Re-introduces server cost; contradicts static hosting; duplicates what the sharp pipeline already does | Build-time sharp variants (already in repo) |
| TypeScript, MDX tooling, or a CMS for content | Explicit out-of-scope decisions (PROJECT.md) — editors are developers editing code | Plain data modules |
| Pinning actions to full commit SHAs | Adds friction for a solo/small project with no supply-chain threat model; Dependabot + major-version tags is proportionate | Pin major versions (`@v7`, `@v6.2.3`) + enable Dependabot |

## Stack Patterns by Variant

**If AWS account can add an OIDC identity provider (recommended):**
- Use `configure-aws-credentials@v6.2.3` with `role-to-assume` + workflow `permissions: id-token: write`
- IAM trust policy scoped to `repo:samadflivv/flivv-website`; permissions policy (least privilege):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DeploySite",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:ListBucket", "s3:GetBucketLocation"],
      "Resource": ["arn:aws:s3:::YOUR-SITE-BUCKET", "arn:aws:s3:::YOUR-SITE-BUCKET/*"]
    },
    {
      "Sid": "InvalidateCDN",
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation", "cloudfront:GetInvalidation"],
      "Resource": "arn:aws:cloudfront::YOUR-ACCOUNT:distribution/YOUR-DISTRIBUTION-ID"
    }
  ]
}
```

**If OIDC is not possible:**
- Use `configure-aws-credentials@v6.2.3` with `aws-access-key-id` / `aws-secret-access-key` from GitHub secrets, and the same least-privilege policy attached to a dedicated deploy IAM user. Everything else in the workflow is identical.

**If a preview/staging site is wanted later:**
- Duplicate the job with `environment: staging`, a second S3 bucket + distribution, and env-scoped secrets; trigger staging on all pushes and production only on `main`.

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| next@15.5.22 (repo `^15.3.6`) | react@18.2.0 (pinned) | Next 15 supports React 18 and 19; the repo's React 18 pin is correct and must not be changed by CI. Verified: npm registry 2026-08-01. |
| actions/setup-node@v7 | node 22 | Node 22 LTS satisfies Next 15's Node ≥ 18.18 requirement. |
| aws-actions/configure-aws-credentials@v6.2.3 | actions/checkout@v7, ubuntu-latest | Current action major; released 2026-07-22. |
| sharp@^0.34.5 (repo) | Node 22 | Native binary downloads per platform; `^0.34.5` resolves < 0.35.0 (caret on 0.x). Bump to 0.35.3 only if the manifest tool needs it. |
| @aws-sdk/client-s3@^3.930.0 (repo) | Node 22, `tools/generate-thumbs-upload.js` | Caret resolves to 3.1101.0 (latest 2026-08-01) — already satisfied. |

## Sources

- Next.js official docs — Static Exports (unsupported features list incl. Route Handlers GET-only, API Routes, image default loader, `generateStaticParams` requirement): https://nextjs.org/docs/app/guides/static-exports and https://nextjs.org/docs/pages/guides/static-exports — HIGH
- Next.js official docs — `images` config (`unoptimized`, `loaderFile`, AWS CloudFront loader example): https://nextjs.org/docs/app/api-reference/config/next-config-js/images — HIGH
- Next.js official docs — environment variables (`NEXT_PUBLIC_` inlined at build time): https://nextjs.org/docs/pages/guides/environment-variables — HIGH
- npm registry (authoritative versions, queried 2026-08-01): `npm view next@15 version` → 15.5.22; `next` → 16.2.12; `react` → 19.2.8; `sharp` → 0.35.3; `@aws-sdk/client-s3` → 3.1101.0 — HIGH
- GitHub API (authoritative action versions): `actions/checkout` v7.0.1, `actions/setup-node` v7.0.0, `aws-actions/configure-aws-credentials` v6.2.3 — HIGH
- GitHub Docs — OIDC in AWS + GitHub Actions: https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws — HIGH
- aws-actions/configure-aws-credentials README (v6 usage, session policies): https://github.com/aws-actions/configure-aws-credentials — HIGH
- AWS Whitepaper — Controlling how long S3 content is cached by CloudFront (Cache-Control + invalidation strategy): https://docs.aws.amazon.com/whitepapers/latest/build-static-websites-aws/ — MEDIUM (cross-checked with 2026 practitioner write-ups: stevekinney.com cache-behaviors, oneuptime.com 2026-02-12, eams.dev, baltzakisthemis.com 2026-03-24)
- Community field reports on S3/CloudFront static deploy gotchas (trailing slash, cache headers, s3 sync --delete): allthingsserverless.com (Next 15 App Router on S3), eams.dev, itugui.com (2025-06-15) — MEDIUM
- Content layer landscape 2026 (contentlayer dead; content-collections/velite as successors): contentlayer.dev README, rlodhiya.dev (2026-02-12), igorkowalczyk.dev (2025-04-24), pkgpulse comparison (2026) — MEDIUM
- Real-estate schema/SEO landscape 2026 (JSON-LD types, canonical, one-owner-per-template): seobro.com (2026-02-22), jefflenney.com (2026-01-28), selinaeizik.com (2026-08-01) — MEDIUM
- Component-unification guidance (configurable vs composable, apropcalypse, progressive refactor): tomaszgil.me, webnuz.com (2026-03-19), freefrontend.com React timelines — MEDIUM

---
*Stack research for: Flivv Developers — data-driven project pages + CI/CD S3/CloudFront on Next 15 static export*
*Researched: 2026-08-01*
