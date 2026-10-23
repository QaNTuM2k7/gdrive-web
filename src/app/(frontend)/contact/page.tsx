import { ArrowUpRightIcon, MapPinIcon, PhoneIcon } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'

import { LeadForm } from '@/components/forms/LeadForm'
import { PageHeader } from '@/components/site/PageHeader'
import { site, telHref } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: 'Contact G DRIVE | Corporate Transportation & Mobility Enquiries' },
  description:
    'Contact G DRIVE to discuss corporate employee transportation, car rentals, shuttle services, campus mobility, fleet technology and business enquiries.',
  alternates: { canonical: '/contact/' },
}

const fullAddress = `${site.legalName}, ${site.address.street}, ${site.address.locality} ${site.address.postalCode}, ${site.address.region}, India`
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Let's move your organization forward"
        crumbs={[{ label: 'Contact', href: '/contact/' }]}
        intro={
          <p>
            Looking for a transportation partner for your employees, business travellers, campus or fleet
            operations? Tell us about your locations, passengers and schedules, and our team will propose an
            arrangement that fits.
          </p>
        }
      />

      <section aria-labelledby="office-title" className="border-b border-rule">
        <div className="frame grid grid-cols-1 lg:grid-cols-12">
          <div className="flex flex-col gap-6 border-b border-rule px-4 py-10 sm:px-6 lg:col-span-5 lg:border-b-0 lg:border-r lg:px-10 lg:py-14">
            <MapPinIcon aria-hidden weight="light" className="size-10 text-link" />
            <h2 id="office-title" className="display text-3xl font-extrabold">
              Corporate office
            </h2>
            <address className="not-italic leading-relaxed text-ink-soft">
              <strong className="block font-semibold text-ink">{site.legalName}</strong>
              {site.address.street},
              <br />
              {site.address.locality} {site.address.postalCode}, {site.address.region}, India
            </address>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.08em] text-link hover:text-ink"
            >
              Open in Google Maps
              <ArrowUpRightIcon aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="lg:col-span-7">
            <h2 className="border-b border-rule px-4 py-6 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft sm:px-6 lg:px-10">
              Business contacts
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2">
              {site.contacts.map((c, i) => (
                <li
                  key={c.phone}
                  className={`border-b border-rule ${i % 2 === 0 ? 'sm:border-r' : ''} ${i >= 2 ? 'sm:border-b-0' : ''}`}
                >
                  <a
                    href={telHref(c.phone)}
                    className="group flex h-full flex-col gap-2 p-6 transition-colors hover:bg-paper-2 md:p-8"
                  >
                    <span className="display text-xl font-bold">{c.name}</span>
                    <span className="text-sm text-ink-soft">{c.role}</span>
                    <span className="mt-3 inline-flex items-center gap-2 font-mono text-link">
                      <PhoneIcon aria-hidden className="size-4" />
                      {c.phone}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="enquiry-title" className="border-b border-rule">
        <div className="frame grid grid-cols-1 lg:grid-cols-12">
          <div className="flex flex-col gap-4 border-b border-rule px-4 py-10 sm:px-6 lg:col-span-4 lg:border-b-0 lg:border-r lg:px-10 lg:py-14">
            <div className="flex flex-col gap-4 lg:sticky lg:top-24">
              <h2 id="enquiry-title" className="display text-3xl font-extrabold">
                Send us an enquiry
              </h2>
              <p className="leading-relaxed text-ink-soft">
                Include your company name, service location, estimated passenger numbers, operating schedules and
                the type of mobility service you need.
              </p>
            </div>
          </div>
          <div className="relative px-4 py-10 sm:px-6 lg:col-span-8 lg:px-12 lg:py-14">
            <LeadForm formType="contact" submitLabel="Send enquiry" />
          </div>
        </div>
      </section>
    </>
  )
}
