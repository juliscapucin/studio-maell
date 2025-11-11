import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'

import { ButtonBack } from '@/components/buttons'
import { EmptyResults, PageWrapper } from '@/components/ui'

const caseQuery = defineQuery(`*[_type == "case" && slug.current == $slug][0] {
			title,
			"slug": slug.current,
			"coverImage": coverImage.asset->url,
			client,
			role,
			services,
			publishedOn,
			"services": services[].label,
		 }`)

export default async function Project({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { data } = await sanityFetch({ query: caseQuery, params: await params })

	if (!data) {
		return <EmptyResults message='This case is not available at the moment' />
	}

	return (
		<PageWrapper>
			<div className='bg-secondary text-tertiary rounded-sm relative p-6'>
				<ButtonBack />
				<h1 className='heading-headline text-pretty'>{data.title}</h1>
				<p className='mt-4'>{data.client}</p>
				<hr className='my-4 border-tertiary' />
				<div className='flex'>
					{data.services && data.services.length > 0 && (
						<div className='flex-2'>
							<h2>Services</h2>
							<ul className='flex gap-2'>
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
