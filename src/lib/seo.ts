import type { Metadata } from 'next'
import type { StaticImageData } from 'next/image'

// Page metadata from the SEO document. Titles there already end in "| G DRIVE", so they are absolute.
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string
  description: string
  path: string
  image?: StaticImageData
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: 'website',
      siteName: 'G DRIVE',
      locale: 'en_IN',
      ...(image ? { images: [{ url: image.src, width: image.width, height: image.height }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}
