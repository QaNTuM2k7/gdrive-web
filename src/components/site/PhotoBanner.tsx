import Image, { type StaticImageData } from 'next/image'
import type { ReactNode } from 'react'

// Full-width photo under a blue fade, used by the home page and every main page. The supplied banners are
// 5:2, so from tablet width up the frame matches that ratio and the whole photo shows. Phones crop to fit.
export function PhotoBanner({
  src,
  focus,
  labelledBy,
  children,
}: {
  src: StaticImageData
  focus?: string
  labelledBy?: string
  children: ReactNode
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      className="relative isolate flex min-h-[320px] overflow-hidden bg-blue text-on-blue md:aspect-[5/2] md:max-h-[760px] md:w-full"
    >
      <Image
        src={src}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        style={focus ? { objectPosition: focus } : undefined}
        className="-z-10 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-blue/90 from-10% via-blue/60 via-45% to-blue/5" />
      {children}
    </section>
  )
}
