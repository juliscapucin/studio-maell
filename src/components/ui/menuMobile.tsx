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
					yPercent: 0,
					duration: 0.5,
					ease: 'power3.out',
					onComplete: () => {
						document.body.style.overflow = 'hidden'
						if (slug) router.push(slug)
					},
				})
			} else {
				document.body.style.overflow = 'unset'
				gsap.to(mobileMenuRef.current, {
					yPercent: 92,
					duration: 0.5,
					ease: 'power3.in',
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
			<header className='fixed inset-0 z-100 block h-dvh md:hidden gutter-stable pointer-events-none'>
				{/* EXPANDED MENU */}
				<aside
					className='h-svh w-full bg-primary p-6 pointer-events-auto'
					ref={mobileMenuRef}
					role='dialog'
					aria-modal='true'
					aria-labelledby='mobile-menu-title'>
					{/* LOGO */}
					<div className='absolute top-6 left-6 right-6 flex items-start justify-between z-100'>
						<Logo isDescriptionVisible={isMenuOpen} />
						{/* BURGER BUTTON */}
						<ButtonBurger
							className={`md:hidden ${isMenuOpen ? 'opacity-0' : 'opacity-100 pointer-events-auto'} transition-opacity duration-300`}
							onClick={() => toggleMenu()}
							aria-expanded={isMenuOpen}
							aria-controls='mobile-menu'
							aria-haspopup='dialog'
							aria-label={'Open navigation menu'}
						/>
					</div>

					{/* CLOSE BUTTON */}
					<div
						className={`absolute bottom-6 right-6 z-100 flex items-end justify-between bg-primary ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'} transition-opacity duration-300`}>
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
					<nav aria-label='Navigation' className='flex h-full items-end pb-40'>
						<ul className='space-y-6'>
							{navLinks.map((link) => {
								const isCurrentPage =
									(link.slug === '/' && pathname === '/') ||
									(link.slug !== '/' && pathname.includes(`${link.slug}`))

								return (
									<li key={link.slug}>
										<Link
											href={link.slug}
											className='relative flex items-center'
											onClick={(e) => {
												e.preventDefault()
												toggleMenu(link.slug)
											}}
											aria-current={isCurrentPage ? 'location' : undefined}
											tabIndex={isMenuOpen ? 0 : -1}>
											{/* BULLET */}
											<span
												ref={bulletRef}
												className={`absolute h-2 w-2 bg-secondary rounded-full transition-transform duration-300 ${pathname === `/${link.slug}` ? 'scale-100' : 'scale-0'}`}
												aria-hidden='true'></span>
											<span
												className={`text-secondary transition-transform duration-500 ${isCurrentPage ? 'translate-x-4 font-bold' : 'translate-0'}`}>
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
		)
	)
}
