import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Blocks } from '@/components/blocks/Blocks'
import { ClosingCta } from '@/components/home/ClosingCta'
import { Faq } from '@/components/home/Faq'
import { Industries } from '@/components/home/Industries'
import { WhyPartner } from '@/components/home/WhyPartner'
import { JsonLd } from '@/components/JsonLd'
import { RevealText } from '@/components/motion/RevealText'
import { PageHeader } from '@/components/site/PageHeader'
import { PageIntro } from '@/components/site/PageIntro'
import { ButtonLink } from '@/components/ui/ButtonLink'
import type { DetailPage, Section } from '@/content/types'
import type { ServiceValue } from '@/lib/leads/options'
import { faqJsonLd, serviceJsonLd } from '@/lib/jsonld'
import { quoteHref } from '@/lib/site'

// Cards linking to each page in a section, with a photo or vehicle cut-out. Leftover grid cells are
// filled with a call to action so no row ends in an empty box.
export function PageCards({
  title,
  pages,
  base,
  service,
  cta = {
    title: 'Not sure which fits?',
    body: 'Tell us about your passengers, routes and schedules. Our team will recommend the right option.',
  },
}: {
  title: string
  pages: DetailPage[]
  base: string
  service: ServiceValue
  cta?: { title: string; body: string }
}) {
  const lgRemainder = (3 - (pages.length % 3)) % 3
  const smRemainder = pages.length % 2
  return (
    <section className="bg-paper-2">
      <div className="frame px-4 py-16 sm:px-6 md:py-20 lg:px-10">
        <RevealText text={title} className="display mb-10 max-w-[22ch] text-3xl font-extrabold leading-tight md:text-4xl" />
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((p) => (
            <li key={p.slug} className="reveal">
              <Link href={`${base}/${p.slug}/`} className="card group flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                <div className={`relative aspect-[16/10] overflow-hidden ${p.hero.fit === 'contain' ? 'bg-white' : ''}`}>
                  <Image
                    src={p.hero.src}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    style={p.hero.focus ? { objectPosition: p.hero.focus } : undefined}
                    className={`transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] ${
                      p.hero.fit === 'contain' ? 'object-contain p-6' : 'object-cover'
                    }`}
                  />
                  {p.status && p.status !== 'live' && (
                    <span className="absolute left-4 top-4 rounded-full bg-navy px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-gold">
                      {p.status === 'pilot' ? 'In pilot' : 'In development'}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="display flex items-start justify-between gap-4 text-xl font-bold group-hover:text-link">
                    {p.label}
                    <ArrowUpRightIcon
                      aria-hidden
                      className="mt-1 size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </h3>
                  <p className="line-clamp-3 text-ink-soft">{p.intro}</p>
                </div>
              </Link>
            </li>
          ))}
          {lgRemainder > 0 && (
            <li
              className={`flex-col justify-between gap-8 rounded-2xl bg-blue p-6 text-on-blue shadow-card md:p-8 ${
                smRemainder ? 'flex' : 'hidden lg:flex'
              } ${lgRemainder === 2 ? 'lg:col-span-2' : 'lg:col-span-1'}`}
            >
              <div className="flex flex-col gap-3">
                <h3 className="display text-2xl font-bold">{cta.title}</h3>
                <p className="max-w-[40ch]">{cta.body}</p>
              </div>
              <div>
                <ButtonLink href={quoteHref(service)}>Request a Quote</ButtonLink>
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>
  )
}

function Related({ links }: { links: { href: string; label: string }[] }) {
  return (
    <nav aria-label="Related pages" className="bg-paper">
      <div className="frame flex flex-col gap-5 px-4 py-12 sm:px-6 md:flex-row md:items-center lg:px-10">
        <h2 className="eyebrow shrink-0 md:w-40">Related</h2>
        <ul className="flex flex-wrap gap-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="card group inline-flex items-center gap-3 px-5 py-3 font-semibold transition-colors hover:bg-blue hover:text-on-blue"
              >
                {l.label}
                <ArrowUpRightIcon aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export function DetailTemplate({ page, section }: { page: DetailPage; section: { base: string; label: string } }) {
  const path = `${section.base}/${page.slug}/`
  return (
    <>
      <JsonLd data={[serviceJsonLd({ name: page.h1, description: page.seo.description, path }), ...(page.faqs?.length ? [faqJsonLd(page.faqs)] : [])]} />
      <PageHeader
        title={page.h1}
        tone="gold"
        crumbs={[
          { label: section.label, href: `${section.base}/` },
          { label: page.label, href: path },
        ]}
        status={page.status}
      />
      <PageIntro title={page.h1} paragraphs={[page.intro]} image={page.hero} />
      <Blocks blocks={page.blocks} />
      {page.faqs && page.faqs.length > 0 && <Faq items={page.faqs} title="Frequently asked questions" />}
      {page.related && page.related.length > 0 && <Related links={page.related} />}
      <ClosingCta title={page.cta} service={page.service} />
    </>
  )
}

// Main pages share the home page's banner and its closing sections. `cards` replaces the default page cards.
export function HubTemplate({ section, cards, figure }: { section: Section; cards?: ReactNode; figure?: ReactNode }) {
  return (
    <>
      {section.faqs?.length ? <JsonLd data={faqJsonLd(section.faqs)} /> : null}
      <PageHeader title={section.h1} crumbs={[{ label: section.label, href: `${section.base}/` }]} image={section.hero} />
      <PageIntro title={section.h1} paragraphs={[section.intro]} figure={figure}>
        <ButtonLink href={quoteHref(section.service)}>Request a Quote</ButtonLink>
      </PageIntro>
      {cards ??
        (section.pages.length > 0 && section.cardsTitle && (
          <PageCards title={section.cardsTitle} pages={section.pages} base={section.base} service={section.service} cta={section.cardsCta} />
        ))}
      <Blocks blocks={section.blocks} />
      {section.faqs && section.faqs.length > 0 && <Faq items={section.faqs} title="Frequently asked questions" />}
      <WhyPartner />
      <Industries />
    </>
  )
}
