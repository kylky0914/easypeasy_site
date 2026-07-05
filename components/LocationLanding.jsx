import Link from 'next/link'
import CtaBanner from '@/components/CtaBanner'
import Reveal from '@/components/Reveal'
import ServiceCard from '@/components/ServiceCard'
import { services } from '@/content/services'

const countryCopy = {
  sg: {
    country: 'Singapore',
    headline: 'AI automation for Singapore SMEs',
    sub:
      'EPL AI builds practical workflows, WhatsApp agents, and custom AI tools for Singapore businesses that want less manual admin and faster lead response.',
    points: [
      'PDPA-aware automation for customer data and internal workflows',
      'WhatsApp and website agents for service businesses',
      'Fixed-scope builds with clear delivery timelines',
    ],
    canonical: '/sg',
  },
  my: {
    country: 'Malaysia',
    headline: 'AI automation for Malaysia SMEs',
    sub:
      'EPL AI helps Malaysia SMEs automate repetitive operations, qualify enquiries, and build AI tools around existing spreadsheets, documents, and chat workflows.',
    points: [
      'Automation for sales, support, admin, and reporting workflows',
      'WhatsApp-first AI agents for customer enquiries',
      'Practical builds for SMEs expanding across Singapore and Malaysia',
    ],
    canonical: '/my',
  },
}

export function locationMetadata(key) {
  const copy = countryCopy[key]
  return {
    title: `EPL AI ${copy.country} | AI Automation for SMEs`,
    description: `${copy.headline}. Workflow automation, WhatsApp chatbots, and custom AI tools delivered by EPL AI by EasyPeasy Labs.`,
    alternates: { canonical: copy.canonical },
  }
}

export default function LocationLanding({ market }) {
  const copy = countryCopy[market]

  return (
    <>
      <section className="bg-ink py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-glow">// {copy.country}</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {copy.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">{copy.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Get Free AI Audit
              </Link>
              <Link
                href="/services"
                className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                View Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          {copy.points.map((point) => (
            <Reveal key={point} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="font-semibold text-slate-900">{point}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">// Services</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              What EPL AI builds for {copy.country}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 80}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reveal>
        <CtaBanner />
      </Reveal>
    </>
  )
}
