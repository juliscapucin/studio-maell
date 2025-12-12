import { cache } from 'react'

import { getCaseBySlug } from '@/sanity/lib/queries'
import { ButtonBack } from '@/components/buttons'
import { EmptyResults, PageWrapper } from '@/components/ui'

import { metadataFallback } from '@/data'
import { cleanSanityInputs } from '@/utils'
import { CaseContent } from '@/components'

// Memoize query as in Next docs: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
const caseData = cache(async (slug: string) => {
	return await getCaseBySlug(slug)
})

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const page = await caseData((await params).slug)

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
		openGraph: {
			siteName: 'Studio Maell',
			title: page.title || metadataFallback.title,
			description: page.intro || metadataFallback.description,
			images: [{ url: page.mainImage as string }],
		},
	}
}

export default async function Project({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const data = await caseData((await params).slug)

	if (!data) {
		return (
			<EmptyResults
				variant='page'
				message='This case is not available at the moment'
			/>
		)
	}

	return (
		<PageWrapper hasTransition={false}>
			<CaseContent data={data} />
		</PageWrapper>
	)
}
