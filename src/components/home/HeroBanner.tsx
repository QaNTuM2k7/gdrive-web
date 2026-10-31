import Image from 'next/image'

import { RevealText } from '@/components/motion/RevealText'
import { PhotoBanner } from '@/components/site/PhotoBanner'
import homeBanner from '../../../public/images/banners/home.jpg'
import pin from '../../../public/images/brand/pin-white.png'

// Homepage banner. The G pin appears here only; the main pages use the same banner without it.
export function HeroBanner() {
  return (
    <PhotoBanner src={homeBanner} focus="62% 50%" labelledBy="hero-title">
      <div className="frame grid w-full grid-cols-1 items-center gap-8 px-4 py-16 sm:px-6 md:grid-cols-12 md:py-6 lg:px-10">
        <RevealText
          as="h1"
          id="hero-title"
          onMount
          text="Corporate Mobility Solutions"
          className="font-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05] opacity-90 md:col-span-8"
        />
        <div className="rise hidden justify-end self-start md:col-span-4 md:flex" style={{ '--delay': '300ms' } as React.CSSProperties}>
          <Image src={pin} alt="" priority sizes="320px" className="h-auto w-[clamp(110px,14vw,210px)] opacity-70" />
        </div>
      </div>
    </PhotoBanner>
  )
}
