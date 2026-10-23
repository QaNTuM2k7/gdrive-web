import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

import { Blocks } from '@/components/blocks/Blocks'
import { ClosingCta } from '@/components/home/ClosingCta'
import { Faq } from '@/components/home/Faq'
import { RevealText } from '@/components/motion/RevealText'
import { SectionIndicator } from '@/components/motion/SectionIndicator'
import { PageHeader } from '@/components/site/PageHeader'
import { ButtonLink } from '@/components/ui/ButtonLink'
import type { DetailPage, Section } from '@/content/types'
import { faqJsonLd, serviceJsonLd } from '@/lib/jsonld'
import { quoteHref } from '@/lib/site'

function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

// Cards linking to each page in a section, with a photo or vehicle cut-out.
export function PageCards({ title, pages, base }: { title: string; pages: DetailPage[]; base: string }) {
  return (
    <section data-section={title} className="border-b border-rule">
      <div className="frame">
        <div className="border-b border-rule px-4 pb-10 pt-16 sm:px-6 md:pt-20 lg:px-10">
          <RevealText text={title} className="display max-w-[22ch] text-3xl font-extrabold md:text-5xl" />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((p) => (
            <li key={p.slug} className="border-b border-rule sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0">
              <Link href={`${base}/${p.slug}/`} className="group flex h-full flex-col">
                <div className={`relative aspect-[16/10] overflow-hidden border-b border-rule ${p.hero.fit === 'contain' ? 'bg-cream' : ''}`}>
                  <Image
                    src={p.hero.src}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    style={p.hero.focus ? { objectPosition: p.hero.focus } : undefined}
                    className={`transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] ${
                      p.hero.fit === 'contain' ? 'object-contain p-6' : 'object-cover'
                    }`}
                  />
                  {p.status && p.status !== 'live' && (
                    <span className="absolute left-4 top-4 bg-navy px-2 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-gold">
                      {p.status === 'pilot' ? 'In pilot' : 'In development'}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6 md:p-8">
                  <h3 className="display flex items-start justify-between gap-4 text-2xl font-bold group-hover:text-link">
                    {p.label}
                    <ArrowUpRightIcon
                      aria-hidden
                      className="mt-1 size-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </h3>
                  <p className="line-clamp-3 text-ink-soft">{p.intro}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Related({ links }: { links: { href: string; label: string }[] }) {
  return (
    <nav aria-label="Related pages" className="border-b border-rule">
      <div className="frame grid grid-cols-1 md:grid-cols-12">
        <h2 className="flex items-center border-b border-rule px-4 py-6 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft sm:px-6 md:col-span-3 md:border-b-0 md:border-r lg:px-10">
          Related
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3 md:col-span-9">
          {links.map((l) => (
            <li key={l.href} className="border-b border-rule last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
              <Link
                href={l.href}
                className="group flex h-full items-center justify-between gap-3 px-6 py-6 transition-colors hover:bg-blue hover:text-on-blue"
              >
                <span className="display text-lg font-bold">{l.label}</span>
                <ArrowUpRightIcon aria-hidden className="size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
      <SectionIndicator />
      <PageHeader
        title={page.h1}
        intro={<p>{page.intro}</p>}
        crumbs={[
          { label: section.label, href: `${section.base}/` },
          { label: page.label, href: path },
        ]}
        image={page.hero}
        status={page.status}
      >
        <ButtonLink href={quoteHref(page.service)}>Request a Quote</ButtonLink>
      </PageHeader>
      <Blocks blocks={page.blocks} />
      {page.faqs && page.faqs.length > 0 && <Faq items={page.faqs} title="Frequently asked questions" />}
      {page.related && page.related.length > 0 && <Related links={page.related} />}
      <ClosingCta title={page.cta} service={page.service} />
    </>
  )
}

export function HubTemplate({ section }: { section: Section }) {
  return (
    <>
      {section.faqs?.length ? <JsonLd data={faqJsonLd(section.faqs)} /> : null}
      <SectionIndicator />
      <PageHeader
        title={section.h1}
        intro={<p>{section.intro}</p>}
        crumbs={[{ label: section.label, href: `${section.base}/` }]}
        image={section.hero}
      >
        <ButtonLink href={quoteHref(section.service)}>Request a Quote</ButtonLink>
      </PageHeader>
      <PageCards title={section.cardsTitle} pages={section.pages} base={section.base} />
      <Blocks blocks={section.blocks} />
      {section.faqs && section.faqs.length > 0 && <Faq items={section.faqs} title="Frequently asked questions" />}
      <ClosingCta title={section.cta} service={section.service} />
    </>
  )
}
