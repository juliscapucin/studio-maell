import { PageHeader, PageWrapper } from '@/components/ui'
import { ProjectCard } from '@/components'

export default function Home() {
	return (
		<PageWrapper>
			<PageHeader
				title='Work'
				subtitle='6 years of inclusive digital design summarized in a few highlights'></PageHeader>
			<div className='space-y-8'>
				{[1, 2, 3, 4, 5, 6].map((item) => (
					<ProjectCard key={item}></ProjectCard>
				))}
			</div>
		</PageWrapper>
	)
}
