import { CheckIcon, InfoIcon } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

import { icons } from '@/components/icons'
import { RevealText } from '@/components/motion/RevealText'
import { RouteDiagram } from '@/components/motion/RouteDiagram'
import type { Block, Img } from '@/content/types'

// Content blocks for inner pages, in the card-based style of the approved homepage design.

const wrap = 'frame px-4 py-16 sm:px-6 md:py-20 lg:px-10'

function SectionHead({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="mb-10 flex flex-col gap-4">
      <RevealText text={title} className="display max-w-[22ch] text-3xl font-extrabold leading-tight md:text-4xl" />
      {intro && <p className="max-w-[62ch] text-lg leading-relaxed text-ink-soft">{intro}</p>}
    </div>
  )
}

function Picture({ image, sizes, className = '' }: { image: Img; sizes: string; className?: string }) {
  const contain = image.fit === 'contain'
  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-card ${contain ? 'bg-white' : ''} ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        placeholder={image.src.blurDataURL ? 'blur' : 'empty'}
        sizes={sizes}
        style={image.focus ? { objectPosition: image.focus } : undefined}
        className={contain ? 'object-contain p-6' : 'object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]'}
      />
    </div>
  )
}

function Features({ block, tone }: { block: Extract<Block, { type: 'features' }>; tone: string }) {
  const n = block.items.length
  const cols = n % 3 === 0 ? 'md:grid-cols-3' : n % 2 === 0 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'
  return (
    <section className={tone}>
      <div className={wrap}>
        <SectionHead title={block.title} intro={block.intro} />
        <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${cols}`}>
          {block.items.map((item) => {
            const Icon = item.icon ? icons[item.icon] : undefined
            return (
              <div key={item.title} className="card reveal group flex flex-col gap-4 p-6 transition-transform duration-300 hover:-translate-y-1 md:p-7">
                {Icon && (
                  <span className="flex size-12 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--link)_12%,transparent)]">
                    <Icon weight="duotone" aria-hidden className="size-7 text-link" />
                  </span>
                )}
                <h3 className="display text-xl font-bold">{item.title}</h3>
                <p className="text-ink-soft">{item.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Split({ block, tone }: { block: Extract<Block, { type: 'split' }>; tone: string }) {
  const blue = block.tone === 'blue'
  return (
    <section className={blue ? 'on-deep' : tone}>
      <div className={`${wrap} grid grid-cols-1 items-center gap-10 lg:grid-cols-12`}>
        <Picture
          image={block.image}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={`aspect-[16/10] lg:col-span-6 ${block.reverse ? 'lg:order-last' : ''}`}
        />
        <div className="flex flex-col gap-6 lg:col-span-6">
          <RevealText text={block.title} className="display max-w-[20ch] text-3xl font-extrabold leading-tight md:text-4xl" />
          {block.body.map((p) => (
            <p key={p.slice(0, 32)} className={`max-w-[58ch] text-lg leading-relaxed ${blue ? 'text-on-blue-soft' : 'text-ink-soft'}`}>
              {p}
            </p>
          ))}
          {block.points && (
            <ul className="flex flex-col gap-3">
              {block.points.map((pt) => (
                <li key={pt} className="flex items-start gap-3">
                  <CheckIcon aria-hidden weight="bold" className={`mt-1 size-4 shrink-0 ${blue ? 'text-gold' : 'text-link'}`} />
                  <span className={blue ? 'text-on-blue' : ''}>{pt}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

function Steps({ block }: { block: Extract<Block, { type: 'steps' }> }) {
  return (
    <section className="on-deep">
      <div className={wrap}>
        <div className="mb-10 flex flex-col gap-4">
          <RevealText text={block.title} className="display max-w-[22ch] text-3xl font-extrabold leading-tight md:text-4xl" />
          {block.intro && <p className="max-w-[62ch] text-lg leading-relaxed text-on-blue-soft">{block.intro}</p>}
        </div>
        <ol className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${block.items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
          {block.items.map((s, i) => (
            <li key={s.title} className="reveal flex flex-col gap-4 rounded-2xl bg-white/[0.07] p-6 md:p-7">
              <span className="flex size-12 items-center justify-center rounded-full bg-gold font-mono font-medium text-navy">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="display text-xl font-bold">{s.title}</h3>
              <p className="text-on-blue-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Checklist({ block, tone }: { block: Extract<Block, { type: 'checklist' }>; tone: string }) {
  return (
    <section className={tone}>
      <div className={`${wrap} grid grid-cols-1 items-center gap-10 lg:grid-cols-12`}>
        <div className={`flex flex-col gap-6 ${block.image ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          <RevealText text={block.title} className="display max-w-[22ch] text-3xl font-extrabold leading-tight md:text-4xl" />
          {block.intro && <p className="max-w-[60ch] text-lg leading-relaxed text-ink-soft">{block.intro}</p>}
          <ul className={`grid grid-cols-1 gap-3 ${block.image ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
            {block.items.map((item) => (
              <li key={item} className="card flex items-start gap-3 px-5 py-4">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--link)_12%,transparent)]">
                  <CheckIcon aria-hidden weight="bold" className="size-3.5 text-link" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {block.image && (
          <Picture image={block.image} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] lg:col-span-5" />
        )}
      </div>
    </section>
  )
}

function Tiles({ block, tone }: { block: Extract<Block, { type: 'tiles' }>; tone: string }) {
  return (
    <section className={tone}>
      <div className={wrap}>
        <SectionHead title={block.title} intro={block.intro} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {block.items.map((t) => (
            <div key={t.label} className="card reveal group flex flex-col gap-4 p-6 md:p-7">
              <Image
                src={t.image}
                alt=""
                width={88}
                height={88}
                className="size-[88px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
              />
              <h3 className="display text-xl font-bold">{t.label}</h3>
              <p className="text-ink-soft">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Compare({ block, tone }: { block: Extract<Block, { type: 'compare' }>; tone: string }) {
  return (
    <section className={tone}>
      <div className={wrap}>
        <SectionHead title={block.title} intro={block.intro} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {block.items.map((c) => (
            <figure key={c.label} className="card reveal flex flex-col overflow-hidden">
              <div className="relative aspect-[4/3] bg-white">
                <Image
                  src={c.image.src}
                  alt={c.image.alt}
                  fill
                  placeholder={c.image.src.blurDataURL ? 'blur' : 'empty'}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-contain p-6"
                />
              </div>
              <figcaption className="flex flex-col gap-2 p-6 md:p-7">
                <span className="display text-xl font-bold">{c.label}</span>
                <span className="text-ink-soft">{c.body}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Diagram({ block, tone }: { block: Extract<Block, { type: 'diagram' }>; tone: string }) {
  return (
    <section className={tone}>
      <div className={`${wrap} grid grid-cols-1 items-center gap-10 lg:grid-cols-12`}>
        <div className="flex flex-col gap-6 lg:col-span-5">
          <RevealText text={block.title} className="display max-w-[18ch] text-3xl font-extrabold leading-tight md:text-4xl" />
          <p className="max-w-[52ch] text-lg leading-relaxed text-ink-soft">{block.body}</p>
        </div>
        <div className="on-deep relative aspect-[8/5] overflow-hidden rounded-2xl text-cream shadow-card lg:col-span-7">
          <RouteDiagram name={block.diagram} className="absolute inset-0 p-4 md:p-8" />
        </div>
      </div>
    </section>
  )
}

function Cities({ block, tone }: { block: Extract<Block, { type: 'cities' }>; tone: string }) {
  return (
    <section className={tone}>
      <div className={`${wrap} grid grid-cols-1 items-center gap-8 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <RevealText text={block.title} className="display max-w-[18ch] text-3xl font-extrabold leading-tight md:text-4xl" />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-7">
          <p className="max-w-[60ch] text-lg leading-relaxed text-ink-soft">{block.body}</p>
          <ul className="flex flex-wrap gap-3">
            {['Chennai', 'Tamil Nadu', 'Bengaluru', 'Hyderabad'].map((c) => (
              <li key={c} className="rounded-full bg-blue px-4 py-2 font-mono text-sm uppercase tracking-[0.08em] text-on-blue">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Note({ block, tone }: { block: Extract<Block, { type: 'note' }>; tone: string }) {
  return (
    <div className={tone}>
      <div className="frame px-4 pb-10 sm:px-6 lg:px-10">
        <div className="flex items-start gap-3 rounded-xl bg-[color-mix(in_srgb,var(--link)_8%,transparent)] px-5 py-4 text-sm text-ink-soft">
          <InfoIcon aria-hidden className="mt-0.5 size-5 shrink-0 text-link" />
          <p className="max-w-[90ch]">{block.body}</p>
        </div>
      </div>
    </div>
  )
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  // Light sections alternate between cream and white so consecutive blocks stay distinct without lines.
  // A note belongs to the section above it, so it reuses that section's background.
  const tones: string[] = []
  let light = 0
  for (const block of blocks) {
    const isDark = block.type === 'steps' || (block.type === 'split' && block.tone === 'blue')
    tones.push(block.type === 'note' ? (light % 2 === 1 ? 'bg-paper' : 'bg-card') : light++ % 2 === 0 ? 'bg-paper' : 'bg-card')
    if (isDark) light = 0
  }
  return (
    <>
      {blocks.map((block, i) => {
        const tone = tones[i]
        switch (block.type) {
          case 'features':
            return <Features key={i} block={block} tone={tone} />
          case 'split':
            return <Split key={i} block={block} tone={tone} />
          case 'steps':
            return <Steps key={i} block={block} />
          case 'checklist':
            return <Checklist key={i} block={block} tone={tone} />
          case 'tiles':
            return <Tiles key={i} block={block} tone={tone} />
          case 'compare':
            return <Compare key={i} block={block} tone={tone} />
          case 'diagram':
            return <Diagram key={i} block={block} tone={tone} />
          case 'cities':
            return <Cities key={i} block={block} tone={tone} />
          case 'note':
            return <Note key={i} block={block} tone={tone} />
        }
      })}
    </>
  )
}
