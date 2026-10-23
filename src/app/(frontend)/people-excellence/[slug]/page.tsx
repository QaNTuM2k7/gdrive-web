import { peopleSection } from '@/content/people'
import { sectionRoutes } from '@/lib/sectionRoutes'

const { detail } = sectionRoutes(peopleSection)

export const dynamicParams = false
export const generateStaticParams = detail.generateStaticParams
export const generateMetadata = detail.generateMetadata
export default detail.Page
