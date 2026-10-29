import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import type { ComponentProps } from 'react'

type Variant = 'gold' | 'outline-light' | 'outline-dark' | 'navy' | 'blue'

const variants: Record<Variant, string> = {
  gold: 'bg-gold text-navy hover:bg-gold-dark',
  // Ink on paper: navy in light mode, cream in dark mode.
  navy: 'bg-ink text-paper hover:bg-blue hover:text-cream',
  blue: 'bg-blue text-on-blue hover:bg-blue-deep',
  'outline-light': 'border border-on-blue/60 text-on-blue hover:bg-on-blue hover:text-blue',
  'outline-dark': 'border border-ink/50 text-ink hover:bg-ink hover:text-paper',
}

type Props = ComponentProps<typeof Link> & { variant?: Variant; arrow?: boolean }

export function ButtonLink({ variant = 'gold', arrow = true, className = '', children, ...rest }: Props) {
  return (
    <Link
      {...rest}
      className={`group inline-flex min-h-12 items-center gap-3 rounded-lg px-6 py-3 sm:whitespace-nowrap font-mono text-[13px] font-medium uppercase tracking-[0.08em] transition-[background-color,color,transform] duration-200 active:translate-y-px ${variants[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <ArrowRightIcon
          aria-hidden
          className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
        />
      )}
    </Link>
  )
}
