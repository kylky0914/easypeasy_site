# EasyPeasy Site

Marketing site for EasyPeasy — customized AI solutions for Singapore SMEs.
Next.js 14 (App Router) · Tailwind CSS · Vitest. Spec: `docs/superpowers/specs/2026-07-03-easypeasy-site-design.md`.

## Develop

    npm install
    npm run dev      # http://localhost:3000
    npm test         # validation + API route tests
    npm run build    # production build (all pages static)

## Leads

Contact form submissions append to `data/submissions.json` (gitignored — back it up in production).
Optional email notification per lead: set the `SMTP_*` and `NOTIFY_EMAIL` vars (see `.env.example`).

## Configuration

Copy `.env.example` to `.env.local`. Everything is optional in development.

Before launch, the owner must swap placeholders in `content/site.js`:
WhatsApp number, email, site URL (also set `NEXT_PUBLIC_SITE_URL`), address, and trust-bar stats.
All marketing copy lives in `content/` — no component edits needed for text changes.

## Structure

- `app/` — pages (Home, Services + 4 service landing pages, Case Studies, Contact), API route, sitemap/robots
- `components/` — one section component per file
- `content/` — all copy and data
- `lib/` — shared validation, submission persistence, rate limiting
- `tests/` — Vitest suites
