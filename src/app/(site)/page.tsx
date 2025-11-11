import { defineQuery } from 'next-sanity'
import { EmptyResults, PageHeader, PageWrapper } from '@/components/ui'
import { CaseCard } from '@/components'
import { sanityFetch } from '@/sanity/lib/live'
import { CaseType } from '@/types'

const pageQuery = defineQuery(`*[_type == "workPage"][0] {
		title,
		subtitle,
	 }`)

const casesQuery = defineQuery(`*[_type == "case"]|order(publishedOn desc) {
			title,
			"slug": slug.current,
			"coverImage": coverImage.asset->url,
			publishedOn,
			"categories": categories[]->title,
			"excerpt": excerpt,
		 }`)

export default async function Home() {
	const { data: pageData } = await sanityFetch({ query: pageQuery })
	const { data: cases } = await sanityFetch({ query: casesQuery })

	if (!pageData || !cases) {
		return (
			<EmptyResults message='Work page content is not available at the moment' />
		)
	}

	return (
		<PageWrapper>
			<PageHeader
				title={pageData.title}
				subtitle={pageData.subtitle}></PageHeader>
			<div className='space-y-8'>
				{cases.map((caseItem: CaseType) => (
					<CaseCard key={caseItem.slug} caseData={caseItem}></CaseCard>
				))}
			</div>
		</PageWrapper>
	)
}
