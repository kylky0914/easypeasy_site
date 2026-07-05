'use client'

import { site } from '@/content/site'

export default function BrandLogo({ className = '', showByline = false }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label={site.name}>
      <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.18)]">
        <svg viewBox="0 0 40 40" className="h-7 w-7" aria-hidden="true">
          <defs>
            <linearGradient id="epl-logo-gradient" x1="8" y1="6" x2="32" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22d3ee" />
              <stop offset="1" stopColor="#4ade80" />
            </linearGradient>
          </defs>
          <path
            d="M12 12.5 20 8l8 4.5v9L20 26l-8-4.5v-9Z"
            fill="none"
            stroke="url(#epl-logo-gradient)"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <path
            d="M9 28.5c4.5-5.3 8.1-5.4 13.1-.4 3.1 3.1 6.1 3.7 9.9.4"
            fill="none"
            stroke="url(#epl-logo-gradient)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <circle cx="20" cy="18" r="2.5" fill="#22d3ee" />
          <circle cx="12" cy="12.5" r="2.1" fill="#4ade80" />
          <circle cx="28" cy="12.5" r="2.1" fill="#22d3ee" />
          <circle cx="32" cy="28.5" r="2.1" fill="#4ade80" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-display text-xl font-bold tracking-tight text-white">
          EPL <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">AI</span>
        </span>
        {showByline && (
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
            by EasyPeasy Labs
          </span>
        )}
      </span>
    </span>
  )
}
