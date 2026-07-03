import { promises as fs } from 'fs'
import path from 'path'

// Append-only JSON file — no lead is ever lost. Path overridable for tests/deployment.
function filePath() {
  return process.env.SUBMISSIONS_FILE || path.join(process.cwd(), 'data', 'submissions.json')
}

// Serializes writes so overlapping saveSubmission() calls (e.g. two near-simultaneous
// contact-form POSTs) never read the same base array and clobber each other. Every
// call is chained onto this queue and runs strictly after the previous one settles.
let queue = Promise.resolve()

export function saveSubmission(submission) {
  const result = queue.then(() => appendSubmission(submission))
  // Keep the queue itself always-resolving so one caller's rejection can't wedge
  // every later call — the rejection still propagates to the caller that caused it.
  queue = result.catch(() => {})
  return result
}

async function appendSubmission(submission) {
  const file = filePath()
  await fs.mkdir(path.dirname(file), { recursive: true })
  const existing = await readExisting(file)
  existing.push(submission)
  await writeAtomic(file, JSON.stringify(existing, null, 2))
  return existing.length
}

async function readExisting(file) {
  let raw
  try {
    raw = await fs.readFile(file, 'utf8')
  } catch (err) {
    if (err.code === 'ENOENT') return [] // first submission — file doesn't exist yet
    throw err
  }

  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    // Corrupt/truncated file. Never silently discard prior leads — move the
    // unreadable bytes aside for manual recovery, then start a fresh array.
    await fs.rename(file, `${file}.corrupt-${Date.now()}.json`)
    return []
  }

  if (!Array.isArray(parsed)) {
    // Valid JSON but not the array we expect (e.g. `{}`). Quarantine it the
    // same way as a corrupt parse — never silently discard prior leads.
    await fs.rename(file, `${file}.corrupt-${Date.now()}.json`)
    return []
  }

  return parsed
}

async function writeAtomic(file, data) {
  // Write to a temp file first, then rename over the target. rename() is
  // atomic and replaces the destination on both POSIX and Windows in Node,
  // so a crash mid-write never leaves a truncated/partial submissions file.
  const tmp = `${file}.tmp-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}`
  await fs.writeFile(tmp, data)
  await fs.rename(tmp, file)
}
