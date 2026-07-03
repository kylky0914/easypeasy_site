import Link from 'next/link'
import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import ServiceCard from '@/components/ServiceCard'
import ProcessSteps from '@/components/ProcessSteps'
import CaseStudyCard from '@/components/CaseStudyCard'
import Faq from '@/components/Faq'
import CtaBanner from '@/components/CtaBanner'
import JsonLd from '@/components/JsonLd'
import Reveal from '@/components/Reveal'
import { site } from '@/content/site'
import { services } from '@/content/services'
import { caseStudies } from '@/content/caseStudies'
import { faqs } from '@/content/faq'

export const metadata = {
  description:
    'Customized AI automations, chatbots and tools for Singapore SMEs. Free AI audit within 48 hours, fixed-price delivery in 2–6 weeks.',
  alternates: { canonical: '/' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <Hero />
      <TrustBar />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">// Services</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              What we build for SMEs
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link
              href="/services"
              className="font-semibold text-accent-deep transition-colors duration-200 hover:text-accent"
            >
              See all services →
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-paper py-20">
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

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">// Case studies</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Real problems, real results
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <CaseStudyCard study={c} />
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link
              href="/case-studies"
              className="font-semibold text-accent-deep transition-colors duration-200 hover:text-accent"
            >
              More case studies →
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">// FAQ</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">Common questions</h2>
          </Reveal>
          <div className="mt-12">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <Reveal>
        <CtaBanner />
      </Reveal>
    </>
  )
}
