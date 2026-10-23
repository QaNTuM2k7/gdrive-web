import { SealCheckIcon } from '@phosphor-icons/react/dist/ssr'

import { Blocks } from '@/components/blocks/Blocks'
import { ClosingCta } from '@/components/home/ClosingCta'
import { RevealText } from '@/components/motion/RevealText'
import { SectionIndicator } from '@/components/motion/SectionIndicator'
import { PageHeader } from '@/components/site/PageHeader'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { pageMetadata } from '@/lib/seo'
import { quoteHref, site } from '@/lib/site'
import itParkFleet from '../../../../public/images/fleet/it-park-fleet.jpg'
import controlRoom from '../../../../public/images/technology/control-room.jpg'

// Copy from the SEO master document, section 3 (About G DRIVE).

export const metadata = pageMetadata({
  title: 'About G DRIVE | Enterprise Mobility & Transportation Solutions',
  description:
    'Learn about G DRIVE, the mobility brand of New Travel Liines India Pvt Ltd, delivering enterprise transportation, corporate travel and technology-enabled mobility solutions.',
  path: '/about/',
  image: itParkFleet,
})

export default function AboutPage() {
  return (
    <>
      <SectionIndicator />
      <PageHeader
        title="Moving people. Connecting possibilities."
        crumbs={[{ label: 'About', href: '/about/' }]}
        intro={
          <p>
            G DRIVE is the flagship mobility brand of {site.legalName}, an {site.certification} certified company
            delivering transportation and mobility solutions for corporates, educational institutions and public transit
            networks.
          </p>
        }
        image={{ src: itParkFleet, alt: 'The G DRIVE fleet outside an IT park', focus: '50% 60%' }}
      >
        <ButtonLink href={quoteHref()}>Partner with G DRIVE</ButtonLink>
      </PageHeader>

      <section data-section="Vision" className="border-b border-rule">
        <div className="frame grid grid-cols-1 md:grid-cols-2">
          {[
            {
              title: 'Our vision',
              body: 'To contribute to a connected mobility ecosystem where transportation services, digital technology and operational processes work together to support reliable and efficient movement of people.',
            },
            {
              title: 'Our mission',
              body: 'To deliver flexible, technology-enabled transportation solutions that help organizations coordinate mobility requirements, improve operational visibility and support passenger safety.',
            },
          ].map((v, i) => (
            <div
              key={v.title}
              className={`flex flex-col gap-6 border-b border-rule px-4 py-14 sm:px-6 md:py-20 lg:px-10 ${i === 0 ? 'md:border-r' : ''}`}
            >
              <span className="font-mono text-sm uppercase tracking-[0.12em] text-link">{v.title}</span>
              <p className="display max-w-[24ch] text-2xl font-bold leading-snug md:text-[2rem]">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Blocks
        blocks={[
          {
            type: 'steps',
            title: 'Our approach to mobility',
            intro:
              'Enterprise employee transportation, corporate car rental, executive mobility, shuttles, campus transportation and technology-enabled fleet operations, delivered through one approach.',
            items: [
              { title: 'Planning and coordination', body: 'Transportation planned around your locations and schedules.' },
              { title: 'Fleet and driver allocation', body: 'Vehicles and trained drivers matched to each requirement.' },
              { title: 'Trip monitoring', body: 'Technology-enabled visibility of every trip.' },
              { title: 'Safety, training and maintenance', body: 'Screening, training and preventive maintenance.' },
            ],
          },
          {
            type: 'features',
            title: 'What makes G DRIVE different?',
            items: [
              { icon: 'cpu', title: 'Mobility and technology together', body: 'Transportation services combined with digital tools for scheduling, GPS tracking, trip management and reporting.' },
              { icon: 'building', title: 'Solutions for organizations', body: 'Designed around corporate commute patterns, shift schedules, campus requirements and business travel needs.' },
              { icon: 'shield', title: 'Safety-focused operations', body: 'Driver training, screening processes, vehicle inspections and intelligent monitoring.' },
              { icon: 'bus', title: 'Flexible fleet categories', body: 'Buses, vans, SUVs, sedans and electric vehicles for different journeys and passenger requirements.' },
            ],
          },
          {
            type: 'split',
            title: 'Operational reporting and service support',
            body: [
              'With an experienced leadership team, G DRIVE combines operational expertise, technology, safety-focused processes and customer-oriented service to address the changing transportation needs of modern organizations.',
            ],
            image: { src: controlRoom, alt: 'An operator monitoring fleet dashboards in the G DRIVE control room', focus: '50% 45%' },
            tone: 'blue',
          },
        ]}
      />

      <section data-section="Parent company" aria-labelledby="parent-title" className="border-b border-rule">
        <div className="frame grid grid-cols-1 lg:grid-cols-12">
          <div className="px-4 py-14 sm:px-6 md:py-20 lg:col-span-5 lg:border-r lg:border-rule lg:px-10">
            <RevealText id="parent-title" text="Our parent organization" className="display text-3xl font-extrabold md:text-4xl" />
          </div>
          <div className="flex flex-col justify-center gap-6 px-4 pb-14 sm:px-6 lg:col-span-7 lg:px-10 lg:py-20">
            <p className="max-w-[58ch] text-lg leading-relaxed text-ink-soft">
              G DRIVE operates as the mobility brand of {site.legalName}, headquartered in {site.address.locality},{' '}
              {site.address.region}.
            </p>
            <div className="flex items-center gap-4 border-y border-rule py-5">
              <SealCheckIcon weight="duotone" aria-hidden className="size-10 text-link" />
              <div>
                <p className="font-semibold">{site.certification} certified</p>
                <p className="text-sm text-ink-soft">Quality management system</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta title="Partner with G DRIVE" />
    </>
  )
}
