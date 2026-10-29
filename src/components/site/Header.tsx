import Link from 'next/link'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { navTree } from '@/lib/nav'
import { mainNav, primaryContact, quoteHref, telHref } from '@/lib/site'
import { Logo } from './Logo'
import { SiteMenu } from './SiteMenu'

// White header with the colour logo, a gold quote block and a blue menu block, as in the approved design.
// No backdrop-filter on it: that would make the header the containing block for the fixed menu panel.
export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_rgb(11_18_40/0.06),0_6px_20px_-12px_rgb(11_18_40/0.25)]">
      <div className="frame flex h-16 items-stretch">
        <div className="flex items-center px-4 sm:px-6">
          <Logo variant="color" priority />
        </div>

        <nav aria-label="Main" className="hidden flex-1 items-stretch xl:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-4 font-mono text-[13px] uppercase tracking-[0.08em] text-text-dark transition-colors hover:text-blue"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-stretch">
          <div className="hidden md:flex">
            <ButtonLink href={quoteHref()} className="h-auto !rounded-none">
              Request a Quote
            </ButtonLink>
          </div>
          <SiteMenu tree={navTree} phone={primaryContact.phone} telHref={telHref(primaryContact.phone)} />
        </div>
      </div>
    </header>
  )
}
