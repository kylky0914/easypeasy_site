import Link from 'next/link'
import T from '@/components/T'

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-ink px-4 py-24 text-center">
      <div aria-hidden="true" className="aurora" />
      <div className="relative mx-auto max-w-2xl">
        <p className="font-mono text-sm uppercase tracking-widest text-glow"><T path="notFound.eyebrow" /></p>
        <h1 className="mt-4 font-display text-4xl font-bold text-white"><T path="notFound.title" /></h1>
        <p className="mt-4 text-slate-300"><T path="notFound.body" /></p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          <T path="nav.getAudit" />
        </Link>
      </div>
    </div>
  )
}
