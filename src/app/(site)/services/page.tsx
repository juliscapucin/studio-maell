import { ServiceCard } from '@/components'
import { PageHeader, PageWrapper } from '@/components/ui'

export default function Services() {
	return (
		<PageWrapper classes='flex flex-col justify-between h-svh'>
			<PageHeader title='Services' subtitle='Areas of expertise' />
			<div className='flex flex-nowrap gap-4 text-tertiary'>
				{[1, 2, 3].map((service) => (
					<ServiceCard
						key={service}
						title='Service Title'
						description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
					/>
				))}
			</div>
		</PageWrapper>
	)
}
