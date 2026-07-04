'use client'

import { LOCALES } from '@/lib/i18n'
import { useLocale } from '@/components/LanguageProvider'

const LABELS = { en: 'EN', zh: '中' }

// Tech-pattern segmented pill (mono font, bordered, active segment filled with the
// brand accent + glow). Styled for the dark nav; pass className to restyle elsewhere.
export default function LanguageToggle({ className = '' }) {
  const { locale, setLocale } = useLocale()

  return (
    <div
      role="group"
      aria-label="Language / 语言"
      className={`inline-flex items-center rounded-lg border border-white/15 bg-white/5 p-0.5 font-mono text-xs leading-none ${className}`}
    >
      {LOCALES.map((code) => {
        const active = locale === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={`rounded-md px-2.5 py-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-ink ${
              active
                ? 'bg-accent text-white shadow-[0_0_16px_-4px_rgba(109,94,243,0.85)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {LABELS[code]}
          </button>
        )
      })}
    </div>
  )
}
