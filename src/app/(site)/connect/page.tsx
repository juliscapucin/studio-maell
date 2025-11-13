import { ExternalLink, PageHeader, PageWrapper } from '@/components/ui'
import { getConnectPageContent } from '@/sanity/lib/queries'

export default async function Connect() {
	const pageData = await getConnectPageContent()

	return (
		<PageWrapper classes='flex flex-col h-svh'>
			<PageHeader title={pageData.title} subtitle={pageData.subtitle} />
			<div className='flex-1 flex flex-col justify-center gap-4'>
				<h2 className='heading-title mb-8'>{pageData.cta}</h2>
				<ExternalLink href={`mailto:${pageData.email}`}>
					{pageData.email}
				</ExternalLink>
				{pageData.socials.map((social: { label: string; url: string }) => (
					<ExternalLink key={social.label} href={social.url}>
						{social.label}
					</ExternalLink>
				))}
			</div>
		</PageWrapper>
	)
}
