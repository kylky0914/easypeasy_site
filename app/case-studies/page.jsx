import CaseStudyCard from '@/components/CaseStudyCard'
import CtaBanner from '@/components/CtaBanner'
import Reveal from '@/components/Reveal'
import { caseStudies } from '@/content/caseStudies'

export const metadata = {
  title: 'Case Studies',
  description:
    'How SMEs use customized AI to cut manual work — before/after examples with real impact metrics.',
  alternates: { canonical: '/case-studies' },
}

export default function CaseStudiesPage() {
  return (
    <>
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-deep">// Case Studies</p>
            <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-bold text-slate-900 sm:text-5xl">
              Before &amp; after
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-700">
              The pattern is always the same: hours of manual work → an AI workflow that just handles it.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <CaseStudyCard study={c} />
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
