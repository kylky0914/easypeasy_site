import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import ServiceDetail from '@/components/ServiceDetail'
import { services } from '@/content/services'
import { site } from '@/content/site'
import { pick } from '@/lib/i18n'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) return {}
  return {
    title: pick(service.name, 'en'),
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  }
}

export default function ServicePage({ params }) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) notFound()

  // JSON-LD stays English (client-side language switching can't rewrite <head>).
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: pick(service.name, 'en'),
    description: pick(service.short, 'en'),
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    areaServed: 'SG',
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((f) => ({
      '@type': 'Question',
      name: pick(f.q, 'en'),
      acceptedAnswer: { '@type': 'Answer', text: pick(f.a, 'en') },
    })),
  }

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />
      <ServiceDetail service={service} />
    </>
  )
}
