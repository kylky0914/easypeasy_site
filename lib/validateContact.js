// Isomorphic — used by both the ContactForm (browser) and the API route (server).
// No Node imports allowed in this file.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const SERVICES = ['Workflow Automation', 'AI Chatbot', 'Custom AI', 'AI Consulting', 'Not sure']
export const BUDGETS = ['Under S$5k', 'S$5k–15k', 'S$15k–50k', 'S$50k+', 'Not sure yet']

export function validateContact(data) {
  const d = data ?? {}
  const errors = {}

  if (!d.name?.trim()) errors.name = 'Name is required'
  if (!d.email?.trim()) errors.email = 'Email is required'
  else if (!EMAIL_RE.test(d.email.trim())) errors.email = 'Enter a valid email address'
  if (!d.phone?.trim()) errors.phone = 'Phone / WhatsApp number is required'
  if (!d.company?.trim()) errors.company = 'Company name is required'
  if (!d.message?.trim()) errors.message = 'Tell us a little about what you need'
  if (d.service && !SERVICES.includes(d.service)) errors.service = 'Choose a service from the list'
  if (d.budget && !BUDGETS.includes(d.budget)) errors.budget = 'Choose a budget range from the list'

  return { valid: Object.keys(errors).length === 0, errors }
}
