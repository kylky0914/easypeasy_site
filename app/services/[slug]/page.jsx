import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProcessSteps from '@/components/ProcessSteps'
import Faq from '@/components/Faq'
import CtaBanner from '@/components/CtaBanner'
import JsonLd from '@/components/JsonLd'
import Reveal from '@/components/Reveal'
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

      <section className="relative isolate overflow-hidden bg-ink">
        <div aria-hidden="true" className="grid-overlay" />
        <div aria-hidden="true" className="aurora" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:py-24">
          <p className="animate-fade-up font-mono text-xs uppercase tracking-[0.2em] text-glow">// Services</p>
          <h1 className="animate-fade-up animate-delay-1 mx-auto mt-4 max-w-3xl font-display text-4xl font-bold text-white sm:text-5xl">
            {service.name}
          </h1>
          <p className="animate-fade-up animate-delay-2 mx-auto mt-5 max-w-2xl text-lg text-slate-300">
            {service.short}
          </p>
          <div className="animate-fade-up animate-delay-3 mt-9">
            <Link
              href={`/contact?service=${service.slug}`}
              className="inline-block rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Get Your Free AI Audit
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">// Pain points</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">Sound familiar?</h2>
          </Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {service.painPoints.map((p, i) => (
              <Reveal key={p} delay={i * 80} className="h-full">
                <li className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg">
                  <span aria-hidden="true" className="font-mono text-3xl leading-none text-accent/40">
                    &ldquo;
                  </span>
                  <p className="mt-2 text-sm text-slate-700">{p}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">// Deliverables</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">What we build</h2>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {service.deliverables.map((d, i) => (
              <Reveal key={d} delay={i * 60} className="h-full">
                <li className="flex h-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-glow"
                  >
                    ✓
                  </span>
                  <span className="text-sm text-slate-700">{d}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">// How it works</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">How it works</h2>
          </Reveal>
          <div className="mt-12">
            <ProcessSteps steps={site.process} />
          </div>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">// FAQ</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Questions about {service.name.toLowerCase()}
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
