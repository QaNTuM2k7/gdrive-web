import Link from 'next/link'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { navTree } from '@/lib/nav'
import { mainNav, primaryContact, quoteHref, telHref } from '@/lib/site'
import { Logo } from './Logo'
import { SiteMenu } from './SiteMenu'

export function Header() {
  return (
    <header className="on-blue sticky top-0 z-50 border-b border-rule-on-blue">
      <div className="frame flex h-16 items-stretch">
        <div className="flex items-center border-r border-rule-on-blue px-4 sm:px-6">
          <Logo priority />
        </div>

        <nav aria-label="Main" className="hidden flex-1 items-stretch xl:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center border-r border-rule-on-blue px-5 font-mono text-[13px] uppercase tracking-[0.08em] text-on-blue-soft transition-colors hover:bg-blue-deep hover:text-on-blue"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-stretch">
          <div className="hidden md:flex">
            <ButtonLink href={quoteHref()} className="h-auto">
              Request a Quote
            </ButtonLink>
          </div>
          <SiteMenu tree={navTree} phone={primaryContact.phone} telHref={telHref(primaryContact.phone)} />
        </div>
      </div>
    </header>
  )
}
