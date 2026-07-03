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
  const service = str(d.service)
  const budget = str(d.budget)
  const errors = {}

  if (!name.trim()) errors.name = 'Name is required'
  if (!email.trim()) errors.email = 'Email is required'
  else if (!EMAIL_RE.test(email.trim())) errors.email = 'Enter a valid email address'
  if (!phone.trim()) errors.phone = 'Phone / WhatsApp number is required'
  if (!company.trim()) errors.company = 'Company name is required'
  if (!message.trim()) errors.message = 'Tell us a little about what you need'
  if (service && !SERVICES.includes(service)) errors.service = 'Choose a service from the list'
  if (budget && !BUDGETS.includes(budget)) errors.budget = 'Choose a budget range from the list'

  return { valid: Object.keys(errors).length === 0, errors }
}
