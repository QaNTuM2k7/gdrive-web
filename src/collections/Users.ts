import type { CollectionConfig } from 'payload'

import { hasRole, isAdmin, isAdminField, type Role } from '@/access/roles'

const isProd = process.env.NODE_ENV === 'production'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'roles'],
  },
  auth: {
    // Lock an account for 10 minutes after 5 failed logins.
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    tokenExpiration: 8 * 60 * 60,
    useSessions: true,
    cookies: {
      secure: isProd,
      sameSite: 'Lax',
    },
  },
  access: {
    // The very first user can be created from the admin panel; after that only admins add people.
    create: async ({ req }) => {
      if (hasRole(req.user as { roles?: Role[] }, 'admin')) return true
      const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true })
      return totalDocs === 0
    },
    read: ({ req }) => {
      if (!req.user) return false
      if (hasRole(req.user as { roles?: Role[] }, 'admin')) return true
      return { id: { equals: req.user.id } }
    },
    update: ({ req }) => {
      if (!req.user) return false
      if (hasRole(req.user as { roles?: Role[] }, 'admin')) return true
      return { id: { equals: req.user.id } }
    },
    delete: isAdmin,
    admin: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [
      // The first account is always an admin so the site can never be left without one.
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data
        const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true })
        if (totalDocs === 0) return { ...data, roles: ['admin'] }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      saveToJWT: true,
      access: { create: isAdminField, update: isAdminField },
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor (blog and media)', value: 'editor' },
        { label: 'Sales (leads)', value: 'sales' },
      ],
    },
  ],
}
