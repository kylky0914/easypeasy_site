// Static UI-chrome strings, keyed by dot-path and looked up via useT()/<T>.
// EVERY key under `en` MUST have a matching key under `zh` (enforced by a test).
// Content data (services, case studies, faqs, hero copy) lives in the other
// content/*.js files as inline {en, zh} values, not here.
export const ui = {
  en: {
    nav: {
      getAudit: 'Get Free AI Audit',
    },
    common: {
      getYourFreeAudit: 'Get Your Free AI Audit',
      learnMore: 'Learn more',
      seeAllServices: 'See all services →',
      moreCaseStudies: 'More case studies →',
      step: 'Step',
      whatsappUs: 'WhatsApp Us',
      whatsappMessage: 'Hi EPL AI! I’d like a free AI audit for my business.',
    },
    eyebrow: {
      services: '// Services',
      howItWorks: '// How it works',
      caseStudies: '// Case Studies',
      faq: '// FAQ',
      contact: '// Contact',
      painPoints: '// Pain points',
      deliverables: '// Deliverables',
    },
    home: {
      servicesHeading: 'What we build for SMEs',
      howItWorks: 'How it works',
      caseStudiesHeading: 'Real problems, real results',
      faqHeading: 'Common questions',
    },
    hero: {
      eyebrow: 'AI that works while you don’t',
      microcopy: 'Free audit within 48 hours. No sales pressure, ever.',
    },
    services: {
      pageTitle: 'AI services built for SMEs',
      pageIntro:
        'No jargon, no bloated enterprise projects — practical AI that pays for itself, delivered in weeks.',
    },
    serviceDetail: {
      painHeading: 'Sound familiar?',
      deliverablesHeading: 'What we build',
      faqHeading: 'Questions about {name}',
    },
    caseStudiesPage: {
      title: 'Before & after',
      intro:
        'The pattern is always the same: hours of manual work → an AI workflow that just handles it.',
    },
    caseStudyCard: {
      before: 'Before',
      after: 'After',
      illustrative: 'Illustrative example',
    },
    cta: {
      heading: 'Ready to make operations easier?',
      body:
        'Get a free AI audit — we’ll show you exactly where AI saves your business time and money.',
    },
    contact: {
      title: 'Get your free AI audit',
      intro:
        'Tell us a little about your business — we’ll reply with the highest-ROI automation opportunities we see.',
      whatsappCta: 'Prefer WhatsApp? Chat with us',
    },
    footer: {
      pages: 'Pages',
      contact: 'Contact',
      whatsappUs: 'WhatsApp us',
      privacy:
        'We respect your privacy. Details you share are used only to respond to your enquiry (PDPA).',
      rights: 'All rights reserved.',
    },
    form: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone / WhatsApp',
      company: 'Company',
      service: 'What do you need?',
      budget: 'Estimated budget',
      message: 'Tell us about your business & what you’d like to improve',
      submit: 'Send — get your free audit',
      submitting: 'Sending…',
      successTitle: 'Thanks — we’ve got it! 🎉',
      successBody: 'We’ll get back to you within 24 hours, usually much faster.',
      whatsappInstead: 'WhatsApp us instead →',
      services: {
        'Workflow Automation': 'Workflow Automation',
        'AI Chatbot': 'AI Chatbot',
        'Custom AI': 'Custom AI',
        'AI Consulting': 'AI Consulting',
        'Not sure': 'Not sure',
      },
      budgets: {
        'Under S$5k': 'Under S$5k',
        'S$5k–15k': 'S$5k–15k',
        'S$15k–50k': 'S$15k–50k',
        'S$50k+': 'S$50k+',
        'Not sure yet': 'Not sure yet',
      },
      errors: {
        nameRequired: 'Name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Enter a valid email address',
        phoneRequired: 'Phone / WhatsApp number is required',
        companyRequired: 'Company name is required',
        messageRequired: 'Tell us a little about what you need',
        serviceInvalid: 'Choose a service from the list',
        budgetInvalid: 'Choose a budget range from the list',
        invalid: 'Invalid request',
        rateLimit: 'Too many submissions — please try again later, or WhatsApp us directly.',
        saveError: 'Something went wrong on our side — please WhatsApp us instead.',
        generic: 'Something went wrong sending your message.',
      },
    },
    agent: {
      title: 'EPL AI agent',
    },
    notFound: {
      eyebrow: '404 — task not found',
      title: 'This page took the day off.',
      body: 'But your free AI audit didn’t — it’s still on the clock.',
    },
  },

  zh: {
    nav: {
      getAudit: '免费 AI 诊断',
    },
    common: {
      getYourFreeAudit: '获取免费 AI 诊断',
      learnMore: '了解更多',
      seeAllServices: '查看所有服务 →',
      moreCaseStudies: '更多案例 →',
      step: '步骤',
      whatsappUs: 'WhatsApp 联系',
      whatsappMessage: '你好 EPL AI！我想为我的企业申请免费的 AI 诊断。',
    },
    eyebrow: {
      services: '// 服务',
      howItWorks: '// 运作方式',
      caseStudies: '// 案例',
      faq: '// 常见问题',
      contact: '// 联系我们',
      painPoints: '// 痛点',
      deliverables: '// 交付内容',
    },
    home: {
      servicesHeading: '我们为中小企业打造的方案',
      howItWorks: '运作方式',
      caseStudiesHeading: '真实问题，真实成效',
      faqHeading: '常见问题',
    },
    hero: {
      eyebrow: 'AI 替您工作，即使您不在',
      microcopy: '48 小时内免费诊断。绝无销售压力。',
    },
    services: {
      pageTitle: '为中小企业打造的 AI 服务',
      pageIntro: '没有行话，没有臃肿的企业级项目 —— 实用的 AI，物有所值，数周内交付。',
    },
    serviceDetail: {
      painHeading: '似曾相识？',
      deliverablesHeading: '我们交付什么',
      faqHeading: '关于{name}的常见问题',
    },
    caseStudiesPage: {
      title: '改造前后',
      intro: '模式始终如一：数小时的人工作业 → 由 AI 工作流自动搞定。',
    },
    caseStudyCard: {
      before: '改造前',
      after: '改造后',
      illustrative: '示意案例',
    },
    cta: {
      heading: '准备好让工作变得轻松了吗？',
      body: '获取免费 AI 诊断 —— 我们会明确告诉您 AI 能在哪些环节为您的企业节省时间和金钱。',
    },
    contact: {
      title: '获取您的免费 AI 诊断',
      intro: '简单介绍一下您的业务 —— 我们会回复您我们发现的投资回报最高的自动化机会。',
      whatsappCta: '更喜欢用 WhatsApp？与我们聊聊',
    },
    footer: {
      pages: '页面',
      contact: '联系我们',
      whatsappUs: 'WhatsApp 联系我们',
      privacy: '我们尊重您的隐私。您提供的信息仅用于回复您的咨询（符合 PDPA）。',
      rights: '版权所有。',
    },
    form: {
      name: '姓名',
      email: '电子邮箱',
      phone: '电话 / WhatsApp',
      company: '公司',
      service: '您需要什么？',
      budget: '预算范围',
      message: '介绍一下您的业务，以及您希望改进的地方',
      submit: '提交 —— 获取免费诊断',
      submitting: '提交中…',
      successTitle: '谢谢 —— 我们已收到！🎉',
      successBody: '我们会在 24 小时内回复您，通常快得多。',
      whatsappInstead: '改用 WhatsApp 联系我们 →',
      services: {
        'Workflow Automation': '流程自动化',
        'AI Chatbot': 'AI 聊天机器人',
        'Custom AI': '定制 AI',
        'AI Consulting': 'AI 咨询',
        'Not sure': '不确定',
      },
      budgets: {
        'Under S$5k': '低于 S$5k',
        'S$5k–15k': 'S$5k–15k',
        'S$15k–50k': 'S$15k–50k',
        'S$50k+': 'S$50k+',
        'Not sure yet': '尚不确定',
      },
      errors: {
        nameRequired: '请填写姓名',
        emailRequired: '请填写电子邮箱',
        emailInvalid: '请输入有效的电子邮箱',
        phoneRequired: '请填写电话 / WhatsApp 号码',
        companyRequired: '请填写公司名称',
        messageRequired: '请简单说明您的需求',
        serviceInvalid: '请从列表中选择服务',
        budgetInvalid: '请从列表中选择预算范围',
        invalid: '请求无效',
        rateLimit: '提交次数过多 —— 请稍后再试，或直接通过 WhatsApp 联系我们。',
        saveError: '我们这边出了点问题 —— 请改用 WhatsApp 联系我们。',
        generic: '发送您的消息时出错。',
      },
    },
    agent: {
      title: 'EPL AI agent',
    },
    notFound: {
      eyebrow: '404 —— 未找到页面',
      title: '这个页面今天休假了。',
      body: '但您的免费 AI 诊断没有 —— 它仍在待命中。',
    },
  },
}
