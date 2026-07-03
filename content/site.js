// PLACEHOLDER contact details — owner must swap before launch (see spec "Open items for owner")
export const site = {
  name: 'EasyPeasy',
  tagline: 'Customized AI solutions for SMEs — made easy peasy.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://easypeasy.example.sg',
  email: 'hello@easypeasy.example.sg',
  whatsapp: '6580000000', // digits only — used in wa.me links
  address: 'Singapore',
  responsePromise: 'We reply within 24 hours — usually much faster.',
  hero: {
    headline: 'Running your business on manual work? Let’s make it easy peasy.',
    sub: 'We build customized AI automations, chatbots and tools for Singapore SMEs — so your team spends time on customers, not copy-paste.',
  },
  stats: [
    { value: '40%', label: 'less time on manual admin (typical)' },
    { value: '2–4 wks', label: 'typical delivery time' },
    { value: 'SG-based', label: 'team — no offshore handoffs' },
  ],
  process: [
    { step: 1, title: 'Free AI Audit', desc: 'Tell us how you work today. We identify the highest-ROI automation opportunities. No sales pressure, ever.', time: 'within 48 hours' },
    { step: 2, title: 'Fixed-Scope Proposal', desc: 'You get a clear plan with a fixed price and timeline. You own everything we build.', time: '2–3 days' },
    { step: 3, title: 'Build', desc: 'We build and show you progress weekly. You test it on your real work before launch.', time: '2–6 weeks' },
    { step: 4, title: 'Launch & Support', desc: 'We deploy, train your team, and stay available for tweaks and support.', time: 'ongoing' },
  ],
  nav: [
    { href: '/services', label: 'Services' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/contact', label: 'Contact' },
  ],
}

export const waLink = (text = 'Hi EasyPeasy! I’d like a free AI audit for my business.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
