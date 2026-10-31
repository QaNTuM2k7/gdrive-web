import Image from 'next/image'
import type { ReactNode } from 'react'

import { Picture } from '@/components/blocks/Picture'
import { RevealText } from '@/components/motion/RevealText'
import type { Img } from '@/content/types'

// First section below a page banner: heading and description on white, with a photo beside them on inner
// pages and an optional full-width figure, such as the technology flow diagram, underneath.
export function PageIntro({
  title,
  paragraphs,
  image,
  figure,
  children,
}: {
  title: string
  paragraphs: string[]
  image?: Img
  figure?: Img
  children?: ReactNode
}) {
  const heading = <RevealText text={title} className="display max-w-[20ch] text-3xl font-extrabold leading-tight md:text-5xl" />
  const text = (
    <>
      {paragraphs.map((p) => (
        <p key={p.slice(0, 32)} className="max-w-[62ch] text-lg leading-relaxed text-ink">
          {p}
        </p>
      ))}
      {children && <div className="flex flex-wrap gap-3 pt-2">{children}</div>}
    </>
  )

  return (
    <section className="bg-card">
      <div className="frame px-4 py-16 sm:px-6 md:py-20 lg:px-10">
        {image ? (
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="flex flex-col gap-6 lg:col-span-6">
              {heading}
              {text}
            </div>
            <Picture image={image} sizes="(min-width: 1024px) 45vw, 100vw" className="lg:col-span-6" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">{heading}</div>
            <div className="flex flex-col gap-5 lg:col-span-7">{text}</div>
          </div>
        )}
        {figure && (
          <Image
            src={figure.src}
            alt={figure.alt}
            placeholder="blur"
            sizes="(min-width: 768px) 729px, 100vw"
            className="mx-auto mt-12 h-auto w-full rounded-2xl"
            style={{ maxWidth: figure.src.width }}
          />
        )}
      </div>
    </section>
  )
}
