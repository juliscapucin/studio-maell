import { EmptyResults } from '@/components/ui'

import { ServiceType } from '@/types'

type ServiceCardProps = {
	service: ServiceType
}

export default function ServiceCard({ service }: ServiceCardProps) {
	if (!service) {
		return (
			<EmptyResults message='Service information is not available at the moment' />
		)
	}

	const { title, description } = service

	return (
		<article className='flex-1 bg-secondary rounded-sm p-6 h-service-card min-w-82 flex flex-col justify-between'>
			<div className='relative flex flex-col justify-end md:h-24 lg:h-26'>
				<h2 className='heading-title font-primary text-balance'>{title}</h2>
				<hr className='my-4 w-full border-tertiary border' />
			</div>
			<p className='text-subline'>{description}</p>
		</article>
	)
}
