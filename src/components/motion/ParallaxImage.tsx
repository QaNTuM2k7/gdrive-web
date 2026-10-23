'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image, { type ImageProps } from 'next/image'
import { useRef } from 'react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

// Image that drifts and settles as its frame scrolls past, giving the hero depth.
export function ParallaxImage({
  className = '',
  imageClassName = '',
  ...image
}: ImageProps & { className?: string; imageClassName?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.1, 1.18])
  // Scroll-linked drift is motion too; reduced-motion visitors get a still image.
  const still = usePrefersReducedMotion()

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div style={still ? undefined : { y, scale }} className="absolute inset-0">
        <Image {...image} alt={image.alt} fill className={`object-cover ${imageClassName}`} />
      </motion.div>
    </div>
  )
}
