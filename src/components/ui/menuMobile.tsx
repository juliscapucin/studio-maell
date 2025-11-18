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
			gsap.set(mobileMenuRef.current, { y: window.innerHeight - 70 }) // so that the header is visible
		},
		{ dependencies: [], scope: mobileMenuRef }
	)

	useGSAP(
		() => {
			if (!mobileMenuRef.current) return

			if (isMenuOpen) {
				gsap.to(mobileMenuRef.current, {
					y: 0,
					duration: 0.5,
					ease: 'power3.out',
					onComplete: () => {
						document.body.style.overflow = 'hidden'
					},
				})
			} else {
				document.body.style.overflow = 'unset'
				gsap.to(mobileMenuRef.current, {
					y: window.innerHeight - 70,
					duration: 0.5,
					ease: 'power3.in',
					delay: 0.3,
				})
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
			<header className='fixed inset-0 z-100 block h-dvh lg:hidden gutter-stable pointer-events-none overflow-clip'>
				{/* EXPANDED MENU */}
				<aside
					className='relative h-svh w-full p-4 pt-0 pointer-events-auto bg-primary'
					ref={mobileMenuRef}
					role='dialog'
					aria-modal='true'
					aria-labelledby='mobile-menu-title'
					tabIndex={isMenuOpen ? 0 : -1}>
					{/* TOP GRADIENT */}
					<div className='absolute -top-[3px] h-1 w-full bg-linear-to-b from-transparent to-primary'></div>
					<div className='absolute top-6 left-6 right-6 flex items-start justify-between z-100'>
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
