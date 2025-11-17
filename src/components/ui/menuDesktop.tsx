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
				<div className='relative w-1/4 flex flex-col justify-between h-full p-6 pointer-events-auto'>
					{/* HEADER */}
					<header className='h-header-mobile md:h-header-tablet lg:h-header-desktop'>
						<Logo />
						{/* HORIZONTAL LINE */}
						{(pathname === '/' ||
							pathname === '/work' ||
							pathname === '/services') && (
							<div
								className='header-line -left-6 w-[90vw]'
								aria-hidden='true'></div>
						)}
					</header>
					{/* NAVLINKS */}
					<nav>
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
