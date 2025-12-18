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
			if (!carouselRef.current || services.length <= 1) return

			const carousel = carouselRef.current
			const parent = carousel.parentElement
			if (!parent) return

			Draggable.get(carousel)?.kill() // Clean up previous instances

			const containerWidth = parent.offsetWidth
			const totalWidth = carousel.scrollWidth
			const maxScroll = totalWidth - containerWidth

			if (maxScroll <= 0) return // No need to make it draggable if content fits

			gsap.set(carousel, { x: 0 })

			Draggable.create(carousel, {
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

			return () => {
				Draggable.get(carousel)?.kill()
			}
		},
		{ scope: carouselRef }
	)

	return (
		<div className='overflow-visible'>
			<div ref={carouselRef} className='flex gap-6 text-tertiary z-0'>
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
