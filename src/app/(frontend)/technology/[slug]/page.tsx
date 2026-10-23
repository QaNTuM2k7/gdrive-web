import { technologySection } from '@/content/technology'
import { sectionRoutes } from '@/lib/sectionRoutes'

const { detail } = sectionRoutes(technologySection)

export const dynamicParams = false
export const generateStaticParams = detail.generateStaticParams
export const generateMetadata = detail.generateMetadata
export default detail.Page
