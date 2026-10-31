'use client'

import { ArrowUpRightIcon, PhoneIcon, XIcon } from '@phosphor-icons/react'
import { useLenis } from 'lenis/react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import type { NavGroup } from '@/lib/nav'

// Full-screen menu listing every section and page, opened from the header on all screen sizes.
export function SiteMenu({ tree, phone, telHref }: { tree: NavGroup[]; phone: string; telHref: string }) {
  const [open, setOpen] = useState(false)
  const lenis = useLenis()
  const pathname = usePathname()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    // Lock scrolling in one place only. Setting overflow on <body> while Lenis clips <html> turns <body>
    // into its own scroll container, which detaches the sticky header from the viewport.
    const root = document.documentElement
    if (lenis) lenis.stop()
    else root.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a')?.focus({ preventScroll: true })
    return () => {
      document.removeEventListener('keydown', onKey)
      if (lenis) lenis.start()
      else root.style.overflow = ''
    }
  }, [open, lenis])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((v) => !v)}
        className="group flex h-16 items-center gap-3 bg-blue px-5 font-mono text-[13px] uppercase tracking-[0.08em] text-on-blue transition-colors hover:bg-blue-deep"
      >
        <span className="hidden sm:inline">{open ? 'Close' : 'Menu'}</span>
        <span aria-hidden className="relative block h-3 w-6">
          <span className={`absolute left-0 h-0.5 w-6 bg-current transition-transform duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
          <span className={`absolute left-0 h-0.5 w-6 bg-current transition-transform duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-2.5'}`} />
        </span>
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-lenis-prevent
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="on-blue fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-rule-on-blue"
          >
            <div className="frame grid min-h-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {tree.map((g, gi) => (
                <motion.nav
                  key={g.label}
                  aria-label={g.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + gi * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-4 border-b border-rule-on-blue p-6 md:border-r md:p-8 md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0"
                >
                  <Link
                    href={g.href}
                    onClick={close}
                    aria-current={pathname === g.href ? 'page' : undefined}
                    className="display group flex items-center justify-between text-3xl font-extrabold hover:text-gold"
                  >
                    {g.label}
                    <ArrowUpRightIcon aria-hidden className="size-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                  {g.children.length > 0 && (
                  <ul className="flex flex-col gap-2">
                    {g.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={close}
                          aria-current={pathname === c.href ? 'page' : undefined}
                          className="text-on-blue-soft transition-colors hover:text-on-blue aria-[current=page]:text-gold"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  )}
                </motion.nav>
              ))}
              <div className="flex flex-col justify-end gap-4 p-6 md:col-span-2 md:p-8 xl:col-span-3">
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/request-a-quote/"
                    onClick={close}
                    className="inline-flex h-12 items-center bg-gold px-6 font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-navy hover:bg-gold-dark"
                  >
                    Request a Quote
                  </Link>
                  <a href={telHref} className="inline-flex items-center gap-2 font-mono text-sm hover:text-gold">
                    <PhoneIcon aria-hidden className="size-5" />
                    {phone}
                  </a>
                </div>
              </div>
            </div>
            <button type="button" onClick={close} className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4">
              <XIcon aria-hidden className="size-5" /> Close menu
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
