import { IconArrowUpRight } from '@/components/icons'
import { ArticleType } from '@/types/ArticleType'
import { EmptyResults } from './ui'

type ArticleCardProps = {
	article: ArticleType
}

export default function ArticleCard({ article }: ArticleCardProps) {
	if (!article) {
		return (
			<EmptyResults message='Article data is not available at the moment' />
		)
	}

	const { title, url, publication, publishedOn } = article

	// Format date
	const dateObj = new Date(publishedOn)
	const date = dateObj.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return (
		<>
			<article className='flex justify-between items-start 2xl:items-center group'>
				<div className='flex flex-col-reverse 2xl:flex-row 2xl:items-center 2xl:flex-1'>
					{/* DATE AND PUBLICATION */}
					<div className='flex gap-4 2xl:block 2xl:flex-1 mt-4 2xl:mt-0 min-w-48'>
						<p className='text-lg lg:text-xl'>{date}</p>
						<p className='text-lg'>{publication}</p>
					</div>
					{/* SPACER */}
					<div className='hidden md:block flex-1 h-8'></div>
					{/* LINK WITH TITLE */}
					<a
						href={url || 'http://example.com'}
						target='_blank'
						rel='noopener noreferrer'>
						<h2 className='text-xl lg:text-2xl'>{title}</h2>
					</a>
					{/* SPACER */}
					<div className='hidden md:block flex-1 h-8'></div>
				</div>

				{/* ARROW + ANIMATION */}
				<span className='relative inline-block overflow-hidden w-4 h-4 min-w-4 mt-2'>
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
			{/* HORIZONTAL LINE */}
			<div className='my-4 bg-secondary w-full h-px' aria-hidden='true' />
		</>
	)
}
