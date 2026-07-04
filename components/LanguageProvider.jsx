'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_LOCALE, HTML_LANG, STORAGE_KEY, isLocale, pick, translate } from '@/lib/i18n'
import { ui } from '@/content/ui'

const LanguageContext = createContext({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
})

export function LanguageProvider({ children }) {
  // Always render DEFAULT_LOCALE on the server + first client paint so hydration
  // matches; then adopt any stored preference on mount.
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (isLocale(stored)) setLocaleState(stored)
    } catch {
      /* localStorage unavailable — stay on default */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale] || HTML_LANG[DEFAULT_LOCALE]
  }, [locale])

  const setLocale = useCallback((next) => {
    if (!isLocale(next)) return
    setLocaleState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore persistence failure */
    }
  }, [])

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// Full context: { locale, setLocale }.
export function useLocale() {
  return useContext(LanguageContext)
}

// Returns a `t(path, vars?)` bound to the active locale + the ui dictionary.
export function useT() {
  const { locale } = useContext(LanguageContext)
  return useCallback((path, vars) => translate(ui, path, locale, vars), [locale])
}

// Returns a `p(value)` that picks a bilingual content field for the active locale.
export function usePick() {
  const { locale } = useContext(LanguageContext)
  return useCallback((value) => pick(value, locale), [locale])
}
