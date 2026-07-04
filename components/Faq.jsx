'use client'

import { usePick } from '@/components/LanguageProvider'

export default function Faq({ items }) {
  const p = usePick()

  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {items.map((f) => (
        <details key={f.q.en} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 marker:hidden transition-colors duration-200 group-hover:text-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
            {p(f.q)}
            <span
              aria-hidden="true"
              className="shrink-0 text-accent-deep transition-transform duration-200 group-open:rotate-180"
            >
              ▾
            </span>
          </summary>
          <p className="mt-3 text-sm text-slate-700">{p(f.a)}</p>
        </details>
      ))}
    </div>
  )
}
