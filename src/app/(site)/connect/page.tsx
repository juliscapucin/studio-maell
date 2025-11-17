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

			{pageData ? (
				<div className='flex-1 flex flex-col justify-start gap-4 text-2xl'>
					{/* CTA */}
					<div className='flex items-end'>
						<h2 className='heading-title mb-8 max-w-[280px] lg:max-w-[500px] text-pretty mt-16 lg:mt-28'>
							{pageData.cta}
						</h2>
						<div className='h-0.5 bg-secondary flex-1 mb-13 -ml-14'></div>
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
