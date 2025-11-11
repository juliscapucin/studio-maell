import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'

import { PageHeader, PageWrapper } from '@/components/ui'
import { ProjectCard } from '@/components'

const query = defineQuery(`*[_type == "workPage"][0]{
	title,
	subtitle,
}`)

export default async function Home() {
	const { data } = await sanityFetch({
		query,
	})

	return (
		<PageWrapper>
			<PageHeader
				title={data.title || 'Worksss'}
				subtitle={
					data.subtitle ||
					'6 years of inclusive digital design summarized in a few highlights'
				}></PageHeader>
			<div className='space-y-8'>
				{[1, 2, 3, 4, 5, 6].map((item) => (
					<ProjectCard key={item}></ProjectCard>
				))}
			</div>
		</PageWrapper>
	)
}
