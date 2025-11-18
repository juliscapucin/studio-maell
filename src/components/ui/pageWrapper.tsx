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
}

export default function PageWrapper({ children, classes }: PageWrapperProps) {
	const pathname = usePathname()

	const pageTransitionRef = useRef<HTMLDivElement | null>(null)

	// * PAGE TRANSITION ANIMATION *//
	useGSAP(() => {
		if (!pageTransitionRef.current) return

		// Animate the mask to reveal the content
		gsap.to(pageTransitionRef.current, {
			duration: 0.7,
			opacity: 0,
			ease: 'power2.out',
		})

		// GSDevTools.create()
	}, [pathname])

	return (
		<Fragment key={pathname}>
			{/* PAGE TRANSITION MASK */}
			<div
				ref={pageTransitionRef}
				className='gsap-page-transition fixed inset-0 z-50 hidden lg:block pointer-events-none'>
				<div className='custom-container h-full'>
					<div className='h-full w-3/4 ml-auto bg-primary'></div>
				</div>
			</div>

			{/* MAIN CONTENT */}
			<main
				id='main-content' // Add id for skip link
				tabIndex={-1} // Make focusable for skip link
				className={`w-full flex-3/4 relative p-4 lg:p-6 gutter-stable pb-18 lg:pb-6 overflow-x-clip ${classes ? classes : ''}`}>
				{children}
			</main>
		</Fragment>
	)
}
