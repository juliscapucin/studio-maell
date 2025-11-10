import { ImageWithSpinner } from '@/components/ui'
import { ButtonProject } from '@/components/buttons'

export default function ProjectCard({}) {
	return (
		<article className='bg-secondary text-tertiary rounded-sm px-4 py-6 md:px-6'>
			<h2 className='heading-title'>
				Advising caretakers in the sensitive process of name adjustment
			</h2>
			<p>Jacob Douwe Egberts Professsional</p>
			<hr className='my-4 border-tertiary' />
			<div className='lg:flex justify-between items-end'>
				<ImageWithSpinner
					containerClassName='lg:w-3/4 xl:w-1/2 2xl:w-1/3 h-96 relative mb-6 lg:mb-0'
					imageClassName='w-full h-full object-cover'
					imageSrc={{ url: '/images/ascii-01.jpg' }}
					sizes='100vw'
					fill
				/>
				<ButtonProject slug='advising-caretakers' />
			</div>
		</article>
	)
}
