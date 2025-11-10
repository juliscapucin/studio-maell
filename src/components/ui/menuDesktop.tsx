'use client'

import { NavLinkType } from '@/types'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

type MenuDesktopProps = {
	navLinks: NavLinkType[]
}

export default function MenuDesktop({ navLinks }: MenuDesktopProps) {
	const router = useRouter()
	const pathname = usePathname()

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
										<Link
											key={`panel-button-${index}`}
											href={link.slug}
											className='block underlined-link'
											onClick={(e) => {
												e.preventDefault()
												router.push(`/${link.slug}`)
											}}
											role='button'
											aria-current={pathname === '/' ? 'page' : undefined}>
											{link.label}
										</Link>
									)
							)}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	)
}
