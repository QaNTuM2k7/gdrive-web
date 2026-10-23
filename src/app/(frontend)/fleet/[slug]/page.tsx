import { fleetSection } from '@/content/fleet'
import { sectionRoutes } from '@/lib/sectionRoutes'

const { detail } = sectionRoutes(fleetSection)

export const dynamicParams = false
export const generateStaticParams = detail.generateStaticParams
export const generateMetadata = detail.generateMetadata
export default detail.Page
