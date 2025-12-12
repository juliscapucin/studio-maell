'use client'

import { useRef, Fragment } from 'react'
import { usePathname } from 'next/navigation'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GSDevTools } from 'gsap/GSDevTools'
gsap.registerPlugin(ScrollSmoother, ScrollTrigger, GSDevTools)

type PageWrapperProps = {
	classes?: string
	children?: React.ReactNode
	hasTransition?: boolean
}

export default function PageWrapper({
	children,
	classes,
	hasTransition = true,
}: PageWrapperProps) {
	const pathname = usePathname()

	const pageTransitionRef = useRef<HTMLDivElement | null>(null)

	// * PAGE TRANSITION ANIMATION *//
	useGSAP(() => {
		if (!pageTransitionRef.current || !hasTransition) return

		// Animate the mask to reveal the content
		gsap.fromTo(
			pageTransitionRef.current,
			{
				opacity: 0,
			},
			{
				duration: 0.4,
				opacity: 1,
				ease: 'power2.out',
			}
		)

		// GSDevTools.create()
	}, [pathname])

	return (
		<Fragment key={pathname}>
			<main
				ref={pageTransitionRef}
				id='main-content' // Add id for skip link
				tabIndex={-1} // Make focusable for skip link
				className={`w-full flex-3/4 relative p-4 lg:p-6 pb-18 lg:pb-6 ${classes ? classes : ''}`}>
				{children}
			</main>
		</Fragment>
	)
}
