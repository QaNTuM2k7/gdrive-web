import { WarningIcon } from '@phosphor-icons/react/dist/ssr'
import type { ReactNode } from 'react'

import { PageHeader } from '@/components/site/PageHeader'

const approved = process.env.NEXT_PUBLIC_LEGAL_APPROVED === 'true'

// Shared layout for legal pages. Until the client's legal adviser approves the text,
// a visible notice marks it as a draft (set NEXT_PUBLIC_LEGAL_APPROVED=true to remove it).
export function LegalPage({
  title,
  path,
  updated,
  children,
}: {
  title: string
  path: string
  updated: string
  children: ReactNode
}) {
  return (
    <>
      <PageHeader title={title} crumbs={[{ label: title, href: path }]} intro={<p>Last updated {updated}</p>} />
      <section className="border-b border-rule">
        <div className="frame px-4 py-12 sm:px-6 md:py-16 lg:px-10">
          {!approved && (
            <div role="note" className="mb-10 flex max-w-[68ch] items-start gap-3 border border-gold bg-gold/10 p-4 text-sm">
              <WarningIcon aria-hidden className="mt-0.5 size-5 shrink-0 text-ink" />
              <p>This text is a draft awaiting review by G DRIVE&apos;s legal adviser and may change.</p>
            </div>
          )}
          <div className="prose-gdrive max-w-[68ch]">{children}</div>
        </div>
      </section>
    </>
  )
}
