# Bilingual (English / 简体中文) language toggle — design

**Date:** 2026-07-03
**Status:** Approved (decisions confirmed with owner)

## Goal

Let visitors switch the whole site between **English** and **Simplified Chinese**
via a small "tech pattern" toggle button, with no page reload.

## Decisions (confirmed)

1. **Scope:** Everything a visitor reads on the page is translated — nav, buttons,
   headings, hero, services, case studies, FAQ, contact form (labels, options,
   validation messages).
2. **Mechanism:** Client-side. React context + `localStorage`, one toggle swaps text
   instantly. No `/zh` URLs, no page reload.
3. **Toggle UI:** An `EN / 中` segmented pill in the nav (mono font, bordered, active
   segment filled with the brand accent + glow), defaults to English, remembers choice.

## Accepted tradeoff

Because switching is client-side, **`<head>` metadata (title/description) and JSON-LD
stay English** and there are no separately-indexed Chinese URLs. This is the known cost
of the "simple, no reload" approach. Everything rendered in the page body switches.

## Architecture

### Translation data model — inline bilingual values

Two kinds of text, two mechanisms:

- **Content data** (`content/site.js`, `services.js`, `caseStudies.js`, `faq.js`):
  each *display* string becomes a bilingual object `{ en, zh }`. Structural fields
  (`slug`, `href`, `illustrative`, `whatsapp`, `metaDescription`) stay plain — meta is
  English-only, slugs are canonical.
- **Static UI chrome** (`content/ui.js`): one dictionary shaped `{ en: {...}, zh: {...} }`,
  looked up by dot-path key. Covers nav labels, section headings/eyebrows, buttons,
  footer, and all contact-form text (labels, option labels, validation messages).

`lib/i18n.js` exposes `pick(value, locale)` → returns `value[locale] ?? value.en` for a
bilingual object, or the value unchanged if it's already a plain string (safe fallback),
and `translate(dict, path, locale, vars)` for dictionary lookups with `{name}` interpolation.

### Runtime

- `components/LanguageProvider.jsx` (`'use client'`) — context `{ locale, setLocale }`,
  persisted to `localStorage['ep-locale']`, read after mount (server always renders `en`;
  client re-renders if a stored `zh` is found), and syncs `document.documentElement.lang`.
  Mounted once in `app/layout.jsx` wrapping Nav/main/Footer.
- `useLocale()` + `useT()` hooks; `<T path="..."/>` client component for inline lookups
  inside otherwise-server pages.
- `components/LanguageToggle.jsx` (`'use client'`) — the EN / 中 pill, placed in Nav.

### Components

Pages stay **server components** (they own `metadata`, JSON-LD, `generateStaticParams`,
`notFound`). They pass bilingual content down and use `<T>` for inline headings. Leaf
presentational components become `'use client'` and pick locale themselves: Nav, Footer,
Hero, TrustBar, ProcessSteps, ServiceCard, CaseStudyCard, Faq, CtaBanner, WhatsAppButton,
AgentConsole. The service-detail page body is extracted into a `ServiceDetail` client
component (page keeps SEO/JSON-LD in English). `ContactForm` is already client.

### Contact form validation

`validateContact` returns **error codes** per field (e.g. `emailInvalid`) instead of
English strings — the isomorphic contract stays pure and the client maps codes to
localized text via the `ui` dictionary. The API route returns form-level codes
(`rateLimit`, `saveError`, `invalid`). Canonical `SERVICES`/`BUDGETS` values are
unchanged (stored/validated in English); only their displayed labels are localized.

## Testing

- Unit: `pick()` (bilingual object, plain-string passthrough, missing-locale fallback).
- Unit: `ui` dictionary parity — every key present under `en` exists under `zh` and vice
  versa (catches missing translations).
- Existing `validateContact` tests assert truthiness/keys, not message strings, so the
  code-based errors keep them green.
- `next build` must pass.
