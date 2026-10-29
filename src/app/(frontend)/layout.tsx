import type { Metadata, Viewport } from 'next'
import { Archivo, DM_Serif_Display, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'
import React from 'react'

import { Footer } from '@/components/site/Footer'
import { SmoothScroll } from '@/components/motion/SmoothScroll'
import { Header } from '@/components/site/Header'
import { site } from '@/lib/site'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

// Serif for banner headlines, as in the approved homepage design.
const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-serif',
  display: 'swap',
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'G DRIVE | Corporate Employee Transportation & Mobility Solutions',
    template: '%s | G DRIVE',
  },
  description:
    "Discover G DRIVE's enterprise mobility, employee transportation, corporate car rental, shuttle services and AI telematics solutions for businesses.",
  applicationName: 'G DRIVE',
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: 'website',
    siteName: 'G DRIVE',
    locale: 'en_IN',
  },
}

export const viewport: Viewport = {
  themeColor: '#4169d8',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${dmSerif.variable} ${hanken.variable} ${jetbrains.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
