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
	const cardContainerRef = useRef<HTMLDivElement>(null)
	const cardRef = useRef<HTMLElement>(null)
	const cardContentRef = useRef<HTMLDivElement>(null)
	const transitionAnimationRef = useRef<() => void>(() => {})

	useGSAP(
		() => {
			gsap.set(cardContainerRef.current, { opacity: 0 })

			transitionAnimationRef.current = () => {
				if (
					!cardContainerRef.current ||
					!cardRef.current ||
					!cardContentRef.current ||
					!caseData
				)
					return

				const cardRect = cardRef.current.getBoundingClientRect()
				const columnWidth = (cardRect.width - 100) / 8
				const screenWidth = window.innerWidth
				const marginX = screenWidth > 768 ? columnWidth + 10 : 0
				const marginTop = screenWidth > 768 ? 48 : 24

				gsap.set(cardContainerRef.current, {
					top: 0,
					left: 0,
					width: cardRect.width,
					height: window.innerHeight,
					opacity: 1,
				})

				const tl = gsap.timeline()

				const siblingCards = document.querySelectorAll(
					'[data-animation="case-card"]'
				)
				siblingCards.forEach((sibling) => {
					if (sibling !== cardRef.current) {
						gsap.to(sibling, { opacity: 0, duration: 0.2 })
					}
				})

				tl.fromTo(
					cardContainerRef.current,
					{ height: cardRect.height, y: 0 },
					{
						height: window.innerHeight,
						y: -cardRect.top + (screenWidth > 1024 ? 24 : 16),
						duration: 0.3,
						ease: 'power4.out',
					}
				)
					.to(
						cardContentRef.current,
						{
							marginLeft: marginX,
							marginRight: marginX,
							marginTop: marginTop,
							duration: 0.2,
							ease: 'power4.out',
						},
						'<'
					)
					.to(
						'.gsap-card-image',
						{
							width: '100%',
							duration: 0.3,
							ease: 'power4.out',
						},
						'<'
					)
					.to(
						'.gsap-card-divider',
						{
							backgroundColor: 'var(--color-accent-1)',
							duration: 0.2,
							ease: 'power4.out',
							onComplete: () => {
								router.push(`/work/${caseData.slug}`)
							},
						},
						'<0.1'
					)
			}
		},
		{ scope: cardContainerRef }
	)

	if (!caseData) {
		return <EmptyResults message='This case is not available' />
	}

	return (
		<div className='relative'>
			{/* TRANSITION OVERLAY */}
			<div
				ref={cardContainerRef}
				className='absolute bg-secondary rounded-sm min-w-full container z-20 pointer-events-none'
				aria-hidden='true'>
				<div className='bg-secondary w-full text-tertiary rounded-sm px-4 py-14 md:py-12 md:px-6'>
					<div ref={cardContentRef}>
						<h2 className='gsap-card-title heading-headline'>
							{caseData.title}
						</h2>
						<p className='gsap-card-client mt-4 text-tag'>{caseData.client}</p>
						<div className='gsap-card-divider my-6 lg:my-8 h-0.5 bg-tertiary' />
					</div>
					{caseData.mainImage && (
						<ImageWithSpinner
							containerClassName='gsap-card-image w-full sm:w-[400px] h-48 md:h-72 lg:h-96 relative'
							alt={caseData.alt || caseData.title}
							imageClassName='w-full h-full object-cover'
							imageSrc={{
								url: urlFor(caseData.mainImage).width(1200).url(),
							}}
							sizes='100vw'
							fill
						/>
					)}
				</div>
			</div>

			<article
				ref={cardRef}
				className='bg-secondary text-tertiary rounded-sm px-4 py-6 md:px-6 w-full'
				data-testid='case-study-card'
				data-animation='case-card'>
				<h2 className='heading-headline'>{caseData.title}</h2>
				<p className='mt-4 text-tag'>{caseData.client}</p>
				<div className='my-6 lg:my-8 h-0.5 bg-tertiary' />
				<div className='flex flex-col sm:flex-row gap-6 justify-between items-end'>
					{caseData.mainImage && (
						<ImageWithSpinner
							containerClassName='w-full sm:w-[400px] h-48 md:h-72 lg:h-96 relative'
							imageClassName='w-full h-full object-cover'
							alt={caseData.alt || caseData.title}
							imageSrc={{ url: urlFor(caseData.mainImage).width(1200).url() }}
							sizes='100vw'
							fill
						/>
					)}
					<ButtonCase onClick={() => transitionAnimationRef.current()} />
				</div>
			</article>
		</div>
	)
}
