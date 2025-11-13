import { ServiceCard } from '@/components'
import { EmptyResults, PageHeader, PageWrapper } from '@/components/ui'

import { ServiceType } from '@/types/ServiceType'
import { getAllServices, getPageContent } from '@/sanity/lib/queries'

export default async function Services() {
	const pageData = await getPageContent('servicesPage')
	const services = await getAllServices()

	if (!services || services.length === 0) {
		return <EmptyResults message='No services available at the moment' />
	}

	return (
		<PageWrapper classes='flex flex-col justify-between h-svh'>
			<PageHeader title={pageData.title} subtitle={pageData.subtitle} />
			<div className='flex flex-nowrap gap-4 text-tertiary'>
				{services.map((service: ServiceType) => (
					<ServiceCard key={service.title} service={service} />
				))}
			</div>
		</PageWrapper>
	)
}
