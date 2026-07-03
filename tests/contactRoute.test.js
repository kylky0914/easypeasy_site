import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'
import { POST } from '@/app/api/contact/route'
import { resetRateLimit } from '@/lib/rateLimit'

const tmpFile = path.join(os.tmpdir(), `easypeasy-route-test-${process.pid}`, 'submissions.json')

const validBody = {
  name: 'Tan Ah Kow',
  email: 'tan@acme.sg',
  phone: '+65 9123 4567',
  company: 'Acme Trading Pte Ltd',
  message: 'We want to automate invoice entry.',
  utm_source: 'google',
  utm_medium: 'cpc',
}

function makeRequest(body, ip = '1.2.3.4') {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(body),
  })
}

async function readStored() {
  try {
    return JSON.parse(await fs.readFile(tmpFile, 'utf8'))
  } catch {
    return []
  }
}

describe('POST /api/contact', () => {
  beforeEach(async () => {
    process.env.SUBMISSIONS_FILE = tmpFile
    resetRateLimit()
    await fs.rm(path.dirname(tmpFile), { recursive: true, force: true })
  })
  afterAll(async () => {
    await fs.rm(path.dirname(tmpFile), { recursive: true, force: true })
    delete process.env.SUBMISSIONS_FILE
  })

  it('stores a valid submission with defaults and UTM data', async () => {
    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    const stored = await readStored()
    expect(stored).toHaveLength(1)
    expect(stored[0].service).toBe('Not sure')
    expect(stored[0].budget).toBe('Not sure yet')
    expect(stored[0].utm).toEqual({ source: 'google', medium: 'cpc', campaign: null })
    expect(stored[0].submittedAt).toBeTruthy()
  })

  it('rejects invalid submissions with field errors and stores nothing', async () => {
    const res = await POST(makeRequest({ name: 'X' }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.ok).toBe(false)
    expect(body.errors.email).toBeTruthy()
    expect(await readStored()).toHaveLength(0)
  })

  it('returns fake success on honeypot and stores nothing', async () => {
    const res = await POST(makeRequest({ ...validBody, website: 'http://spam.example' }))
    expect(res.status).toBe(200)
    expect(await readStored()).toHaveLength(0)
  })

  it('rate limits the 6th submission from one IP', async () => {
    for (let i = 0; i < 5; i++) {
      expect((await POST(makeRequest(validBody, '9.9.9.9'))).status).toBe(200)
    }
    expect((await POST(makeRequest(validBody, '9.9.9.9'))).status).toBe(429)
  })

  it('returns 400 on malformed JSON', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: 'not json{{',
    })
    expect((await POST(req)).status).toBe(400)
  })

  it('rejects non-string field values with field errors instead of throwing', async () => {
    const res = await POST(makeRequest({ ...validBody, name: 5, email: ['x'] }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.ok).toBe(false)
    expect(body.errors.name).toBeTruthy()
    expect(body.errors.email).toBeTruthy()
    expect(await readStored()).toHaveLength(0)
  })

  it('rejects a non-string service value and stores nothing', async () => {
    const res = await POST(makeRequest({ ...validBody, service: 5 }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.ok).toBe(false)
    expect(body.errors.service).toBeTruthy()
    expect(await readStored()).toHaveLength(0)
  })

  it('rejects a non-string budget value and stores nothing', async () => {
    const res = await POST(makeRequest({ ...validBody, budget: ['x'] }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.ok).toBe(false)
    expect(body.errors.budget).toBeTruthy()
    expect(await readStored()).toHaveLength(0)
  })
})
