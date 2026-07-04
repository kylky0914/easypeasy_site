'use client'

import Link from 'next/link'
import { useT, usePick } from '@/components/LanguageProvider'

export default function ServiceCard({ service }) {
  const t = useT()
  const p = usePick()

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      <h3 className="font-display text-lg font-bold text-slate-900">{p(service.name)}</h3>
      <p className="mt-2 text-sm text-slate-700">{p(service.short)}</p>
      <p className="mt-4 text-sm font-semibold text-accent-deep">
        {t('common.learnMore')}
        <span aria-hidden="true" className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </p>
    </Link>
  )
}
