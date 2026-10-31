import { SealCheckIcon } from '@phosphor-icons/react/dist/ssr'

import { Blocks } from '@/components/blocks/Blocks'
import { Industries } from '@/components/home/Industries'
import { WhyPartner } from '@/components/home/WhyPartner'
import { RevealText } from '@/components/motion/RevealText'
import { PageHeader } from '@/components/site/PageHeader'
import { PageIntro } from '@/components/site/PageIntro'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { pageMetadata } from '@/lib/seo'
import { quoteHref, site } from '@/lib/site'
import aboutBanner from '../../../../public/images/banners/about.jpg'

// Copy from the client's corrections document and the SEO master document, section 3 (About G DRIVE).

export const metadata = pageMetadata({
  title: 'About G DRIVE | Enterprise Mobility & Transportation Solutions',
  description:
    'Learn about G DRIVE, the mobility brand of New Travel Liines India Pvt Ltd, delivering enterprise transportation, corporate travel and technology-enabled mobility solutions.',
  path: '/about/',
  image: aboutBanner,
})

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Moving People. Connecting Possibilities."
        crumbs={[{ label: 'About', href: '/about/' }]}
        image={{ src: aboutBanner, alt: 'The G DRIVE fleet outside a corporate office' }}
      />
      <PageIntro
        title="Moving People. Connecting Possibilities."
        paragraphs={[
          `G DRIVE is the flagship mobility brand of ${site.legalName}, an ${site.certification} certified company. We deliver transportation and mobility solutions for corporates, educational institutions and public transit networks.`,
          'Our services bring together enterprise employee transportation, corporate car rental, executive mobility, shuttle services, campus transportation and technology-enabled fleet operations.',
          'With an experienced leadership team, G DRIVE combines operational expertise, technology, safety-focused processes and customer-oriented service to address the changing transportation needs of modern organizations.',
        ]}
      >
        <ButtonLink href={quoteHref()}>Partner with G DRIVE</ButtonLink>
      </PageIntro>

      <section data-section="Vision" className="bg-paper-2">
        <div className="frame grid grid-cols-1 gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20 lg:px-10">
          {[
            {
              title: 'Our vision',
              body: 'To contribute to a connected mobility ecosystem where transportation services, digital technology and operational processes work together to support reliable and efficient movement of people.',
            },
            {
              title: 'Our mission',
              body: 'To deliver flexible, technology-enabled transportation solutions that help organizations coordinate mobility requirements, improve operational visibility and support passenger safety.',
            },
          ].map((v) => (
            <div key={v.title} className="card flex flex-col gap-6 p-6 md:p-10">
              <span className="eyebrow">{v.title}</span>
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
        ]}
      />

      <section data-section="Parent company" aria-labelledby="parent-title" className="bg-card">
        <div className="frame grid grid-cols-1 gap-6 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <RevealText id="parent-title" text="Our Parent Organization" className="display text-3xl font-extrabold md:text-4xl" />
          </div>
          <div className="flex flex-col justify-center gap-6 lg:col-span-7">
            <p className="max-w-[58ch] text-lg leading-relaxed text-ink-soft">
              <strong className="font-semibold text-ink">{site.legalName}.</strong> G DRIVE operates as the mobility brand of{' '}
              {site.legalName}.
            </p>
            <div className="flex items-center gap-4 rounded-2xl bg-paper-2 p-5">
              <SealCheckIcon weight="duotone" aria-hidden className="size-10 text-link" />
              <div>
                <p className="font-semibold">{site.certification} certified</p>
                <p className="text-sm text-ink-soft">Quality management system</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyPartner />
      <Industries />
    </>
  )
}
