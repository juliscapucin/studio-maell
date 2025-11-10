import { IconArrowUpRight } from '@/components/icons'

type ArticleCardProps = {
	date?: string
	publication?: string
	title?: string
	url?: string
}

export default function ArticleCard({
	date,
	publication,
	title,
	url,
}: ArticleCardProps) {
	return (
		<>
			<article className='flex justify-between items-start md:items-center group'>
				<div className='flex flex-col-reverse md:flex-row md:items-center md:flex-1'>
					{/* DATE AND PUBLICATION */}
					<div className='flex gap-4 md:block md:flex-1'>
						<p>{date || 'Sept. 2025'}</p>
						<p>{publication || 'Smashing Magazine'}</p>
					</div>
					{/* SPACER */}
					<div className='hidden md:block flex-1 h-8'></div>
					{/* LINK WITH TITLE */}
					<a
						href={url || 'http://example.com'}
						target='_blank'
						rel='noopener noreferrer'>
						<h2>
							{title ||
								"Understanding Cognitive Load: Designing with the User's Mind in Mind"}
						</h2>
					</a>
					{/* SPACER */}
					<div className='hidden md:block flex-1 h-8'></div>
				</div>

				{/* ARROW + ANIMATION */}
				<span className='relative inline-block overflow-hidden w-4 h-4'>
					{/* First arrow - moves out */}
					<span className='absolute inset-0 transition-transform duration-300 ease-out group-hover:translate-x-4 group-hover:-translate-y-4'>
						<IconArrowUpRight />
					</span>
					{/* Second arrow - moves in */}
					<span className='absolute inset-0 -translate-x-4 translate-y-4 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0'>
						<IconArrowUpRight />
					</span>
				</span>
			</article>
			<hr className='my-4 border-secondary w-full' aria-hidden='true' />
		</>
	)
}
