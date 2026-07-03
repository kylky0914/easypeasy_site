import Link from 'next/link'
import { site, waLink } from '@/content/site'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink">
      <div aria-hidden="true" className="aurora" />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-white">
            easy<span className="bg-gradient-to-r from-accent to-glow bg-clip-text text-transparent">peasy</span>
          </p>
          <p className="mt-2 text-sm text-slate-400">{site.tagline}</p>
          <p className="mt-2 text-sm text-slate-400">{site.address}</p>
        </div>
        <div>
          <p className="font-display font-semibold text-white">Pages</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-400">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors duration-200 hover:text-white">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display font-semibold text-white">Contact</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-400">
            <li><a href={`mailto:${site.email}`} className="transition-colors duration-200 hover:text-white">{site.email}</a></li>
            <li><a href={waLink()} target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 hover:text-white">WhatsApp us</a></li>
          </ul>
          <p className="mt-4 font-mono text-xs text-slate-400">
            We respect your privacy. Details you share are used only to respond to your enquiry (PDPA).
          </p>
        </div>
      </div>
      <div className="relative border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  )
}
