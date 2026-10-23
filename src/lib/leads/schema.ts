import { z } from 'zod'

import { formTypes, serviceValues } from './options'

// Shared by the browser form (instant feedback) and the server action (the real check).

const trimmed = (max: number) => z.string().trim().max(max, `Keep this under ${max} characters.`)

export const CONSENT_TEXT =
  'I agree that G DRIVE may contact me about this enquiry and store my details as described in the privacy policy.'

export const leadFormSchema = z.object({
  company: trimmed(120).min(2, 'Enter your company name.'),
  name: trimmed(80).min(2, 'Enter the name of the contact person.'),
  email: z.string().trim().toLowerCase().pipe(z.email('Enter a valid email address, like name@company.com.')),
  phone: z
    .string()
    .trim()
    .refine((v) => /^\+?[\d\s()-]{10,20}$/.test(v) && v.replace(/\D/g, '').length >= 10, {
      message: 'Enter a mobile number with at least 10 digits.',
    }),
  service: z.enum(serviceValues, { error: 'Choose the service you need.' }),
  location: trimmed(120).optional(),
  passengers: z
    .string()
    .trim()
    .refine((v) => v === '' || (/^\d+$/.test(v) && Number(v) > 0 && Number(v) <= 100000), {
      message: 'Enter a whole number, like 120.',
    })
    .optional(),
  message: trimmed(2000).optional(),
  consent: z.literal(true, { error: 'Tick this box so our team can contact you.' }),
})

export type LeadFormValues = z.input<typeof leadFormSchema>

// Extra fields the browser adds that the visitor does not type.
export const leadMetaSchema = z.object({
  formType: z.enum(formTypes),
  turnstileToken: z.string().min(1, 'Complete the security check.'),
  sourcePage: z.string().max(300).optional(),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  // Honeypot: hidden from people, filled in by bots.
  website: z.string().max(200).optional(),
})

export const leadSubmissionSchema = leadFormSchema.extend(leadMetaSchema.shape)
export type LeadSubmission = z.input<typeof leadSubmissionSchema>

export type LeadResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof LeadFormValues, string>> }
