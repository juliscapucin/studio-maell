import { ExternalLink, PageHeader, PageWrapper } from '@/components/ui'

export default function Connect() {
	return (
		<PageWrapper classes='flex flex-col h-svh'>
			<PageHeader title='Connect' />
			<div className='flex-1 flex flex-col justify-center gap-4'>
				<h2 className='heading-title mb-8'>
					{"Excited about Design, Inclusion or Accessibility? Let's chat!"}
				</h2>
				<ExternalLink href='mailto:monsehopman@gmail.com'>
					monsehopman@gmail.com
				</ExternalLink>
				<ExternalLink href='https://linkedin.com/user/monsemaell'>
					linkedin.com/user/monsemaell
				</ExternalLink>
			</div>
		</PageWrapper>
	)
}
