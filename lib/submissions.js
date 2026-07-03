import { promises as fs } from 'fs'
import path from 'path'

// Append-only JSON file — no lead is ever lost. Path overridable for tests/deployment.
function filePath() {
  return process.env.SUBMISSIONS_FILE || path.join(process.cwd(), 'data', 'submissions.json')
}

export async function saveSubmission(submission) {
  const file = filePath()
  await fs.mkdir(path.dirname(file), { recursive: true })
  let existing = []
  try {
    existing = JSON.parse(await fs.readFile(file, 'utf8'))
  } catch {
    // first submission — file doesn't exist yet
  }
  existing.push(submission)
  await fs.writeFile(file, JSON.stringify(existing, null, 2))
  return existing.length
}
