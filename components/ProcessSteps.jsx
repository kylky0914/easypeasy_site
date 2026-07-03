export default function ProcessSteps({ steps }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-8 hidden h-px bg-gradient-to-r from-accent/0 via-accent/40 to-glow/40 lg:block"
      />
      <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <li
            key={s.step}
            className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg"
          >
            <p className="font-mono text-sm font-bold text-accent-deep">Step {s.step}</p>
            <h3 className="mt-1 font-display font-bold text-slate-900">{s.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{s.desc}</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-wide text-slate-500">{s.time}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
