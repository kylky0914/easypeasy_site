import { describe, it, expect } from 'vitest'
import { validateContact, SERVICES, BUDGETS } from '@/lib/validateContact'

const valid = {
  name: 'Tan Ah Kow',
  email: 'tan@acme.sg',
  phone: '+65 9123 4567',
  company: 'Acme Trading Pte Ltd',
  service: 'Workflow Automation',
  budget: 'Not sure yet',
  message: 'We want to automate invoice entry.',
}

describe('validateContact', () => {
  it('accepts a fully valid submission', () => {
    const r = validateContact(valid)
    expect(r.valid).toBe(true)
    expect(r.errors).toEqual({})
  })

  it('requires name, email, phone, company, message', () => {
    const r = validateContact({})
    expect(r.valid).toBe(false)
    expect(Object.keys(r.errors)).toEqual(
      expect.arrayContaining(['name', 'email', 'phone', 'company', 'message'])
    )
  })

  it('rejects whitespace-only required fields', () => {
    const r = validateContact({ ...valid, name: '   ' })
    expect(r.valid).toBe(false)
    expect(r.errors.name).toBeTruthy()
  })

  it('rejects malformed email', () => {
    const r = validateContact({ ...valid, email: 'not-an-email' })
    expect(r.valid).toBe(false)
    expect(r.errors.email).toBeTruthy()
  })

  it('allows service and budget to be omitted (defaults applied server-side)', () => {
    const { service, budget, ...rest } = valid
    expect(validateContact(rest).valid).toBe(true)
  })

  it('rejects service/budget values outside the allowed lists', () => {
    expect(validateContact({ ...valid, service: 'Blockchain' }).valid).toBe(false)
    expect(validateContact({ ...valid, budget: 'One million dollars' }).valid).toBe(false)
  })

  it('handles null/undefined input without throwing', () => {
    expect(validateContact(null).valid).toBe(false)
    expect(validateContact(undefined).valid).toBe(false)
  })

  it('exports the option lists used by the form', () => {
    expect(SERVICES).toContain('Not sure')
    expect(BUDGETS).toContain('Not sure yet')
  })

  it('rejects a name over 100 characters', () => {
    const r = validateContact({ ...valid, name: 'a'.repeat(101) })
    expect(r.valid).toBe(false)
    expect(r.errors.name).toBeTruthy()
  })

  it('rejects a message over 5000 characters', () => {
    const r = validateContact({ ...valid, message: 'a'.repeat(5001) })
    expect(r.valid).toBe(false)
    expect(r.errors.message).toBeTruthy()
  })

  it('accepts a message of exactly 5000 characters', () => {
    const r = validateContact({ ...valid, message: 'a'.repeat(5000) })
    expect(r.valid).toBe(true)
    expect(r.errors.message).toBeUndefined()
  })
})
