import Image from 'next/image'

import type { Img } from '@/content/types'

// Shows a photo at its own proportions so nothing is cropped or stretched. Portrait images are held to a
// narrower width so they don't tower over the text beside them; cut-outs sit on a white card.
export function Picture({ image, sizes, className = '' }: { image: Img; sizes: string; className?: string }) {
  const contain = image.fit === 'contain'
  const portrait = image.src.height > image.src.width
  return (
    <div
      className={`overflow-hidden rounded-2xl shadow-card ${contain ? 'bg-white p-6' : ''} ${
        portrait ? 'mx-auto w-full max-w-[420px]' : 'w-full'
      } ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        placeholder={image.src.blurDataURL ? 'blur' : 'empty'}
        sizes={sizes}
        className="h-auto w-full"
      />
    </div>
  )
}
