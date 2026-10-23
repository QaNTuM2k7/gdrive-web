import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ClosingCta } from '@/components/home/ClosingCta'
import { PageHeader } from '@/components/site/PageHeader'
import { serviceLabel } from '@/lib/leads/options'
import { formatDate, getPost } from '@/lib/posts'
import { pageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'
import type { Media } from '@/payload-types'
import { JsonLd } from '@/components/JsonLd'

// Rendered per request so edits appear immediately and builds never need the database.
export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug)
  if (!post) return {}
  const cover = post.cover as Media | null
  const meta = pageMetadata({
    title: post.seo?.title || `${post.title} | G DRIVE`,
    description: post.seo?.description || post.excerpt,
    path: `/blog/${post.slug}/`,
  })
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: 'article', publishedTime: post.publishedAt, images: cover?.url ? [cover.url] : undefined },
  }
}

export default async function PostPage({ params }: Props) {
  const post = await getPost((await params).slug)
  if (!post) notFound()
  const cover = post.cover as Media | null

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: post.author || 'G DRIVE' },
    publisher: { '@id': `${site.url}/#organization` },
    image: cover?.url ? new URL(cover.url, site.url).toString() : undefined,
    mainEntityOfPage: new URL(`/blog/${post.slug}/`, site.url).toString(),
  }

  return (
    <>
      <JsonLd data={articleLd} />
      <PageHeader
        title={post.title}
        crumbs={[
          { label: 'Blog', href: '/blog/' },
          { label: post.title, href: `/blog/${post.slug}/` },
        ]}
        intro={
          <p>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.author ? `, ${post.author}` : ''}
          </p>
        }
      />
      <article className="border-b border-rule">
        <div className="frame grid grid-cols-1 lg:grid-cols-12">
          <aside className="border-b border-rule px-4 py-8 sm:px-6 lg:col-span-3 lg:border-b-0 lg:border-r lg:px-10 lg:py-14">
            <div className="flex flex-col gap-4 lg:sticky lg:top-24">
              <p className="text-ink-soft">{post.excerpt}</p>
              {post.service && (
                <Link href={`/request-a-quote/?service=${post.service}`} className="font-mono text-[13px] uppercase tracking-[0.08em] text-link hover:text-ink">
                  Ask about {serviceLabel(post.service)}
                </Link>
              )}
            </div>
          </aside>
          <div className="px-4 py-10 sm:px-6 lg:col-span-9 lg:px-12 lg:py-14">
            {cover?.url && (
              <div className="relative mb-10 aspect-[16/9] overflow-hidden">
                <Image src={cover.sizes?.hero?.url || cover.url} alt={cover.alt} fill priority sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
              </div>
            )}
            <RichText data={post.content} className="prose-gdrive max-w-[68ch]" />
          </div>
        </div>
      </article>
      <ClosingCta service={post.service ?? undefined} />
    </>
  )
}
