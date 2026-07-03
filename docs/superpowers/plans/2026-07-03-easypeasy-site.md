# EasyPeasy Multi-Page Next.js Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the EasyPeasy marketing site — multi-page Next.js app for a Singapore SME-focused AI solutions company, with SEO/marketing layers and a contact-form API route as the only backend.

**Architecture:** Next.js App Router with all pages statically generated from `content/` data modules. One React component per page section. A single API route (`POST /api/contact`) validates, rate-limits, persists leads to an append-only JSON file, and optionally emails a notification. Shared isomorphic validation module used by both the client form and the API route.

**Tech Stack:** Next.js 14 (App Router, JavaScript — no TypeScript), React 18, Tailwind CSS 3, nodemailer (optional email), Vitest (tests).

**Spec:** `docs/superpowers/specs/2026-07-03-easypeasy-site-design.md`

## Global Constraints

- JavaScript only — no TypeScript, no `.ts`/`.tsx` files
- Next.js App Router (`app/` directory); every page must be statically generated (no dynamic rendering)
- All copy lives in `content/` modules — components never hard-code marketing text
- Contact details (WhatsApp `6580000000`, email `hello@easypeasy.example.sg`, domain `https://easypeasy.example.sg`) are PLACEHOLDERS the owner will swap — keep them centralized in `content/site.js`
- No grant/funding claims anywhere (owner has not confirmed EDG/PSG eligibility)
- Case studies must carry the label "Illustrative example" until real ones exist
- Backend scope: `POST /api/contact` only — no database, no auth, no other routes
- Testing scope (per spec, light): validation unit tests + API route tests only
- Node.js >= 18.17
- Windows dev environment: commands below use `npm` and `curl.exe` (PowerShell-safe)

## File Structure

```
easypeasy_site/
├─ package.json / next.config.mjs / jsconfig.json
├─ tailwind.config.js / postcss.config.mjs / vitest.config.mjs
├─ .gitignore / .env.example / README.md
├─ app/
│  ├─ layout.jsx              ← shell: Nav, Footer, Analytics, Organization JSON-LD, metadata
│  ├─ globals.css             ← Tailwind directives
│  ├─ page.jsx                ← Home
│  ├─ not-found.jsx
│  ├─ sitemap.js / robots.js  ← SEO infra
│  ├─ services/page.jsx
│  ├─ services/[slug]/page.jsx  ← 4 SEO landing pages via generateStaticParams
│  ├─ case-studies/page.jsx
│  ├─ contact/page.jsx
│  └─ api/contact/route.js    ← the only backend
├─ components/                ← one section per file
│  ├─ Nav.jsx  Footer.jsx  WhatsAppButton.jsx  Analytics.jsx  JsonLd.jsx
│  ├─ Hero.jsx  TrustBar.jsx  ServiceCard.jsx  ProcessSteps.jsx
│  ├─ CaseStudyCard.jsx  Faq.jsx  CtaBanner.jsx  ContactForm.jsx ('use client')
├─ content/
│  ├─ site.js  services.js  caseStudies.js  faq.js
├─ lib/
│  ├─ validateContact.js  submissions.js  rateLimit.js
├─ tests/
│  ├─ validateContact.test.js  rateLimit.test.js  submissions.test.js  contactRoute.test.js
└─ data/                      ← runtime submissions (gitignored)
```

---

### Task 1: Project scaffold (Next.js + Tailwind + Vitest)

**Files:**
- Create: `package.json`, `next.config.mjs`, `jsconfig.json`, `tailwind.config.js`, `postcss.config.mjs`, `vitest.config.mjs`, `.gitignore`, `app/globals.css`, `app/layout.jsx` (placeholder), `app/page.jsx` (placeholder)

**Interfaces:**
- Consumes: nothing (first task)
- Produces: `@/` import alias → repo root; `npm run dev|build|test` scripts; Tailwind active in `app/**` and `components/**`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "easypeasy-site",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "14.2.15",
    "nodemailer": "^6.9.14",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "vitest": "^1.6.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: completes without errors; `node_modules/` and `package-lock.json` created.

- [ ] **Step 3: Write config files**

`next.config.mjs`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {}
export default nextConfig
```

`jsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": { "@/*": ["./*"] }
  }
}
```

`tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

`postcss.config.mjs`:
```js
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
}
```

`vitest.config.mjs`:
```js
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: { environment: 'node', include: ['tests/**/*.test.js'] },
  resolve: { alias: { '@': path.resolve(__dirname) } },
})
```

`.gitignore`:
```
node_modules/
.next/
out/
data/
.env
.env.local
*.log
```

- [ ] **Step 4: Write minimal app shell**

`app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`app/layout.jsx` (placeholder — replaced in Task 6):
```jsx
import './globals.css'

export const metadata = { title: 'EasyPeasy' }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-800 antialiased">{children}</body>
    </html>
  )
}
```

`app/page.jsx` (placeholder — replaced in Task 7):
```jsx
export default function HomePage() {
  return <main className="p-8 text-2xl font-bold">EasyPeasy — coming soon</main>
}
```

- [ ] **Step 5: Verify build and empty test run**

Run: `npm run build`
Expected: `✓ Compiled successfully`, route table shows `○ /` (Static).

Run: `npm test`
Expected: `No test files found` — exits without error (Vitest exits 0 with `--passWithNoTests`? It does not by default — this is fine: expect exit code 1 with "No test files found"; tests arrive in Task 3. Do not treat as failure.)

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 14 + Tailwind + Vitest project"
```

---

### Task 2: Content modules

**Files:**
- Create: `content/site.js`, `content/services.js`, `content/caseStudies.js`, `content/faq.js`

**Interfaces:**
- Consumes: nothing
- Produces (exact shapes later tasks rely on):
  - `site` object: `{ name, tagline, url, email, whatsapp, address, responsePromise, hero: {headline, sub}, stats: [{value,label}], process: [{step,title,desc,time}], nav: [{href,label}] }`; helper `waLink(text) => string`
  - `services` array: `{ slug, name, short, metaDescription, painPoints: string[], deliverables: string[], faqs: [{q,a}] }`
  - `caseStudies` array: `{ title, industry, before, after, impact, illustrative: boolean }`
  - `faqs` array: `{ q, a }`
  - Form option lists live in `lib/validateContact.js` (Task 3), NOT here

- [ ] **Step 1: Write `content/site.js`**

```js
// PLACEHOLDER contact details — owner must swap before launch (see spec "Open items for owner")
export const site = {
  name: 'EasyPeasy',
  tagline: 'Customized AI solutions for SMEs — made easy peasy.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://easypeasy.example.sg',
  email: 'hello@easypeasy.example.sg',
  whatsapp: '6580000000', // digits only — used in wa.me links
  address: 'Singapore',
  responsePromise: 'We reply within 24 hours — usually much faster.',
  hero: {
    headline: 'Running your business on manual work? Let’s make it easy peasy.',
    sub: 'We build customized AI automations, chatbots and tools for Singapore SMEs — so your team spends time on customers, not copy-paste.',
  },
  stats: [
    { value: '40%', label: 'less time on manual admin (typical)' },
    { value: '2–4 wks', label: 'typical delivery time' },
    { value: 'SG-based', label: 'team — no offshore handoffs' },
  ],
  process: [
    { step: 1, title: 'Free AI Audit', desc: 'Tell us how you work today. We identify the highest-ROI automation opportunities. No sales pressure, ever.', time: 'within 48 hours' },
    { step: 2, title: 'Fixed-Scope Proposal', desc: 'You get a clear plan with a fixed price and timeline. You own everything we build.', time: '2–3 days' },
    { step: 3, title: 'Build', desc: 'We build and show you progress weekly. You test it on your real work before launch.', time: '2–6 weeks' },
    { step: 4, title: 'Launch & Support', desc: 'We deploy, train your team, and stay available for tweaks and support.', time: 'ongoing' },
  ],
  nav: [
    { href: '/services', label: 'Services' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/contact', label: 'Contact' },
  ],
}

export const waLink = (text = 'Hi EasyPeasy! I’d like a free AI audit for my business.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
```

- [ ] **Step 2: Write `content/services.js`**

```js
export const services = [
  {
    slug: 'ai-workflow-automation',
    name: 'AI Workflow Automation',
    short: 'Turn repetitive admin — invoices, quotes, reports, data entry — into automated workflows.',
    metaDescription: 'AI workflow automation for Singapore SMEs. Automate invoicing, reporting and data entry with customized AI workflows. Free audit, fixed-price delivery.',
    painPoints: [
      'Staff spend hours copying data between spreadsheets, emails and accounting software',
      'Month-end reporting takes days and is always late',
      'Quotes and invoices are typed by hand — with typos to match',
    ],
    deliverables: [
      'Automated document processing (invoices, POs, receipts) into your existing systems',
      'Scheduled reports that build and send themselves',
      'AI-assisted data entry and reconciliation with human review steps',
      'Integrations with the tools you already use — Excel, Google Sheets, Xero, and more',
    ],
    faqs: [
      { q: 'Do we need to change our existing software?', a: 'No. We automate around the tools you already use, adding AI where it saves the most time.' },
      { q: 'What if the AI makes a mistake?', a: 'We design human-review checkpoints for anything important — you approve, the AI does the typing.' },
    ],
  },
  {
    slug: 'ai-chatbots-whatsapp',
    name: 'AI Chatbots & WhatsApp Agents',
    short: 'Customer-service chatbots and WhatsApp agents that answer, qualify and book — 24/7.',
    metaDescription: 'Custom AI chatbots and WhatsApp agents for Singapore SMEs. Answer customers, take orders and qualify leads 24/7. Free audit, fixed-price delivery.',
    painPoints: [
      'Customers message at 10pm and get answered at 10am — some never come back',
      'Your team answers the same 20 questions every single day',
      'Leads from ads go cold because nobody follows up fast enough',
    ],
    deliverables: [
      'WhatsApp AI agents that answer FAQs, take bookings and orders instantly',
      'Website chatbots trained on your actual products, prices and policies',
      'Lead qualification flows that hand hot leads to your team with full context',
      'Human handover built in — the AI knows when to pass to a person',
    ],
    faqs: [
      { q: 'Will it sound robotic?', a: 'No — we train it on your tone, your products and your FAQs, and test it with real customer questions before launch.' },
      { q: 'Can it hand over to a human?', a: 'Yes. Handover rules are part of every build — the bot escalates anything it shouldn’t answer.' },
    ],
  },
  {
    slug: 'custom-ai-development',
    name: 'Custom AI Development',
    short: 'Bespoke AI tools built around your data — document Q&A, search, analysis and more.',
    metaDescription: 'Custom AI development for Singapore SMEs — private document Q&A, AI search and analysis tools built on your business data. Free audit, fixed-price delivery.',
    painPoints: [
      'Your company knowledge lives in 500 PDFs nobody can search',
      'Off-the-shelf AI tools don’t fit how your business actually works',
      'You want AI on your own data without sending it who-knows-where',
    ],
    deliverables: [
      'Private document Q&A — ask questions, get answers from your own files',
      'AI-powered search across your quotes, contracts and records',
      'Custom analysis tools tuned to your industry and workflows',
      'Deployment options that keep your data under your control',
    ],
    faqs: [
      { q: 'Is our data safe?', a: 'We design for PDPA from day one and can deploy so your data never leaves infrastructure you control.' },
      { q: 'Do we need our own IT team?', a: 'No. We build, deploy and maintain it — your team just uses it.' },
    ],
  },
  {
    slug: 'ai-consulting',
    name: 'AI Consulting',
    short: 'Not sure where AI fits? We map your processes and find the highest-ROI opportunities.',
    metaDescription: 'AI consulting for Singapore SMEs. Practical AI roadmaps, process mapping and team training — find where AI actually pays off in your business.',
    painPoints: [
      'Everyone says “use AI” but nobody says where it pays off in YOUR business',
      'You tried ChatGPT but it never stuck with the team',
      'You don’t want to buy tools before understanding the problem',
    ],
    deliverables: [
      'Process audit — where your team’s hours actually go',
      'Prioritized AI roadmap ranked by ROI and effort',
      'Tool recommendations with honest build-vs-buy advice',
      'Hands-on team training on the workflows that matter',
    ],
    faqs: [
      { q: 'What do we get at the end?', a: 'A written roadmap: the top automation opportunities in your business, ranked by ROI, with clear next steps and costs.' },
      { q: 'Do we have to build with you afterwards?', a: 'No. The roadmap is yours — build with us, in-house, or with anyone else.' },
    ],
  },
]
```

- [ ] **Step 3: Write `content/caseStudies.js`**

```js
// All entries are illustrative until real client results exist (spec requirement:
// illustrative entries MUST be labelled). Set illustrative: false only for real, approved case studies.
export const caseStudies = [
  {
    title: 'F&B distributor automates order entry',
    industry: 'F&B / Distribution',
    before: 'Orders arrived by WhatsApp and phone; two staff retyped them into the accounting system daily, with regular errors.',
    after: 'A WhatsApp AI agent reads incoming orders, confirms them with the customer, and enters them directly — staff only review exceptions.',
    impact: '~15 hours of manual entry saved per week',
    illustrative: true,
  },
  {
    title: 'Clinic chain answers patients 24/7',
    industry: 'Healthcare',
    before: 'Front desk answered the same booking and pricing questions all day; after-hours enquiries went unanswered until morning.',
    after: 'A chatbot trained on the clinic’s services answers instantly, books appointments, and escalates medical questions to staff.',
    impact: '70% of enquiries handled without staff involvement',
    illustrative: true,
  },
  {
    title: 'Professional services firm searches 10 years of documents',
    industry: 'Professional Services',
    before: 'Finding a precedent or past quote meant digging through shared drives for hours.',
    after: 'A private document Q&A tool answers questions from the firm’s own files — with sources cited.',
    impact: 'Research time cut from hours to minutes',
    illustrative: true,
  },
]
```

- [ ] **Step 4: Write `content/faq.js`**

```js
export const faqs = [
  { q: 'How much does a project cost?', a: 'Most projects range from S$3k to S$30k depending on scope. After your free audit you get a fixed-price quote — no hourly billing, no surprises.' },
  { q: 'How long does it take?', a: 'Most builds go live in 2–6 weeks. You’ll get a concrete timeline in your proposal, and weekly progress updates during the build.' },
  { q: 'Is our business data safe?', a: 'Yes. We design for PDPA compliance from day one, and can deploy solutions so your data stays within infrastructure you control.' },
  { q: 'Do we need technical staff to use what you build?', a: 'No. We build for non-technical teams, train your staff at launch, and stay available for support.' },
  { q: 'What happens after launch?', a: 'We include a support period with every build, and offer ongoing support plans if you want us on call.' },
  { q: 'Are government grants available?', a: 'Grant eligibility depends on your business and the project. Ask us during your free audit and we’ll point you in the right direction honestly.' },
]
```

- [ ] **Step 5: Verify modules load**

Run: `node -e "Promise.all([import('./content/site.js'),import('./content/services.js'),import('./content/caseStudies.js'),import('./content/faq.js')]).then(([a,b,c,d])=>console.log(a.site.name,b.services.length,c.caseStudies.length,d.faqs.length))"`
Expected: `EasyPeasy 4 3 6`

- [ ] **Step 6: Commit**

```bash
git add content/
git commit -m "feat: add site content modules (site, services, case studies, faq)"
```

---

### Task 3: Shared contact validation (TDD)

**Files:**
- Create: `lib/validateContact.js`
- Test: `tests/validateContact.test.js`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `validateContact(data) => { valid: boolean, errors: Record<string,string> }`
  - `SERVICES: string[]` — `['Workflow Automation', 'AI Chatbot', 'Custom AI', 'AI Consulting', 'Not sure']`
  - `BUDGETS: string[]` — `['Under S$5k', 'S$5k–15k', 'S$15k–50k', 'S$50k+', 'Not sure yet']`
  - Module MUST be isomorphic (no Node imports) — it runs in the browser (Task 10) and the API route (Task 5)

- [ ] **Step 1: Write the failing tests**

`tests/validateContact.test.js`:
```js
import { describe, it, expect } from 'vitest'
import { validateContact, SERVICES, BUDGETS } from '@/lib/validateContact'

const valid = {
  name: 'Tan Ah Kow',
  email: 'tan@acme.sg',
  phone: '+65 9123 4567',
  company: 'Acme Trading Pte Ltd',
  service: 'Workflow Automation',
  budget: 'Not sure yet',
  message: 'We want to automate invoice entry.',
}

describe('validateContact', () => {
  it('accepts a fully valid submission', () => {
    const r = validateContact(valid)
    expect(r.valid).toBe(true)
    expect(r.errors).toEqual({})
  })

  it('requires name, email, phone, company, message', () => {
    const r = validateContact({})
    expect(r.valid).toBe(false)
    expect(Object.keys(r.errors)).toEqual(
      expect.arrayContaining(['name', 'email', 'phone', 'company', 'message'])
    )
  })

  it('rejects whitespace-only required fields', () => {
    const r = validateContact({ ...valid, name: '   ' })
    expect(r.valid).toBe(false)
    expect(r.errors.name).toBeTruthy()
  })

  it('rejects malformed email', () => {
    const r = validateContact({ ...valid, email: 'not-an-email' })
    expect(r.valid).toBe(false)
    expect(r.errors.email).toBeTruthy()
  })

  it('allows service and budget to be omitted (defaults applied server-side)', () => {
    const { service, budget, ...rest } = valid
    expect(validateContact(rest).valid).toBe(true)
  })

  it('rejects service/budget values outside the allowed lists', () => {
    expect(validateContact({ ...valid, service: 'Blockchain' }).valid).toBe(false)
    expect(validateContact({ ...valid, budget: 'One million dollars' }).valid).toBe(false)
  })

  it('handles null/undefined input without throwing', () => {
    expect(validateContact(null).valid).toBe(false)
    expect(validateContact(undefined).valid).toBe(false)
  })

  it('exports the option lists used by the form', () => {
    expect(SERVICES).toContain('Not sure')
    expect(BUDGETS).toContain('Not sure yet')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module '@/lib/validateContact'` (or equivalent resolve error).

- [ ] **Step 3: Write the implementation**

`lib/validateContact.js`:
```js
// Isomorphic — used by both the ContactForm (browser) and the API route (server).
// No Node imports allowed in this file.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const SERVICES = ['Workflow Automation', 'AI Chatbot', 'Custom AI', 'AI Consulting', 'Not sure']
export const BUDGETS = ['Under S$5k', 'S$5k–15k', 'S$15k–50k', 'S$50k+', 'Not sure yet']

export function validateContact(data) {
  const d = data ?? {}
  const errors = {}

  if (!d.name?.trim()) errors.name = 'Name is required'
  if (!d.email?.trim()) errors.email = 'Email is required'
  else if (!EMAIL_RE.test(d.email.trim())) errors.email = 'Enter a valid email address'
  if (!d.phone?.trim()) errors.phone = 'Phone / WhatsApp number is required'
  if (!d.company?.trim()) errors.company = 'Company name is required'
  if (!d.message?.trim()) errors.message = 'Tell us a little about what you need'
  if (d.service && !SERVICES.includes(d.service)) errors.service = 'Choose a service from the list'
  if (d.budget && !BUDGETS.includes(d.budget)) errors.budget = 'Choose a budget range from the list'

  return { valid: Object.keys(errors).length === 0, errors }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — 8 tests in `tests/validateContact.test.js`.

- [ ] **Step 5: Commit**

```bash
git add lib/validateContact.js tests/validateContact.test.js
git commit -m "feat: add shared contact form validation (TDD)"
```

---

### Task 4: Persistence + rate limiting libs (TDD)

**Files:**
- Create: `lib/submissions.js`, `lib/rateLimit.js`
- Test: `tests/submissions.test.js`, `tests/rateLimit.test.js`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `saveSubmission(submission) => Promise<number>` — appends to JSON file at `process.env.SUBMISSIONS_FILE` (fallback `<cwd>/data/submissions.json`), creates file/dir on first use, returns new total count
  - `checkRateLimit(key, opts?, now?) => boolean` — `opts = { limit = 5, windowMs = 900000 }`; `now` injectable for tests
  - `resetRateLimit() => void` — clears state (for tests)

- [ ] **Step 1: Write the failing tests**

`tests/rateLimit.test.js`:
```js
import { describe, it, expect, beforeEach } from 'vitest'
import { checkRateLimit, resetRateLimit } from '@/lib/rateLimit'

describe('checkRateLimit', () => {
  beforeEach(() => resetRateLimit())

  it('allows up to the limit within the window', () => {
    for (let i = 0; i < 5; i++) expect(checkRateLimit('1.2.3.4')).toBe(true)
    expect(checkRateLimit('1.2.3.4')).toBe(false)
  })

  it('tracks keys independently', () => {
    for (let i = 0; i < 5; i++) checkRateLimit('1.2.3.4')
    expect(checkRateLimit('5.6.7.8')).toBe(true)
  })

  it('allows again after the window passes', () => {
    const t0 = 1_000_000
    for (let i = 0; i < 5; i++) checkRateLimit('1.2.3.4', {}, t0)
    expect(checkRateLimit('1.2.3.4', {}, t0 + 1)).toBe(false)
    expect(checkRateLimit('1.2.3.4', {}, t0 + 15 * 60 * 1000 + 1)).toBe(true)
  })
})
```

`tests/submissions.test.js`:
```js
import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'
import { saveSubmission } from '@/lib/submissions'

const tmpFile = path.join(os.tmpdir(), `easypeasy-test-${process.pid}`, 'submissions.json')

describe('saveSubmission', () => {
  beforeEach(async () => {
    process.env.SUBMISSIONS_FILE = tmpFile
    await fs.rm(path.dirname(tmpFile), { recursive: true, force: true })
  })
  afterAll(async () => {
    await fs.rm(path.dirname(tmpFile), { recursive: true, force: true })
    delete process.env.SUBMISSIONS_FILE
  })

  it('creates the file on first submission and appends after', async () => {
    expect(await saveSubmission({ name: 'A' })).toBe(1)
    expect(await saveSubmission({ name: 'B' })).toBe(2)
    const stored = JSON.parse(await fs.readFile(tmpFile, 'utf8'))
    expect(stored.map((s) => s.name)).toEqual(['A', 'B'])
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot resolve `@/lib/rateLimit` and `@/lib/submissions`. (validateContact tests still pass.)

- [ ] **Step 3: Write the implementations**

`lib/rateLimit.js`:
```js
// In-memory per-key rate limiter. State resets on server restart — acceptable for v1.
const hits = new Map()

export function checkRateLimit(key, { limit = 5, windowMs = 15 * 60 * 1000 } = {}, now = Date.now()) {
  const windowStart = now - windowMs
  const recent = (hits.get(key) || []).filter((t) => t > windowStart)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return false
  }
  recent.push(now)
  hits.set(key, recent)
  return true
}

export function resetRateLimit() {
  hits.clear()
}
```

`lib/submissions.js`:
```js
import { promises as fs } from 'fs'
import path from 'path'

// Append-only JSON file — no lead is ever lost. Path overridable for tests/deployment.
function filePath() {
  return process.env.SUBMISSIONS_FILE || path.join(process.cwd(), 'data', 'submissions.json')
}

export async function saveSubmission(submission) {
  const file = filePath()
  await fs.mkdir(path.dirname(file), { recursive: true })
  let existing = []
  try {
    existing = JSON.parse(await fs.readFile(file, 'utf8'))
  } catch {
    // first submission — file doesn't exist yet
  }
  existing.push(submission)
  await fs.writeFile(file, JSON.stringify(existing, null, 2))
  return existing.length
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all test files green (validateContact + rateLimit + submissions).

- [ ] **Step 5: Commit**

```bash
git add lib/rateLimit.js lib/submissions.js tests/rateLimit.test.js tests/submissions.test.js
git commit -m "feat: add submission persistence and rate limiting (TDD)"
```

---

### Task 5: Contact API route (TDD)

**Files:**
- Create: `app/api/contact/route.js`, `.env.example`
- Test: `tests/contactRoute.test.js`

**Interfaces:**
- Consumes: `validateContact` (Task 3), `saveSubmission`, `checkRateLimit`, `resetRateLimit` (Task 4)
- Produces: `POST /api/contact` accepting JSON `{ name, email, phone, company, service?, budget?, message, website? (honeypot), utm_source?, utm_medium?, utm_campaign? }`
  - 200 `{ ok: true }` on success (and on honeypot — bots see success, nothing stored)
  - 400 `{ ok: false, errors: {field: msg} }` on validation failure or bad JSON
  - 429 `{ ok: false, errors: { form } }` when rate-limited
  - 500 `{ ok: false, errors: { form } }` when persistence fails
  - Stored submission shape: `{ name, email, phone, company, service, budget, message, utm: {source, medium, campaign}, submittedAt }`

- [ ] **Step 1: Write the failing tests**

`tests/contactRoute.test.js`:
```js
import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'
import { POST } from '@/app/api/contact/route'
import { resetRateLimit } from '@/lib/rateLimit'

const tmpFile = path.join(os.tmpdir(), `easypeasy-route-test-${process.pid}`, 'submissions.json')

const validBody = {
  name: 'Tan Ah Kow',
  email: 'tan@acme.sg',
  phone: '+65 9123 4567',
  company: 'Acme Trading Pte Ltd',
  message: 'We want to automate invoice entry.',
  utm_source: 'google',
  utm_medium: 'cpc',
}

function makeRequest(body, ip = '1.2.3.4') {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(body),
  })
}

async function readStored() {
  try {
    return JSON.parse(await fs.readFile(tmpFile, 'utf8'))
  } catch {
    return []
  }
}

describe('POST /api/contact', () => {
  beforeEach(async () => {
    process.env.SUBMISSIONS_FILE = tmpFile
    resetRateLimit()
    await fs.rm(path.dirname(tmpFile), { recursive: true, force: true })
  })
  afterAll(async () => {
    await fs.rm(path.dirname(tmpFile), { recursive: true, force: true })
    delete process.env.SUBMISSIONS_FILE
  })

  it('stores a valid submission with defaults and UTM data', async () => {
    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    const stored = await readStored()
    expect(stored).toHaveLength(1)
    expect(stored[0].service).toBe('Not sure')
    expect(stored[0].budget).toBe('Not sure yet')
    expect(stored[0].utm).toEqual({ source: 'google', medium: 'cpc', campaign: null })
    expect(stored[0].submittedAt).toBeTruthy()
  })

  it('rejects invalid submissions with field errors and stores nothing', async () => {
    const res = await POST(makeRequest({ name: 'X' }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.ok).toBe(false)
    expect(body.errors.email).toBeTruthy()
    expect(await readStored()).toHaveLength(0)
  })

  it('returns fake success on honeypot and stores nothing', async () => {
    const res = await POST(makeRequest({ ...validBody, website: 'http://spam.example' }))
    expect(res.status).toBe(200)
    expect(await readStored()).toHaveLength(0)
  })

  it('rate limits the 6th submission from one IP', async () => {
    for (let i = 0; i < 5; i++) {
      expect((await POST(makeRequest(validBody, '9.9.9.9'))).status).toBe(200)
    }
    expect((await POST(makeRequest(validBody, '9.9.9.9'))).status).toBe(429)
  })

  it('returns 400 on malformed JSON', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: 'not json{{',
    })
    expect((await POST(req)).status).toBe(400)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot resolve `@/app/api/contact/route`.

- [ ] **Step 3: Write the route implementation**

`app/api/contact/route.js`:
```js
import { validateContact } from '@/lib/validateContact'
import { saveSubmission } from '@/lib/submissions'
import { checkRateLimit } from '@/lib/rateLimit'

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, errors: { form: 'Invalid request' } }, { status: 400 })
  }

  // Honeypot: real users never fill the hidden "website" field.
  // Return fake success so bots don't adapt; store nothing.
  if (body.website) return Response.json({ ok: true })

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (!checkRateLimit(ip)) {
    return Response.json(
      { ok: false, errors: { form: 'Too many submissions — please try again later, or WhatsApp us directly.' } },
      { status: 429 }
    )
  }

  const { valid, errors } = validateContact(body)
  if (!valid) return Response.json({ ok: false, errors }, { status: 400 })

  const submission = {
    name: body.name.trim(),
    email: body.email.trim(),
    phone: body.phone.trim(),
    company: body.company.trim(),
    service: body.service || 'Not sure',
    budget: body.budget || 'Not sure yet',
    message: body.message.trim(),
    utm: {
      source: body.utm_source || null,
      medium: body.utm_medium || null,
      campaign: body.utm_campaign || null,
    },
    submittedAt: new Date().toISOString(),
  }

  try {
    await saveSubmission(submission)
  } catch (err) {
    console.error('Failed to save submission:', err)
    return Response.json(
      { ok: false, errors: { form: 'Something went wrong on our side — please WhatsApp us instead.' } },
      { status: 500 }
    )
  }

  await sendNotificationEmail(submission)
  return Response.json({ ok: true })
}

// No-ops unless SMTP_HOST and NOTIFY_EMAIL are configured. Email failure never fails the lead.
async function sendNotificationEmail(submission) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL } = process.env
  if (!SMTP_HOST || !NOTIFY_EMAIL) return
  try {
    const nodemailer = (await import('nodemailer')).default
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    })
    await transporter.sendMail({
      from: SMTP_USER || 'noreply@easypeasy.local',
      to: NOTIFY_EMAIL,
      subject: `New enquiry: ${submission.name} (${submission.company})`,
      text: [
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Phone/WhatsApp: ${submission.phone}`,
        `Company: ${submission.company}`,
        `Service: ${submission.service}`,
        `Budget: ${submission.budget}`,
        `Message: ${submission.message}`,
        `UTM: ${JSON.stringify(submission.utm)}`,
        `At: ${submission.submittedAt}`,
      ].join('\n'),
    })
  } catch (err) {
    console.error('Email notification failed (lead was still saved):', err)
  }
}
```

- [ ] **Step 4: Write `.env.example`**

```
# Public site URL (used for canonical links, sitemap, OG tags)
NEXT_PUBLIC_SITE_URL=https://easypeasy.example.sg

# Google Analytics 4 — leave unset to disable analytics entirely
NEXT_PUBLIC_GA_ID=

# SMTP notification email for new leads — leave unset to disable (leads are always saved to file)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
NOTIFY_EMAIL=

# Where lead submissions are stored (default: ./data/submissions.json)
SUBMISSIONS_FILE=
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all 4 test files green.

- [ ] **Step 6: Commit**

```bash
git add app/api/contact/route.js tests/contactRoute.test.js .env.example
git commit -m "feat: add contact API route with honeypot, rate limit, persistence (TDD)"
```

---

### Task 6: Layout shell — Nav, Footer, Analytics, JSON-LD, root layout

**Files:**
- Create: `components/Nav.jsx`, `components/Footer.jsx`, `components/WhatsAppButton.jsx`, `components/Analytics.jsx`, `components/JsonLd.jsx`, `app/not-found.jsx`
- Modify: `app/layout.jsx` (replace placeholder)

**Interfaces:**
- Consumes: `site`, `waLink` from `content/site.js` (Task 2)
- Produces:
  - `<WhatsAppButton text?, label?, className?>` — styled wa.me anchor, reused by Hero/CtaBanner/ContactForm/Footer
  - `<JsonLd data={object}>` — renders `application/ld+json` script
  - `<Analytics />` — GA4 scripts, renders `null` when `NEXT_PUBLIC_GA_ID` unset
  - Root layout with `metadataBase`, title template `%s | EasyPeasy`, OG defaults, Organization JSON-LD

- [ ] **Step 1: Write `components/WhatsAppButton.jsx`**

```jsx
import { waLink } from '@/content/site'

export default function WhatsAppButton({ text, label = 'WhatsApp Us', className = '' }) {
  return (
    <a
      href={waLink(text)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-lg border border-emerald-600 px-5 py-3 font-semibold text-emerald-700 hover:bg-emerald-50 ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.66 15L2 22l5.16-1.32A10 10 0 1 0 12 2Zm5.46 14.06c-.23.65-1.35 1.24-1.86 1.28-.5.05-.97.24-3.27-.68-2.77-1.1-4.53-3.93-4.67-4.11-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.27.25-.28.55-.35.73-.35h.53c.17 0 .4-.06.62.48.23.55.78 1.9.85 2.04.07.14.11.3.02.48-.09.18-.13.29-.27.45-.14.16-.29.36-.41.48-.14.13-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.11.59-.07.16-.18.68-.79.86-1.06.18-.27.36-.23.6-.14.25.09 1.58.75 1.85.88.27.14.45.2.52.32.06.11.06.65-.16 1.27Z" />
      </svg>
      {label}
    </a>
  )
}
```

- [ ] **Step 2: Write `components/Nav.jsx`**

```jsx
import Link from 'next/link'
import { site } from '@/content/site'

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-slate-900">
          easy<span className="text-emerald-600">peasy</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Get Free AI Audit
        </Link>
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Write `components/Footer.jsx`**

```jsx
import Link from 'next/link'
import { site, waLink } from '@/content/site'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold text-slate-900">
            easy<span className="text-emerald-600">peasy</span>
          </p>
          <p className="mt-2 text-sm text-slate-600">{site.tagline}</p>
          <p className="mt-2 text-sm text-slate-500">{site.address}</p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Pages</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-slate-900">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Contact</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li><a href={`mailto:${site.email}`} className="hover:text-slate-900">{site.email}</a></li>
            <li><a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">WhatsApp us</a></li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            We respect your privacy. Details you share are used only to respond to your enquiry (PDPA).
          </p>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Write `components/Analytics.jsx` and `components/JsonLd.jsx`**

`components/Analytics.jsx`:
```jsx
import Script from 'next/script'

// Renders nothing unless NEXT_PUBLIC_GA_ID is set — site works fully without analytics.
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID
  if (!id) return null
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  )
}
```

`components/JsonLd.jsx`:
```jsx
export default function JsonLd({ data }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
```

- [ ] **Step 5: Replace `app/layout.jsx`**

```jsx
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'
import JsonLd from '@/components/JsonLd'
import { site } from '@/content/site'

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'EasyPeasy — Customized AI Solutions for Singapore SMEs',
    template: '%s | EasyPeasy',
  },
  description:
    'EasyPeasy builds customized AI automations, chatbots and tools for Singapore SMEs. Free AI audit, fixed-price delivery, Singapore-based team.',
  openGraph: {
    siteName: site.name,
    type: 'website',
    locale: 'en_SG',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  email: site.email,
  address: { '@type': 'PostalAddress', addressCountry: 'SG' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-800 antialiased">
        <JsonLd data={organizationJsonLd} />
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
```

- [ ] **Step 6: Write `app/not-found.jsx`**

```jsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-4xl font-extrabold text-slate-900">Page not found</h1>
      <p className="mt-4 text-slate-600">That page doesn’t exist — but your free AI audit does.</p>
      <Link
        href="/contact"
        className="mt-8 inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
      >
        Get Free AI Audit
      </Link>
    </div>
  )
}
```

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: `✓ Compiled successfully`; `/` and `/_not-found` listed as `○` (Static).

- [ ] **Step 8: Commit**

```bash
git add components/ app/layout.jsx app/not-found.jsx
git commit -m "feat: add layout shell (nav, footer, analytics, JSON-LD, 404)"
```

---

### Task 7: Home page with section components

**Files:**
- Create: `components/Hero.jsx`, `components/TrustBar.jsx`, `components/ServiceCard.jsx`, `components/ProcessSteps.jsx`, `components/CaseStudyCard.jsx`, `components/Faq.jsx`, `components/CtaBanner.jsx`
- Modify: `app/page.jsx` (replace placeholder)

**Interfaces:**
- Consumes: `site` (Task 2), `services`, `caseStudies`, `faqs` (Task 2), `WhatsAppButton`, `JsonLd` (Task 6)
- Produces (props contracts reused by Tasks 8–9):
  - `<ServiceCard service={service} />` — expects Task 2 service shape
  - `<ProcessSteps steps={site.process} />`
  - `<CaseStudyCard study={caseStudy} />` — renders "Illustrative example" badge when `study.illustrative`
  - `<Faq items={[{q,a}]} />` — `<details>`-based accordion
  - `<CtaBanner />` — reusable end-of-page CTA

- [ ] **Step 1: Write the section components**

`components/Hero.jsx`:
```jsx
import Link from 'next/link'
import WhatsAppButton from '@/components/WhatsAppButton'
import { site } from '@/content/site'

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-emerald-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          {site.hero.headline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">{site.hero.sub}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            Get Your Free AI Audit
          </Link>
          <WhatsAppButton />
        </div>
        <p className="mt-4 text-sm text-slate-500">Free audit within 48 hours. No sales pressure, ever.</p>
      </div>
    </section>
  )
}
```

`components/TrustBar.jsx`:
```jsx
import { site } from '@/content/site'

export default function TrustBar() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-center sm:grid-cols-3">
        {site.stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-extrabold text-emerald-600">{s.value}</p>
            <p className="mt-1 text-sm text-slate-600">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

`components/ServiceCard.jsx`:
```jsx
import Link from 'next/link'

export default function ServiceCard({ service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="block rounded-xl border border-slate-200 p-6 transition hover:border-emerald-400 hover:shadow-md"
    >
      <h3 className="text-lg font-bold text-slate-900">{service.name}</h3>
      <p className="mt-2 text-sm text-slate-600">{service.short}</p>
      <p className="mt-4 text-sm font-semibold text-emerald-700">Learn more →</p>
    </Link>
  )
}
```

`components/ProcessSteps.jsx`:
```jsx
export default function ProcessSteps({ steps }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s) => (
        <li key={s.step} className="rounded-xl border border-slate-200 p-6">
          <p className="text-sm font-bold text-emerald-600">Step {s.step}</p>
          <h3 className="mt-1 font-bold text-slate-900">{s.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">{s.time}</p>
        </li>
      ))}
    </ol>
  )
}
```

`components/CaseStudyCard.jsx`:
```jsx
export default function CaseStudyCard({ study }) {
  return (
    <article className="rounded-xl border border-slate-200 p-6">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{study.industry}</p>
        {study.illustrative && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
            Illustrative example
          </span>
        )}
      </div>
      <h3 className="mt-2 text-lg font-bold text-slate-900">{study.title}</h3>
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-semibold text-slate-500">Before</dt>
          <dd className="text-slate-600">{study.before}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">After</dt>
          <dd className="text-slate-600">{study.after}</dd>
        </div>
      </dl>
      <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800">
        {study.impact}
      </p>
    </article>
  )
}
```

`components/Faq.jsx`:
```jsx
export default function Faq({ items }) {
  return (
    <div className="divide-y divide-slate-200 rounded-xl border border-slate-200">
      {items.map((f) => (
        <details key={f.q} className="group p-5">
          <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:hidden">
            {f.q}
          </summary>
          <p className="mt-3 text-sm text-slate-600">{f.a}</p>
        </details>
      ))}
    </div>
  )
}
```

`components/CtaBanner.jsx`:
```jsx
import Link from 'next/link'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function CtaBanner() {
  return (
    <section className="bg-emerald-600">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-white">Ready to make work easy peasy?</h2>
        <p className="mx-auto mt-3 max-w-xl text-emerald-50">
          Get a free AI audit — we’ll show you exactly where AI saves your business time and money.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            Get Your Free AI Audit
          </Link>
          <WhatsAppButton className="!border-white !text-white hover:!bg-emerald-700" />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Replace `app/page.jsx` with the composed home page**

```jsx
import Link from 'next/link'
import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import ServiceCard from '@/components/ServiceCard'
import ProcessSteps from '@/components/ProcessSteps'
import CaseStudyCard from '@/components/CaseStudyCard'
import Faq from '@/components/Faq'
import CtaBanner from '@/components/CtaBanner'
import JsonLd from '@/components/JsonLd'
import { site } from '@/content/site'
import { services } from '@/content/services'
import { caseStudies } from '@/content/caseStudies'
import { faqs } from '@/content/faq'

export const metadata = {
  description:
    'Customized AI automations, chatbots and tools for Singapore SMEs. Free AI audit within 48 hours, fixed-price delivery in 2–6 weeks.',
  alternates: { canonical: '/' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <Hero />
      <TrustBar />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold text-slate-900">What we build for SMEs</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        <p className="mt-6 text-center">
          <Link href="/services" className="font-semibold text-emerald-700 hover:underline">
            See all services →
          </Link>
        </p>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-extrabold text-slate-900">How it works</h2>
          <div className="mt-10">
            <ProcessSteps steps={site.process} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold text-slate-900">Real problems, real results</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <CaseStudyCard key={c.title} study={c} />
          ))}
        </div>
        <p className="mt-6 text-center">
          <Link href="/case-studies" className="font-semibold text-emerald-700 hover:underline">
            More case studies →
          </Link>
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="text-center text-3xl font-extrabold text-slate-900">Common questions</h2>
        <div className="mt-10">
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
```

- [ ] **Step 3: Verify build and rendered content**

Run: `npm run build`
Expected: `✓ Compiled successfully`, `/` static.

Run: `npm run dev` (background), then `curl.exe -s http://localhost:3000/ | findstr /C:"easy peasy" /C:"Illustrative example" /C:"FAQPage"`
Expected: output contains the hero headline text, the illustrative badge, and the FAQPage JSON-LD. Stop the dev server after checking.

- [ ] **Step 4: Commit**

```bash
git add components/ app/page.jsx
git commit -m "feat: build home page with research-backed sections"
```

---

### Task 8: Services overview + per-service SEO landing pages

**Files:**
- Create: `app/services/page.jsx`, `app/services/[slug]/page.jsx`

**Interfaces:**
- Consumes: `services` (Task 2), `ServiceCard`, `ProcessSteps`, `Faq`, `CtaBanner`, `JsonLd` (Tasks 6–7), `site` (Task 2)
- Produces: routes `/services` and `/services/{slug}` for all 4 slugs; each service page links to `/contact?service={slug}` (Task 10 reads this param)

- [ ] **Step 1: Write `app/services/page.jsx`**

```jsx
import ServiceCard from '@/components/ServiceCard'
import CtaBanner from '@/components/CtaBanner'
import { services } from '@/content/services'

export const metadata = {
  title: 'AI Services for SMEs',
  description:
    'AI workflow automation, chatbots, custom AI development and consulting for Singapore SMEs. Fixed-price, delivered in weeks.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-center text-4xl font-extrabold text-slate-900">AI services built for SMEs</h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
          No jargon, no bloated enterprise projects — practical AI that pays for itself, delivered in weeks.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  )
}
```

- [ ] **Step 2: Write `app/services/[slug]/page.jsx`**

```jsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProcessSteps from '@/components/ProcessSteps'
import Faq from '@/components/Faq'
import CtaBanner from '@/components/CtaBanner'
import JsonLd from '@/components/JsonLd'
import { services } from '@/content/services'
import { site } from '@/content/site'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) return {}
  return {
    title: service.name,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  }
}

export default function ServicePage({ params }) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) notFound()

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.short,
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    areaServed: 'SG',
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900">{service.name}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{service.short}</p>
          <Link
            href={`/contact?service=${service.slug}`}
            className="mt-8 inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            Get Your Free AI Audit
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-extrabold text-slate-900">Sound familiar?</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {service.painPoints.map((p) => (
            <li key={p} className="rounded-xl border border-slate-200 p-5 text-sm text-slate-600">
              “{p}”
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-extrabold text-slate-900">What we build</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {service.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-3 rounded-xl bg-white p-5 text-sm text-slate-700">
                <span className="mt-0.5 font-bold text-emerald-600" aria-hidden="true">✓</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-extrabold text-slate-900">How it works</h2>
        <div className="mt-6">
          <ProcessSteps steps={site.process} />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="text-2xl font-extrabold text-slate-900">Questions about {service.name.toLowerCase()}</h2>
        <div className="mt-6">
          <Faq items={service.faqs} />
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
```

- [ ] **Step 3: Verify build generates all service pages**

Run: `npm run build`
Expected: route table lists `/services` and `● /services/[slug]` with 4 static paths (`/services/ai-workflow-automation`, `/services/ai-chatbots-whatsapp`, `/services/custom-ai-development`, `/services/ai-consulting`) — all prerendered (SSG).

- [ ] **Step 4: Commit**

```bash
git add app/services/
git commit -m "feat: add services overview and 4 per-service SEO landing pages"
```

---

### Task 9: Case studies page

**Files:**
- Create: `app/case-studies/page.jsx`

**Interfaces:**
- Consumes: `caseStudies` (Task 2), `CaseStudyCard` (Task 7), `CtaBanner` (Task 7)
- Produces: route `/case-studies`

- [ ] **Step 1: Write `app/case-studies/page.jsx`**

```jsx
import CaseStudyCard from '@/components/CaseStudyCard'
import CtaBanner from '@/components/CtaBanner'
import { caseStudies } from '@/content/caseStudies'

export const metadata = {
  title: 'Case Studies',
  description:
    'How SMEs use customized AI to cut manual work — before/after examples with real impact metrics.',
  alternates: { canonical: '/case-studies' },
}

export default function CaseStudiesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-center text-4xl font-extrabold text-slate-900">Before &amp; after</h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
          The pattern is always the same: hours of manual work → an AI workflow that just handles it.
        </p>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <CaseStudyCard key={c.title} study={c} />
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: `✓ Compiled successfully`; `/case-studies` listed as `○` (Static).

- [ ] **Step 3: Commit**

```bash
git add app/case-studies/
git commit -m "feat: add case studies page"
```

---

### Task 10: Contact page + ContactForm client component

**Files:**
- Create: `app/contact/page.jsx`, `components/ContactForm.jsx`

**Interfaces:**
- Consumes: `validateContact`, `SERVICES`, `BUDGETS` (Task 3), `POST /api/contact` (Task 5), `site`, `waLink` (Task 2), `WhatsAppButton` (Task 6)
- Produces: route `/contact`; reads `?service={slug}` (maps slug → dropdown value) and `utm_*` params from `window.location.search` in `useEffect` (page stays fully static)

- [ ] **Step 1: Write `components/ContactForm.jsx`**

```jsx
'use client'

import { useEffect, useState } from 'react'
import { validateContact, SERVICES, BUDGETS } from '@/lib/validateContact'
import { waLink } from '@/content/site'

// Maps /services/[slug] links (?service=slug) to dropdown values
const SLUG_TO_SERVICE = {
  'ai-workflow-automation': 'Workflow Automation',
  'ai-chatbots-whatsapp': 'AI Chatbot',
  'custom-ai-development': 'Custom AI',
  'ai-consulting': 'AI Consulting',
}

const initialFields = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: 'Not sure',
  budget: 'Not sure yet',
  message: '',
  website: '', // honeypot — hidden from real users
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
}

export default function ContactForm() {
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  // Read service pre-select + UTM params from the URL on mount (keeps page static)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setFields((f) => ({
      ...f,
      service: SLUG_TO_SERVICE[params.get('service')] || f.service,
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
    }))
  }, [])

  function set(name) {
    return (e) => setFields((f) => ({ ...f, [name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const { valid, errors: fieldErrors } = validateContact(fields)
    setErrors(fieldErrors)
    if (!valid) return

    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(fields),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setStatus('success')
        window.gtag?.('event', 'generate_lead', { service: fields.service })
      } else {
        setErrors(data.errors || {})
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <h2 className="text-2xl font-bold text-emerald-800">Thanks — we’ve got it! 🎉</h2>
        <p className="mt-2 text-emerald-700">
          We’ll get back to you within 24 hours, usually much faster.
        </p>
      </div>
    )
  }

  const inputCls =
    'mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none'
  const labelCls = 'block text-sm font-semibold text-slate-700'
  const errCls = 'mt-1 text-xs text-red-600'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>Name *</label>
          <input id="name" value={fields.name} onChange={set('name')} className={inputCls} />
          {errors.name && <p className={errCls}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>Email *</label>
          <input id="email" type="email" value={fields.email} onChange={set('email')} className={inputCls} />
          {errors.email && <p className={errCls}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>Phone / WhatsApp *</label>
          <input id="phone" value={fields.phone} onChange={set('phone')} className={inputCls} />
          {errors.phone && <p className={errCls}>{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="company" className={labelCls}>Company *</label>
          <input id="company" value={fields.company} onChange={set('company')} className={inputCls} />
          {errors.company && <p className={errCls}>{errors.company}</p>}
        </div>
        <div>
          <label htmlFor="service" className={labelCls}>What do you need?</label>
          <select id="service" value={fields.service} onChange={set('service')} className={inputCls}>
            {SERVICES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelCls}>Estimated budget</label>
          <select id="budget" value={fields.budget} onChange={set('budget')} className={inputCls}>
            {BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className={labelCls}>Tell us about your business & what you’d like to improve *</label>
        <textarea id="message" rows={5} value={fields.message} onChange={set('message')} className={inputCls} />
        {errors.message && <p className={errCls}>{errors.message}</p>}
      </div>

      {/* Honeypot — hidden from humans, bots fill it */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={set('website')} />
      </div>

      {status === 'error' && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errors.form || 'Something went wrong sending your message.'}{' '}
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
            WhatsApp us instead →
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? 'Sending…' : 'Send — get your free audit'}
      </button>
    </form>
  )
}
```

- [ ] **Step 2: Write `app/contact/page.jsx`**

```jsx
import ContactForm from '@/components/ContactForm'
import WhatsAppButton from '@/components/WhatsAppButton'
import { site } from '@/content/site'

export const metadata = {
  title: 'Contact — Free AI Audit',
  description:
    'Get a free AI audit for your SME. Tell us how you work today and we’ll show you where AI saves time and money. Reply within 24 hours.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-extrabold text-slate-900">Get your free AI audit</h1>
      <p className="mt-4 text-slate-600">
        Tell us a little about your business — we’ll reply with the highest-ROI automation opportunities
        we see. {site.responsePromise}
      </p>
      <div className="mt-6">
        <WhatsAppButton label="Prefer WhatsApp? Chat with us" />
      </div>
      <div className="mt-10">
        <ContactForm />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Run the full test suite (regression)**

Run: `npm test`
Expected: PASS — all 4 test files green (form reuses already-tested validation; no new unit tests per spec's light-testing scope).

- [ ] **Step 4: End-to-end check via dev server**

Run: `npm run dev` (background), then:
`curl.exe -s -X POST http://localhost:3000/api/contact -H "content-type: application/json" -d "{\"name\":\"Tan\",\"email\":\"tan@acme.sg\",\"phone\":\"91234567\",\"company\":\"Acme\",\"message\":\"Automate invoices\"}"`
Expected: `{"ok":true}` and a new entry in `data/submissions.json`.

Also load `http://localhost:3000/contact?service=ai-chatbots-whatsapp` in a browser: the service dropdown shows "AI Chatbot" pre-selected. Stop the dev server after checking.

- [ ] **Step 5: Commit**

```bash
git add app/contact/ components/ContactForm.jsx
git commit -m "feat: add contact page with validated form, UTM capture, service pre-select"
```

---

### Task 11: SEO infrastructure, README, final verification

**Files:**
- Create: `app/sitemap.js`, `app/robots.js`, `README.md`

**Interfaces:**
- Consumes: `site` (Task 2), `services` (Task 2)
- Produces: `/sitemap.xml` and `/robots.txt` routes; project README

- [ ] **Step 1: Write `app/sitemap.js`**

```js
import { site } from '@/content/site'
import { services } from '@/content/services'

export default function sitemap() {
  const now = new Date()
  const staticRoutes = ['', '/services', '/case-studies', '/contact'].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
  }))
  const serviceRoutes = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: now,
  }))
  return [...staticRoutes, ...serviceRoutes]
}
```

- [ ] **Step 2: Write `app/robots.js`**

```js
import { site } from '@/content/site'

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
  }
}
```

- [ ] **Step 3: Write `README.md`**

```markdown
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
```

- [ ] **Step 4: Full verification — tests + build + SEO routes**

Run: `npm test`
Expected: PASS — all test files green.

Run: `npm run build`
Expected: `✓ Compiled successfully`; route table includes `/`, `/services`, 4× `/services/[slug]` paths, `/case-studies`, `/contact`, `/sitemap.xml`, `/robots.txt`; all pages static; `ƒ /api/contact` (dynamic — expected, it's the API).

Run: `npm run dev` (background), then `curl.exe -s http://localhost:3000/sitemap.xml` and `curl.exe -s http://localhost:3000/robots.txt`
Expected: sitemap XML listing 8 URLs; robots.txt with `Allow: /` and the sitemap reference. Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add app/sitemap.js app/robots.js README.md
git commit -m "feat: add sitemap, robots.txt and README"
```

---

## Spec Coverage Checklist (self-review)

- Page map: Home (T7), /services (T8), /services/[slug] ×4 (T8), /case-studies (T9), /contact (T10), POST /api/contact (T5) ✓
- Contact form fields incl. honeypot + UTM (T3, T5, T10) ✓
- Persistence to JSON file + optional SMTP (T4, T5) ✓
- Rate limit + honeypot (T4, T5) ✓
- SEO: per-page metadata (T6–T10), sitemap/robots (T11), OG defaults (T6), JSON-LD Organization/Service/FAQPage (T6–T8), SSG all pages (verified T11) ✓
- Marketing: GA4 env-gated (T6), conversion event (T10), UTM capture (T10), WhatsApp CTAs (T6–T7), copy in content/ (T2) ✓
- Error handling: client inline errors + submit states (T10), server 400/429/500 (T5), 404 page (T6) ✓
- Testing: validation unit tests (T3), API route tests (T5) — matches spec's light scope ✓
- Constraints: no grant claims (content has honest grant FAQ only), illustrative labels on case studies (T2, T7), placeholders centralized (T2) ✓
