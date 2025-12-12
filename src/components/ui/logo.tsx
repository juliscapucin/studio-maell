'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

type LogoProps = {
	isDescriptionVisible?: boolean
}

export default function Logo({ isDescriptionVisible = true }: LogoProps) {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<div>
			<Link
				href='/'
				className='block underlined-link uppercase font-primary text-body-medium'
				onClick={(e) => {
					e.preventDefault()
					router.push('/')
				}}
				role='button'
				aria-current={pathname === '/' ? 'page' : undefined}>
				Studio Maell
			</Link>
			<p
				className={`max-w-72 leading-[1.05] text-body-large ${isDescriptionVisible ? 'opacity-100' : 'opacity-0 delay-500'} transition-opacity duration-300`}
				data-testid='logo-description-desktop'>
				Freelance Product Designer, specialised in accessibility and inclusive
				design.
			</p>
		</div>
	)
}
