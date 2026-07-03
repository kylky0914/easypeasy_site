import Link from 'next/link'
import { site } from '@/content/site'

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-white">
          easy<span className="bg-gradient-to-r from-accent to-glow bg-clip-text text-transparent">peasy</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-medium text-slate-300 sm:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors duration-200 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Get Free AI Audit
        </Link>
      </div>
    </header>
  )
}
