import { MapPinIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

// Placeholder lockup until the client supplies the vector logo (map-pin "G" + DRIVE wordmark).
export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" aria-label="G DRIVE home" className={`inline-flex items-center gap-2 ${className}`}>
      <MapPinIcon weight="fill" className="size-7 text-gold" aria-hidden />
      <span className="display wide text-xl font-extrabold tracking-tight">
        G&nbsp;DRIVE
      </span>
    </Link>
  )
}
