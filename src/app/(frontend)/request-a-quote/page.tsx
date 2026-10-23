import { CheckIcon, PhoneIcon } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'

import { LeadForm } from '@/components/forms/LeadForm'
import { PageHeader } from '@/components/site/PageHeader'
import { site, telHref } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Request a Corporate Transportation Quote',
  description:
    'Request a quote for employee transportation, corporate car rental, shuttle services, campus mobility or fleet technology from G DRIVE.',
  alternates: { canonical: '/request-a-quote/' },
}

const helpful = [
  'Office or campus locations',
  'Number of employees or passengers',
  'Shift timings or travel schedules',
  'Expected routes',
  'Vehicle requirements',
]

export default function RequestAQuotePage() {
  return (
    <>
      <PageHeader
        title="Request a mobility solution"
        crumbs={[{ label: 'Request a Quote', href: '/request-a-quote/' }]}
        intro={
          <p>
            Every organization has different mobility needs. Share a few details about your company, service
            location and transportation requirements, and our team will get back to you to discuss scope,
            schedules and vehicle categories.
          </p>
        }
      />

      <section className="border-b border-rule">
        <div className="frame grid grid-cols-1 lg:grid-cols-12">
          <aside className="flex flex-col gap-10 border-b border-rule px-4 py-10 sm:px-6 lg:col-span-4 lg:border-b-0 lg:border-r lg:px-10 lg:py-14">
            <div className="flex flex-col gap-5 lg:sticky lg:top-24">
              <h2 className="display text-2xl font-bold">What helps us quote faster</h2>
              <ul className="flex flex-col gap-3">
                {helpful.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink-soft">
                    <CheckIcon aria-hidden weight="bold" className="mt-1 size-4 shrink-0 text-link" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-4 border-t border-rule pt-6">
                <h2 className="display text-2xl font-bold">Prefer to talk?</h2>
                {site.contacts.slice(0, 2).map((c) => (
                  <a key={c.phone} href={telHref(c.phone)} className="group flex items-start gap-3">
                    <PhoneIcon aria-hidden className="mt-1 size-5 text-link" />
                    <span>
                      <span className="block font-mono group-hover:text-link">{c.phone}</span>
                      <span className="text-sm text-ink-soft">
                        {c.name}, {c.role}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <div className="relative px-4 py-10 sm:px-6 lg:col-span-8 lg:px-12 lg:py-14">
            <LeadForm formType="quote" submitLabel="Request a Quote" />
          </div>
        </div>
      </section>
    </>
  )
}
