import { safetySection } from '@/content/safety'
import { sectionRoutes } from '@/lib/sectionRoutes'

const { detail } = sectionRoutes(safetySection)

export const dynamicParams = false
export const generateStaticParams = detail.generateStaticParams
export const generateMetadata = detail.generateMetadata
export default detail.Page
