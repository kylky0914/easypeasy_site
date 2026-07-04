'use client'

import { useEffect, useState } from 'react'
import { validateContact, SERVICES, BUDGETS } from '@/lib/validateContact'
import { waLink } from '@/content/site'
import { useT } from '@/components/LanguageProvider'

// Maps /services/[slug] links (?service=slug) to dropdown values
const SLUG_TO_SERVICE = {
  'ai-workflow-automation': 'Workflow Automation',
  'ai-chatbots-whatsapp': 'AI Chatbot',
  'custom-ai-development': 'Custom AI',
  'ai-consulting': 'AI Consulting',
}

const initialFields = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: 'Not sure',
  budget: 'Not sure yet',
  message: '',
  website: '', // honeypot — hidden from real users
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
}

const inputCls =
  'mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-200 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white'
const labelCls = 'block text-sm font-semibold text-slate-700'
const errCls = 'mt-1 text-xs text-red-600'

export default function ContactForm() {
  const t = useT()
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  // Field/form errors are stored as CODES (from validateContact + the API); map them
  // to localized strings at render time so switching language re-localizes live.
  const errText = (code) => (code ? t(`form.errors.${code}`) : '')

  // Read service pre-select + UTM params from the URL on mount (keeps page static)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setFields((f) => ({
      ...f,
      service: SLUG_TO_SERVICE[params.get('service')] || f.service,
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
    }))
  }, [])

  function set(name) {
    return (e) => setFields((f) => ({ ...f, [name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const { valid, errors: fieldErrors } = validateContact(fields)
    setErrors(fieldErrors)
    if (!valid) return

    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(fields),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setStatus('success')
        window.gtag?.('event', 'generate_lead', { service: fields.service })
      } else {
        setErrors(data.errors || {})
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {status === 'success' ? (
        <div className="py-4 text-center">
          <div className="relative mx-auto flex h-14 w-14 items-center justify-center">
            <span
              aria-hidden="true"
              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/30 motion-reduce:hidden"
            />
            <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-6 w-6" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>
          <h2 className="mt-6 font-display text-2xl font-bold text-slate-900">{t('form.successTitle')}</h2>
          <p className="mt-2 text-slate-700">
            {t('form.successBody')}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelCls}>{t('form.name')} *</label>
              <input
                id="name"
                value={fields.name}
                onChange={set('name')}
                className={inputCls}
                aria-invalid={errors.name ? 'true' : undefined}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && <p id="name-error" className={errCls}>{errText(errors.name)}</p>}
            </div>
            <div>
              <label htmlFor="email" className={labelCls}>{t('form.email')} *</label>
              <input
                id="email"
                type="email"
                value={fields.email}
                onChange={set('email')}
                className={inputCls}
                aria-invalid={errors.email ? 'true' : undefined}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <p id="email-error" className={errCls}>{errText(errors.email)}</p>}
            </div>
            <div>
              <label htmlFor="phone" className={labelCls}>{t('form.phone')} *</label>
              <input
                id="phone"
                value={fields.phone}
                onChange={set('phone')}
                className={inputCls}
                aria-invalid={errors.phone ? 'true' : undefined}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && <p id="phone-error" className={errCls}>{errText(errors.phone)}</p>}
            </div>
            <div>
              <label htmlFor="company" className={labelCls}>{t('form.company')} *</label>
              <input
                id="company"
                value={fields.company}
                onChange={set('company')}
                className={inputCls}
                aria-invalid={errors.company ? 'true' : undefined}
                aria-describedby={errors.company ? 'company-error' : undefined}
              />
              {errors.company && <p id="company-error" className={errCls}>{errText(errors.company)}</p>}
            </div>
            <div>
              <label htmlFor="service" className={labelCls}>{t('form.service')}</label>
              <select id="service" value={fields.service} onChange={set('service')} className={inputCls}>
                {SERVICES.map((s) => <option key={s} value={s}>{t(`form.services.${s}`)}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="budget" className={labelCls}>{t('form.budget')}</label>
              <select id="budget" value={fields.budget} onChange={set('budget')} className={inputCls}>
                {BUDGETS.map((b) => <option key={b} value={b}>{t(`form.budgets.${b}`)}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="message" className={labelCls}>
              {t('form.message')} *
            </label>
            <textarea
              id="message"
              rows={5}
              value={fields.message}
              onChange={set('message')}
              className={inputCls}
              aria-invalid={errors.message ? 'true' : undefined}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && <p id="message-error" className={errCls}>{errText(errors.message)}</p>}
          </div>

          {/* Honeypot — hidden from humans, bots fill it */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={set('website')} />
          </div>

          {status === 'error' && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {errors.form ? errText(errors.form) : t('form.errors.generic')}{' '}
              <a
                href={waLink(t('common.whatsappMessage'))}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent-deep underline underline-offset-2 hover:text-accent"
              >
                {t('form.whatsappInstead')}
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
          >
            {status === 'submitting' ? t('form.submitting') : t('form.submit')}
          </button>
        </form>
      )}
    </div>
  )
}
