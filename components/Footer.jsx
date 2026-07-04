'use client'

import Link from 'next/link'
import { site, waLink } from '@/content/site'
import { useT, usePick } from '@/components/LanguageProvider'

export default function Footer() {
  const t = useT()
  const p = usePick()

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink">
      <div aria-hidden="true" className="aurora" />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-white">
            easy<span className="bg-gradient-to-r from-accent to-glow bg-clip-text text-transparent">peasy</span>
          </p>
          <p className="mt-2 text-sm text-slate-400">{p(site.tagline)}</p>
          <p className="mt-2 text-sm text-slate-400">{p(site.address)}</p>
        </div>
        <div>
          <p className="font-display font-semibold text-white">{t('footer.pages')}</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-400">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors duration-200 hover:text-white">{p(item.label)}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display font-semibold text-white">{t('footer.contact')}</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-400">
            <li><a href={`mailto:${site.email}`} className="transition-colors duration-200 hover:text-white">{site.email}</a></li>
            <li><a href={waLink(t('common.whatsappMessage'))} target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 hover:text-white">{t('footer.whatsappUs')}</a></li>
          </ul>
          <p className="mt-4 font-mono text-xs text-slate-400">
            {t('footer.privacy')}
          </p>
        </div>
      </div>
      <div className="relative border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {site.name}. {t('footer.rights')}
      </div>
    </footer>
  )
}
