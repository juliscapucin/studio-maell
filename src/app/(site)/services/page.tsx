import { ServicesCarousel } from '@/components'
import { PageHeader, PageWrapper } from '@/components/ui'

import { getAllServices, getPageContent } from '@/sanity/lib/queries'

const pageData = await getPageContent('servicesPage')
const services = await getAllServices()

import { metadataFallback } from '@/data'
import { cleanSanityInputs } from '@/utils'

export const revalidate = 1 // revalidate every 5 minutes (300 seconds)

export async function generateMetadata() {
	const page = await pageData

	if (!page) {
		return metadataFallback
	}

	const cleanTitle = cleanSanityInputs(page.metadataTitle)
	const cleanDescription = cleanSanityInputs(page.metadataDescription)
	const cleanKeywords = cleanSanityInputs(page.metadataKeywords)

	return {
		metadataBase: metadataFallback.metadataBase,
		title: cleanTitle || metadataFallback.title,
		description: cleanDescription || metadataFallback.description,
		keywords: cleanKeywords || metadataFallback.keywords,
	}
}

export default async function Services() {
	return (
		<PageWrapper classes='flex flex-col justify-between h-screen overflow-hidden z-0'>
			<PageHeader
				title={pageData.title || 'Services'}
				subtitle={pageData.subtitle}
			/>
			{/* Services Carousel */}
			<ServicesCarousel services={services} />
		</PageWrapper>
	)
}
