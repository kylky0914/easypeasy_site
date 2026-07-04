'use client'

import Link from 'next/link'
import WhatsAppButton from '@/components/WhatsAppButton'
import AgentConsole from '@/components/AgentConsole'
import { site } from '@/content/site'
import { useT, usePick } from '@/components/LanguageProvider'

// Wraps the exact-match substring of `text` in an accent gradient, without
// altering the surrounding copy — used so the verbatim content/site.js
// headline can still get the "easy peasy" gradient treatment from DESIGN.md.
// When the phrase isn't present (e.g. the Chinese headline), the text renders
// unchanged.
function GradientHighlight({ text, phrase }) {
  const idx = text.toLowerCase().indexOf(phrase.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span className="bg-gradient-to-r from-accent to-glow bg-clip-text text-transparent">
        {text.slice(idx, idx + phrase.length)}
      </span>
      {text.slice(idx + phrase.length)}
    </>
  )
}

export default function Hero() {
  const t = useT()
  const p = usePick()

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div aria-hidden="true" className="grid-overlay" />
      <div aria-hidden="true" className="aurora" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:py-28 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="text-center lg:text-left">
          <p className="animate-fade-up font-mono text-xs uppercase tracking-[0.2em] text-glow">
            {t('hero.eyebrow')}
          </p>
          <h1 className="animate-fade-up animate-delay-1 mx-auto mt-5 max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:mx-0">
            <GradientHighlight text={p(site.hero.headline)} phrase="easy peasy" />
          </h1>
          <p className="animate-fade-up animate-delay-2 mx-auto mt-6 max-w-xl text-lg text-slate-300 lg:mx-0">
            {p(site.hero.sub)}
          </p>
          <div className="animate-fade-up animate-delay-3 mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link
              href="/contact"
              className="rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {t('common.getYourFreeAudit')}
            </Link>
            <WhatsAppButton />
          </div>
          <p className="animate-fade-up animate-delay-3 mt-4 text-sm text-slate-400">
            {t('hero.microcopy')}
          </p>
        </div>
        <div className="animate-fade-up animate-delay-3 flex justify-center lg:justify-end">
          <AgentConsole />
        </div>
      </div>
    </section>
  )
}
