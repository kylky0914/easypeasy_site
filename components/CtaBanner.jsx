'use client'

import Link from 'next/link'
import WhatsAppButton from '@/components/WhatsAppButton'
import { useT } from '@/components/LanguageProvider'

export default function CtaBanner() {
  const t = useT()

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div aria-hidden="true" className="grid-overlay" />
      <div aria-hidden="true" className="aurora" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{t('cta.heading')}</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-300">
          {t('cta.body')}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            {t('common.getYourFreeAudit')}
          </Link>
          <WhatsAppButton />
        </div>
      </div>
    </section>
  )
}
