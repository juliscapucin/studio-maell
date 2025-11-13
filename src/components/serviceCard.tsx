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
		<article className='flex-1 bg-secondary rounded-sm p-6 h-100 flex flex-col justify-between'>
			<div>
				<h2 className='heading-title text-balance'>{title}</h2>
				<hr className='my-4 border-tertiary' />
			</div>
			<p>{description}</p>
		</article>
	)
}
