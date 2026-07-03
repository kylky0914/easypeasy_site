# EasyPeasy Website — Design Spec

**Date:** 2026-07-03
**Status:** Approved approach: multi-page Next.js site with SEO + marketing layer (user-selected). Positioning assumptions flagged below.

## Purpose

Marketing website for EasyPeasy, a Singapore-based provider of customized AI solutions for SMEs. Goal: convert SME visitors into leads via a contact form, with SEO and marketing instrumentation built in from day one. v1 backend is deliberately minimal — contact form submission only.

## Positioning (ASSUMPTION — confirm with owner)

EasyPeasy offers SMEs: AI workflow automation, AI chatbots / WhatsApp agents, custom AI development, and AI consulting. Brand promise: making AI easy for small businesses. Target market: Singapore SMEs (regional later).

## Research basis

Derived from analysis of 6 SME-targeting AI solution sites in SG/MY (Wire Up AI, ETD Digital, GreatRise IT, Astral AI, OTG Lab, SleekDigital) — see `palazon-competitors-research.md`. Key patterns adopted:

1. Free-audit lead magnet as primary CTA with risk-reversal copy (6/6 sites)
2. WhatsApp as first-class contact channel — no chat widget (5/6)
3. Numbered 3–4 step process with timelines (6/6)
4. Metrics-driven Before/After/Impact case studies (4/6 strongest)
5. ROI stats near the hero (5/6)
6. Qualifying contact form with service + budget dropdowns, "Not sure yet" escape (ETD/SleekDigital pattern)
7. Grant signaling for SG market (all 3 SG sites) — **only once eligibility is confirmed**
8. Pricing honesty in FAQ (ETD differentiator)
9. Industry/service-specific landing pages for SEO (ETD/SleekDigital pattern) — realized here as per-service pages

## Chosen approach

**Multi-page Next.js site** (user-selected over single-page): separate Home / Services / Case Studies / Contact pages plus one SEO landing page per service. Next.js (App Router, static generation) chosen for built-in SEO tooling; the contact form backend is a Next API route, so no separate server is needed.

## Page map

| Route | Purpose | Sections |
|-------|---------|----------|
| `/` | Home | Hero (pain-point headline, "Get Your Free AI Audit" CTA, WhatsApp button) → trust bar (3 stats) → services preview (4 cards) → How It Works (4 steps with timelines) → featured case studies (2–3) → FAQ (5–6 Qs incl. honest pricing) → CTA banner |
| `/services` | Services overview | Intro + 4 service cards linking to detail pages |
| `/services/[slug]` | Per-service SEO landing pages | Slugs: `ai-workflow-automation`, `ai-chatbots-whatsapp`, `custom-ai-development`, `ai-consulting`. Each: pain points → what we build → mini process → service-specific FAQ → CTA linking to `/contact?service=<slug>` |
| `/case-studies` | Proof | Entries in Before/After/Impact format, each with a hard metric. Illustrative examples clearly labelled until real ones exist |
| `/contact` | Conversion | Contact form + WhatsApp alternative + response-time promise ("within 24 hours") |
| `POST /api/contact` | v1 backend | See Contact form section |

Shared layout: Nav (logo, page links, CTA button) + Footer (WhatsApp, email, address, privacy note).

## Contact form (v1 backend)

**Fields:**
- Name (required)
- Email (required, format-validated)
- Phone / WhatsApp (required)
- Company (required)
- Service interest (dropdown: Workflow Automation / Chatbot / Custom AI / Consulting / Not sure; pre-selected from `?service=` query param)
- Estimated budget (dropdown: SGD ranges + "Not sure yet" — ranges TBD by owner, placeholder ranges shipped)
- Message (required, free text)
- Honeypot field (hidden, anti-spam)
- Hidden UTM fields (`utm_source`, `utm_medium`, `utm_campaign` captured from URL)

**Flow:**
1. Client-side validation (required fields, email format) with inline error messages
2. `POST /api/contact` with JSON body
3. Server re-validates all fields; rejects if honeypot filled
4. Persists submission (fields + UTM + timestamp) to a local JSON file (append-only — no lead is ever lost)
5. Optionally sends notification email via SMTP (env-var config; no-ops gracefully if unconfigured)
6. Returns 200 → UI shows success message; fires analytics conversion event if analytics configured
7. On network/server error → UI shows failure message with WhatsApp fallback link

**Anti-abuse:** honeypot + simple per-IP rate limit (e.g. 5 submissions / 15 min).

## SEO layer (in scope for v1)

- Per-page `metadata` export: unique title, description, canonical URL per page (including each service page)
- `app/sitemap.js` → sitemap.xml; `app/robots.js` → robots.txt
- Open Graph + Twitter card tags with a share image
- JSON-LD structured data: `Organization` (sitewide), `Service` (per service page), `FAQPage` (home + service FAQs)
- Semantic HTML (single h1 per page, landmark elements), alt text on all images
- All pages statically generated (SSG) — pre-rendered HTML for crawlers, fast loads

## Marketing layer (in scope for v1)

- Analytics-ready: GA4 script slot activated by env var (`NEXT_PUBLIC_GA_ID`); site works fine without it
- Form-submit conversion event when analytics is active
- UTM capture on the contact form (see above) — every lead records its campaign source
- WhatsApp CTAs sitewide (wa.me links)
- All copy in `content/` data modules (one per page + shared) — landing-copy tweaks never touch components

## Architecture

**Framework:** Next.js (App Router), JavaScript, Tailwind CSS

- One component per section (`Hero`, `TrustBar`, `ServiceCard`, `ProcessSteps`, `CaseStudyCard`, `Faq`, `ContactForm`, `CtaBanner`, `Nav`, `Footer`), props-driven from `content/` modules
- Service pages generated from a single `content/services.js` array via `generateStaticParams`
- API route `app/api/contact/route.js`: validation, JSON-file persistence (`data/submissions.json`), optional SMTP via nodemailer
- No database, no auth, no CMS in v1

**Error handling:**
- Client: inline field errors; submit states idle/submitting/success/error
- Server: 400 with field errors, 429 on rate limit, 500 fallback; all JSON responses
- Custom 404 page

**Testing (light):**
- Unit tests for form validation logic (shared client/server validation module)
- API route tests: valid submission, invalid fields, honeypot rejection

## Out of scope for v1 (future options)

- Blog / content layer (structure allows adding `/blog` later)
- Interactive AI-readiness quiz or grant-eligibility checker (strong v2 lead magnets)
- CMS, database, admin panel, auth
- Multilingual (EN/中文/BM)
- Grant funding tags on services (pending EDG/PSG eligibility confirmation)
- Industry-vertical landing pages (v2 SEO expansion)

## Open items for owner

1. Confirm positioning/service list (assumption above)
2. Real WhatsApp number, email, address for footer/CTAs
3. Real stats for trust bar; real case studies when available
4. Budget dropdown SGD ranges
5. Grant eligibility (EDG/PSG) before adding funding tags
6. Domain name + GA4 property when ready to deploy
