import {
	EmptyResults,
	ExternalLink,
	PageHeader,
	PageWrapper,
} from '@/components/ui'
import { getConnectPageContent } from '@/sanity/lib/queries'

const pageData = await getConnectPageContent()

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

			{/* If pageData exists, render the contact info */}
			{pageData ? (
				<div className='flex-1 flex flex-col justify-start gap-4'>
					<h2 className='heading-title mb-8 max-w-[280px] lg:max-w-[500px] text-pretty mt-16 lg:mt-28'>
						{pageData.cta}
					</h2>
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
				//* Fallback in case pageData is nullish, though this should be unreachable due to the earlier check *//
				<EmptyResults message='This page is not available at the moment' />
			)}
		</PageWrapper>
	)
}
