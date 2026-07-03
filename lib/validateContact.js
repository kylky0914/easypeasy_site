// Isomorphic — used by both the ContactForm (browser) and the API route (server).
// No Node imports allowed in this file.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const SERVICES = ['Workflow Automation', 'AI Chatbot', 'Custom AI', 'AI Consulting', 'Not sure']
export const BUDGETS = ['Under S$5k', 'S$5k–15k', 'S$15k–50k', 'S$50k+', 'Not sure yet']

// Non-string field values (e.g. a JSON body with { name: 5 }) must fail validation
// cleanly as a field error, never throw — coerce anything that isn't a string to ''.
const str = (v) => (typeof v === 'string' ? v : '')

export function validateContact(data) {
  const d = data ?? {}
  const name = str(d.name)
  const email = str(d.email)
  const phone = str(d.phone)
  const company = str(d.company)
  const message = str(d.message)
  const errors = {}

  if (!name.trim()) errors.name = 'Name is required'
  if (!email.trim()) errors.email = 'Email is required'
  else if (!EMAIL_RE.test(email.trim())) errors.email = 'Enter a valid email address'
  if (!phone.trim()) errors.phone = 'Phone / WhatsApp number is required'
  if (!company.trim()) errors.company = 'Company name is required'
  if (!message.trim()) errors.message = 'Tell us a little about what you need'
  // Optional fields: when present and non-empty, the value must be a string from the
  // allowed list — a non-string (e.g. 5 or ['x']) is invalid, never silently accepted.
  if (d.service != null && d.service !== '' && (typeof d.service !== 'string' || !SERVICES.includes(d.service)))
    errors.service = 'Choose a service from the list'
  if (d.budget != null && d.budget !== '' && (typeof d.budget !== 'string' || !BUDGETS.includes(d.budget)))
    errors.budget = 'Choose a budget range from the list'

  // Max-length caps — guard against abusive/oversized payloads. Checked after the
  // presence/format checks above so a too-long-and-missing field never double-errors.
  if (!errors.name && name.trim().length > 100) errors.name = 'Name is too long'
  if (!errors.company && company.trim().length > 200) errors.company = 'Company name is too long'
  if (!errors.phone && phone.trim().length > 50) errors.phone = 'Phone / WhatsApp number is too long'
  if (!errors.email && email.trim().length > 254) errors.email = 'Email is too long'
  if (!errors.message && message.trim().length > 5000) errors.message = 'Message is too long (max 5000 characters)'

  return { valid: Object.keys(errors).length === 0, errors }
}
