'use client'

import { usePick } from '@/components/LanguageProvider'

// Renders a bilingual content value ({ en, zh }) for the active locale, inline
// inside otherwise-server pages: <Pick value={site.responsePromise} />
export default function Pick({ value }) {
  const p = usePick()
  return <>{p(value)}</>
}
