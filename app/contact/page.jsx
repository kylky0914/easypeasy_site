import ContactForm from '@/components/ContactForm'
import WhatsAppButton from '@/components/WhatsAppButton'
import Reveal from '@/components/Reveal'
import T from '@/components/T'
import Pick from '@/components/Pick'
import { site } from '@/content/site'

export const metadata = {
  title: 'Contact — Free AI Audit',
  description:
    'Get a free AI audit from EPL AI. Tell us how your SME works today and we’ll show where AI saves time and money.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <section className="bg-paper py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep"><T path="eyebrow.contact" /></p>
          <h1 className="mx-auto mt-3 font-display text-4xl font-bold text-slate-900 sm:text-5xl">
            <T path="contact.title" />
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-700">
            <T path="contact.intro" /> <Pick value={site.responsePromise} />
          </p>
          <div className="mt-6">
            <WhatsAppButton
              labelKey="contact.whatsappCta"
              className="!border-accent !text-accent-deep hover:!bg-accent/5 focus-visible:!ring-offset-paper"
            />
          </div>
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
