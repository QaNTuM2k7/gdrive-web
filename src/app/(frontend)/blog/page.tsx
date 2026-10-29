import { ArrowUpRightIcon, NewspaperIcon } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

import { ClosingCta } from '@/components/home/ClosingCta'
import { PageHeader } from '@/components/site/PageHeader'
import type { Media } from '@/payload-types'
import { formatDate, listPosts, mediaSrc } from '@/lib/posts'
import { pageMetadata } from '@/lib/seo'

// Rendered per request so new posts appear immediately and builds never need the database.
export const dynamic = 'force-dynamic'

export const metadata = pageMetadata({
  title: 'Corporate Mobility Insights & Updates | G DRIVE Blog',
  description:
    'Articles on employee transportation, corporate travel, fleet technology and transport safety from the G DRIVE team.',
  path: '/blog/',
})

export default async function BlogPage() {
  const posts = await listPosts()

  return (
    <>
      <PageHeader
        title="Insights on corporate mobility"
        crumbs={[{ label: 'Blog', href: '/blog/' }]}
        intro={<p>Practical articles on employee transportation, corporate travel, fleet technology and safety.</p>}
      />

      <section data-section="Articles" aria-label="Articles" className="bg-paper-2">
        <div className="frame px-4 py-16 sm:px-6 md:py-20 lg:px-10">
          {posts.length === 0 ? (
            <div className="card flex flex-col items-start gap-5 p-8 md:p-12">
              <NewspaperIcon weight="light" aria-hidden className="size-14 text-link" />
              <h2 className="display text-3xl font-extrabold md:text-4xl">The first articles are on their way</h2>
              <p className="max-w-[52ch] text-lg text-ink-soft">
                Our team is preparing guides on planning employee transport, shift scheduling and fleet safety. Check
                back soon.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const cover = post.cover as Media | null
                return (
                  <li key={post.id} className="card overflow-hidden">
                    <Link href={`/blog/${post.slug}/`} className="group flex h-full flex-col">
                      <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
                        {mediaSrc(cover?.url) && cover && (
                          <Image
                            src={mediaSrc(cover.sizes?.card?.url || cover.url)!}
                            alt={cover.alt}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col gap-3 p-6 md:p-8">
                        <time dateTime={post.publishedAt} className="font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">
                          {formatDate(post.publishedAt)}
                        </time>
                        <h2 className="display flex items-start justify-between gap-4 text-2xl font-bold group-hover:text-link">
                          {post.title}
                          <ArrowUpRightIcon aria-hidden className="mt-1 size-6 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </h2>
                        <p className="text-ink-soft">{post.excerpt}</p>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
