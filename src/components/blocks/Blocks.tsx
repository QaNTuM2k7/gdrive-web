import { CheckIcon, InfoIcon } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

import { icons } from '@/components/icons'
import { RevealText } from '@/components/motion/RevealText'
import { RouteDiagram } from '@/components/motion/RouteDiagram'
import type { Block, Img } from '@/content/types'

const pad = 'px-4 sm:px-6 lg:px-10'

function SectionHead({ title, intro, id }: { title: string; intro?: string; id?: string }) {
  return (
    <div className={`flex flex-col gap-5 border-b border-rule pb-10 pt-16 md:pt-20 ${pad}`}>
      <RevealText id={id} text={title} className="display max-w-[22ch] text-3xl font-extrabold md:text-5xl" />
      {intro && <p className="max-w-[62ch] text-lg leading-relaxed text-ink-soft">{intro}</p>}
    </div>
  )
}

function Picture({ image, sizes, className = '' }: { image: Img; sizes: string; className?: string }) {
  const contain = image.fit === 'contain'
  return (
    <div className={`relative overflow-hidden ${contain ? 'bg-white' : ''} ${className}`}>
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

function Features({ block }: { block: Extract<Block, { type: 'features' }> }) {
  const n = block.items.length
  const perRow = n % 3 === 0 ? 3 : n % 2 === 0 ? 2 : 3
  return (
    <section className="border-b border-rule">
      <div className="frame">
        <SectionHead title={block.title} intro={block.intro} />
        <div className={`grid grid-cols-1 ${perRow === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {block.items.map((item, i) => {
            const Icon = item.icon ? icons[item.icon] : undefined
            return (
              <div
                key={item.title}
                className={`reveal group flex flex-col gap-4 border-b border-rule p-6 transition-colors hover:bg-paper-2 md:p-8 ${
                  (i + 1) % perRow === 0 ? '' : 'md:border-r'
                }`}
              >
                {Icon && (
                  <Icon
                    weight="light"
                    aria-hidden
                    className="size-10 text-link transition-transform duration-500 group-hover:-translate-y-1"
                  />
                )}
                <h3 className="display text-2xl font-bold">{item.title}</h3>
                <p className="text-ink-soft">{item.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Split({ block }: { block: Extract<Block, { type: 'split' }> }) {
  const blue = block.tone === 'blue'
  return (
    <section className={`border-b ${blue ? 'on-deep border-rule-on-blue' : 'border-rule'}`}>
      <div className="frame grid grid-cols-1 lg:grid-cols-12">
        <Picture
          image={block.image}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={`aspect-[16/10] lg:col-span-6 lg:aspect-auto lg:min-h-[480px] ${
            block.reverse ? 'lg:order-last lg:border-l' : 'lg:border-r'
          } ${blue ? 'border-rule-on-blue' : 'border-rule'}`}
        />
        <div className={`flex flex-col justify-center gap-6 py-12 md:py-16 lg:col-span-6 ${pad}`}>
          <RevealText text={block.title} className="display max-w-[20ch] text-3xl font-extrabold md:text-4xl" />
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
    <section className="on-blue border-b border-rule-on-blue">
      <div className="frame">
        <div className={`flex flex-col gap-5 border-b border-rule-on-blue pb-10 pt-16 md:pt-20 ${pad}`}>
          <RevealText text={block.title} className="display max-w-[22ch] text-3xl font-extrabold md:text-5xl" />
          {block.intro && <p className="max-w-[62ch] text-lg leading-relaxed text-on-blue-soft">{block.intro}</p>}
        </div>
        <ol className={`grid grid-cols-1 sm:grid-cols-2 ${block.items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
          {block.items.map((s, i) => (
            <li key={s.title} className="reveal flex flex-col gap-4 border-b border-rule-on-blue p-6 sm:border-r md:p-8 lg:border-b-0 lg:last:border-r-0">
              <span className="flex size-12 items-center justify-center border border-gold font-mono text-gold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="display text-2xl font-bold">{s.title}</h3>
              <p className="text-on-blue-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Checklist({ block }: { block: Extract<Block, { type: 'checklist' }> }) {
  return (
    <section className="border-b border-rule">
      <div className="frame grid grid-cols-1 lg:grid-cols-12">
        <div className={`flex flex-col gap-6 py-12 md:py-16 ${block.image ? 'lg:col-span-7 lg:border-r lg:border-rule' : 'lg:col-span-12'} ${pad}`}>
          <RevealText text={block.title} className="display max-w-[22ch] text-3xl font-extrabold md:text-4xl" />
          {block.intro && <p className="max-w-[60ch] text-lg leading-relaxed text-ink-soft">{block.intro}</p>}
          <ul className={`grid grid-cols-1 gap-x-10 ${block.image ? '' : 'md:grid-cols-2'}`}>
            {block.items.map((item) => (
              <li key={item} className="flex items-start gap-3 border-b border-rule py-4 text-lg">
                <CheckIcon aria-hidden weight="bold" className="mt-1.5 size-4 shrink-0 text-link" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        {block.image && (
          <Picture image={block.image} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] lg:col-span-5 lg:aspect-auto lg:min-h-[420px]" />
        )}
      </div>
    </section>
  )
}

function Tiles({ block }: { block: Extract<Block, { type: 'tiles' }> }) {
  return (
    <section className="border-b border-rule">
      <div className="frame">
        <SectionHead title={block.title} intro={block.intro} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {block.items.map((t) => (
            <div key={t.label} className="reveal group flex flex-col gap-4 border-b border-rule p-6 sm:border-r md:p-8 lg:border-b-0 lg:last:border-r-0">
              <Image
                src={t.image}
                alt=""
                width={96}
                height={96}
                className="size-24 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:rotate-[-3deg]"
              />
              <h3 className="display text-2xl font-bold">{t.label}</h3>
              <p className="text-ink-soft">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Compare({ block }: { block: Extract<Block, { type: 'compare' }> }) {
  return (
    <section className="border-b border-rule">
      <div className="frame">
        <SectionHead title={block.title} intro={block.intro} />
        <div className="grid grid-cols-1 md:grid-cols-2">
          {block.items.map((c, i) => (
            <figure key={c.label} className={`reveal flex flex-col border-b border-rule md:border-b-0 ${i === 0 ? 'md:border-r' : ''}`}>
              <Picture image={c.image} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3]" />
              <figcaption className={`flex flex-col gap-2 border-t border-rule p-6 md:p-8`}>
                <span className="display text-2xl font-bold">{c.label}</span>
                <span className="text-ink-soft">{c.body}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Diagram({ block }: { block: Extract<Block, { type: 'diagram' }> }) {
  return (
    <section className="border-b border-rule">
      <div className="frame grid grid-cols-1 lg:grid-cols-12">
        <div className={`flex flex-col justify-center gap-6 py-12 md:py-16 lg:col-span-5 lg:border-r lg:border-rule ${pad}`}>
          <RevealText text={block.title} className="display max-w-[18ch] text-3xl font-extrabold md:text-4xl" />
          <p className="max-w-[52ch] text-lg leading-relaxed text-ink-soft">{block.body}</p>
        </div>
        <div className="on-deep relative aspect-[8/5] text-cream lg:col-span-7 lg:aspect-auto lg:min-h-[400px]">
          <RouteDiagram name={block.diagram} className="absolute inset-0 p-4 md:p-8" />
        </div>
      </div>
    </section>
  )
}

function Cities({ block }: { block: Extract<Block, { type: 'cities' }> }) {
  return (
    <section className="border-b border-rule">
      <div className="frame grid grid-cols-1 lg:grid-cols-12">
        <div className={`py-12 md:py-16 lg:col-span-5 lg:border-r lg:border-rule ${pad}`}>
          <RevealText text={block.title} className="display max-w-[18ch] text-3xl font-extrabold md:text-4xl" />
        </div>
        <div className={`flex flex-col justify-center gap-6 py-12 md:py-16 lg:col-span-7 ${pad}`}>
          <p className="max-w-[60ch] text-lg leading-relaxed text-ink-soft">{block.body}</p>
          <ul className="flex flex-wrap gap-3">
            {['Chennai', 'Tamil Nadu', 'Bengaluru', 'Hyderabad'].map((c) => (
              <li key={c} className="border border-rule-strong px-4 py-2 font-mono text-sm uppercase tracking-[0.08em]">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Note({ block }: { block: Extract<Block, { type: 'note' }> }) {
  return (
    <div className="border-b border-rule">
      <div className={`frame flex items-start gap-3 py-5 text-sm text-ink-soft ${pad}`}>
        <InfoIcon aria-hidden className="mt-0.5 size-5 shrink-0 text-link" />
        <p className="max-w-[90ch]">{block.body}</p>
      </div>
    </div>
  )
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'features':
            return <Features key={i} block={block} />
          case 'split':
            return <Split key={i} block={block} />
          case 'steps':
            return <Steps key={i} block={block} />
          case 'checklist':
            return <Checklist key={i} block={block} />
          case 'tiles':
            return <Tiles key={i} block={block} />
          case 'compare':
            return <Compare key={i} block={block} />
          case 'diagram':
            return <Diagram key={i} block={block} />
          case 'cities':
            return <Cities key={i} block={block} />
          case 'note':
            return <Note key={i} block={block} />
        }
      })}
    </>
  )
}
