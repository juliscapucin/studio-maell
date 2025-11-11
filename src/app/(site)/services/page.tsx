import { ServiceCard } from '@/components'
import { EmptyResults, PageHeader, PageWrapper } from '@/components/ui'

import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'
import { ServiceType } from '@/types/ServiceType'

const pageQuery = defineQuery(`*[_type == "articlesPage"][0] {
		title,
		subtitle,
	 }`)

const servicesQuery =
	defineQuery(`*[_type == "service"]|order(publishedOn desc) {
			title,
			description,
		 }`)

export default async function Services() {
	const { data: pageData } = await sanityFetch({ query: pageQuery })
	const { data: services } = await sanityFetch({ query: servicesQuery })

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
