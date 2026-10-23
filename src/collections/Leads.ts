import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'

import { serviceLabel, serviceOptions } from '@/lib/leads/options'

const isLoggedIn = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

// Emails the sales inbox when a new lead arrives. Without an email adapter configured,
// Payload logs the message to the console instead of sending it.
const notifySales: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc
  const to = process.env.LEADS_NOTIFY_TO
  if (!to) return doc

  const rows: [string, unknown][] = [
    ['Enquiry type', doc.formType === 'quote' ? 'Quote request' : 'Contact enquiry'],
    ['Company', doc.company],
    ['Contact person', doc.name],
    ['Email', doc.email],
    ['Mobile', doc.phone],
    ['Service', serviceLabel(doc.service)],
    ['Location', doc.location],
    ['Estimated passengers', doc.passengers],
    ['Details', doc.message],
    ['Submitted from', doc.sourcePage],
  ]
  const escape = (v: unknown) =>
    String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!)

  try {
    await req.payload.sendEmail({
      to,
      replyTo: doc.email,
      subject: `New ${doc.formType === 'quote' ? 'quote request' : 'enquiry'}: ${doc.company} (${serviceLabel(doc.service)})`,
      html: `<table cellpadding="6">${rows
        .filter(([, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => `<tr><th align="left">${k}</th><td>${escape(v)}</td></tr>`)
        .join('')}</table>`,
    })
  } catch (err) {
    // The lead is already saved; a failed notification must not lose it.
    req.payload.logger.error({ err, msg: `Lead ${doc.id} saved but sales notification failed` })
  }
  return doc
}

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Lead', plural: 'Leads' },
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'name', 'service', 'status', 'createdAt'],
    listSearchableFields: ['company', 'name', 'email', 'phone'],
    description: 'Enquiries from the Request a Quote and Contact forms.',
  },
  access: {
    // Leads are only created by the website's server action (local API with overrideAccess).
    create: () => false,
    read: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  hooks: {
    afterChange: [notifySales],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'new',
          options: [
            { label: 'New', value: 'new' },
            { label: 'Contacted', value: 'contacted' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'Closed', value: 'closed' },
          ],
        },
        {
          name: 'formType',
          type: 'select',
          required: true,
          options: [
            { label: 'Quote request', value: 'quote' },
            { label: 'Contact enquiry', value: 'contact' },
          ],
          admin: { readOnly: true },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'company', type: 'text', required: true },
        { name: 'name', label: 'Contact person', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', label: 'Business email', type: 'email', required: true },
        { name: 'phone', label: 'Mobile number', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'service',
          label: 'Service required',
          type: 'select',
          required: true,
          options: serviceOptions.map((o) => ({ label: o.label, value: o.value })),
        },
        { name: 'location', label: 'Service location', type: 'text' },
        { name: 'passengers', label: 'Estimated passengers', type: 'number', min: 1 },
      ],
    },
    { name: 'message', label: 'Requirements and details', type: 'textarea' },
    {
      name: 'notes',
      label: 'Internal notes',
      type: 'textarea',
      admin: { description: 'Visible to the sales team only.' },
    },
    {
      type: 'collapsible',
      label: 'Source and consent',
      admin: { initCollapsed: true },
      fields: [
        { name: 'consent', label: 'Consented to be contacted', type: 'checkbox', required: true, admin: { readOnly: true } },
        { name: 'consentText', type: 'text', admin: { readOnly: true } },
        { name: 'sourcePage', type: 'text', admin: { readOnly: true } },
        {
          name: 'utm',
          type: 'group',
          admin: { readOnly: true },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'source', type: 'text' },
                { name: 'medium', type: 'text' },
                { name: 'campaign', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
