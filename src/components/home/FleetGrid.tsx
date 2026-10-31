import Image, { type StaticImageData } from 'next/image'

import { ButtonLink } from '@/components/ui/ButtonLink'
import busCutout from '../../../public/images/fleet/bus-cutout.webp'
import electric from '../../../public/images/fleet/electric-vehicles.jpg'
import sedanCutout from '../../../public/images/fleet/sedan-cutout.webp'
import suvs from '../../../public/images/fleet/suvs.jpg'
import vanCutout from '../../../public/images/fleet/van-cutout.webp'
import { SectionHeading } from './SectionHeading'

const fleet: { slug: string; name: string; image: StaticImageData }[] = [
  { slug: 'buses', name: 'Buses', image: busCutout },
  { slug: 'vans', name: 'Vans', image: vanCutout },
  { slug: 'sedans', name: 'Sedans', image: sedanCutout },
  { slug: 'suvs', name: 'SUVs', image: suvs },
  { slug: 'electric-vehicles', name: 'Electric Vehicles', image: electric },
]

// A Fleet for Every Business Requirement, copy from the SEO master document's home page section.
export function FleetGrid() {
  return (
    <section aria-labelledby="fleet-title" className="bg-card">
      <div className="frame px-4 py-16 sm:px-6 md:py-24 lg:px-10">
        <SectionHeading
          id="fleet-title"
          eyebrow="Our fleet"
          title="A Fleet for Every Business Requirement"
          align="center"
          intro={
            <p>
              From buses and vans to sedans, SUVs and electric vehicles, G DRIVE&apos;s fleet categories support different
              passenger capacities and journey requirements. Fleet solutions cater to employee transportation, campus
              shuttles, corporate travel, airport transfers and executive mobility.
            </p>
          }
        />
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {fleet.map((v) => (
            <li key={v.slug} className="reveal">
              <div className="card flex h-full flex-col items-center gap-3 overflow-hidden p-4 md:p-5">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white">
                  <Image
                    src={v.image}
                    alt={`${v.name} in the G DRIVE fleet`}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
                    className="object-contain p-2"
                  />
                </div>
                <h3 className="display text-base font-bold text-link md:text-lg">{v.name}</h3>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/fleet/" variant="blue">
            Explore Our Fleet
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
