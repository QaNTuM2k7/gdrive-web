import Image from 'next/image'

import { ParallaxImage } from '@/components/motion/ParallaxImage'
import { RevealText } from '@/components/motion/RevealText'
import fleetHighway from '../../../public/images/fleet-highway.jpg'
import pin from '../../../public/images/brand/pin-white.png'

// Homepage banner: city photo under a primary-blue tint, serif headline and the G pin mark.
// The photo is the banner slot; swap `fleetHighway` for a campaign image when one is supplied.
export function HeroBanner() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-blue text-on-blue">
      <ParallaxImage
        src={fleetHighway}
        alt=""
        priority
        placeholder="blur"
        sizes="100vw"
        imageClassName="object-[50%_42%]"
        className="-z-10"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-blue/90 via-blue/70 to-blue/55" />

      <div className="frame grid min-h-[clamp(320px,38vw,520px)] grid-cols-1 items-center gap-8 px-4 py-16 sm:px-6 md:grid-cols-12 lg:px-10">
        <RevealText
          as="h1"
          id="hero-title"
          onMount
          text="Corporate Mobility Solutions"
          className="font-serif text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.05] md:col-span-7"
        />
        <div className="rise hidden justify-end md:col-span-5 md:flex" style={{ '--delay': '300ms' } as React.CSSProperties}>
          <Image src={pin} alt="" priority sizes="320px" className="h-auto w-[clamp(180px,22vw,320px)] drop-shadow-[0_20px_40px_rgb(11_18_40/0.25)]" />
        </div>
      </div>
    </section>
  )
}
