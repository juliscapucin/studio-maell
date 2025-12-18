'use client'

import Link from 'next/link'
import { Fragment, useRef } from 'react'

import { NavLinkType } from '@/types'

import { IconDash } from '@/components/icons'

type NavBarProps = {
	isMobile?: boolean
	navLinks: NavLinkType[]
	toggleMenu?: (slug?: string | null) => void
	isMenuOpen?: boolean
	pathname: string
	casesSlugs: { slug: string; client: string }[]
}

export default function NavBar({
	isMobile = false,
	navLinks,
	toggleMenu,
	isMenuOpen = false,
	pathname,
	casesSlugs,
}: NavBarProps) {
	const bulletRef = useRef<HTMLSpanElement>(null)
	const submenuRef = useRef<HTMLUListElement>(null)

	return (
		<ul className='relative text-xl leading-[1.2]'>
			{navLinks.map((link, index) => {
				const isInternalPage =
					pathname.split('/')[1] === 'work' && pathname !== '/work'
				const showBullet =
					pathname === `/${link.slug}` ||
					(link.slug === 'work' && isInternalPage) ||
					(pathname === '/' && link.slug === 'work')
				return (
					<Fragment key={`fragment-${index}`}>
						<li className='relative flex items-center gap-2 mt-6'>
							<span
								ref={bulletRef}
								className={`absolute h-2 w-2 bg-secondary rounded-full transition-transform duration-300 ${showBullet ? 'scale-100' : 'scale-0'}`}
								aria-hidden='true'></span>

							<Link
								key={`panel-button-${index}`}
								href={`/${link.slug}`}
								onClick={(e) => {
									if (!isMobile || !toggleMenu) return
									e.preventDefault()
									toggleMenu(`/${link.slug}`)
								}}
								className={`underlined-link transition-all duration-300 ${
									showBullet ? 'font-bold translate-x-4' : ''
								}`}
								tabIndex={isMobile ? (isMenuOpen ? 0 : -1) : 0}
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
								aria-hidden={!isInternalPage}
								className={`space-y-6 transition-[max-height] overflow-clip duration-200  ${
									isInternalPage
										? 'max-h-96 relative my-6 ease-in'
										: 'max-h-0 ease-out'
								}`}>
								{casesSlugs.map(
									(
										caseItem: { slug: string; client: string },
										index: number
									) => {
										const active = pathname === `/work/${caseItem.slug}`
										return (
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
													onClick={(e) => {
														if (!isMobile || !toggleMenu) return
														e.preventDefault()
														toggleMenu(`/work/${caseItem.slug}`)
													}}
													aria-current={active ? 'page' : undefined}
													aria-expanded={active}
													tabIndex={
														isInternalPage && (isMenuOpen || !isMobile) ? 0 : -1
													}>
													<div className='mt-[13px]'>
														<IconDash />
													</div>
													{caseItem.client}
												</Link>
											</li>
										)
									}
								)}
							</ul>
						)}
					</Fragment>
				)
			})}
		</ul>
	)
}
