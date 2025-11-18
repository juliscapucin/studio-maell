import { cache } from 'react'

import { ServicesCarousel } from '@/components'
import { PageHeader, PageWrapper } from '@/components/ui'

import { getAllServices, getPageContent } from '@/sanity/lib/queries'

import { metadataFallback } from '@/data'
import { cleanSanityInputs } from '@/utils'

// Memoize query as in Next docs: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
const pageData = cache(async () => {
	return await getPageContent('servicesPage')
})

export async function generateMetadata() {
	const page = await pageData()

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
	const page = await pageData()
	const services = await getAllServices()

	return (
		<PageWrapper classes='flex flex-col justify-between h-screen overflow-hidden z-0'>
			<PageHeader title={page.title || 'Services'} subtitle={page.subtitle} />
			{/* Services Carousel */}
			<ServicesCarousel services={services} />
		</PageWrapper>
	)
}
