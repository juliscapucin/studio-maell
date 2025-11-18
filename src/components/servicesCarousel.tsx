'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Draggable from 'gsap/Draggable'
import InertiaPlugin from 'gsap/InertiaPlugin'

import { ServiceCard } from '@/components'
import { EmptyResults } from '@/components/ui'

import { ServiceType } from '@/types'

gsap.registerPlugin(Draggable, InertiaPlugin)

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
			const maxScroll = totalWidth - containerWidth + 44 // extra padding

			if (maxScroll <= 0) return // No need to make it draggable if content fits

			gsap.set(container, { x: 0 })

			Draggable.create(container, {
				type: 'x',
				edgeResistance: 0.85,
				inertia: true,
				bounds: { minX: -maxScroll, maxX: 0 },
				cursor: 'grab',
				activeCursor: 'grabbing',
				dragResistance: 0.1,
				allowContextMenu: true,
				zIndexBoost: false,
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
		<div
			ref={carouselRef}
			className='relative flex gap-6 text-tertiary col-start-2 col-span-3 z-0'>
			{services && services.length > 0 ? (
				services.map((service: ServiceType) => (
					<ServiceCard key={service.title} service={service} />
				))
			) : (
				<EmptyResults message='No services available at the moment' />
			)}
		</div>
	)
}
