import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

import buses from '../../../public/images/fleet/buses.jpg'
import electric from '../../../public/images/fleet/electric-vehicles.jpg'
import sedans from '../../../public/images/fleet/sedans.jpg'
import suvs from '../../../public/images/fleet/suvs.jpg'
import vans from '../../../public/images/fleet/vans.jpg'

// Vehicle crops come from the brochure line-up spread until per-vehicle photography arrives.
const fleet: { slug: string; name: string; use: string; image: StaticImageData }[] = [
  { slug: 'buses', name: 'Buses', use: 'Large employee groups and campus routes', image: buses },
  { slug: 'vans', name: 'Vans', use: 'Smaller teams, shuttles and institutional travel', image: vans },
  { slug: 'suvs', name: 'SUVs', use: 'Guest transport and executive journeys', image: suvs },
  { slug: 'sedans', name: 'Sedans', use: 'Airport transfers and business meetings', image: sedans },
  { slug: 'electric-vehicles', name: 'Electric vehicles', use: 'For organisations with sustainability goals', image: electric },
]

export function FleetStrip() {
  return (
    <section aria-labelledby="fleet-title" className="border-b border-rule">
      <div className="frame">
        <div className="flex flex-col gap-5 border-b border-rule px-4 pb-10 pt-16 sm:px-6 md:flex-row md:items-end md:justify-between md:pt-24 lg:px-10">
          <h2 id="fleet-title" className="display max-w-[14ch] text-4xl font-extrabold md:text-6xl">
            A fleet for every requirement
          </h2>
          <Link
            href="/fleet/"
            className="font-mono text-[13px] uppercase tracking-[0.08em] text-link hover:text-ink"
          >
            View the fleet
          </Link>
        </div>

        <ul className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:thin]">
          {fleet.map((v) => (
            <li
              key={v.slug}
              className="w-[78%] shrink-0 snap-start border-r border-rule last:border-r-0 sm:w-[44%] lg:w-1/5"
            >
              <Link href={`/fleet/${v.slug}/`} className="group block">
                <div className="relative aspect-square overflow-hidden border-b border-rule bg-white">
                  <Image
                    src={v.image}
                    alt={`${v.name} in the G DRIVE fleet`}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 44vw, 78vw"
                    className="object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5 md:p-6">
                  <h3 className="display text-2xl font-bold transition-colors group-hover:text-link">{v.name}</h3>
                  <p className="text-sm text-ink-soft">{v.use}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
