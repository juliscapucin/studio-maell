'use client'

import { Fragment, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NavLinkType } from '@/types'
import { Logo } from '@/components/ui'
import { IconDash } from '@/components/icons'

type MenuDesktopProps = {
	navLinks: NavLinkType[]
	casesSlugs: { slug: string; client: string }[]
}

export default function MenuDesktop({
	navLinks,
	casesSlugs,
}: MenuDesktopProps) {
	const pathname = usePathname()
	const bulletRef = useRef<HTMLSpanElement>(null)
	const submenuRef = useRef<HTMLUListElement>(null)

	return (
		<div className='fixed pointer-events-none inset-0 z-10 hidden lg:block'>
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
						<ul className='relative text-xl leading-[1.2]'>
							{/* LINKS */}
							{navLinks.map((link, index) => {
								const isInternalPage =
									pathname.split('/')[1] === 'work' && pathname !== '/work'
								return (
									<Fragment key={`fragment-${index}`}>
										<li className='relative flex items-center gap-2 mt-6'>
											<span
												ref={bulletRef}
												className={`absolute h-2 w-2 bg-secondary rounded-full transition-transform duration-300 ${pathname === `/${link.slug}` || isInternalPage ? 'scale-100' : 'scale-0'}`}
												aria-hidden='true'></span>

											<Link
												key={`panel-button-${index}`}
												href={`/${link.slug}`}
												className={`underlined-link transition-all duration-300 ${
													pathname === `/${link.slug}` || isInternalPage
														? 'font-bold translate-x-4'
														: ''
												}`}
												role='button'
												aria-current={
													pathname === `/${link.slug}` ? 'page' : undefined
												}>
												{link.label}
											</Link>
										</li>

										{/* SUBMENU FOR WORK PAGE */}
										{link.slug === 'work' && (
											<ul
												ref={submenuRef}
												className={`space-y-6 transition-[max-height] duration-300 ${
													isInternalPage
														? 'max-h-96 relative my-6'
														: 'max-h-0 overflow-clip'
												}`}>
												{casesSlugs.map(
													(
														caseItem: { slug: string; client: string },
														index: number
													) => (
														<li
															key={`case-link-${index}`}
															className='pl-4 flex items-center gap-2'>
															<Link
																href={`/work/${caseItem.slug}`}
																className={`flex gap-2 items-start ${
																	pathname === `/work/${caseItem.slug}`
																		? 'font-bold'
																		: ''
																}`}
																role='button'
																aria-current={
																	pathname === `/work/${caseItem.slug}`
																		? 'page'
																		: undefined
																}>
																<div className='mt-[13px]'>
																	<IconDash />
																</div>
																{caseItem.client}
															</Link>
														</li>
													)
												)}
											</ul>
										)}
									</Fragment>
								)
							})}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	)
}
