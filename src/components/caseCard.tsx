import { urlFor } from '@/sanity/lib/imageUrlBuilder'

import { EmptyResults, ImageWithSpinner } from '@/components/ui'
import { ButtonCase } from '@/components/buttons'
import { CaseType } from '@/types/CaseType'

type CaseCardProps = {
	caseData?: CaseType
}

export default function CaseCard({ caseData }: CaseCardProps) {
	if (!caseData) {
		return <EmptyResults message='This case is not available' />
	}

	return (
		<article
			className='bg-secondary text-tertiary rounded-sm px-4 py-6 md:px-6'
			data-testid='case-study-card'>
			<h2 className='heading-title leading-[1.1]'>{caseData.title}</h2>
			<p className='mt-4 leading-[0.7]'>{caseData.client}</p>
			<div className='my-6 lg:my-8 h-0.5 bg-tertiary' />
			<div className='flex flex-col sm:flex-row gap-6 justify-between items-end'>
				{caseData.mainImage && (
					<ImageWithSpinner
						containerClassName='w-full sm:w-1/2 lg:w-3/4 xl:w-1/2 2xl:w-1/3 h-36 sm:h-56 md:h-96 relative'
						imageClassName='w-full h-full object-cover'
						imageSrc={{ url: urlFor(caseData.mainImage).width(1200).url() }}
						sizes='100vw'
						fill
					/>
				)}
				<ButtonCase slug={caseData.slug} />
			</div>
		</article>
	)
}
