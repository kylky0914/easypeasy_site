import { validateContact } from '@/lib/validateContact'
import { saveSubmission } from '@/lib/submissions'
import { checkRateLimit } from '@/lib/rateLimit'

export async function POST(request) {
  // Form-level errors are returned as CODES (mapped to localized strings by the
  // client via content/ui.js → form.errors.<code>).
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, errors: { form: 'invalid' } }, { status: 400 })
  }

  // Honeypot: real users never fill the hidden "website" field.
  // Return fake success so bots don't adapt; store nothing.
  if (body.website) return Response.json({ ok: true })

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (!checkRateLimit(ip)) {
    return Response.json({ ok: false, errors: { form: 'rateLimit' } }, { status: 429 })
  }

  const { valid, errors } = validateContact(body)
  if (!valid) return Response.json({ ok: false, errors }, { status: 400 })

  const submission = {
    name: body.name.trim(),
    email: body.email.trim(),
    phone: body.phone.trim(),
    company: body.company.trim(),
    service: body.service || 'Not sure',
    budget: body.budget || 'Not sure yet',
    message: body.message.trim(),
    utm: {
      source: body.utm_source || null,
      medium: body.utm_medium || null,
      campaign: body.utm_campaign || null,
    },
    submittedAt: new Date().toISOString(),
  }

  try {
    await saveSubmission(submission)
  } catch (err) {
    console.error('Failed to save submission:', err)
    return Response.json({ ok: false, errors: { form: 'saveError' } }, { status: 500 })
  }

  await sendNotificationEmail(submission)
  return Response.json({ ok: true })
}

// No-ops unless SMTP_HOST and NOTIFY_EMAIL are configured. Email failure never fails the lead.
async function sendNotificationEmail(submission) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL } = process.env
  if (!SMTP_HOST || !NOTIFY_EMAIL) return
  try {
    const nodemailer = (await import('nodemailer')).default
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    })
    await transporter.sendMail({
      from: SMTP_USER || 'noreply@easypeasy.local',
      to: NOTIFY_EMAIL,
      subject: `New enquiry: ${submission.name} (${submission.company})`,
      text: [
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Phone/WhatsApp: ${submission.phone}`,
        `Company: ${submission.company}`,
        `Service: ${submission.service}`,
        `Budget: ${submission.budget}`,
        `Message: ${submission.message}`,
        `UTM: ${JSON.stringify(submission.utm)}`,
        `At: ${submission.submittedAt}`,
      ].join('\n'),
    })
  } catch (err) {
    console.error('Email notification failed (lead was still saved):', err)
  }
}
