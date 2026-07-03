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

  it('preserves a corrupt existing file instead of discarding it', async () => {
    await fs.mkdir(path.dirname(tmpFile), { recursive: true })
    await fs.writeFile(tmpFile, 'not json{{')

    expect(await saveSubmission({ name: 'C' })).toBe(1)

    const stored = JSON.parse(await fs.readFile(tmpFile, 'utf8'))
    expect(stored).toEqual([{ name: 'C' }])

    const dir = path.dirname(tmpFile)
    const files = await fs.readdir(dir)
    const corruptFile = files.find((f) => /\.corrupt-\d+\.json$/.test(f))
    expect(corruptFile).toBeTruthy()
    const corruptContents = await fs.readFile(path.join(dir, corruptFile), 'utf8')
    expect(corruptContents).toBe('not json{{')
  })

  it('quarantines a valid-JSON-but-non-array file instead of discarding it', async () => {
    await fs.mkdir(path.dirname(tmpFile), { recursive: true })
    await fs.writeFile(tmpFile, '{}')

    expect(await saveSubmission({ name: 'D' })).toBe(1)

    const stored = JSON.parse(await fs.readFile(tmpFile, 'utf8'))
    expect(stored).toEqual([{ name: 'D' }])

    const dir = path.dirname(tmpFile)
    const files = await fs.readdir(dir)
    const corruptFile = files.find((f) => /\.corrupt-\d+\.json$/.test(f))
    expect(corruptFile).toBeTruthy()
    const corruptContents = await fs.readFile(path.join(dir, corruptFile), 'utf8')
    expect(corruptContents).toBe('{}')
  })

  it('serializes concurrent saves so no lead is lost', async () => {
    const results = await Promise.all([
      saveSubmission({ name: '1' }),
      saveSubmission({ name: '2' }),
      saveSubmission({ name: '3' }),
      saveSubmission({ name: '4' }),
      saveSubmission({ name: '5' }),
    ])

    expect(new Set(results)).toEqual(new Set([1, 2, 3, 4, 5]))

    const stored = JSON.parse(await fs.readFile(tmpFile, 'utf8'))
    expect(stored.length).toBe(5)
  })
})
