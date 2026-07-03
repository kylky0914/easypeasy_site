export default function CaseStudyCard({ study }) {
  return (
    <article className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg">
      <div className="flex items-start justify-between gap-2">
        <p className="font-mono text-xs font-semibold uppercase tracking-wide text-slate-500">{study.industry}</p>
        {study.illustrative && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
            Illustrative example
          </span>
        )}
      </div>
      <h3 className="mt-2 font-display text-lg font-bold text-slate-900">{study.title}</h3>
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-semibold text-slate-500">Before</dt>
          <dd className="text-slate-700">{study.before}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-500">After</dt>
          <dd className="text-slate-700">{study.after}</dd>
        </div>
      </dl>
      <p className="mt-4 rounded-xl bg-accent/10 px-4 py-2 text-sm font-bold text-accent-deep">{study.impact}</p>
    </article>
  )
}
