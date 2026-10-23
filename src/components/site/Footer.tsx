import Link from 'next/link'

import { navTree } from '@/lib/nav'
import { quoteHref, site, telHref } from '@/lib/site'
import { Logo } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()
  const columns = navTree.filter((g) => g.label !== 'People & Excellence')
  const people = navTree.find((g) => g.label === 'People & Excellence')

  return (
    <footer className="bg-navy text-cream" style={{ ['--frame-rule' as string]: 'rgb(244 242 223 / 0.14)' }}>
      <div className="frame grid grid-cols-1 lg:grid-cols-12">
        <div className="flex flex-col gap-6 border-b border-cream/15 p-6 md:p-10 lg:col-span-4 lg:border-r">
          <Logo />
          <p className="max-w-sm text-cream/75">
            Enterprise mobility from {site.legalName}: employee transportation, corporate travel, shuttles and fleet
            technology.
          </p>
          <address className="not-italic text-sm leading-relaxed text-cream/75">
            {site.address.street},
            <br />
            {site.address.locality} {site.address.postalCode}, {site.address.region}, India
          </address>
          <div className="flex flex-col gap-3">
            {site.contacts.slice(0, 2).map((c) => (
              <div key={c.phone} className="text-sm">
                <a href={telHref(c.phone)} className="font-mono text-cream hover:text-gold">
                  {c.phone}
                </a>
                <span className="block text-cream/60">
                  {c.name}, {c.role}
                </span>
              </div>
            ))}
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-gold">An {site.certification} certified company</p>
        </div>

        <div className="grid grid-cols-2 border-b border-cream/15 sm:grid-cols-3 lg:col-span-8">
          {columns.map((g) => (
            <nav key={g.label} aria-label={g.label} className="flex flex-col gap-3 border-b border-r border-cream/15 p-6 md:p-8">
              <Link href={g.href} className="mb-1 font-mono text-xs uppercase tracking-[0.1em] text-cream/55 hover:text-gold">
                {g.label}
              </Link>
              {g.children.map((c) => (
                <Link key={c.href} href={c.href} className="text-sm text-cream/85 hover:text-gold">
                  {c.label}
                </Link>
              ))}
              {g.label === 'Safety' &&
                people?.children.map((c) => (
                  <Link key={c.href} href={c.href} className="text-sm text-cream/85 hover:text-gold">
                    {c.label}
                  </Link>
                ))}
            </nav>
          ))}
          <div className="flex flex-col justify-between gap-6 border-b border-r border-cream/15 p-6 md:p-8">
            <p className="display text-xl font-bold leading-snug">Planning employee transport or corporate travel?</p>
            <Link
              href={quoteHref()}
              className="inline-flex h-11 w-fit items-center bg-gold px-5 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-navy hover:bg-[#ffc31f]"
            >
              Request a Quote
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-6 py-5 text-xs text-cream/55 sm:flex-row sm:justify-between md:px-10 lg:col-span-12">
          <span>
            &copy; {year} {site.legalName}
          </span>
          <span className="flex gap-5">
            <Link href="/privacy-policy/" className="hover:text-cream">
              Privacy policy
            </Link>
            <Link href="/terms/" className="hover:text-cream">
              Terms
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
