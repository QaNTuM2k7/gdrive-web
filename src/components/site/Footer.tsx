import Link from 'next/link'

import { mainNav, site, solutions, telHref } from '@/lib/site'
import { Logo } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy text-cream" style={{ ['--frame-rule' as string]: 'rgb(244 242 223 / 0.14)' }}>
      <div className="frame grid grid-cols-1 md:grid-cols-12">
        <div className="flex flex-col gap-6 border-b border-cream/15 p-6 md:col-span-5 md:border-r md:p-10">
          <Logo />
          <p className="max-w-sm text-cream/75">
            Enterprise mobility from {site.legalName}. Employee transportation, corporate travel, shuttles
            and fleet technology.
          </p>
          <address className="not-italic text-sm leading-relaxed text-cream/75">
            {site.legalName}
            <br />
            {site.address.street},
            <br />
            {site.address.locality} {site.address.postalCode}, {site.address.region}, India
          </address>
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-gold">
            An {site.certification} certified company
          </p>
        </div>

        <div className="grid grid-cols-2 border-b border-cream/15 md:col-span-7 md:grid-cols-3">
          <nav aria-label="Solutions" className="flex flex-col gap-3 border-r border-cream/15 p-6 md:p-10">
            <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.1em] text-cream/55">Solutions</h2>
            {solutions.map((s) => (
              <Link key={s.slug} href={`/solutions/${s.slug}/`} className="text-sm text-cream/85 hover:text-gold">
                {s.short}
              </Link>
            ))}
          </nav>
          <nav aria-label="Company" className="flex flex-col gap-3 p-6 md:border-r md:border-cream/15 md:p-10">
            <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.1em] text-cream/55">Company</h2>
            {mainNav
              .filter((n) => n.label !== 'Solutions')
              .map((n) => (
                <Link key={n.href} href={n.href} className="text-sm text-cream/85 hover:text-gold">
                  {n.label}
                </Link>
              ))}
            <Link href="/contact/" className="text-sm text-cream/85 hover:text-gold">
              Contact
            </Link>
          </nav>
          <div className="col-span-2 flex flex-col gap-4 border-t border-cream/15 p-6 md:col-span-1 md:border-t-0 md:p-10">
            <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.1em] text-cream/55">Talk to us</h2>
            {site.contacts.slice(0, 2).map((c) => (
              <div key={c.phone} className="text-sm">
                <a href={telHref(c.phone)} className="block font-mono text-cream hover:text-gold">
                  {c.phone}
                </a>
                <span className="text-cream/60">
                  {c.name}, {c.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 px-6 py-5 text-xs text-cream/55 sm:flex-row sm:justify-between md:col-span-12 md:px-10">
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
