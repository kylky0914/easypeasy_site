// In-memory per-key rate limiter. State resets on server restart — acceptable for v1.
const hits = new Map()

export function checkRateLimit(key, { limit = 5, windowMs = 15 * 60 * 1000 } = {}, now = Date.now()) {
  const windowStart = now - windowMs
  const recent = (hits.get(key) || []).filter((t) => t > windowStart)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return false
  }
  recent.push(now)
  hits.set(key, recent)
  return true
}

export function resetRateLimit() {
  hits.clear()
}
