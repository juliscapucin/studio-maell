'use client'

import Link from 'next/link'

export default function Header() {
	return (
		<header className='block'>
			<Link href='/' className='underlined-link'>
				<h1>Studio Maell</h1>
			</Link>
			<p className='text-pretty'>
				Freelance Product Designer, specialised in accessibility and inclusive
				design.
			</p>
		</header>
	)
}
