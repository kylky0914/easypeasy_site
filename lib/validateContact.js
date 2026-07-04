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

  // Errors are returned as CODES (not messages) so the isomorphic contract stays
  // language-neutral; the UI maps each code to a localized string (content/ui.js →
  // form.errors.<code>).
  if (!name.trim()) errors.name = 'nameRequired'
  if (!email.trim()) errors.email = 'emailRequired'
  else if (!EMAIL_RE.test(email.trim())) errors.email = 'emailInvalid'
  if (!phone.trim()) errors.phone = 'phoneRequired'
  if (!company.trim()) errors.company = 'companyRequired'
  if (!message.trim()) errors.message = 'messageRequired'
  // Optional fields: when present and non-empty, the value must be a string from the
  // allowed list — a non-string (e.g. 5 or ['x']) is invalid, never silently accepted.
  if (d.service != null && d.service !== '' && (typeof d.service !== 'string' || !SERVICES.includes(d.service)))
    errors.service = 'serviceInvalid'
  if (d.budget != null && d.budget !== '' && (typeof d.budget !== 'string' || !BUDGETS.includes(d.budget)))
    errors.budget = 'budgetInvalid'

  return { valid: Object.keys(errors).length === 0, errors }
}
