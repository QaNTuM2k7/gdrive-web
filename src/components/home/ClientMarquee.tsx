import Image from 'next/image'

import { clientLogos } from '@/lib/clients'

const logos = clientLogos

export function ClientMarquee() {
  return (
    <section aria-label="Clients" className="border-b border-rule">
      <div className="frame grid grid-cols-1 md:grid-cols-12">
        <h2 className="flex items-center border-b border-rule px-4 py-5 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft sm:px-6 md:col-span-2 md:border-b-0 md:border-r lg:px-10">
          Trusted by
        </h2>
        <div className="marquee relative overflow-hidden md:col-span-10">
          <ul className="marquee-track flex w-max items-center">
            {[...logos, ...logos].map((logo, i) => (
              <li
                key={`${logo.file}-${i}`}
                aria-hidden={i >= logos.length}
                className="flex h-24 w-44 shrink-0 items-center justify-center border-r border-rule bg-cream px-6"
              >
                <Image
                  src={`/images/clients/${logo.file}`}
                  alt={i < logos.length ? logo.name : ''}
                  width={140}
                  height={70}
                  className="max-h-12 w-auto object-contain mix-blend-multiply grayscale transition duration-300 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
