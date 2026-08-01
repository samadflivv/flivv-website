# Feature Research

**Domain:** Real estate developer / construction marketing website — project showcase pages
**Researched:** 2026-08-01
**Confidence:** MEDIUM (verified — websearch findings cross-checked across ≥3 independent 2025–2026 sources)

> **Scope note.** This milestone builds a *reusable, data-driven project page template* for an existing Next.js 15 static-export site (flivvdevelopers.com). Feature granularity below is therefore **per project-page section + cross-cutting template concerns**, not whole-site features. Every row carries a status marker so existing functionality is retained/formalized rather than double-built:
>
> - **[EXISTING]** Already live in some form (per PROJECT.md Validated requirements + codebase survey) — the template must *retain and formalize* it, not rebuild it.
> - **[ENHANCE]** Exists but needs generalization/configurization (copy-paste components → one configurable component, hardcoded → data).
> - **[NEW]** Genuine gap for the template to fill.

## Feature Landscape

### Table Stakes (Users Expect These)

Missing these = the project page feels incomplete and serious buyers leave. In this domain, "users" are homebuyers and investors researching a 7-figure purchase; the site is their first trust check.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero: project name, location, one-line positioning + primary CTA | Visitors need project identity and a next step in the first screen; vague taglines delay intent (Traficore) | LOW | **[EXISTING]** per-project hero components. Template needs: name, location, positioning, 1 primary CTA + 1 secondary (not 5 equal buttons — dignuzdesign). |
| Gallery of real project photos | 66% of buyers rate photos "very useful"; visuals are the primary way buyers judge a project online (ParallelHQ) | MEDIUM | **[EXISTING]** S3 gallery with lazy loading + sharp manifest. Template enhancement: categorize images (exterior / interiors / site progress) and label render vs real (videinfra, Vikilinks). |
| Project overview / about section | Buyers need to understand what the project is before specs (VASUYASHII, EffectLab) | LOW | **[EXISTING]** per-project about components (GVabout, RivendellAbout). Becomes a data field. |
| Amenities list | Buyers filter projects on lifestyle facilities (gym, clubhouse, park); amenities shown must match approved scope (scaleacres RERA guide) | LOW | **[EXISTING]** GVamenities. Template: icon-list rendered from data. |
| Location & map with nearby landmarks + commute times | Location is one of the most important decision factors; buyers verify access roads, transit, schools (videinfra, VASUYASHII) | MEDIUM | **[EXISTING]** GVLocationMapSection, RFSlocationAndform. Template: map embed + landmark list with drive times from data. Avoid generic copied location copy (VASUYASHII). |
| Floor plans / unit configurations with area basis | Buyers self-qualify on size/layout/budget; typology tables (type, area, price, status) are standard (Godrej, magicbricks PDP) | MEDIUM | **[NEW]** No floor-plan/typology component exists in the codebase (verified by grep). Template: typology table + floor-plan image viewer from data. Never gate plans behind a sign-up (ParallelHQ, VASUYASHII). |
| Construction progress / status with "last updated" | Buyers check construction status before enquiring; honest status filters in serious buyers (Vikilinks, webcodeskills) | MEDIUM | **[ENHANCE]** Live GViz dashboards already exceed industry norm. Template: unify 5 copy-pasted components → one configurable component (config: sheet ID, sheet name, refresh). Add visible "last updated" timestamp. |
| Enquiry form / CTA | The page's endpoint — capture qualified leads (project, config, budget, timeline) with minimal friction (VASUYASHII, Traficore) | LOW | **[EXISTING]** HubSpot forms. Template: standard enquiry section + CTA placement (first screen, mid-narrative, after proof). Do NOT send PII to analytics (VASUYASHII). |
| FAQ | Buyers have the same questions across projects (booking, payment plan, possession, RERA/approvals); FAQ answers must match the price/status pages exactly (Bulwark, Eldeco EOE) | LOW | **[EXISTING]** GVFaqs, RFSfaqs. Template: data-driven Q&A; single source of truth so FAQ can't drift from page facts. |
| Pricing context (starting price, basis, update date) | Buyers penalize hidden prices; state "from ₹X", which config/area it covers, date, exclusions (VASUYASHII, 247realestatemarketing) | MEDIUM | **[NEW/ENHANCE]** Pricing appears only in scattered page copy today. Template: optional `priceFrom` + `priceNote` fields with data freshness date. If a project can't publish price, say "price on request" deliberately — silence reads as evasive. |
| Trust block: registration/approval numbers + disclaimers | In regulated markets (India: RERA; Pakistan/GCC: equivalent authority filings), buyers verify registration before enquiring; visible, verifiable number is the strongest trust signal (Vikilinks, magicbricks) | LOW | **[NEW]** Template: `registration` fields (number, authority, link/QR) + disclaimer block ("architect's impression", "subject to change") + render-label policy. Mark clearly on every project page, not just footer (Vikilinks). |
| Fast, mobile-first performance | ~70% of weekend real-estate search is mobile; slow pages lose >50% of visitors (ParallelHQ, dignuzdesign, Vikilinks) | MEDIUM | **[EXISTING]** Static export is inherently fast. Constraint: template must use `next/image` + existing manifest, not add unoptimized assets (repo already carries ~229 MB images). |

### Differentiators (Competitive Advantage)

Features that set the product apart. Aligned to PROJECT.md Core Value: visitors understand each project fast, and adding a project is fast and low-risk.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Live construction-progress dashboard (20s SWR polling from Google Sheets) | Genuinely rare: most developers publish static photo reports. Dated, live progress builds trust over the 12–18-month buying cycle and wins forgiveness for delays (EffectLab, dignuzdesign) | MEDIUM | **[EXISTING → ENHANCE]** The milestone's unification is *protecting* this differentiator. Configurable component: per-project sheet ID/name/refresh; keep GViz parser; add last-updated + status colors. |
| Data-driven template → new project = content data + one route | Speed of publishing new/updated pages without breaking live site is the stated success metric (PROJECT.md) | MEDIUM | **[NEW]** Per-project `project-data` file + generic page renderer. This is the milestone's core deliverable; also enables consistency that builds brand trust. |
| Real photos labeled vs renders ("artist's impression") | Renders alone erode trust; honest pairing of site photos + labeled renders is a credibility differentiator and legal protection (Vikilinks, scaleacres) | LOW | **[ENHANCE]** Gallery + hero metadata: `mediaType: render|photo|video`, per-image caption/date. Cheap to add at data layer, high trust payoff. |
| Data-freshness governance (verified dates on price, status, possession) | Monthly verification checklist (prices, status, approvals, possession wording) is what separates trustworthy sites (VASUYASHII) | LOW | **[NEW]** `updatedAt` fields + optional "verified" stamp. Pairs with CI deploy: stale-content risk drops when republishing is cheap. |
| FAQ + page facts from one data source | Answers drawn from the same figures as the price/RERA sections — a documented differentiator of credible sites (Bulwark) | LOW | **[ENHANCE]** Single `project-data` schema feeds hero, typology, FAQ, trust block. Kills copy-paste drift. |
| WhatsApp CTA (one-tap, prefilled with project context) | WhatsApp is how the target market (homebuyers + Gulf NRI investors) prefers to start conversations; most builders still make buyers work to reach them (Vikilinks) | LOW | **[NEW]** No WhatsApp CTA exists in codebase (verified by grep — only "WhatsApp Image" filenames). Per-project WhatsApp number field. |
| Per-page SEO metadata + JSON-LD (RealEstateListing / FAQPage) | Real-estate pages live on organic search; schema markup + unique per-project meta (title, description, OG) drive qualified traffic (ParallelHQ, VASUYASHII) | MEDIUM | **[NEW]** Easy in static export (generateMetadata from data). Watch: don't publish dozens of near-identical thin pages — every project needs distinct, evidenced content (VASUYASHII). |
| Developer track-record section (completed projects, years, delivered units — animated counters) | Buyers evaluate the developer as much as the project (webcodeskills, EffectLab) | MEDIUM | **[NEW]** Site-level section, not per-project. Optional; reuse on template or homepage. |
| Video walkthrough / site-visit tour | Tours help homes sell ~31% faster (Matterport via ParallelHQ); video sections already exist for Rivendell | MEDIUM | **[ENHANCE]** RFSAutoVideoSection, ScrollVideoSection exist as bespoke components; template takes optional `video` fields (hosted, lazy-loaded). Keep on-domain for measurability (dignuzdesign). |
| NRI/investor content (remote enquiry, Gulf exhibition tie-in) | Flivv runs sales events in Riyadh/Qatar/Bahrain/Oman — the site already has event pages; project pages can support remote-buyer paths (virtual tour, PoA/number fields, NRI FAQ) (Mamurdi MyHome) | MEDIUM | **[ENHANCE]** Fold into FAQ + enquiry routing. Low build cost since event pages already exist. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems — especially on a **static-export, no-server, no-CMS** site.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Live unit-level inventory / booking / payment ("reserve now", unit picker with real availability) | Buyers want instant booking; sales wants self-service (EffectLab's interactive selector) | Requires secure backend, conflict handling, audit history, role controls so two buyers don't get the same promise; impossible on static export; expands the unauthenticated API surface (PROJECT.md security constraint) (VASUYASHII) | Availability *categories* (available / limited / waitlist / sold out) maintained in data + "Enquire / site visit" form as the action |
| CMS / admin UI for non-technical editors | Marketing team wants to edit without developers | Explicitly out of scope in PROJECT.md; adds build + maintenance; editors ARE developers | Content data files edited in code; CI deploy makes publishing fast (the actual pain point) |
| Moving progress data out of Google Sheets | "Real" database would be more robust | Out of scope (PROJECT.md); Sheets + GViz already live and trusted; migration risk with zero user-visible gain | Keep Sheets as source; unify the 5 components instead |
| TypeScript migration | Type safety for the new data schema | Explicitly out of scope (PROJECT.md); plain JS constraint | Validate the project-data schema at build time with a small node script instead |
| Interactive 3D bird's-eye unit selector / WebGL tours | Impressive, self-service unit search (videinfra, EffectLab) | Heavy WebGL + huge assets on an already image-heavy site; static export complicates it; breaks the "template stays simple" goal | Static floor-plan images + typology table; optional embedded third-party tour if a project needs it |
| Gating floor plans / brochures behind email sign-up | Lead capture funnel | Buyers bounce — hiding essentials behind forms is a documented anti-pattern (ParallelHQ, VASUYASHII); low-quality leads | Show plans inline; capture email via value-add (progress-update subscription / brochure download as a *second* touch) (dignuzdesign capture ladder) |
| Artificial urgency ("few units left", "last chance", countdowns) | Scarcity boosts conversion | Legal/compliance risk in regulated markets (RERA ad rules — every claim must match filings); destroys the transparency trust story (scaleacres, VASUYASHII) | Honest status labels with dates; real inventory state only |
| Stock photos / unlabeled renders presented as delivered work | Fast page fill, cheap imagery | Misleads buyers; the #1 trust killer; documented legal exposure (Vikilinks, scaleacres) | Real site photos + labeled "artist's impression" renders; dated progress media |
| Full EMI / mortgage calculators, multi-currency pricing tables | Financial planning tools | Scope creep; calculators need current rates and are "illustrative" anyway; multi-currency = data governance burden | A single illustrative EMI link/estimator if a project needs it (magicbricks pattern); otherwise omit |
| AI chat agent on the project page (2026 trend) | Instant answers, always-on sales assist (aisa-x) | Third-party widget on a lean static site; adds JS weight; unmoderated answers can contradict approved page facts (trust damage) | Revisit after v1; strong FAQ + fast enquiry routing covers the 80% case |
| Dozens of near-identical "property in X" SEO pages | Rank for every locality keyword | Thin/duplicate content; Google treats as doorway pages; buyers distrust generic filler (VASUYASHII) | One strong page per real project + a projects index; distinct, evidenced content only |
| Multi-language (Urdu/Arabic) localization | Reach NRI + GCC audience in their language | Heavy content-governance burden per project; doubles data maintenance | Defer until a specific audience need is proven (future consideration) |

## Feature Dependencies

```
Project data schema (project-data file)
    └──requires──> Typology table + floor plans
    └──requires──> Trust block (registration/approvals/disclaimers)
    └──requires──> Data-driven FAQ (single source of truth)
    └──requires──> Per-page SEO metadata + JSON-LD

Generic page renderer (page.jsx composes sections from data)
    └──requires──> Project data schema
    └──requires──> Section components (hero, gallery, progress, amenities, map, CTA, FAQ)
                       └──requires──> Unified configurable progress component
                                          └──requires──> Progress sheet config (ID, name, refresh)

Gallery categorization (exterior/interiors/progress)
    └──requires──> Image metadata in the manifest pipeline (mediaType, caption, date)
    └──enhances──> Trust block (render-vs-real labeling)

WhatsApp CTA ──requires──> per-project WhatsApp number field in schema
Sticky/primary CTA ──requires──> enquiry form component (exists, HubSpot)

JSON-LD ──enhances──> SEO metadata
CI/CD deploy ──enhances──> data-freshness governance (republishing is cheap → verified dates stay true)
```

### Dependency Notes

- **Project data schema is the keystone.** Typology, trust block, FAQ, SEO, WhatsApp, and pricing all read from it. The schema must be designed *before* section components — it is the first build unit of the milestone.
- **Unified progress component requires config extraction first**: identify the exact per-instance config block across the 5 components (spreadsheet ID, sheet name, refresh interval, label) before merging; config drift is the known failure mode (PROJECT.md context). Merging regressions are the top risk in this milestone.
- **Gallery categorization enhances trust labeling** but the reverse is also true — labeled media needs metadata in the existing sharp manifest pipeline; that's a data-model change to an existing tool, so schedule it early.
- **CI/CD deploy enhances freshness governance**: if publishing is one git push, monthly verification of price/status/possession becomes feasible; the two features should land in the same milestone window.
- **FAQ single-source-of-truth depends on data-driven rendering**: FAQ answers live in `project-data` next to the facts they quote, so they can't drift from typology/pricing/status.

## MVP Definition

### Launch With (v1)

Minimum viable template — covers the milestone's Active requirements without scope creep:

- [x] Project data schema (`project-data` files for the 8 existing projects) — keystone, enables everything
- [x] Generic page renderer + one route per project, URL-preserving (nshomes, nshomes2, gulmoharhomes, gulmoharvillas, sukoonvillas, airporttown, sadhanacity, rivendellfarms)
- [x] Hero, gallery, progress, overview, amenities, map, CTA, FAQ sections rebuilt from data
- [x] **NEW** Floor plans / typology table section (the confirmed gap)
- [x] Unified configurable progress component (5 → 1, keeping Google Sheets + GViz live polling)
- [x] Per-project SEO metadata (title, description, OG) from data
- [x] Trust block: registration/approval fields + disclaimer + render labeling — populated only where real data exists; empty fields render nothing
- [x] Migrate the 8 hand-built project pages onto the template with identical URLs and no lost sections

### Add After Validation (v1.x)

- [ ] WhatsApp CTA (one-tap, prefilled) — trigger: confirm the sales team answers WhatsApp enquiries; needs one field + one component
- [ ] JSON-LD (RealEstateListing + FAQPage) — trigger: SEO metadata ships and rankings are monitored; low-risk add to generateMetadata
- [ ] Gallery categorization + dated media labels — trigger: manifest pipeline refactor lands; needs image metadata model
- [ ] Availability categories (available/limited/waitlist/sold out) — trigger: sales confirms they can maintain it monthly (honesty constraint)

### Future Consideration (v2+)

- [ ] Developer track-record section with animated counters — trigger: projects index/homepage refresh, not per-project
- [ ] NRI/investor section (remote buying path, PoA guidance) — trigger: Gulf event enquiry volume justifies it; evidence needed
- [ ] Video walkthrough fields — trigger: a project has a produced walkthrough; reuse existing Rivendell pattern
- [ ] AI chat widget — trigger: v1 FAQ + enquiry routing metrics prove the gap is real; revisit vendor options
- [ ] Multi-language — trigger: proven audience demand; big content-governance cost
- [ ] EMI calculator — trigger: a project with published pricing requests it

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Project data schema | HIGH | MEDIUM | P1 |
| Generic page renderer + URL-preserving migration | HIGH | MEDIUM | P1 |
| Hero (name/location/positioning/CTA) | HIGH | LOW | P1 |
| Gallery (retain + label) | HIGH | LOW | P1 |
| Progress dashboard (unify 5 → 1) | HIGH | MEDIUM | P1 |
| Overview / about | MEDIUM | LOW | P1 |
| Amenities | MEDIUM | LOW | P1 |
| Location + map + landmarks | HIGH | MEDIUM | P1 |
| Floor plans / typology table | HIGH | MEDIUM | P1 |
| Enquiry form + CTA placement | HIGH | LOW | P1 |
| Data-driven FAQ | MEDIUM | LOW | P1 |
| Trust block (registration/approvals/disclaimers) | HIGH | LOW | P1 |
| Per-project SEO metadata | HIGH | LOW | P1 |
| WhatsApp CTA | HIGH | LOW | P2 |
| JSON-LD schema | MEDIUM | LOW | P2 |
| Gallery categorization + media labels | MEDIUM | MEDIUM | P2 |
| Availability categories | MEDIUM | LOW | P2 |
| Developer track-record section | MEDIUM | MEDIUM | P3 |
| Video walkthrough fields | MEDIUM | MEDIUM | P3 |
| NRI/investor section | MEDIUM | MEDIUM | P3 |
| EMI calculator | LOW | LOW | P3 |
| AI chat widget | MEDIUM | HIGH | P3 |

**Priority key:**
- P1: Must have for launch — everything the template milestone promises
- P2: Should have, add when possible
- P3: Nice to have, future consideration

## Competitor Feature Analysis

| Feature | Godrej Properties (India, top-5 developer) | MagicBricks PDP (portal) | Zoria 2 / Osobnyak (Ukraine construction co.) | Bollineni Zion (Chennai builder) | Flivv Approach |
|---------|--------------|--------------|--------------|--------------|--------------|
| Hero + positioning | ✓ name/location/tagline, price "from ₹5.51 Cr" | ✓ price + EMI in headline | ✓ full-width render + tagline + stat counters | ✓ premium positioning | ✓ template hero: name, location, positioning, single primary CTA |
| Gallery | ✓ categorized interior/exterior | ✓ | ✓ | ✓ | ✓ retained; label render vs real |
| Floor plans | ✓ typology table (area, price, "Check Price") | ✓ "View Floor Plan" per config, ungated | ✓ interactive 3D selector (heavy) | ✓ floor & master plans | ✓ NEW static typology table + plan images (ungated) |
| Progress/status | Partial (RERA status) | Possession date | ✓ construction photo reports | — | ✓✓ live GViz dashboard + last-updated (differentiator) |
| Location/map | ✓ landmarks with drive times | ✓ | ✓ infrastructure map 10–15 min | ✓ location advantages | ✓ retained; landmark list from data |
| Pricing | ✓ starting price + disclaimers | ✓ floor pricing + EMI calc | ✓ | ✓ pricing tables | ✓ `priceFrom` + basis/date/exclusions; honest "on request" |
| Registration/trust | ✓ RERA number + approvals + disclaimer block | ✓ RERA number in listing | ✓ developer credentials | — | ✓ NEW trust block with registration fields |
| Enquiry | ✓ ENQUIRE NOW + CALL NOW | ✓ Contact + reviews | ✓ persistent "Schedule a Visit" | ✓ CRM-integrated forms + WhatsApp/callback | ✓ HubSpot forms retained + WhatsApp CTA (P2) |
| FAQ | Partial | ✓ FAQs tab | — | ✓ | ✓ data-driven FAQ, single source of truth |
| Testimonials/reviews | Partial | ✓ Reviews | — | ✓ | P3 (site-level) |

## Sources

- Traficore, "Real Estate Developer's Guide to Landing Page Architecture" (2026-02) — section sequence, CTA placement, form qualification. MEDIUM (verified)
- VASUYASHII, "Builder Website: Project Pages and Enquiry Flow" (2026-06) — trust/lead layers, pricing discipline, floor-plan handling, verification checklist, no-PII-to-analytics. MEDIUM (verified)
- Vikilinks, "RERA-Ready Real Estate Websites" (2026-07) — trust = conversion engine, render labeling, WhatsApp, honest status. MEDIUM (verified)
- scaleacres, "Why Real Estate Websites need Testimonials, Reviews & RERA" (2025-11) and "How to Advertise New Projects Without Violating RERA Rules" (2026-07) — registration prominence, possession-date truth, amenity-scope truth. MEDIUM (verified)
- magicbricks, "How to use RERA website to check project details" (2026-03) — buyer verification behavior. MEDIUM (verified)
- webcodeskills, "What Makes a Real Estate Development Website Stand Out?" (2026-02) — qualification system, trust signals list. MEDIUM (verified)
- EffectLab, "Zoria 2 Residential Complex — Case Study" (2026-02) — narrative flow, construction photo reports, apartment selector tradeoffs. MEDIUM (verified)
- dignuzdesign, "Real Estate Development Marketing Strategy" (2026) — pre-launch/launch/construction phases, static vs CMS, single primary CTA, capture ladder. MEDIUM (verified)
- 247realestatemarketing, "The Digital Trust Formula" (2026-07) — transparency list, common errors. MEDIUM (verified)
- aisa-x.ai, "The Modern Property Buyer's Journey" (2026-07) — research checklist, fast-response conversion. MEDIUM (verified)
- ParallelHQ, "Best Real Estate Website Design" (2020-11) — Matterport stats, gallery gating anti-pattern, schema/SEO. MEDIUM (older, general principles only)
- videinfra, "Luxury Real Estate Website Design Principles" (2025-12) — gallery categorization, neighborhood map, selection tool. MEDIUM (verified)
- Eldeco Echoes of Eden FAQ page (2026-04) and Bulwark Highgrove FAQ page (2026-07) — FAQ categories, FAQ-answers-match-page-facts consistency, pricing/possession wording. MEDIUM (verified)
- Mamurdi MyHome Township FAQ (2026-02) — NRI buying path, booking/payment FAQ categories. MEDIUM (verified)
- Godrej Properties project landing page (live) — typology table, RERA block, landmarks, ENQUIRE/CALL CTAs. MEDIUM (direct competitor observation)
- Existing site (codebase survey): `src/components/` glob + grep — floor plans and WhatsApp CTA absent; 5 near-identical progress components; per-project hero/gallery/about/amenities/map/CTA/FAQ components present. HIGH (first-hand)

**Confidence notes:** Feature *presence* across the sampled developer/portal sites is highly consistent (MEDIUM-verified tier). Specific statistics (Matterport tour/photo sell-speed, phone-conversion rate, mobile share) come from single secondary sources — treat as directional, not contractual. RERA examples are India-specific; Flivv's market (Pakistan projects + Gulf NRI events) has equivalent authority-registration norms — the trust-block pattern generalizes, but exact field labels should be confirmed with the business/legal owner before requirements.

---
*Feature research for: flivvdevelopers project-page template (real estate developer marketing)*
*Researched: 2026-08-01*
