// Isomorphic i18n helpers — no React, no Node imports. Used by the client
// LanguageProvider and by server components/JSON-LD (which pass locale 'en').

export const LOCALES = ['en', 'zh']
export const DEFAULT_LOCALE = 'en'
export const STORAGE_KEY = 'ep-locale'

// The lang attribute we put on <html> for each locale.
export const HTML_LANG = { en: 'en', zh: 'zh-Hans' }

export function isLocale(v) {
  return typeof v === 'string' && LOCALES.includes(v)
}

// A "bilingual value" is a plain object carrying an `en` (and usually `zh`) string.
function isBilingual(v) {
  return (
    v != null &&
    typeof v === 'object' &&
    !Array.isArray(v) &&
    ('en' in v || 'zh' in v)
  )
}

// Resolve a single content field to a string for `locale`. Bilingual objects fall
// back to English when the locale is missing; plain strings pass through unchanged
// (so partially-translated content never crashes a render).
export function pick(value, locale = DEFAULT_LOCALE) {
  if (isBilingual(value)) return value[locale] ?? value.en ?? ''
  return value
}

// Walk a dot-path ("form.errors.emailInvalid") into the dictionary for `locale`,
// falling back to English, then to the raw path (so a missing key is visible, not blank).
export function translate(dict, path, locale = DEFAULT_LOCALE, vars) {
  const fromLocale = lookup(dict[locale], path)
  const value = fromLocale != null ? fromLocale : lookup(dict[DEFAULT_LOCALE], path)
  if (value == null) return path
  return vars ? interpolate(value, vars) : value
}

function lookup(tree, path) {
  return path.split('.').reduce((node, key) => (node == null ? undefined : node[key]), tree)
}

function interpolate(template, vars) {
  return String(template).replace(/\{(\w+)\}/g, (match, key) =>
    key in vars ? String(vars[key]) : match
  )
}
