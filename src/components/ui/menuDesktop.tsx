'use client'

import { usePathname } from 'next/navigation'

import { NavLinkType } from '@/types'
import { Logo, NavBar } from '@/components/ui'

type MenuDesktopProps = {
	navLinks: NavLinkType[]
	casesSlugs: { slug: string; client: string }[]
}

export default function MenuDesktop({
	navLinks,
	casesSlugs,
}: MenuDesktopProps) {
	const pathname = usePathname()

	return (
		<div className='fixed pointer-events-none inset-0 z-10 hidden lg:block'>
			{/* CONTAINER */}
			<div className='custom-container mx-auto h-svh'>
				{/* 1/4 COLUMN */}
				<div className='relative w-1/4 flex flex-col justify-between h-full py-6 pl-6 pointer-events-auto'>
					{/* HEADER */}
					<header
						aria-label='Header desktop'
						className='h-header-mobile md:h-header-tablet lg:h-header-desktop'>
						<Logo />
					</header>
					{/* NAVLINKS */}
					<nav aria-label='Main navigation desktop'>
						<NavBar
							navLinks={navLinks}
							casesSlugs={casesSlugs}
							pathname={pathname}
						/>
					</nav>
				</div>
			</div>
		</div>
	)
}
