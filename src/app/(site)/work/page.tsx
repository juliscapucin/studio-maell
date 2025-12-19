import { cache } from 'react'

import { PageHeader, PageWrapper } from '@/components/ui'
import { CaseCard } from '@/components'
import { EmptyResults } from '@/components/ui'
import { CaseType } from '@/types'
import { getAllCases, getPageContent } from '@/sanity/lib/queries'

import { metadataFallback } from '@/data'
import { cleanSanityInputs } from '@/utils'

// Memoize query as in Next docs: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
const pageData = cache(async () => {
	return await getPageContent('workPage')
})

export async function generateMetadata() {
	const page = await pageData()

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
	const page = await pageData()
	const cases = await getAllCases()

	return (
		<PageWrapper>
			<PageHeader
				title={page.title || 'Work'}
				subtitle={page.subtitle}></PageHeader>
			<div className='space-y-8'>
				{cases && cases.length > 0 ? (
					cases.map((caseItem: CaseType, index: number) => (
						<CaseCard
							key={caseItem.slug}
							caseData={caseItem}
							index={index}></CaseCard>
					))
				) : (
					<EmptyResults message='No cases available at the moment' />
				)}
			</div>
		</PageWrapper>
	)
}
