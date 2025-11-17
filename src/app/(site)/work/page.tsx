import { PageHeader, PageWrapper } from '@/components/ui'
import { CaseCard } from '@/components'
import { EmptyResults } from '@/components/ui'
import { CaseType } from '@/types'
import { getAllCases, getPageContent } from '@/sanity/lib/queries'

export const revalidate = 1 // revalidate every 5 minutes (300 seconds)

export default async function Work() {
	const pageData = await getPageContent('workPage')
	const cases = await getAllCases()

	return (
		<PageWrapper>
			<PageHeader
				title={pageData.title || 'Work'}
				subtitle={pageData.subtitle}></PageHeader>
			<div className='space-y-8'>
				{cases && cases.length > 0 ? (
					cases.map((caseItem: CaseType) => (
						<CaseCard key={caseItem.slug} caseData={caseItem}></CaseCard>
					))
				) : (
					<EmptyResults message='No cases available at the moment' />
				)}
			</div>
		</PageWrapper>
	)
}
