import { ImageResponse } from 'next/og'
import { getCaseBySlug } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/imageUrlBuilder'
import { Image as ImageType } from 'sanity'

// Image metadata
export const size = {
	width: 1200,
	height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const caseData = await getCaseBySlug((await params).slug)

	console.log(caseData)

	return new ImageResponse(
		(
			<div
				style={{
					position: 'relative',
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'flex-end',
					alignItems: 'flex-end',
					backgroundColor: '#000',
				}}>
				{/* Background image */}
				<img
					src={
						caseData.mainImage
							? urlFor(caseData.mainImage as ImageType)
									.width(1200)
									.height(630)
									.fit('crop')
									.url()!
							: '/og-image-fallback.png'
					}
					alt=''
					style={{
						position: 'absolute',
						inset: 0,
						width: '100%',
						height: '100%',
						objectFit: 'cover',
					}}
				/>

				<div
					style={{
						position: 'relative',
						padding: '40px',
						width: '100%',
						color: 'white',
						fontSize: 64,
						fontWeight: 700,
						fontFamily: 'sans-serif',
					}}>
					{caseData.title}
				</div>
			</div>
		),
		size
	)
}
