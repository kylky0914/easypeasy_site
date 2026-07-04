'use client'

import { useEffect, useState } from 'react'
import { useT, usePick } from '@/components/LanguageProvider'

// Signature element: a minimal agent-terminal card that loops through 3 real
// SME scenarios (themed on content/services.js: WhatsApp order entry, chatbot
// booking, and scheduled reporting), streaming each line with a typing effect
// before it resolves to a glow checkmark. Purely decorative/illustrative —
// hidden from assistive tech (aria-hidden) since the same story is told in
// plain text in the surrounding hero copy. Strings are bilingual { en, zh }.
const SCENARIOS = [
  {
    label: { en: 'New order — WhatsApp, 10:42pm', zh: '新订单 —— WhatsApp，晚上 10:42' },
    lines: [
      { en: 'reading message…', zh: '正在读取消息…' },
      { en: 'order entered in system', zh: '订单已录入系统' },
      { en: 'invoice sent to customer', zh: '发票已发送给客户' },
    ],
    footer: { en: 'done in 14s — while you slept', zh: '14 秒完成 —— 在您熟睡时' },
  },
  {
    label: { en: 'Booking enquiry — website, 11:15pm', zh: '预约咨询 —— 网站，晚上 11:15' },
    lines: [
      { en: 'reading question…', zh: '正在读取问题…' },
      { en: 'slot checked in calendar', zh: '已在日历中查询时段' },
      { en: 'appointment confirmed', zh: '预约已确认' },
    ],
    footer: { en: 'done in 9s — no front desk needed', zh: '9 秒完成 —— 无需前台' },
  },
  {
    label: { en: 'Monthly report — due today', zh: '月度报告 —— 今天到期' },
    lines: [
      { en: 'pulling numbers from 3 apps', zh: '正在从 3 个应用提取数据' },
      { en: 'totals double-checked', zh: '合计已复核' },
      { en: 'report emailed to owner', zh: '报告已邮件发送给负责人' },
    ],
    footer: { en: 'done in 22s — before your coffee', zh: '22 秒完成 —— 在您喝咖啡之前' },
  },
]

const TYPE_MS = 26
const LINE_PAUSE_MS = 450
const SCENARIO_HOLD_MS = 2200

export default function AgentConsole() {
  const t = useT()
  const p = usePick()

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
      const timer = setTimeout(() => {
        setScenarioIndex((i) => (i + 1) % SCENARIOS.length)
        setLineIndex(0)
        setCharCount(0)
        setShowFooter(false)
      }, SCENARIO_HOLD_MS)
      return () => clearTimeout(timer)
    }

    if (lineIndex >= scenario.lines.length) {
      const timer = setTimeout(() => setShowFooter(true), LINE_PAUSE_MS)
      return () => clearTimeout(timer)
    }

    // Type against the active locale's line length so the animation stays in sync
    // if the visitor switches language mid-loop.
    const line = p(scenario.lines[lineIndex])
    if (charCount < line.length) {
      const timer = setTimeout(() => setCharCount((c) => c + 1), TYPE_MS)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setLineIndex((i) => i + 1)
      setCharCount(0)
    }, LINE_PAUSE_MS)
    return () => clearTimeout(timer)
  }, [animate, scenarioIndex, lineIndex, charCount, showFooter, p])

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
        <span className="ml-2 text-xs text-slate-400">{t('agent.title')}</span>
      </div>
      <div className="mt-4 min-h-[9.5rem] text-[13px] leading-relaxed">
        <p className="text-glow">▸ {p(scenario.label)}</p>
        <ul className="mt-2 space-y-1.5 pl-4">
          {scenario.lines.map((lineObj, i) => {
            const line = p(lineObj)
            const isPast = i < lineIndex
            const isCurrent = i === lineIndex
            const typedLength = isPast ? line.length : isCurrent ? charCount : 0
            const done = isPast || (isCurrent && charCount >= line.length)
            return (
              <li key={i} className={typedLength === 0 && !isCurrent ? 'opacity-0' : 'opacity-100'}>
                {line.slice(0, typedLength) || ' '}
                {isCurrent && !done && <span className="animate-pulse text-glow">▍</span>}
                {done && <span className="ml-1 text-glow">✓</span>}
              </li>
            )
          })}
        </ul>
        {showFooter && <p className="mt-2 text-xs text-slate-400">{p(scenario.footer)}</p>}
      </div>
    </div>
  )
}
