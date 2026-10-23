'use client'

import { ListIcon, XIcon } from '@phosphor-icons/react'
import { useLenis } from 'lenis/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import type { NavItem } from '@/lib/site'
import { quoteHref } from '@/lib/site'

export function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const lenis = useLenis()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [open, lenis])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
        className="flex h-16 w-16 items-center justify-center border-l border-rule-on-blue"
      >
        {open ? <XIcon className="size-6" /> : <ListIcon className="size-6" />}
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        data-lenis-prevent
        className="on-blue fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-rule-on-blue"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="display border-b border-rule-on-blue px-6 py-5 text-3xl font-bold"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact/"
            onClick={close}
            className="display border-b border-rule-on-blue px-6 py-5 text-3xl font-bold"
          >
            Contact
          </Link>
          <Link
            href={quoteHref()}
            onClick={close}
            className="m-6 flex h-14 items-center justify-center bg-gold font-mono text-sm font-medium uppercase tracking-[0.08em] text-navy"
          >
            Request a Quote
          </Link>
        </nav>
      </div>
    </div>
  )
}
