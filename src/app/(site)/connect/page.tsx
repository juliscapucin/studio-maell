import { cache } from 'react'
import {
	EmptyResults,
	ExternalLink,
	PageHeader,
	PageWrapper,
} from '@/components/ui'
import { getConnectPageContent } from '@/sanity/lib/queries'

import { metadataFallback } from '@/data'
import { cleanSanityInputs } from '@/utils'

// Memoize query as in Next docs: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
const pageData = cache(async () => {
	return await getConnectPageContent()
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

export default async function Connect() {
	const page = await pageData()

	if (!page) {
		return <EmptyResults message='This page is not available at the moment' />
	}

	return (
		<PageWrapper classes='flex flex-col h-svh'>
			<PageHeader title={page.title || 'Connect'} subtitle={page.subtitle} />

			{page ? (
				<div className='flex-1 flex flex-col justify-start gap-4 text-2xl'>
					{/* CTA */}
					<div className='flex items-end'>
						<h2 className='heading-subtitle mb-8 max-w-[320px] sm:max-w-[450px] lg:max-w-[500px] text-pretty mt-16 lg:mt-28'>
							{page.cta}
						</h2>
						{/* HORIZONTAL LINE */}
						<div
							className='h-0.5 bg-secondary flex-1 mb-10 md:mb-11 -ml-20 sm:-ml-40 lg:-ml-18 xl:-ml-16 -mr-40'
							aria-hidden='true'></div>
					</div>
					<ExternalLink href={`mailto:${page.email}`}>
						{page.email}
					</ExternalLink>
					{page.socials &&
						page.socials.length > 0 &&
						page.socials.map((social: { label: string; url: string }) => (
							<ExternalLink key={social.label} href={social.url}>
								{social.label}
							</ExternalLink>
						))}
				</div>
			) : (
				<EmptyResults message='This page is not available at the moment' />
			)}
		</PageWrapper>
	)
}
