import { PageWrapper } from '@/components/ui'
import Link from 'next/link'

type EmptyResultsProps = {
	message: string
	variant?: 'page' | 'inline'
}

export default function EmptyResults({ message, variant }: EmptyResultsProps) {
	// split message into multiple lines if it contains periods
	const lines = message
		.split('. ')
		.filter((line) => line.trim() !== '')
		.map((line, index, array) => (index < array.length - 1 ? line + '.' : line))

	return variant === 'page' ? (
		<PageWrapper classes='flex flex-col items-center justify-center'>
			<div className='h-content w-full flex flex-col items-center justify-center bg-secondary rounded-sm text-tertiary'>
				<h1 className='heading-title text-center text-pretty'>{lines[0]}</h1>
				<div className='max-w-prose'>
					{lines.slice(1).map((line, index) => (
						<p key={index} className='mt-4 text-pretty text-center mb-2'>
							{line}
						</p>
					))}
					<Link href='/' className='btn btn-ghost-tertiary mx-auto mt-6'>
						Start again
					</Link>
				</div>
			</div>
		</PageWrapper>
	) : (
		<div className='w-full h-full min-h-96 flex flex-col items-center justify-center bg-secondary rounded-sm'>
			<p className='text-center text-pretty text-tertiary'>{message}</p>
			<Link href='/' className='btn btn-ghost-tertiary mx-auto mt-6'>
				Start again
			</Link>
		</div>
	)
}
