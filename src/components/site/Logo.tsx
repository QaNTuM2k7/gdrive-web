import Image from 'next/image'
import Link from 'next/link'

import logoColor from '../../../public/images/brand/logo-horizontal.png'
import logoOnBlue from '../../../public/images/brand/logo-on-blue.png'

// Brand lockup. "on-blue" keeps the gold wordmark and turns the blue pin and green tagline cream,
// so it stays legible on brand-blue and navy surfaces.
export function Logo({
  variant = 'on-blue',
  className = '',
  priority = false,
}: {
  variant?: 'on-blue' | 'color'
  className?: string
  priority?: boolean
}) {
  return (
    <Link href="/" aria-label="G DRIVE home" className={`inline-flex items-center ${className}`}>
      <Image
        src={variant === 'on-blue' ? logoOnBlue : logoColor}
        alt="G DRIVE, Smart Urban Mobility"
        priority={priority}
        sizes="160px"
        className="h-9 w-auto"
      />
    </Link>
  )
}
