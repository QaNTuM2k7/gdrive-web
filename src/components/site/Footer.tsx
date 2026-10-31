import { EnvelopeSimpleIcon, LinkedinLogoIcon, MapPinIcon, PhoneIcon, YoutubeLogoIcon } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

import { site, telHref } from '@/lib/site'
import logoWhite from '../../../public/images/brand/logo-footer.png'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Our Fleet', href: '/fleet/' },
  { label: 'Our Solutions', href: '/solutions/' },
  { label: 'Industries', href: '/clients/' },
  { label: 'Technology', href: '/technology/' },
  { label: 'About Us', href: '/about/' },
  { label: 'Safety', href: '/safety/' },
  { label: 'Contact', href: '/contact/' },
]

const socialIcons = { LinkedIn: LinkedinLogoIcon, YouTube: YoutubeLogoIcon } as const

// Footer layout from the approved homepage design: brand, quick links, contact details and social links.
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy text-text-light">
      <div className="frame grid grid-cols-1 gap-10 px-4 pb-10 pt-14 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-10">
        <div className="flex flex-col gap-4 lg:col-span-4">
          <Link href="/" aria-label="G DRIVE home" className="w-fit">
            <Image src={logoWhite} alt="G DRIVE, Smart Urban Mobility" sizes="260px" className="h-auto w-[240px]" />
          </Link>
          <p className="text-sm text-text-light">
            <strong className="font-semibold">Powered by:</strong> New Travel Liines India Pvt Ltd
          </p>
          <p className="text-sm text-text-muted">An {site.certification} certified company</p>
        </div>

        <nav aria-label="Quick links" className="lg:col-span-3">
          <h2 className="mb-4 font-display text-lg font-bold text-gold">Quick Links</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-text-muted transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="mb-4 font-display text-lg font-bold text-gold">Contact Us</h2>
          <ul className="flex flex-col gap-4 text-sm text-text-muted">
            <li className="flex gap-3">
              <MapPinIcon weight="fill" aria-hidden className="mt-0.5 size-5 shrink-0 text-gold" />
              <address className="not-italic leading-relaxed">
                {site.address.street}, {site.address.locality} {site.address.postalCode}, {site.address.region}, India
              </address>
            </li>
            <li className="flex gap-3">
              <PhoneIcon weight="fill" aria-hidden className="mt-0.5 size-5 shrink-0 text-gold" />
              <span className="flex flex-col gap-1">
                {site.contacts.slice(0, 2).map((c) => (
                  <a key={c.phone} href={telHref(c.phone)} className="hover:text-gold">
                    {c.phone}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <EnvelopeSimpleIcon weight="fill" aria-hidden className="mt-0.5 size-5 shrink-0 text-gold" />
              <a href={`mailto:${site.email}`} className="hover:text-gold">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="mb-4 font-display text-lg font-bold text-gold">Follow Us</h2>
          <ul className="flex gap-3">
            {site.social.map((s) => {
              const SocialIcon = socialIcons[s.name as keyof typeof socialIcons]
              const tile = `flex size-11 items-center justify-center rounded-lg bg-blue text-white`
              return (
                <li key={s.name}>
                  {/* Until the client supplies a profile URL the icon is shown but is not a link. */}
                  {s.href ? (
                    <a
                      href={s.href}
                      aria-label={`G DRIVE on ${s.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${tile} transition-transform hover:-translate-y-0.5`}
                    >
                      <SocialIcon weight="fill" aria-hidden className="size-6" />
                    </a>
                  ) : (
                    <span role="img" aria-label={`${s.name} (coming soon)`} title={`${s.name} coming soon`} className={`${tile} opacity-70`}>
                      <SocialIcon weight="fill" aria-hidden className="size-6" />
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="frame flex flex-col gap-3 px-4 py-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <span>&copy; {year} G DRIVE. All rights reserved.</span>
        <span className="flex gap-4">
          <Link href="/privacy-policy/" className="hover:text-text-light">
            Privacy Policy
          </Link>
          <span aria-hidden>|</span>
          <Link href="/terms/" className="hover:text-text-light">
            Terms &amp; Conditions
          </Link>
        </span>
      </div>
    </footer>
  )
}
