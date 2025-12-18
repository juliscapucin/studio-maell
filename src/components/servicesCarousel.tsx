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

			let draggable: Draggable | null = null

			const setupDraggable = () => {
				const containerWidth = parent.offsetWidth
				const totalWidth = carousel.scrollWidth
				const maxScroll = totalWidth - containerWidth

				// Kill if it shouldn't exist
				if (maxScroll <= 0) {
					draggable?.kill()
					draggable = null
					gsap.set(carousel, { x: 0 })
					return
				}

				// Create if missing
				if (!draggable) {
					gsap.set(carousel, { x: 0 })

					draggable = Draggable.create(carousel, {
						type: 'x',
						inertia: true,
						edgeResistance: 0.85,
						dragResistance: 0.1,
						bounds: { minX: -maxScroll, maxX: 0 },
						cursor: 'grab',
						activeCursor: 'grabbing',
						allowContextMenu: true,
						zIndexBoost: false,
					})[0]
				} else {
					// Update bounds + clamp current position
					const currentX = gsap.getProperty(carousel, 'x') as number

					const clampedX = gsap.utils.clamp(-maxScroll, 0, currentX)

					gsap.set(carousel, { x: clampedX })
					draggable.applyBounds({ minX: -maxScroll, maxX: 0 })
				}
			}

			// Initial setup
			setupDraggable()

			// Observe parent size changes
			const resizeObserver = new ResizeObserver(() => {
				setupDraggable()
			})

			resizeObserver.observe(parent)

			return () => {
				resizeObserver.disconnect()
				draggable?.kill()
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
