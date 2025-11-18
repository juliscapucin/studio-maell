'use client'

import { useRef, useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { ButtonBurger, ButtonClose } from '@/components/buttons'

import type { NavLinkType } from '@/types'
import Logo from './logo'
import NavBar from './navBar'

type NavLinksProps = {
	navLinks: NavLinkType[]
	casesSlugs: { slug: string; client: string }[]
}

export default function MenuMobile({ navLinks, casesSlugs }: NavLinksProps) {
	const mobileMenuRef = useRef<HTMLDivElement | null>(null)
	const mobileHeaderRef = useRef<HTMLDivElement | null>(null)
	const pathname = usePathname()
	const router = useRouter()

	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = (slug?: string | null) => {
		setIsMenuOpen((prev) => !prev)
		if (slug) {
			router.push(`${slug}`)
		}
	}

	// Initial position of the mobile menu
	useGSAP(
		() => {
			if (!mobileMenuRef.current) return
			gsap.set(mobileMenuRef.current, { y: window.innerHeight })
		},
		{ dependencies: [], scope: mobileMenuRef }
	)

	useGSAP(
		() => {
			if (!mobileMenuRef.current) return

			// Open animation
			if (isMenuOpen) {
				const tl = gsap.timeline()
				tl.to(mobileMenuRef.current, {
					y: 0,
					duration: 0.5,
					ease: 'power3.out',
					onComplete: () => {
						document.body.style.overflow = 'hidden'
					},
				}).to(
					mobileHeaderRef.current,
					{
						opacity: 0,
						yPercent: -100,
						duration: 0.1,
					},
					'-=0.5'
				)
				// Close animation
			} else {
				document.body.style.overflow = 'unset'
				const tl = gsap.timeline()
				tl.to(mobileMenuRef.current, {
					y: window.innerHeight,
					duration: 0.5,
					ease: 'power3.in',
					delay: 0.3,
				}).to(
					mobileHeaderRef.current,
					{
						opacity: 1,
						yPercent: 0,
						duration: 0.3,
					},
					'-=0.3'
				)
			}
		},
		{ dependencies: [isMenuOpen], scope: mobileMenuRef }
	)

	// Handle escape key
	useEffect(() => {
		if (!isMenuOpen) return
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isMenuOpen) {
				setIsMenuOpen(false)
			}
		}

		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [isMenuOpen])

	return (
		navLinks && (
			<header className='fixed inset-0 z-100 block lg:hidden gutter-stable pointer-events-none overflow-clip'>
				<div
					ref={mobileHeaderRef}
					className='absolute -bottom-8 left-0 right-0 h-28 p-6 flex items-start justify-between bg-primary z-50 pointer-events-auto'>
					{/* TOP GRADIENT */}
					<div className='absolute -top-[3px] -left-6 -right-6 h-1 bg-linear-to-b from-transparent to-primary'></div>
					{/* LOGO */}
					<Logo isDescriptionVisible={false} />
					{/* BURGER BUTTON */}
					<ButtonBurger
						className={`${isMenuOpen ? 'opacity-0' : 'opacity-100 delay-200'} transition-opacity duration-300`}
						onClick={() => toggleMenu()}
						aria-expanded={isMenuOpen}
						aria-controls='mobile-menu'
						aria-haspopup='dialog'
						aria-label={'Open navigation menu'}
					/>
				</div>

				{/* EXPANDED MENU */}
				<aside
					className='relative h-svh w-full p-4 pt-0 pointer-events-auto bg-primary z-100'
					ref={mobileMenuRef}
					role='dialog'
					aria-modal='true'
					aria-labelledby='mobile-menu-title'
					tabIndex={isMenuOpen ? 0 : -1}>
					{/* TOP GRADIENT */}
					<div className='absolute -top-[3px] -left-6 -right-6 h-1 w-full bg-linear-to-b from-transparent to-primary'></div>
					{/* BOTTOM ELEMENT */}
					<div className='absolute -bottom-24 -left-6 -right-6 h-28 w-full bg-primary'></div>
					<div className='absolute top-6 left-6 right-6 flex items-start justify-between z-100 pointer-events-auto'>
						{/* LOGO */}
						<Logo isDescriptionVisible={isMenuOpen} />
						{/* BURGER BUTTON */}
						<ButtonBurger
							className={`${isMenuOpen ? 'opacity-0' : 'opacity-100 delay-200'} transition-opacity duration-300`}
							onClick={() => toggleMenu()}
							aria-expanded={isMenuOpen}
							aria-controls='mobile-menu'
							aria-haspopup='dialog'
							aria-label={'Open navigation menu'}
						/>
					</div>

					{/* CLOSE BUTTON */}
					<div
						className={`absolute bottom-6 right-6 z-100 flex items-end justify-between bg-primary ${isMenuOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
						<ButtonClose
							aria-label='Close navigation menu'
							onClick={() => toggleMenu()}
						/>
					</div>

					{/* SCREEN READER TITLE */}
					<h2 id='mobile-menu-title' className='sr-only'>
						Navigation Menu
					</h2>

					{/* NAV LINKS */}
					<nav aria-label='Navigation' className='flex h-full items-end pb-28'>
						<NavBar
							isMobile={true}
							navLinks={navLinks}
							toggleMenu={toggleMenu}
							isMenuOpen={isMenuOpen}
							pathname={pathname}
							casesSlugs={casesSlugs}
						/>
					</nav>
				</aside>
			</header>
		)
	)
}
