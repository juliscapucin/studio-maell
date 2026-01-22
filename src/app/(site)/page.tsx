import { EmptyResults, PageHeader, PageWrapper } from '@/components/ui'
import { CaseCard } from '@/components'
import { CaseType } from '@/types'

import { getAllCases, getPageContent } from '@/sanity/lib/queries'

const pageData = await getPageContent('workPage')
const cases = await getAllCases()

export default async function Home() {
	if (!pageData || !cases) {
		return (
			<EmptyResults
				variant='page'
				message='Work page content is not available at the moment. Please check back later.'
			/>
		)
	}

	return (
		<PageWrapper>
			<PageHeader
				title={pageData.title}
				subtitle={pageData.subtitle}></PageHeader>
			<div className='space-y-8'>
				{cases.map((caseItem: CaseType, index: number) => (
					<CaseCard
						key={caseItem.slug}
						caseData={caseItem}
						index={index}></CaseCard>
				))}
			</div>
		</PageWrapper>
	)
}
