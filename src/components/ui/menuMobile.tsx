'use client'

import { useRef, useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import gsap from 'gsap'

import { ButtonBurger, ButtonClose } from '@/components/buttons'

import type { NavLinkType } from '@/types'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import Logo from './logo'

type NavLinksProps = {
	navLinks: NavLinkType[]
}

export default function MenuMobile({ navLinks }: NavLinksProps) {
	const mobileMenuRef = useRef<HTMLDivElement | null>(null)
	const pathname = usePathname()
	const router = useRouter()

	const bulletRef = useRef<HTMLSpanElement>(null)

	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [slug, setSlug] = useState<string | null>(null)

	const toggleMenu = (slug?: string | null) => {
		setIsMenuOpen((prev) => !prev)
		if (slug) {
			router.push(slug)
		}
	}

	useGSAP(
		() => {
			if (!mobileMenuRef.current) return

			if (isMenuOpen) {
				gsap.to(mobileMenuRef.current, {
					y: '0%',
					duration: 0.5,
					ease: 'power4.out',
					onComplete: () => {
						document.body.style.overflow = 'hidden'
						if (slug) router.push(slug)
					},
				})
			} else {
				document.body.style.overflow = 'unset'
				gsap.to(mobileMenuRef.current, {
					y: '-120%',
					duration: 0.5,
					ease: 'power4.in',
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
				toggleMenu()
			}
		}

		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [isMenuOpen])

	return (
		navLinks && (
			<>
				{/* BURGER BUTTON - Outside header for blend mode */}
				<ButtonBurger
					className='z-50 pointer-events-auto fixed bottom-0 flex w-full items-center justify-end pr-6 md:hidden'
					onClick={() => toggleMenu()}
					aria-expanded={isMenuOpen}
					aria-controls='mobile-menu'
					aria-haspopup='dialog'
					aria-label={'Open navigation menu'}
				/>
				<header className='fixed top-2 right-0 left-0 z-50 pointer-events-none block h-dvh md:hidden gutter-stable'>
					{/* EXPANDED MENU */}
					<aside
						className='z-50 pointer-events-auto fixed top-0 min-h-svh w-full bg-primary transition-transform duration-300 p-6'
						ref={mobileMenuRef}
						role='dialog'
						aria-modal='true'
						aria-labelledby='mobile-menu-title'>
						<Logo />
						<div className='absolute bottom-6 right-6 z-100 flex items-end justify-between'>
							{/* CLOSE BUTTON */}
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
						<nav aria-label='Navigation' className='h-screen flex items-end'>
							<ul className='space-y-6'>
								{navLinks.map((link) => {
									const isCurrentPage =
										(link.slug === '/' && pathname === '/') ||
										(link.slug !== '/' && pathname.includes(`${link.slug}`))

									return (
										<li className='relative flex items-center' key={link.slug}>
											<span
												ref={bulletRef}
												className={`absolute h-2 w-2 bg-secondary rounded-full transition-transform duration-300 ${pathname === `/${link.slug}` ? 'scale-100' : 'scale-0'}`}
												aria-hidden='true'></span>
											<Link
												href={link.slug}
												className={`block transition-transform duration-500 ${isCurrentPage ? 'translate-x-4' : 'translate-0'}`}
												onClick={(e) => {
													e.preventDefault()
													toggleMenu(link.slug)
												}}
												aria-current={isCurrentPage ? 'location' : undefined}
												tabIndex={isMenuOpen ? 0 : -1}>
												<span className='text-secondary uppercase'>
													{link.label}
												</span>
											</Link>
										</li>
									)
								})}
							</ul>
						</nav>
					</aside>
				</header>
			</>
		)
	)
}
