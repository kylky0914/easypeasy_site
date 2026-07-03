import { site } from '@/content/site'
import Reveal from '@/components/Reveal'

export default function TrustBar() {
  return (
    <section className="border-y border-slate-200 bg-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-center sm:grid-cols-3">
        {site.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <p className="bg-gradient-to-r from-accent to-glow bg-clip-text font-display text-3xl font-bold text-transparent sm:text-4xl">
              {s.value}
            </p>
            <p className="mt-2 text-sm text-slate-700">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
