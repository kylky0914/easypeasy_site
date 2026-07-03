import ContactForm from '@/components/ContactForm'
import WhatsAppButton from '@/components/WhatsAppButton'
import Reveal from '@/components/Reveal'
import { site } from '@/content/site'

export const metadata = {
  title: 'Contact — Free AI Audit',
  description:
    'Get a free AI audit for your SME. Tell us how you work today and we’ll show you where AI saves time and money. Reply within 24 hours.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <section className="bg-paper py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">// Contact</p>
          <h1 className="mx-auto mt-3 font-display text-4xl font-bold text-slate-900 sm:text-5xl">
            Get your free AI audit
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-700">
            Tell us a little about your business — we&rsquo;ll reply with the highest-ROI automation opportunities
            we see. {site.responsePromise}
          </p>
          <div className="mt-6">
            <WhatsAppButton
              label="Prefer WhatsApp? Chat with us"
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
