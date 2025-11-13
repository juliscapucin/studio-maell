'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

export default function Logo() {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<>
			<Link
				href='/'
				className='block underlined-link uppercase font-primary'
				onClick={(e) => {
					e.preventDefault()
					router.push('/')
				}}
				role='button'
				aria-current={pathname === '/' ? 'page' : undefined}>
				Studio Maell
			</Link>
			<p className='text-pretty max-w-64 leading-snug'>
				Freelance Product Designer, specialised in accessibility and inclusive
				design.
			</p>
		</>
	)
}
