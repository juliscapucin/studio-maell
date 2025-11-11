'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

import { NavLinkType } from '@/types'

type MenuDesktopProps = {
	navLinks: NavLinkType[]
}

export default function MenuDesktop({ navLinks }: MenuDesktopProps) {
	const router = useRouter()
	const pathname = usePathname()
	const bulletRef = useRef<HTMLSpanElement>(null)

	return (
		<div className='fixed pointer-events-none inset-0 z-10 hidden md:block'>
			<div className='container mx-auto h-svh'>
				<div className='w-1/4 flex flex-col justify-between h-full p-8 pointer-events-auto'>
					{/* HEADER */}
					<header>
						<Link
							href='/'
							className='block underlined-link'
							onClick={(e) => {
								e.preventDefault()
								router.push('/')
							}}
							role='button'
							aria-current={pathname === '/' ? 'page' : undefined}>
							Studio Maell
						</Link>
						<p className='text-pretty'>
							Freelance Product Designer, specialised in accessibility and
							inclusive design.
						</p>
					</header>
					{/* NAVLINKS */}
					<nav>
						<ul className='relative'>
							{/* LINKS */}
							{navLinks.map(
								(link, index) =>
									link.slug !== '/' && (
										<li
											key={`panel-link-${index}`}
											className='mb-4 relative flex items-center gap-2'>
											<span
												ref={bulletRef}
												className={`absolute h-2 w-2 bg-secondary rounded-full transition-transform duration-300 ${pathname === `/${link.slug}` ? 'scale-100' : 'scale-0'}`}
												aria-hidden='true'></span>

											<Link
												key={`panel-button-${index}`}
												href={link.slug}
												className={`underlined-link transition-all duration-300 ${
													pathname === `/${link.slug}`
														? 'font-bold translate-x-4'
														: ''
												}`}
												onClick={(e) => {
													e.preventDefault()
													router.push(`/${link.slug}`)
												}}
												role='button'
												aria-current={
													pathname === `/${link.slug}` ? 'page' : undefined
												}>
												{link.label}
											</Link>
										</li>
									)
							)}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	)
}
