'use client'

import { useRouter } from 'next/navigation'

import { IconArrowBack } from '@/components/icons'

type ButtonBackProps = {
	label?: string
}

export default function ButtonBack({ label }: ButtonBackProps) {
	const router = useRouter()

	return (
		<button
			className='absolute top-4 md:top-6 left-4 md:left-6 h-8 flex gap-4 items-center w-full pb-4 text-lg md:text-xl'
			onClick={() => router.back()}
			aria-label='Go back to previous page'>
			<IconArrowBack />
			<span className='underlined-link'>Back{label ? ` to ${label}` : ''}</span>
		</button>
	)
}
