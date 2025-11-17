'use client'

import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Draggable from 'gsap/Draggable'

import { ServiceCard } from '@/components'
import { EmptyResults } from '@/components/ui'

import { ServiceType } from '@/types'

gsap.registerPlugin(Draggable)

type ServicesCarouselProps = {
	services: ServiceType[]
}

export default function ServicesCarousel({ services }: ServicesCarouselProps) {
	const carouselRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			if (!carouselRef.current) return

			const container = carouselRef.current
			const parent = container.parentElement
			if (!parent) return

			const containerWidth = parent.offsetWidth
			const totalWidth = container.scrollWidth
			const maxScroll = totalWidth - containerWidth + 80 // extra padding

			gsap.set(container, { x: 0 })

			Draggable.create(container, {
				type: 'x',
				edgeResistance: 0.2,
				inertia: true,
				bounds: { minX: -maxScroll, maxX: 0 },
				cursor: 'grab',
				activeCursor: 'grabbing',
				dragResistance: 0,
				allowContextMenu: true,
			})

			// Optional: Update bounds on resize
			const handleResize = () => {
				const newMaxScroll = container.scrollWidth - parent.offsetWidth
				Draggable.get(container)?.applyBounds({ minX: -newMaxScroll, maxX: 0 })
			}
			window.addEventListener('resize', handleResize)

			return () => {
				window.removeEventListener('resize', handleResize)
				Draggable.get(container)?.kill()
			}
		},
		{ scope: carouselRef }
	)

	return (
		<div className='fixed left-0 bottom-18 lg:bottom-6 lg:left-1/4 right-0 px-6 overflow-x-clip touch-pan-x'>
			<div ref={carouselRef} className='flex gap-6 text-tertiary'>
				{services && services.length > 0 ? (
					services.map((service: ServiceType) => (
						<ServiceCard key={service.title} service={service} />
					))
				) : (
					<EmptyResults message='No services available at the moment' />
				)}
			</div>
		</div>
	)
}
