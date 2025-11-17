import { ServicesCarousel } from '@/components'
import { PageHeader, PageWrapper } from '@/components/ui'

import { getAllServices, getPageContent } from '@/sanity/lib/queries'

const pageData = await getPageContent('servicesPage')
const services = await getAllServices()

export default async function Services() {
	return (
		<PageWrapper classes='flex flex-col justify-between h-svh overflow-hidden'>
			<PageHeader
				title={pageData.title || 'Services'}
				subtitle={pageData.subtitle}
			/>
			{/* Services Carousel */}
			<ServicesCarousel services={services} />
		</PageWrapper>
	)
}
