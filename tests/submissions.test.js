import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'
import { saveSubmission } from '@/lib/submissions'

const tmpFile = path.join(os.tmpdir(), `easypeasy-test-${process.pid}`, 'submissions.json')

describe('saveSubmission', () => {
  beforeEach(async () => {
    process.env.SUBMISSIONS_FILE = tmpFile
    await fs.rm(path.dirname(tmpFile), { recursive: true, force: true })
  })
  afterAll(async () => {
    await fs.rm(path.dirname(tmpFile), { recursive: true, force: true })
    delete process.env.SUBMISSIONS_FILE
  })

  it('creates the file on first submission and appends after', async () => {
    expect(await saveSubmission({ name: 'A' })).toBe(1)
    expect(await saveSubmission({ name: 'B' })).toBe(2)
    const stored = JSON.parse(await fs.readFile(tmpFile, 'utf8'))
    expect(stored.map((s) => s.name)).toEqual(['A', 'B'])
  })
})
