// Display strings are bilingual { en, zh }; `slug` and `metaDescription` stay plain
// (slug is canonical; metaDescription is English-only SEO metadata). painPoints and
// deliverables are arrays of bilingual objects; faq q/a are bilingual.
export const services = [
  {
    slug: 'ai-workflow-automation',
    name: { en: 'AI Workflow Automation', zh: 'AI 流程自动化' },
    short: {
      en: 'Turn repetitive admin — invoices, quotes, reports, data entry — into automated workflows.',
      zh: '将重复的行政工作 —— 发票、报价、报表、数据录入 —— 转化为自动化工作流。',
    },
    metaDescription: 'AI workflow automation for Singapore and Malaysia SMEs. Automate invoicing, reporting and data entry with customized AI workflows. Free audit, fixed-price delivery.',
    painPoints: [
      {
        en: 'Staff spend hours copying data between spreadsheets, emails and accounting software',
        zh: '员工花费数小时在电子表格、邮件和会计软件之间复制数据',
      },
      {
        en: 'Month-end reporting takes days and is always late',
        zh: '月末报表要花好几天，而且总是迟交',
      },
      {
        en: 'Quotes and invoices are typed by hand — with typos to match',
        zh: '报价和发票靠人手输入 —— 还常常打错字',
      },
    ],
    deliverables: [
      {
        en: 'Automated document processing (invoices, POs, receipts) into your existing systems',
        zh: '自动化处理单据（发票、采购单、收据）并录入您现有的系统',
      },
      {
        en: 'Scheduled reports that build and send themselves',
        zh: '定时报表自动生成并发送',
      },
      {
        en: 'AI-assisted data entry and reconciliation with human review steps',
        zh: 'AI 辅助的数据录入与对账，并设有人工审核环节',
      },
      {
        en: 'Integrations with the tools you already use — Excel, Google Sheets, Xero, and more',
        zh: '与您已在使用的工具集成 —— Excel、Google Sheets、Xero 等',
      },
    ],
    faqs: [
      {
        q: { en: 'Do we need to change our existing software?', zh: '我们需要更换现有的软件吗？' },
        a: {
          en: 'No. We automate around the tools you already use, adding AI where it saves the most time.',
          zh: '不需要。我们会围绕您现有的工具进行自动化，在最能节省时间的环节加入 AI。',
        },
      },
      {
        q: { en: 'What if the AI makes a mistake?', zh: '如果 AI 出错怎么办？' },
        a: {
          en: 'We design human-review checkpoints for anything important — you approve, the AI does the typing.',
          zh: '对于任何重要环节，我们都会设置人工审核关卡 —— 您负责审批，AI 负责录入。',
        },
      },
    ],
  },
  {
    slug: 'ai-chatbots-whatsapp',
    name: { en: 'AI Chatbots & WhatsApp Agents', zh: 'AI 聊天机器人与 WhatsApp 智能助手' },
    short: {
      en: 'Customer-service chatbots and WhatsApp agents that answer, qualify and book — 24/7.',
      zh: '全天候的客服聊天机器人与 WhatsApp 智能助手，能够回答、筛选并预约。',
    },
    metaDescription: 'Custom AI chatbots and WhatsApp agents for Singapore and Malaysia SMEs. Answer customers, take orders and qualify leads 24/7. Free audit, fixed-price delivery.',
    painPoints: [
      {
        en: 'Customers message at 10pm and get answered at 10am — some never come back',
        zh: '客户在晚上 10 点留言，早上 10 点才收到回复 —— 有些人就此流失',
      },
      {
        en: 'Your team answers the same 20 questions every single day',
        zh: '您的团队每天都在回答同样的 20 个问题',
      },
      {
        en: 'Leads from ads go cold because nobody follows up fast enough',
        zh: '广告带来的潜在客户因跟进不及时而流失',
      },
    ],
    deliverables: [
      {
        en: 'WhatsApp AI agents that answer FAQs, take bookings and orders instantly',
        zh: 'WhatsApp AI 助手即时回答常见问题、接受预约和订单',
      },
      {
        en: 'Website chatbots trained on your actual products, prices and policies',
        zh: '基于您真实的产品、价格和政策训练的网站聊天机器人',
      },
      {
        en: 'Lead qualification flows that hand hot leads to your team with full context',
        zh: '潜在客户筛选流程，将优质线索连同完整背景交给您的团队',
      },
      {
        en: 'Human handover built in — the AI knows when to pass to a person',
        zh: '内置人工接手机制 —— AI 知道何时该转交给真人',
      },
    ],
    faqs: [
      {
        q: { en: 'Will it sound robotic?', zh: '它听起来会很生硬吗？' },
        a: {
          en: 'No — we train it on your tone, your products and your FAQs, and test it with real customer questions before launch.',
          zh: '不会 —— 我们会根据您的语气、产品和常见问题进行训练，并在上线前用真实的客户问题测试。',
        },
      },
      {
        q: { en: 'Can it hand over to a human?', zh: '它能转交给真人吗？' },
        a: {
          en: 'Yes. Handover rules are part of every build — the bot escalates anything it shouldn’t answer.',
          zh: '可以。转交规则是每个项目的标配 —— 遇到不该回答的问题，机器人会自动升级转交。',
        },
      },
    ],
  },
  {
    slug: 'custom-ai-development',
    name: { en: 'Custom AI Development', zh: '定制化 AI 开发' },
    short: {
      en: 'Bespoke AI tools built around your data — document Q&A, search, analysis and more.',
      zh: '围绕您的数据打造的专属 AI 工具 —— 文档问答、搜索、分析等。',
    },
    metaDescription: 'Custom AI development for Singapore and Malaysia SMEs — private document Q&A, AI search and analysis tools built on your business data. Free audit, fixed-price delivery.',
    painPoints: [
      {
        en: 'Your company knowledge lives in 500 PDFs nobody can search',
        zh: '公司的知识散落在 500 份无人能检索的 PDF 里',
      },
      {
        en: 'Off-the-shelf AI tools don’t fit how your business actually works',
        zh: '现成的 AI 工具无法契合您企业实际的运作方式',
      },
      {
        en: 'You want AI on your own data without sending it who-knows-where',
        zh: '您希望在自己的数据上使用 AI，而不必把数据传到不知何处',
      },
    ],
    deliverables: [
      {
        en: 'Private document Q&A — ask questions, get answers from your own files',
        zh: '私有文档问答 —— 提出问题，从您自己的文件中获得答案',
      },
      {
        en: 'AI-powered search across your quotes, contracts and records',
        zh: '在您的报价、合同和记录中进行 AI 驱动的搜索',
      },
      {
        en: 'Custom analysis tools tuned to your industry and workflows',
        zh: '针对您的行业和工作流量身定制的分析工具',
      },
      {
        en: 'Deployment options that keep your data under your control',
        zh: '多种部署方式，让您的数据始终在自己掌控之中',
      },
    ],
    faqs: [
      {
        q: { en: 'Is our data safe?', zh: '我们的数据安全吗？' },
        a: {
          en: 'We design for PDPA from day one and can deploy so your data never leaves infrastructure you control.',
          zh: '我们从第一天起就按照 PDPA 标准设计，并可部署为让您的数据永不离开您掌控的基础设施。',
        },
      },
      {
        q: { en: 'Do we need our own IT team?', zh: '我们需要自己的 IT 团队吗？' },
        a: {
          en: 'No. We build, deploy and maintain it — your team just uses it.',
          zh: '不需要。我们负责开发、部署和维护 —— 您的团队只管使用。',
        },
      },
    ],
  },
  {
    slug: 'ai-consulting',
    name: { en: 'AI Consulting', zh: 'AI 咨询' },
    short: {
      en: 'Not sure where AI fits? We map your processes and find the highest-ROI opportunities.',
      zh: '不确定 AI 能用在哪里？我们会梳理您的流程，找出投资回报最高的机会。',
    },
    metaDescription: 'AI consulting for Singapore and Malaysia SMEs. Practical AI roadmaps, process mapping and team training — find where AI actually pays off in your business.',
    painPoints: [
      {
        en: 'Everyone says “use AI” but nobody says where it pays off in YOUR business',
        zh: '人人都说“用 AI”，却没人告诉您它在您的企业里究竟哪里能见效',
      },
      {
        en: 'You tried ChatGPT but it never stuck with the team',
        zh: '您试过 ChatGPT，但团队始终没能真正用起来',
      },
      {
        en: 'You don’t want to buy tools before understanding the problem',
        zh: '在弄清问题之前，您不想贸然购买工具',
      },
    ],
    deliverables: [
      {
        en: 'Process audit — where your team’s hours actually go',
        zh: '流程诊断 —— 看清您团队的时间究竟花在哪里',
      },
      {
        en: 'Prioritized AI roadmap ranked by ROI and effort',
        zh: '按投资回报和投入排序的 AI 优先级路线图',
      },
      {
        en: 'Tool recommendations with honest build-vs-buy advice',
        zh: '工具推荐，并就自建与采购给出诚实的建议',
      },
      {
        en: 'Hands-on team training on the workflows that matter',
        zh: '针对关键工作流的实战团队培训',
      },
    ],
    faqs: [
      {
        q: { en: 'What do we get at the end?', zh: '最终我们能得到什么？' },
        a: {
          en: 'A written roadmap: the top automation opportunities in your business, ranked by ROI, with clear next steps and costs.',
          zh: '一份书面路线图：列出您企业中最值得自动化的机会，按投资回报排序，并附有明确的后续步骤和成本。',
        },
      },
      {
        q: { en: 'Do we have to build with you afterwards?', zh: '之后我们必须找你们来开发吗？' },
        a: {
          en: 'No. The roadmap is yours — build with us, in-house, or with anyone else.',
          zh: '不必。路线图归您所有 —— 您可以找我们、自己团队，或任何其他人来开发。',
        },
      },
    ],
  },
]
