import Image from 'next/image'

import { Blocks } from '@/components/blocks/Blocks'
import { ClosingCta } from '@/components/home/ClosingCta'
import { RevealText } from '@/components/motion/RevealText'
import { PageHeader } from '@/components/site/PageHeader'
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
      <PageHeader
        title="Mobility solutions for diverse business requirements"
        crumbs={[{ label: 'Clients', href: '/clients/' }]}
        intro={
          <p>
            Commute patterns, operating shifts, campus layouts, passenger volumes and travel schedules all shape how mobility
            should be planned. G DRIVE tailors transportation to each organization.
          </p>
        }
        image={{ src: itParkPickup, alt: 'A G DRIVE driver welcoming a client at an IT park', focus: '60% 50%' }}
      >
        <ButtonLink href={quoteHref()}>Speak to our business team</ButtonLink>
      </PageHeader>

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

      <Blocks
        blocks={[
          {
            type: 'features',
            title: 'Industries we serve',
            items: [
              { icon: 'cpu', title: 'IT and technology', body: 'Employee transportation and shuttle planning for offices, technology campuses and business parks.' },
              { icon: 'wrench', title: 'Manufacturing and industrial facilities', body: 'Transportation for employees working across designated shifts and facility locations.' },
              { icon: 'building', title: 'Corporate offices', body: 'Employee pickup and drop, corporate car rental, executive travel and scheduled shuttles.' },
              { icon: 'campus', title: 'Educational institutions', body: 'Campus mobility and institutional transportation based on passenger requirements and agreed routes.' },
              { icon: 'grid', title: 'Business parks and large campuses', body: 'Shuttle and connecting transportation between buildings, entrances and transit points.' },
              { icon: 'train', title: 'Public transit networks', body: 'Metro Connect feeder services for first-mile and last-mile connectivity.' },
            ],
          },
        ]}
      />

      <ClosingCta title="Let's discuss your industry's mobility needs" />
    </>
  )
}
