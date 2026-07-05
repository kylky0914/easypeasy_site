// PLACEHOLDER contact details — owner must swap before launch (see spec "Open items for owner")
// Display strings are bilingual { en, zh }; structural fields (url, email, whatsapp, href)
// stay plain. Resolve display strings with pick()/usePick() from lib/i18n.
export const site = {
  name: 'EPL AI',
  legalName: 'EasyPeasy Labs',
  tagline: {
    en: 'AI automation for Singapore and Malaysia SMEs.',
    zh: '为新加坡与马来西亚中小企业打造 AI 自动化。',
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://easypeasylabs.com',
  email: 'hello@easypeasylabs.com',
  whatsapp: '6580000000', // digits only — used in wa.me links
  address: { en: 'Singapore & Malaysia', zh: '新加坡与马来西亚' },
  responsePromise: {
    en: 'We reply within 24 hours — usually much faster.',
    zh: '我们会在 24 小时内回复 —— 通常快得多。',
  },
  hero: {
    headline: {
      en: 'AI automation that keeps your business moving.',
      zh: '让 AI 自动化推动您的业务持续运转。',
    },
    sub: {
      en: 'EPL AI by EasyPeasy Labs builds practical workflows, WhatsApp agents, and custom AI tools for Singapore and Malaysia SMEs.',
      zh: 'EPL AI by EasyPeasy Labs 为新加坡与马来西亚中小企业打造实用的工作流、WhatsApp 智能助手和定制 AI 工具。',
    },
  },
  stats: [
    {
      value: { en: '40%', zh: '40%' },
      label: { en: 'less time on manual admin (typical)', zh: '减少人工行政时间（典型情况）' },
    },
    {
      value: { en: '2–4 wks', zh: '2–4 周' },
      label: { en: 'typical delivery time', zh: '典型交付时间' },
    },
    {
      value: { en: 'SG + MY', zh: '新马' },
      label: { en: 'market focus for regional SMEs', zh: '专注服务区域中小企业' },
    },
  ],
  process: [
    {
      step: 1,
      title: { en: 'Free AI Audit', zh: '免费 AI 诊断' },
      desc: {
        en: 'Tell us how you work today. We identify the highest-ROI automation opportunities. No sales pressure, ever.',
        zh: '告诉我们您目前的工作方式。我们会找出投资回报最高的自动化机会。绝无销售压力。',
      },
      time: { en: 'within 48 hours', zh: '48 小时内' },
    },
    {
      step: 2,
      title: { en: 'Fixed-Scope Proposal', zh: '固定范围方案' },
      desc: {
        en: 'You get a clear plan with a fixed price and timeline. You own everything we build.',
        zh: '您将获得清晰的方案，价格与时间表固定。我们打造的一切都归您所有。',
      },
      time: { en: '2–3 days', zh: '2–3 天' },
    },
    {
      step: 3,
      title: { en: 'Build', zh: '开发' },
      desc: {
        en: 'We build and show you progress weekly. You test it on your real work before launch.',
        zh: '我们进行开发并每周向您汇报进度。上线前，您可在真实业务中测试。',
      },
      time: { en: '2–6 weeks', zh: '2–6 周' },
    },
    {
      step: 4,
      title: { en: 'Launch & Support', zh: '上线与支持' },
      desc: {
        en: 'We deploy, train your team, and stay available for tweaks and support.',
        zh: '我们负责部署、培训您的团队，并持续提供调整与支持。',
      },
      time: { en: 'ongoing', zh: '持续进行' },
    },
  ],
  nav: [
    { href: '/services', label: { en: 'Services', zh: '服务' } },
    { href: '/case-studies', label: { en: 'Case Studies', zh: '案例' } },
    { href: '/contact', label: { en: 'Contact', zh: '联系我们' } },
  ],
}

export const waLink = (text = 'Hi EPL AI! I’d like a free AI audit for my business.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
