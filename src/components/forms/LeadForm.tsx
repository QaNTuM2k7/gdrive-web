'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { ArrowRightIcon, CaretDownIcon, CircleNotchIcon, WarningCircleIcon } from '@phosphor-icons/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { submitLead } from '@/lib/leads/actions'
import { turnstileEnabled } from '@/lib/leads/flags'
import { type FormType, isServiceValue, type ServiceValue, serviceOptions } from '@/lib/leads/options'
import { CONSENT_TEXT, type LeadFormValues, leadFormSchema } from '@/lib/leads/schema'
import { controlClass, describedBy, Field } from './Field'

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

// Which page and campaign the visitor came from, so sales can see what produced the lead.
function readSourceMeta() {
  const params = new URLSearchParams(window.location.search)
  let sourcePage = window.location.pathname
  try {
    const ref = document.referrer ? new URL(document.referrer) : null
    if (ref && ref.origin === window.location.origin) sourcePage = ref.pathname
  } catch {}
  return {
    sourcePage,
    utmSource: params.get('utm_source') ?? undefined,
    utmMedium: params.get('utm_medium') ?? undefined,
    utmCampaign: params.get('utm_campaign') ?? undefined,
  }
}

export function LeadForm({
  formType,
  defaultService,
  submitLabel,
}: {
  formType: FormType
  defaultService?: ServiceValue
  submitLabel: string
}) {
  const router = useRouter()
  const turnstileRef = useRef<TurnstileInstance>(null)
  const [token, setToken] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    mode: 'onTouched',
    defaultValues: {
      company: '',
      name: '',
      email: '',
      phone: '',
      // Empty until chosen, so the placeholder shows and validation asks for a choice.
      service: (defaultService ?? '') as ServiceValue,
      location: '',
      passengers: '',
      message: '',
    },
  })

  // Service CTAs link here with ?service=<slug>; read it in the browser so the page itself stays static.
  useEffect(() => {
    const service = new URLSearchParams(window.location.search).get('service')
    if (isServiceValue(service)) setValue('service', service)
  }, [setValue])

  const send = async (values: LeadFormValues, event?: React.BaseSyntheticEvent) => {
    setFormError(null)
    if (turnstileEnabled && !token) {
      setFormError('Complete the security check below, then send the form again.')
      return
    }

    const form = event?.target as HTMLFormElement | undefined
    const honeypot = form?.elements.namedItem('website') as HTMLInputElement | null

    const result = await submitLead({
      ...values,
      ...readSourceMeta(),
      formType,
      turnstileToken: token,
      website: honeypot?.value ?? '',
    })

    if (result.ok) {
      router.push(`/thank-you/?type=${formType}`)
      return
    }

    // Tokens are single use, so get a fresh one for the next attempt.
    turnstileRef.current?.reset()
    setToken('')
    setFormError(result.error)
    if (result.fieldErrors) {
      for (const [field, message] of Object.entries(result.fieldErrors)) {
        setError(field as keyof LeadFormValues, { type: 'server', message })
      }
    }
  }

  const err = (name: keyof LeadFormValues) => errors[name]?.message as string | undefined
  const aria = (name: keyof LeadFormValues, hint = false) => ({
    id: `${formType}-${name}`,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': describedBy(`${formType}-${name}`, hint, Boolean(errors[name])),
  })

  return (
    <form onSubmit={(e) => handleSubmit(send)(e)} noValidate className="flex flex-col gap-8">
      {formError && (
        <div role="alert" className="flex items-start gap-3 rounded-lg border border-danger/60 bg-danger/10 p-4 text-sm">
          <WarningCircleIcon aria-hidden className="mt-0.5 size-5 shrink-0 text-danger" />
          <p>{formError}</p>
        </div>
      )}

      <fieldset className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <legend className="display mb-6 text-2xl font-bold">About you</legend>
        <Field id={`${formType}-company`} label="Company name" required error={err('company')}>
          <input {...register('company')} {...aria('company')} autoComplete="organization" className={`${controlClass} h-12`} />
        </Field>
        <Field id={`${formType}-name`} label="Contact person" required error={err('name')}>
          <input {...register('name')} {...aria('name')} autoComplete="name" className={`${controlClass} h-12`} />
        </Field>
        <Field id={`${formType}-email`} label="Business email" required error={err('email')}>
          <input
            {...register('email')}
            {...aria('email')}
            type="email"
            inputMode="email"
            autoComplete="email"
            className={`${controlClass} h-12`}
          />
        </Field>
        <Field id={`${formType}-phone`} label="Mobile number" required error={err('phone')}>
          <input
            {...register('phone')}
            {...aria('phone')}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className={`${controlClass} h-12`}
          />
        </Field>
      </fieldset>

      <fieldset className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <legend className="display mb-6 text-2xl font-bold">Your requirement</legend>
        <Field id={`${formType}-service`} label="Service required" required error={err('service')} className="md:col-span-2">
          <div className="relative">
            <select
              {...register('service')}
              {...aria('service')}
              className={`${controlClass} h-12 appearance-none pr-10`}
            >
              <option value="" disabled>
                Choose a service
              </option>
              {serviceOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <CaretDownIcon aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2" />
          </div>
        </Field>
        <Field id={`${formType}-location`} label="Service location" hint="City or office address" error={err('location')}>
          <input {...register('location')} {...aria('location', true)} autoComplete="address-level2" className={`${controlClass} h-12`} />
        </Field>
        <Field id={`${formType}-passengers`} label="Estimated passengers" hint="Per day or per trip" error={err('passengers')}>
          <input
            {...register('passengers')}
            {...aria('passengers', true)}
            inputMode="numeric"
            className={`${controlClass} h-12`}
          />
        </Field>
        <Field
          id={`${formType}-message`}
          label="Requirements and details"
          hint="Shift timings, routes, vehicle types or anything else that helps us plan"
          error={err('message')}
          className="md:col-span-2"
        >
          <textarea {...register('message')} {...aria('message', true)} rows={5} className={`${controlClass} py-3`} />
        </Field>
      </fieldset>

      {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
      <div aria-hidden className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor={`${formType}-website`}>Website</label>
        <input id={`${formType}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-start gap-3 text-sm leading-relaxed">
          <input
            type="checkbox"
            {...register('consent')}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${formType}-consent-error` : undefined}
            className="mt-1 size-5 shrink-0 accent-[var(--blue)]"
          />
          <span>
            {CONSENT_TEXT.replace('privacy policy.', '')}
            <Link href="/privacy-policy/" className="text-link underline underline-offset-2">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id={`${formType}-consent-error`} className="text-sm font-medium text-danger">
            {errors.consent.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between">
        {turnstileEnabled && (
          <Turnstile
            ref={turnstileRef}
            siteKey={siteKey}
            onSuccess={setToken}
            onExpire={() => setToken('')}
            onError={() => setToken('')}
            options={{ theme: 'auto', action: formType }}
          />
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex h-14 items-center justify-center gap-3 whitespace-nowrap rounded-lg bg-gold sm:ml-auto px-8 font-mono text-sm font-medium uppercase tracking-[0.08em] text-navy transition-[background-color,transform] hover:bg-gold-dark active:translate-y-px disabled:cursor-wait disabled:opacity-80"
        >
          {isSubmitting ? (
            <>
              <CircleNotchIcon aria-hidden className="size-5 animate-spin motion-reduce:animate-none" />
              Sending
            </>
          ) : (
            <>
              {submitLabel}
              <ArrowRightIcon aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
