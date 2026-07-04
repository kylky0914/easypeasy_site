// All entries are illustrative until real client results exist (spec requirement:
// illustrative entries MUST be labelled). Set illustrative: false only for real, approved case studies.
// Display strings are bilingual { en, zh }; `illustrative` is a plain boolean.
export const caseStudies = [
  {
    title: {
      en: 'F&B distributor automates order entry',
      zh: '餐饮分销商实现订单录入自动化',
    },
    industry: { en: 'F&B / Distribution', zh: '餐饮 / 分销' },
    before: {
      en: 'Orders arrived by WhatsApp and phone; two staff retyped them into the accounting system daily, with regular errors.',
      zh: '订单通过 WhatsApp 和电话涌入；两名员工每天手动录入会计系统，错误频发。',
    },
    after: {
      en: 'A WhatsApp AI agent reads incoming orders, confirms them with the customer, and enters them directly — staff only review exceptions.',
      zh: 'WhatsApp AI 助手读取来单，与客户确认后直接录入 —— 员工只需处理例外情况。',
    },
    impact: {
      en: '~15 hours of manual entry saved per week',
      zh: '每周节省约 15 小时的人工录入',
    },
    illustrative: true,
  },
  {
    title: {
      en: 'Clinic chain answers patients 24/7',
      zh: '连锁诊所全天候回复患者',
    },
    industry: { en: 'Healthcare', zh: '医疗保健' },
    before: {
      en: 'Front desk answered the same booking and pricing questions all day; after-hours enquiries went unanswered until morning.',
      zh: '前台整天都在回答相同的预约和价格问题；非工作时间的咨询要等到早上才有人回复。',
    },
    after: {
      en: 'A chatbot trained on the clinic’s services answers instantly, books appointments, and escalates medical questions to staff.',
      zh: '基于诊所服务训练的聊天机器人即时回复、预约挂号，并将医疗问题升级转交给医护人员。',
    },
    impact: {
      en: '70% of enquiries handled without staff involvement',
      zh: '70% 的咨询无需人工介入即可处理',
    },
    illustrative: true,
  },
  {
    title: {
      en: 'Professional services firm searches 10 years of documents',
      zh: '专业服务公司检索十年文档',
    },
    industry: { en: 'Professional Services', zh: '专业服务' },
    before: {
      en: 'Finding a precedent or past quote meant digging through shared drives for hours.',
      zh: '查找一份先例或过往报价，往往要在共享盘里翻找数小时。',
    },
    after: {
      en: 'A private document Q&A tool answers questions from the firm’s own files — with sources cited.',
      zh: '一款私有文档问答工具直接从公司自有文件中作答 —— 并附上出处引用。',
    },
    impact: {
      en: 'Research time cut from hours to minutes',
      zh: '检索时间从数小时缩短到几分钟',
    },
    illustrative: true,
  },
]
