import Image from 'next/image'

import { Industries } from '@/components/home/Industries'
import { WhyPartner } from '@/components/home/WhyPartner'
import { RevealText } from '@/components/motion/RevealText'
import { PageHeader } from '@/components/site/PageHeader'
import { PageIntro } from '@/components/site/PageIntro'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { clientLogos } from '@/lib/clients'
import { pageMetadata } from '@/lib/seo'
import { quoteHref } from '@/lib/site'
import itParkPickup from '../../../../public/images/rental/it-park-pickup.jpg'

// Copy from the SEO master document, section 18 (Clients & Industries).

export const metadata = pageMetadata({
  title: 'Corporate Clients & Enterprise Mobility Solutions | G DRIVE',
  description:
    "Explore the organizations showcased in G DRIVE's client portfolio and discover mobility solutions for corporate offices, manufacturing facilities, technology campuses and educational institutions.",
  path: '/clients/',
  image: itParkPickup,
})

export default function ClientsPage() {
  return (
    <>
      {/* TODO(client): no clients banner or full logo image was supplied; swap them in when they arrive. */}
      <PageHeader
        title="Mobility solutions for diverse business requirements"
        crumbs={[{ label: 'Clients', href: '/clients/' }]}
        image={{ src: itParkPickup, alt: 'A G DRIVE driver welcoming a client at an IT park', focus: '50% 35%' }}
      />
      <PageIntro
        title="Mobility solutions for diverse business requirements"
        paragraphs={[
          'Commute patterns, operating shifts, campus layouts, passenger volumes and travel schedules all shape how mobility should be planned. G DRIVE tailors transportation to each organization.',
        ]}
      >
        <ButtonLink href={quoteHref()}>Speak to our business team</ButtonLink>
      </PageIntro>

      <section data-section="Client portfolio" aria-labelledby="portfolio-title" className="bg-paper-2">
        <div className="frame px-4 py-16 sm:px-6 md:py-20 lg:px-10">
          <div className="mb-10">
            <RevealText id="portfolio-title" text="Our client portfolio" className="display text-3xl font-extrabold md:text-5xl" />
          </div>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {clientLogos.map((logo) => (
              <li key={logo.file} className="card group flex h-32 items-center justify-center p-6 md:h-40">
                <Image
                  src={`/images/clients/${logo.file}`}
                  alt={logo.name}
                  width={180}
                  height={90}
                  className="max-h-16 w-auto object-contain grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WhyPartner />
      <Industries />
    </>
  )
}
