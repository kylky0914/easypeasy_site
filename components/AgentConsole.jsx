'use client'

import { useEffect, useState } from 'react'

// Signature element: a minimal agent-terminal card that loops through 3 real
// SME scenarios (themed on content/services.js: WhatsApp order entry, chatbot
// booking, and scheduled reporting), streaming each line with a typing effect
// before it resolves to a glow checkmark. Purely decorative/illustrative —
// hidden from assistive tech (aria-hidden) since the same story is told in
// plain text in the surrounding hero copy.
const SCENARIOS = [
  {
    label: 'New order — WhatsApp, 10:42pm',
    lines: ['reading message…', 'order entered in system', 'invoice sent to customer'],
    footer: 'done in 14s — while you slept',
  },
  {
    label: 'Booking enquiry — website, 11:15pm',
    lines: ['reading question…', 'slot checked in calendar', 'appointment confirmed'],
    footer: 'done in 9s — no front desk needed',
  },
  {
    label: 'Monthly report — due today',
    lines: ['pulling numbers from 3 apps', 'totals double-checked', 'report emailed to owner'],
    footer: 'done in 22s — before your coffee',
  },
]

const TYPE_MS = 26
const LINE_PAUSE_MS = 450
const SCENARIO_HOLD_MS = 2200

export default function AgentConsole() {
  // Initial render (SSR + first paint) shows scenario 0 fully completed and
  // static. If the client actually allows motion, the effect below resets
  // and kicks off the animated loop; if prefers-reduced-motion is set (or
  // JS never runs), this static completed state is exactly what stays.
  const [animate, setAnimate] = useState(false)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [lineIndex, setLineIndex] = useState(SCENARIOS[0].lines.length)
  const [charCount, setCharCount] = useState(0)
  const [showFooter, setShowFooter] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setAnimate(true)
    setLineIndex(0)
    setCharCount(0)
    setShowFooter(false)
  }, [])

  useEffect(() => {
    if (!animate) return undefined
    const scenario = SCENARIOS[scenarioIndex]

    if (showFooter) {
      const t = setTimeout(() => {
        setScenarioIndex((i) => (i + 1) % SCENARIOS.length)
        setLineIndex(0)
        setCharCount(0)
        setShowFooter(false)
      }, SCENARIO_HOLD_MS)
      return () => clearTimeout(t)
    }

    if (lineIndex >= scenario.lines.length) {
      const t = setTimeout(() => setShowFooter(true), LINE_PAUSE_MS)
      return () => clearTimeout(t)
    }

    const line = scenario.lines[lineIndex]
    if (charCount < line.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), TYPE_MS)
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => {
      setLineIndex((i) => i + 1)
      setCharCount(0)
    }, LINE_PAUSE_MS)
    return () => clearTimeout(t)
  }, [animate, scenarioIndex, lineIndex, charCount, showFooter])

  const scenario = SCENARIOS[scenarioIndex]

  return (
    <div
      aria-hidden="true"
      className="w-full max-w-md rounded-2xl border border-white/10 bg-ink-soft p-5 font-mono text-slate-300 shadow-[0_0_60px_-25px_rgba(109,94,243,0.6)]"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <span className="ml-2 text-xs text-slate-400">easypeasy agent</span>
      </div>
      <div className="mt-4 min-h-[9.5rem] text-[13px] leading-relaxed">
        <p className="text-glow">▸ {scenario.label}</p>
        <ul className="mt-2 space-y-1.5 pl-4">
          {scenario.lines.map((line, i) => {
            const isPast = i < lineIndex
            const isCurrent = i === lineIndex
            const typedLength = isPast ? line.length : isCurrent ? charCount : 0
            const done = isPast || (isCurrent && charCount >= line.length)
            return (
              <li key={line} className={typedLength === 0 && !isCurrent ? 'opacity-0' : 'opacity-100'}>
                {line.slice(0, typedLength) || ' '}
                {isCurrent && !done && <span className="animate-pulse text-glow">▍</span>}
                {done && <span className="ml-1 text-glow">✓</span>}
              </li>
            )
          })}
        </ul>
        {showFooter && <p className="mt-2 text-xs text-slate-400">{scenario.footer}</p>}
      </div>
    </div>
  )
}
