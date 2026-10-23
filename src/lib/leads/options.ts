// Service options for the enquiry forms, from the SEO master document. Values are stable slugs:
// they are stored on each lead and used in ?service= links, so do not rename them.
export const serviceOptions = [
  { value: 'employee-transportation', label: 'Employee Transportation' },
  { value: 'corporate-car-rental', label: 'Corporate Car Rental' },
  { value: 'executive-car-rental', label: 'Executive Car Rental' },
  { value: 'shuttle-services', label: 'Shuttle Services' },
  { value: 'campus-mobility', label: 'Campus Mobility' },
  { value: 'metro-connect', label: 'Metro Connect' },
  { value: 'fleet-management-technology', label: 'Fleet Management Technology' },
  { value: 'ai-telematics-safety', label: 'AI Telematics & Safety' },
  { value: 'other', label: 'Other' },
] as const

export type ServiceValue = (typeof serviceOptions)[number]['value']

export const serviceValues = serviceOptions.map((o) => o.value) as [ServiceValue, ...ServiceValue[]]

export const isServiceValue = (v: unknown): v is ServiceValue =>
  typeof v === 'string' && (serviceValues as string[]).includes(v)

export const serviceLabel = (v: string) => serviceOptions.find((o) => o.value === v)?.label ?? v

export const formTypes = ['quote', 'contact'] as const
export type FormType = (typeof formTypes)[number]
