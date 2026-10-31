import Image from 'next/image'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { quoteHref, site } from '@/lib/site'
import fleetHighway from '../../../public/images/fleet/fleet-highway-wide.jpg'

// Image beside the main description, following the approved homepage design.
export function IntroSplit() {
  return (
    <section aria-labelledby="intro-split-title" className="bg-card">
      <div className="frame grid grid-cols-1 lg:grid-cols-12">
        <div className="relative aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[460px]">
          <Image
            src={fleetHighway}
            alt="G DRIVE bus, SUV, sedan and van driving on a city highway"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-5 px-4 py-12 sm:px-6 md:py-16 lg:col-span-5 lg:px-12">
          <h2 id="intro-split-title" className="display max-w-[18ch] text-3xl font-bold leading-tight text-blue md:text-4xl">
            Smart Urban Mobility for Modern Enterprises
          </h2>
          <p className="font-mono text-sm uppercase tracking-[0.12em] text-deep-blue">
            {site.tagline}
          </p>
          <p className="max-w-[52ch] text-lg leading-relaxed text-ink">
            G DRIVE delivers integrated enterprise mobility solutions that connect people, vehicles and technology. From
            corporate employee transportation and executive car rentals to campus shuttles and intelligent fleet
            monitoring, we help organizations manage transportation requirements through a coordinated,
            technology-enabled approach.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href={quoteHref()}>Request a Quote</ButtonLink>
            <ButtonLink href="#solutions" variant="blue" arrow={false}>
              Explore Our Solutions
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
