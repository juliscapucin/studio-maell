import {
	EmptyResults,
	ExternalLink,
	PageHeader,
	PageWrapper,
} from '@/components/ui'
import { getConnectPageContent } from '@/sanity/lib/queries'

import { metadataFallback } from '@/data'
import { cleanSanityInputs } from '@/utils'

const pageData = await getConnectPageContent()

export const revalidate = 1 // revalidate every 5 minutes (300 seconds)

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

export default async function Connect() {
	if (!pageData) {
		return <EmptyResults message='This page is not available at the moment' />
	}

	return (
		<PageWrapper classes='flex flex-col h-svh'>
			<PageHeader
				title={pageData.title || 'Connect'}
				subtitle={pageData.subtitle}
			/>

			{pageData ? (
				<div className='flex-1 flex flex-col justify-start gap-4 text-2xl'>
					{/* CTA */}
					<div className='flex items-end'>
						<h2 className='text-2xl lg:text-3xl mb-8 max-w-[320px] sm:max-w-[450px] lg:max-w-[500px] text-pretty mt-16 lg:mt-28'>
							{pageData.cta}
						</h2>
						{/* HORIZONTAL LINE */}
						<div className='h-0.5 bg-secondary flex-1 mb-11 md:mb-12 -ml-24 lg:-ml-18 xl:-ml-16 -mr-40'></div>
					</div>
					<ExternalLink href={`mailto:${pageData.email}`}>
						{pageData.email}
					</ExternalLink>
					{pageData.socials &&
						pageData.socials.length > 0 &&
						pageData.socials.map((social: { label: string; url: string }) => (
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
