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
			<article className='flex justify-between items-start xl:items-center gap-x-6 xl:gap-x-24 group'>
				<div className='flex flex-col-reverse xl:flex-row xl:items-center xl:gap-x-6'>
					{/* DATE AND PUBLICATION */}
					<div className='flex gap-4 xl:block mt-4 xl:mt-0 xl:w-54 2xl:w-72 xl:mr-6'>
						<p className='text-lg lg:text-xl'>{date}</p>
						<p className='text-lg'>{publication}</p>
					</div>

					<a
						className='flex-1'
						href={url || 'http://example.com'}
						target='_blank'
						rel='noopener noreferrer'>
						<h2 className='text-xl lg:text-2xl'>{title}</h2>
					</a>
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
			{/* DIVIDER */}
			<div className='my-4 bg-secondary w-full h-px' aria-hidden='true' />
		</>
	)
}
