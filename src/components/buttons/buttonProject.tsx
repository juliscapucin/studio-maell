'use client'

import { useRouter } from 'next/navigation'

import { IconArrow } from '@/components/icons'

type ButtonProjectProps = {
	slug: string
}

export default function ButtonProject({ slug }: ButtonProjectProps) {
	const router = useRouter()

	return (
		<button
			className='btn btn-ghost-tertiary'
			onClick={() => router.push(`/work/${slug}`)}>
			<span>Read case</span>
			<IconArrow />
		</button>
	)
}
