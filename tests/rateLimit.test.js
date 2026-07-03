import { describe, it, expect, beforeEach } from 'vitest'
import { checkRateLimit, resetRateLimit } from '@/lib/rateLimit'

describe('checkRateLimit', () => {
  beforeEach(() => resetRateLimit())

  it('allows up to the limit within the window', () => {
    for (let i = 0; i < 5; i++) expect(checkRateLimit('1.2.3.4')).toBe(true)
    expect(checkRateLimit('1.2.3.4')).toBe(false)
  })

  it('tracks keys independently', () => {
    for (let i = 0; i < 5; i++) checkRateLimit('1.2.3.4')
    expect(checkRateLimit('5.6.7.8')).toBe(true)
  })

  it('allows again after the window passes', () => {
    const t0 = 1_000_000
    for (let i = 0; i < 5; i++) checkRateLimit('1.2.3.4', {}, t0)
    expect(checkRateLimit('1.2.3.4', {}, t0 + 1)).toBe(false)
    expect(checkRateLimit('1.2.3.4', {}, t0 + 15 * 60 * 1000 + 1)).toBe(true)
  })
})
