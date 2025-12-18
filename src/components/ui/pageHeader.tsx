'use client'

import { useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

type PageHeaderProps = {
	title?: string
	subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
	const horizontalLineRef = useRef<HTMLDivElement>(null)
	const subtitleRef = useRef<HTMLParagraphElement>(null)

	useGSAP(() => {
		if (subtitle && horizontalLineRef.current) {
			const mm = gsap.matchMedia()
			// Desktop only
			mm.add('(min-width: 1024px)', () => {
				const parentElementWidth =
					horizontalLineRef.current!.parentElement?.offsetWidth || 1200
				const subtitleWidth = subtitleRef.current?.offsetWidth || 200

				gsap.to(horizontalLineRef.current, {
					x: () =>
						// 600px is the amount the line is initially offset to the left
						`${600 + parentElementWidth - (subtitleWidth + 30)}px`,
					scrollTrigger: {
						start: 'top top',
						scrub: 0.3,
						end: '+=70', //shorter distance = faster start
					},
				})
			})
		}
	}, [])

	return (
		<>
			<header className='relative h-header-mobile md:h-header-tablet lg:h-header-desktop'>
				{/* TITLE */}
				{title && <h1 className='heading-display'>{title}</h1>}

				{subtitle && (
					<>
						{/* SUBTITLE */}
						<p
							ref={subtitleRef}
							className='absolute z-20 -right-4 md:-right-8 pr-4 md:pr-8 top-[72px] sm:top-[76px] md:top-[100px] lg:top-[100px] pl-6 max-w-78 md:max-w-102 text-lg text-body-large font-medium text-pretty leading-[1.05] bg-primary'>
							{subtitle}
						</p>
						{/* HORIZONTAL LINE */}
						<div
							ref={horizontalLineRef}
							className='header-line w-desktop -mt-6 -left-[600px] -z-10'
							aria-hidden='true'></div>
					</>
				)}
			</header>
		</>
	)
}
