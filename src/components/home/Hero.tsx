import Image from 'next/image'

import { LaneField } from '@/components/site/LaneField'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { quoteHref, site } from '@/lib/site'
import fleetHighway from '../../../public/images/fleet-highway.jpg'

export function Hero() {
  return (
    <section className="on-blue border-b border-rule-on-blue" aria-labelledby="hero-title">
      <div className="frame">
        <div className="border-b border-rule-on-blue px-4 pb-8 pt-10 sm:px-6 md:pt-14 lg:px-10">
          <h1
            id="hero-title"
            className="display rise max-w-[16ch] text-[clamp(2.6rem,6.4vw,6.1rem)] font-extrabold leading-[0.95]"
          >
            Smart urban mobility for modern enterprises
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12">
          <p
            className="rise flex items-start border-b border-rule-on-blue px-4 py-6 font-mono text-sm uppercase tracking-[0.12em] text-gold sm:px-6 md:col-span-4 md:border-b-0 md:border-r lg:px-10"
            style={{ '--delay': '120ms' } as React.CSSProperties}
          >
            {site.tagline}
          </p>
          <div
            className="rise flex flex-col gap-6 px-4 py-6 sm:px-6 md:col-span-8 lg:flex-row lg:items-end lg:justify-between lg:px-10"
            style={{ '--delay': '200ms' } as React.CSSProperties}
          >
            <p className="max-w-[46ch] text-lg leading-relaxed text-on-blue-soft">
              Employee transportation, corporate car rental, shuttles and fleet technology, coordinated by one
              mobility partner.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={quoteHref()}>Request a Quote</ButtonLink>
              <ButtonLink href="#solutions" variant="outline-light" arrow={false}>
                Explore solutions
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 border-t border-rule-on-blue md:grid-cols-12">
          <div className="relative aspect-[16/9] overflow-hidden md:col-span-8 md:aspect-auto md:h-[clamp(320px,38vw,540px)]">
            <Image
              src={fleetHighway}
              alt="G DRIVE bus, SUV, sedan and van driving on a city highway"
              priority
              placeholder="blur"
              sizes="(min-width: 768px) 66vw, 100vw"
              className="h-full w-full object-cover object-[50%_72%]"
            />
          </div>
          <div className="hidden border-l border-rule-on-blue p-8 text-cream md:col-span-4 md:flex">
            <LaneField className="h-full w-full" laneHeight={12} />
          </div>
        </div>
      </div>
    </section>
  )
}
