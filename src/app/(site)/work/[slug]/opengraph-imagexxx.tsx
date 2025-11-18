import { ImageResponse } from 'next/og'
import { getCaseBySlug } from '@/sanity/lib/queries'

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
				{caseData.mainImage && (
					<img
						src={caseData.mainImage}
						alt=''
						style={{
							position: 'absolute',
							inset: 0,
							width: '100%',
							height: '100%',
							objectFit: 'cover',
						}}
					/>
				)}
			</div>
		),
		size
	)
}
