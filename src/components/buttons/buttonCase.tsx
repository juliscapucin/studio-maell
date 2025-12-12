'use client'

import { IconArrow } from '@/components/icons'

type ButtonCaseProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function ButtonCase({ ...props }: ButtonCaseProps) {
	return (
		<button className='btn btn-ghost-tertiary text-nowrap ml-auto' {...props}>
			<span>Read case</span>
			<IconArrow />
		</button>
	)
}
