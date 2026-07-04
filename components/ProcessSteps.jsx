'use client'

import { useT, usePick } from '@/components/LanguageProvider'

export default function ProcessSteps({ steps }) {
  const t = useT()
  const p = usePick()

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-8 hidden h-px bg-gradient-to-r from-accent/0 via-accent/40 to-glow/40 lg:block"
      />
      <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <li
            key={s.step}
            className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg"
          >
            <p className="font-mono text-sm font-bold text-accent-deep">{t('common.step')} {s.step}</p>
            <h3 className="mt-1 font-display font-bold text-slate-900">{p(s.title)}</h3>
            <p className="mt-2 text-sm text-slate-700">{p(s.desc)}</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-wide text-slate-500">{p(s.time)}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
