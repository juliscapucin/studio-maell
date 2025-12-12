'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { urlFor } from '@/sanity/lib/imageUrlBuilder'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { EmptyResults, ImageWithSpinner } from '@/components/ui'
import { ButtonCase } from '@/components/buttons'
import { CaseType } from '@/types/CaseType'

type CaseCardProps = {
	caseData?: CaseType
}

export default function CaseCard({ caseData }: CaseCardProps) {
	const router = useRouter()
	const transitionRef = useRef<HTMLDivElement>(null)
	const cardRef = useRef<HTMLElement>(null)
	const cardTransitionRef = useRef<HTMLElement>(null)

	const transitionAnimation = () => {
		if (
			transitionRef.current &&
			cardRef.current &&
			cardTransitionRef.current &&
			caseData
		) {
			const cardRect = cardRef.current.getBoundingClientRect()

			gsap.set(transitionRef.current, {
				top: 0,
				left: 0,
				width: cardRect.width,
				height: screen.height,
			})

			console.log(cardRect.top)

			gsap.set(transitionRef.current, { opacity: 1 })
			gsap.fromTo(
				transitionRef.current,
				{ height: cardRect.height, y: 0 },
				{
					height: screen.height,
					y: -cardRect.top + 24,
					duration: 0.3,
					ease: 'power3.out',
					onComplete: () => {
						router.push(`/work/${caseData.slug}`)
					},
				}
			)
		}
	}

	useGSAP(() => {
		gsap.set(transitionRef.current, { opacity: 0 })
		return () => {
			if (transitionRef.current) gsap.set(transitionRef.current, { opacity: 0 })
		}
	}, [])

	if (!caseData) {
		return <EmptyResults message='This case is not available' />
	}

	return (
		<div className='relative'>
			<div
				ref={transitionRef}
				className='absolute bg-secondary rounded-sm container z-20'
				aria-hidden='true'>
				<article
					ref={cardTransitionRef}
					className='bg-secondary text-tertiary rounded-sm px-4 py-6 md:px-6'
					data-testid='case-study-card'>
					<h2 className='heading-headline'>{caseData.title}</h2>
					<p className='mt-4 text-tag'>{caseData.client}</p>
					<div className='my-6 lg:my-8 h-0.5 bg-tertiary' />
					<div className='flex flex-col sm:flex-row gap-6 justify-between items-end'>
						{caseData.mainImage && (
							<ImageWithSpinner
								containerClassName='w-full sm:w-1/2 lg:w-3/4 xl:w-1/2 2xl:w-1/3 h-36 sm:h-56 md:h-96 relative'
								imageClassName='w-full h-full object-cover'
								imageSrc={{
									url: urlFor(caseData.mainImage).width(1200).url(),
								}}
								sizes='100vw'
								fill
							/>
						)}
						<ButtonCase onClick={transitionAnimation} />
					</div>
				</article>
			</div>

			<article
				ref={cardRef}
				className='bg-secondary text-tertiary rounded-sm px-4 py-6 md:px-6'
				data-testid='case-study-card'>
				<h2 className='heading-headline'>{caseData.title}</h2>
				<p className='mt-4 text-tag'>{caseData.client}</p>
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
					<ButtonCase onClick={transitionAnimation} />
				</div>
			</article>
		</div>
	)
}
