import ServiceCard from '@/components/ServiceCard'
import CtaBanner from '@/components/CtaBanner'
import Reveal from '@/components/Reveal'
import T from '@/components/T'
import { services } from '@/content/services'

export const metadata = {
  title: 'AI Services for SMEs',
  description:
    'AI workflow automation, chatbots, custom AI development and consulting for Singapore SMEs. Fixed-price, delivered in weeks.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep"><T path="eyebrow.services" /></p>
            <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-bold text-slate-900 sm:text-5xl">
              <T path="services.pageTitle" />
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-700">
              <T path="services.pageIntro" />
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <ServiceCard service={s} />
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
