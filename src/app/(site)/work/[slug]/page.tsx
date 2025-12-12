import { cache } from 'react'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'

import { getCaseBySlug } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/imageUrlBuilder'
import { IconEnd } from '@/components/icons'
import { ButtonBack } from '@/components/buttons'
import { EmptyResults, PageWrapper } from '@/components/ui'
import { CaseServices } from '@/components'
import { ImageType } from '@/types'

import { metadataFallback } from '@/data'
import { cleanSanityInputs } from '@/utils'

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

	// Portable Text components
	const portableTextComponents = {
		types: {
			image: ({ value }: { value: ImageType }) => {
				const alt = value.alt || ''
				const src = value.src || urlFor(value).width(1200).url()
				return (
					<figure className='my-10'>
						<Image
							src={src}
							alt={alt}
							width={1200}
							height={800}
							className='rounded-sm object-cover'
						/>
						{value.caption && (
							<figcaption className='text-sm mt-2 text-secondary/70'>
								{value.caption}
							</figcaption>
						)}
					</figure>
				)
			},
		},
	}

	return (
		<PageWrapper hasTransition={false}>
			{/* GRID */}
			<div className='bg-secondary text-tertiary rounded-sm relative p-6 md:grid grid-cols-8 gap-5 px-4 md:px-6'>
				{/* BACK BUTTON */}
				<ButtonBack label='work' />

				{/* CONTENT */}
				<div className='col-start-2 col-end-8 mt-12'>
					<h1 className='heading-headline text-pretty'>{data.title}</h1>
					<p className='mt-4 text-lg md:text-xl font-normal'>{data.client}</p>

					{/* DIVIDER */}
					<div
						className='my-8 h-0.5 bg-accent-1 w-full'
						aria-hidden='true'></div>

					{/* SERVICES + ROLE */}
					<div className='lg:flex flex-wrap md:gap-6'>
						{data.services && data.services.length > 0 && (
							<CaseServices services={data.services} />
						)}

						{/* ROLE */}
						{data.role && (
							<div className='flex-1 mt-6 lg:mt-0'>
								<h2 className='text-lg font-medium mb-4'>Role</h2>
								<p className='font-normal text-lg'>{data.role}</p>
							</div>
						)}
					</div>

					{/* BODY CONTENT */}
					<div className='mt-6 lg:mt-12 custom-rich-text'>
						{/* INTRO */}
						<p className='font-medium'>{data.intro}</p>

						{/* PORTABLE TEXT BODY */}
						<PortableText
							value={data.body}
							components={portableTextComponents}
						/>
					</div>

					{/* END ICON */}
					<div className='flex justify-center mt-12 mb-6 text-primary'>
						<IconEnd />
					</div>
				</div>
			</div>
		</PageWrapper>
	)
}
