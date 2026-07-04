import { describe, it, expect } from 'vitest'
import { pick, translate, isLocale, LOCALES, DEFAULT_LOCALE } from '@/lib/i18n'
import { ui } from '@/content/ui'

describe('pick', () => {
  const bilingual = { en: 'Hello', zh: '你好' }

  it('returns the string for the requested locale', () => {
    expect(pick(bilingual, 'en')).toBe('Hello')
    expect(pick(bilingual, 'zh')).toBe('你好')
  })

  it('falls back to English when the locale is missing', () => {
    expect(pick({ en: 'Only EN' }, 'zh')).toBe('Only EN')
  })

  it('passes plain strings through unchanged (partial-translation safety)', () => {
    expect(pick('plain', 'zh')).toBe('plain')
    expect(pick('plain', 'en')).toBe('plain')
  })

  it('defaults to the default locale when none is given', () => {
    expect(pick(bilingual)).toBe(bilingual[DEFAULT_LOCALE])
  })

  it('does not treat arrays or non-bilingual objects as bilingual values', () => {
    const arr = ['a', 'b']
    expect(pick(arr, 'zh')).toBe(arr)
  })
})

describe('translate', () => {
  const dict = {
    en: { greeting: 'Hi', nested: { hello: 'Hello {name}' } },
    zh: { greeting: '嗨', nested: { hello: '你好 {name}' } },
  }

  it('resolves a dot-path for the locale', () => {
    expect(translate(dict, 'greeting', 'zh')).toBe('嗨')
    expect(translate(dict, 'nested.hello', 'en', { name: 'Kai' })).toBe('Hello Kai')
  })

  it('falls back to English then to the raw path', () => {
    expect(translate({ en: { a: 'A' }, zh: {} }, 'a', 'zh')).toBe('A')
    expect(translate(dict, 'does.not.exist', 'en')).toBe('does.not.exist')
  })

  it('interpolates {vars}', () => {
    expect(translate(dict, 'nested.hello', 'zh', { name: 'World' })).toBe('你好 World')
  })
})

describe('isLocale', () => {
  it('accepts supported locales only', () => {
    expect(isLocale('en')).toBe(true)
    expect(isLocale('zh')).toBe(true)
    expect(isLocale('fr')).toBe(false)
    expect(isLocale(null)).toBe(false)
  })
})

// Every leaf key under en must exist under zh and vice-versa — this catches a
// UI string that was added in one language but not the other.
describe('ui dictionary parity', () => {
  const leafPaths = (node, prefix = '') =>
    Object.entries(node).flatMap(([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key
      return value != null && typeof value === 'object' ? leafPaths(value, path) : [path]
    })

  it('covers every locale', () => {
    expect(Object.keys(ui).sort()).toEqual([...LOCALES].sort())
  })

  it('has identical key sets across en and zh', () => {
    const en = leafPaths(ui.en).sort()
    const zh = leafPaths(ui.zh).sort()
    expect(zh).toEqual(en)
  })

  it('has no empty string values', () => {
    for (const locale of LOCALES) {
      for (const path of leafPaths(ui[locale])) {
        expect(translate(ui, path, locale)).not.toBe('')
      }
    }
  })
})
