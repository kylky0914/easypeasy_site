# EasyPeasy Site

Marketing site for EasyPeasy — customized AI solutions for Singapore SMEs.
Next.js 14 (App Router) · Tailwind CSS · Vitest. Spec: `docs/superpowers/specs/2026-07-03-easypeasy-site-design.md`.

## Quick start

Prerequisites: Node.js 18.17 or newer (`node -v` to check) and npm.

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Start the dev server
npm run dev
```

Open http://localhost:3000 — the site hot-reloads as you edit.

Other commands:

```bash
npm test         # run the test suite (validation + API route tests)
npm run build    # production build (all pages pre-rendered/static)
npm run start    # serve the production build (run `npm run build` first)
```

## Contact form — how to receive the data

The form at `/contact` posts to the built-in API route (`POST /api/contact`). You receive leads
in two ways — file storage (always on) and email notification (optional):

### 1. File storage (always on, zero setup)

Every valid submission is appended to **`data/submissions.json`** in the project folder.
Open it any time to see your leads. Each entry looks like:

```json
{
  "name": "Tan Ah Kow",
  "email": "tan@acme.sg",
  "phone": "+65 9123 4567",
  "company": "Acme Trading Pte Ltd",
  "service": "AI Chatbot",
  "budget": "S$5k–15k",
  "message": "We want to automate invoice entry.",
  "utm": { "source": "google", "medium": "cpc", "campaign": null },
  "submittedAt": "2026-07-03T09:15:00.000Z"
}
```

The file is gitignored and never lost on errors (writes are corruption-safe and serialized) —
but **back it up regularly in production**, it is your lead database.

### 2. Email notification per lead (optional)

To also get an email every time someone submits:

```bash
# 1. Create your local env file (first time only)
copy .env.example .env.local        # Windows
# cp .env.example .env.local        # macOS/Linux
```

2. Fill in the SMTP section of `.env.local`:

```
SMTP_HOST=smtp.gmail.com        # your mail provider's SMTP server
SMTP_PORT=587
SMTP_USER=you@gmail.com         # SMTP login
SMTP_PASS=your-app-password     # for Gmail: create an App Password (Google Account → Security → 2-Step Verification → App passwords)
NOTIFY_EMAIL=you@yourcompany.sg # where lead notifications are sent
```

Any SMTP provider works (Gmail, Outlook/M365, Zoho, your web host). Leave these unset to
disable email entirely — leads are still saved to the file either way, and an email failure
never loses a lead.

3. Restart the dev server (`npm run dev`) so the new env vars load.

### 3. Test that it works

With the server running, either submit the form at http://localhost:3000/contact, or:

```bash
curl -X POST http://localhost:3000/api/contact -H "content-type: application/json" -d "{\"name\":\"Test\",\"email\":\"test@test.sg\",\"phone\":\"91234567\",\"company\":\"Test Co\",\"message\":\"Hello\"}"
```

Expect `{"ok":true}`, a new entry in `data/submissions.json`, and (if SMTP is configured) a
notification email.

### Built-in protections

Honeypot field (bots get a fake success, nothing stored) · rate limit (5 submissions per IP
per 15 min) · server-side re-validation with length caps · UTM parameters captured per lead
so you know which campaign it came from.

## Deployment

Lead persistence writes to a JSON file (`lib/submissions.js`) and the rate limiter (`lib/rateLimit.js`) is in-memory — the site therefore requires a long-running Node host (`next start` on a VPS, Docker, Railway, Render, Fly, etc.). On serverless platforms (Vercel/Netlify functions) the filesystem is ephemeral/read-only and every lead save will fail — replace `lib/submissions.js` and `lib/rateLimit.js` with a database/KV before deploying serverless.

The rate limiter keys on the `x-forwarded-for` header, which is client-spoofable unless a trusted proxy/platform sets it — treat it as advisory except behind a trusted proxy.

## Configuration

Copy `.env.example` to `.env.local`. Everything is optional in development.

Before launch, the owner must swap placeholders in `content/site.js`:
WhatsApp number, email, site URL (also set `NEXT_PUBLIC_SITE_URL`), address, and trust-bar stats.
All marketing copy lives in `content/` — no component edits needed for text changes.

Optional analytics: set `NEXT_PUBLIC_GA_ID` in `.env.local` to enable Google Analytics 4
(form submissions fire a `generate_lead` conversion event automatically).

## Structure

- `app/` — pages (Home, Services + 4 service landing pages, Case Studies, Contact), API route, sitemap/robots
- `components/` — one section component per file
- `content/` — all copy and data
- `lib/` — shared validation, submission persistence, rate limiting
- `tests/` — Vitest suites
