'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

import { NavLinkType } from '@/types'
import { Logo } from '@/components/ui'

type MenuDesktopProps = {
	navLinks: NavLinkType[]
}

export default function MenuDesktop({ navLinks }: MenuDesktopProps) {
	const router = useRouter()
	const pathname = usePathname()
	const bulletRef = useRef<HTMLSpanElement>(null)

	return (
		<div className='fixed pointer-events-none inset-0 z-10 hidden md:block'>
			{/* CONTAINER */}
			<div className='custom-container mx-auto h-svh'>
				{/* 1/4 COLUMN */}
				<div className='w-1/4 flex flex-col justify-between h-full p-6 pointer-events-auto'>
					{/* HEADER */}
					<header className='h-header-desktop'>
						<Logo />
					</header>
					{/* NAVLINKS */}
					<nav>
						<ul className='relative space-y-6'>
							{/* LINKS */}
							{navLinks.map((link, index) => {
								const isInternalPage =
									pathname.split('/')[1] === 'work' && link.slug === 'work'
								return (
									<>
										<li
											key={`panel-link-${index}`}
											className='relative flex items-center gap-2'>
											<span
												ref={bulletRef}
												className={`absolute h-2 w-2 bg-secondary rounded-full transition-transform duration-300 ${pathname === `/${link.slug}` ? 'scale-100' : 'scale-0'}`}
												aria-hidden='true'></span>

											<Link
												key={`panel-button-${index}`}
												href={link.slug}
												className={`underlined-link text-xl transition-all duration-300 ${
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
										{index === 0 && isInternalPage && (
											<li className='h-6'>hi</li>
										)}
									</>
								)
							})}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	)
}
