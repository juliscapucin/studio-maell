'use client'

import { useRouter } from 'next/navigation'

import { IconArrow } from '@/components/icons'

type ButtonBackProps = {
	label?: string
}

export default function ButtonProject({ label }: ButtonBackProps) {
	const router = useRouter()

	return (
		<button
			className='h-8 mb-8 flex gap-4 items-center w-full pb-4'
			onClick={() => router.back()}
			aria-label='Go back to previous page'>
			<IconArrow aria-hidden='true' />
			<span className='underlined-link'>Back{label ? ` to ${label}` : ''}</span>
		</button>
	)
}
