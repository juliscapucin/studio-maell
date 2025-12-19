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
		if (!subtitle || !horizontalLineRef.current) return

		const line = horizontalLineRef.current
		const subtitleEl = subtitleRef.current
		const parent = line.parentElement
		if (!parent || !subtitleEl) return

		const mm = gsap.matchMedia()

		mm.add('(min-width: 1024px)', () => {
			const animation = gsap.to(line, {
				x: () => {
					const parentWidth = parent.offsetWidth
					const subtitleWidth = subtitleEl?.offsetWidth || 0

					// 600px = initial left offset
					return 600 + parentWidth - (subtitleWidth + 30)
				},
				scrollTrigger: {
					start: 'top top',
					end: '+=40',
					scrub: 0.3,
					invalidateOnRefresh: true,
				},
			})

			return () => {
				animation.kill()
			}
		})

		// Observe layout changes and refresh ScrollTrigger
		const resizeObserver = new ResizeObserver(() => {
			ScrollTrigger.refresh()
		})

		resizeObserver.observe(parent)

		return () => {
			resizeObserver.disconnect()
			mm.revert()
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
