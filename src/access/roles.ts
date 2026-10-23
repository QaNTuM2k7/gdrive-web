import type { Access, FieldAccess } from 'payload'

export type Role = 'admin' | 'editor' | 'sales'

type MaybeUser = { roles?: Role[] | null } | null | undefined

export const hasRole = (user: MaybeUser, ...roles: Role[]) =>
  Boolean(user?.roles?.some((r) => roles.includes(r)))

// Collection-level access helpers. Admins can do everything; other roles get what their job needs.
export const isAdmin: Access = ({ req }) => hasRole(req.user as MaybeUser, 'admin')
export const isAdminOrEditor: Access = ({ req }) => hasRole(req.user as MaybeUser, 'admin', 'editor')
export const isAdminOrSales: Access = ({ req }) => hasRole(req.user as MaybeUser, 'admin', 'sales')
export const isLoggedIn: Access = ({ req }) => Boolean(req.user)

export const isAdminField: FieldAccess = ({ req }) => hasRole(req.user as MaybeUser, 'admin')

// Public visitors see published posts only; editors and admins also see drafts.
export const publishedOrEditor: Access = ({ req }) => {
  if (hasRole(req.user as MaybeUser, 'admin', 'editor')) return true
  return { _status: { equals: 'published' } }
}
