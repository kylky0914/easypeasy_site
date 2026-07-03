import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-ink px-4 py-24 text-center">
      <div aria-hidden="true" className="aurora" />
      <div className="relative mx-auto max-w-2xl">
        <p className="font-mono text-sm uppercase tracking-widest text-glow">404 — task not found</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-white">This page took the day off.</h1>
        <p className="mt-4 text-slate-300">But your free AI audit didn’t — it’s still on the clock.</p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Get Free AI Audit
        </Link>
      </div>
    </div>
  )
}
