'use client'

import { useT } from '@/components/LanguageProvider'

// Renders a localized UI-dictionary string inline inside otherwise-server pages:
//   <T path="home.howItWorks" />
//   <T path="serviceDetail.faqHeading" vars={{ name }} />
export default function T({ path, vars }) {
  const t = useT()
  return <>{t(path, vars)}</>
}
