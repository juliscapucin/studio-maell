import { PageHeader, PageWrapper } from '@/components/ui'
import { CaseCard } from '@/components'
import { EmptyResults } from '@/components/ui'
import { CaseType } from '@/types'
import { getAllCases, getPageContent } from '@/sanity/lib/queries'

import { metadataFallback } from '@/data'
import { cleanSanityInputs } from '@/utils'

export const revalidate = 1 // revalidate every 5 minutes (300 seconds)

const pageData = await getPageContent('workPage')
const cases = await getAllCases()

export async function generateMetadata() {
	const page = await pageData

	if (!page) {
		return metadataFallback
	}

	const cleanTitle = cleanSanityInputs(page.metadataTitle)
	const cleanDescription = cleanSanityInputs(page.metadataDescription)
	const cleanKeywords = cleanSanityInputs(page.metadataKeywords)

	return {
		metadataBase: metadataFallback.metadataBase,
		title: cleanTitle || metadataFallback.title,
		description: cleanDescription || metadataFallback.description,
		keywords: cleanKeywords || metadataFallback.keywords,
	}
}

export default async function Work() {
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
