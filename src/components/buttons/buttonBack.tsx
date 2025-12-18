'use client'

import { IconArrowBack } from '@/components/icons'
import Link from 'next/link'

type ButtonBackProps = {
	label?: string
}

export default function ButtonBack({ label }: ButtonBackProps) {
	return (
		<Link
			href='/work'
			className='h-8 flex gap-4 items-center w-full text-lg md:text-xl'
			aria-label='Go back to previous page'>
			<span>
				<IconArrowBack />
			</span>
			<span className='block underlined-link whitespace-nowrap'>
				Back{label ? ` to ${label}` : ''}
			</span>
		</Link>
	)
}
