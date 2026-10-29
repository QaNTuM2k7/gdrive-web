'use server'

import config from '@payload-config'
import { headers } from 'next/headers'
import { getPayload } from 'payload'

import { turnstileEnabled } from './flags'
import { allowSubmission } from './rateLimit'
import { CONSENT_TEXT, type LeadFormValues, type LeadResult, leadSubmissionSchema } from './schema'
import { verifyTurnstile } from './turnstile'

export async function submitLead(input: unknown): Promise<LeadResult> {
  const parsed = leadSubmissionSchema.safeParse(input)
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof LeadFormValues, string>> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof LeadFormValues
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return { ok: false, error: 'Some details need fixing. Check the highlighted fields.', fieldErrors }
  }
  const data = parsed.data

  // Bots fill the hidden field. Report success so they learn nothing, but store nothing.
  if (data.website) return { ok: true }

  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'

  if (!allowSubmission(ip)) {
    return {
      ok: false,
      error: 'We have received several enquiries from your connection. Wait a few minutes, or call us directly.',
    }
  }

  if (turnstileEnabled && !(await verifyTurnstile(data.turnstileToken, ip === 'unknown' ? undefined : ip))) {
    return { ok: false, error: 'The security check did not pass. Refresh the page and try again.' }
  }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'leads',
      overrideAccess: true,
      data: {
        status: 'new',
        formType: data.formType,
        company: data.company,
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        location: data.location || undefined,
        passengers: data.passengers ? Number(data.passengers) : undefined,
        message: data.message || undefined,
        consent: true,
        consentText: CONSENT_TEXT,
        sourcePage: data.sourcePage,
        utm: { source: data.utmSource, medium: data.utmMedium, campaign: data.utmCampaign },
      },
    })
  } catch (err) {
    console.error('Failed to save lead', err)
    return {
      ok: false,
      error: 'Your enquiry could not be sent because of a problem on our side. Try again, or call us directly.',
    }
  }

  return { ok: true }
}
