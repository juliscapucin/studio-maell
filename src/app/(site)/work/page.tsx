import { PageHeader, PageWrapper } from '@/components/ui'
import { CaseCard } from '@/components'
import { EmptyResults } from '@/components/ui'
import { CaseType } from '@/types'
import { getAllCases, getPageContent } from '@/sanity/lib/queries'

export default async function Work() {
	const pageData = await getPageContent('workPage')
	const cases = await getAllCases()

	if (!pageData || !cases) {
		return (
			<EmptyResults
				variant='page'
				message='Work page content is not available at the moment'
			/>
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
