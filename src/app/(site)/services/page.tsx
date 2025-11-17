import { ServiceCard } from '@/components'
import { EmptyResults, PageHeader, PageWrapper } from '@/components/ui'

import { ServiceType } from '@/types/ServiceType'
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
			<div className='flex gap-6 text-tertiary'>
				{services && services.length > 0 ? (
					services.map((service: ServiceType) => (
						<ServiceCard key={service.title} service={service} />
					))
				) : (
					<EmptyResults message='No services available at the moment' />
				)}
			</div>
		</PageWrapper>
	)
}
