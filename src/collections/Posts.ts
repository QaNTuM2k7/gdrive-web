import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'

import { isAdminOrEditor, publishedOrEditor } from '@/access/roles'
import { serviceOptions } from '@/lib/leads/options'

const slugify = (v: string) =>
  v
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .slice(0, 80)

// Refresh the blog pages as soon as a post is published or changed.
const revalidateBlog: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  try {
    revalidatePath('/blog/')
    if (doc.slug) revalidatePath(`/blog/${doc.slug}/`)
    if (previousDoc?.slug && previousDoc.slug !== doc.slug) revalidatePath(`/blog/${previousDoc.slug}/`)
    revalidatePath('/sitemap.xml')
  } catch {
    // revalidatePath only works inside a Next.js request; ignore during scripts and migrations.
  }
  return doc
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', '_status', 'publishedAt', 'updatedAt'],
    description: 'Blog articles. Link each one to the service it supports.',
  },
  versions: { drafts: true, maxPerDoc: 20 },
  access: {
    read: publishedOrEditor,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: { afterChange: [revalidateBlog] },
  fields: [
    { name: 'title', type: 'text', required: true, maxLength: 120 },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'URL part, e.g. employee-transport-night-shifts' },
      hooks: {
        beforeValidate: [({ value, data }) => slugify(String(value || data?.title || ''))],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 240,
      admin: { description: 'One or two sentences shown on the blog list and in search results.' },
    },
    { name: 'cover', type: 'upload', relationTo: 'media', required: true },
    { name: 'content', type: 'richText', required: true },
    {
      name: 'service',
      label: 'Related service',
      type: 'select',
      options: serviceOptions.map((o) => ({ label: o.label, value: o.value })),
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar' },
    },
    { name: 'author', type: 'text', defaultValue: 'G DRIVE Team', admin: { position: 'sidebar' } },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', maxLength: 70, admin: { description: 'Defaults to the post title.' } },
        { name: 'description', type: 'textarea', maxLength: 160, admin: { description: 'Defaults to the excerpt.' } },
      ],
    },
  ],
}
