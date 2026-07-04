'use client'

import Link from 'next/link'
import ProcessSteps from '@/components/ProcessSteps'
import Faq from '@/components/Faq'
import CtaBanner from '@/components/CtaBanner'
import Reveal from '@/components/Reveal'
import { site } from '@/content/site'
import { useLocale, useT, usePick } from '@/components/LanguageProvider'

// Client body of /services/[slug]. The page (a server component) owns metadata,
// JSON-LD and notFound in English; this renders the locale-aware content.
export default function ServiceDetail({ service }) {
  const { locale } = useLocale()
  const t = useT()
  const p = usePick()

  const name = p(service.name)
  // English titles read better lowercased ("Questions about ai consulting");
  // Chinese has no case, so leave it as-is.
  const faqName = locale === 'en' ? name.toLowerCase() : name

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink">
        <div aria-hidden="true" className="grid-overlay" />
        <div aria-hidden="true" className="aurora" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:py-24">
          <p className="animate-fade-up font-mono text-xs uppercase tracking-[0.2em] text-glow">{t('eyebrow.services')}</p>
          <h1 className="animate-fade-up animate-delay-1 mx-auto mt-4 max-w-3xl font-display text-4xl font-bold text-white sm:text-5xl">
            {name}
          </h1>
          <p className="animate-fade-up animate-delay-2 mx-auto mt-5 max-w-2xl text-lg text-slate-300">
            {p(service.short)}
          </p>
          <div className="animate-fade-up animate-delay-3 mt-9">
            <Link
              href={`/contact?service=${service.slug}`}
              className="inline-block rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {t('common.getYourFreeAudit')}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">{t('eyebrow.painPoints')}</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">{t('serviceDetail.painHeading')}</h2>
          </Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {service.painPoints.map((point, i) => (
              <Reveal key={i} delay={i * 80} className="h-full">
                <li className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg">
                  <span aria-hidden="true" className="font-mono text-3xl leading-none text-accent/40">
                    &ldquo;
                  </span>
                  <p className="mt-2 text-sm text-slate-700">{p(point)}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">{t('eyebrow.deliverables')}</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">{t('serviceDetail.deliverablesHeading')}</h2>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {service.deliverables.map((deliverable, i) => (
              <Reveal key={i} delay={i * 60} className="h-full">
                <li className="flex h-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-glow"
                  >
                    ✓
                  </span>
                  <span className="text-sm text-slate-700">{p(deliverable)}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">{t('eyebrow.howItWorks')}</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">{t('home.howItWorks')}</h2>
          </Reveal>
          <div className="mt-12">
            <ProcessSteps steps={site.process} />
          </div>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">{t('eyebrow.faq')}</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              {t('serviceDetail.faqHeading', { name: faqName })}
            </h2>
          </Reveal>
          <div className="mt-12">
            <Faq items={service.faqs} />
          </div>
        </div>
      </section>

      <Reveal>
        <CtaBanner />
      </Reveal>
    </>
  )
}
