'use client'

import { useRouter } from 'next/navigation'

import { IconArrow } from '@/components/icons'

type ButtonCaseProps = {
	slug: string
}

export default function ButtonCase({ slug }: ButtonCaseProps) {
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
