import { ButtonBack } from '@/components/buttons'
import { EmptyResults, PageWrapper } from '@/components/ui'
import { getCaseBySlug } from '@/sanity/lib/queries'

export default async function Project({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const data = await getCaseBySlug((await params).slug)

	if (!data) {
		return (
			<EmptyResults
				variant='page'
				message='This case is not available at the moment'
			/>
		)
	}

	return (
		<PageWrapper>
			<div className='bg-secondary text-tertiary rounded-sm relative p-6'>
				<ButtonBack />
				<h1 className='heading-headline text-pretty'>{data.title}</h1>
				<p className='mt-4'>{data.client}</p>
				<hr className='my-4 border-tertiary' />
				<div className='flex flex-wrap'>
					{data.services && data.services.length > 0 && (
						<div className='flex-2'>
							<h2>Services</h2>
							<ul className='flex flex-wrap gap-2'>
								{data.services.map((service: string) => (
									<li className='pill' key={service}>
										{service}
									</li>
								))}
							</ul>
						</div>
					)}
					{data.role && (
						<div className='flex-1'>
							<h2>Role</h2>
							<p>Lead Designer</p>
						</div>
					)}
				</div>
			</div>
		</PageWrapper>
	)
}
