import { ImageWithSpinner } from '@/components/ui'

export default function ProjectCard({}) {
	return (
		<article className='bg-secondary text-tertiary rounded-sm p-6'>
			<h2 className='heading-title'>
				Advising caretakers in the sensitive process of name adjustment
			</h2>
			<p>Jacob Douwe Egberts Professsional</p>
			<hr className='my-4 border-tertiary' />
			<div>
				<ImageWithSpinner
					containerClassName='w-1/3 h-96 relative'
					imageClassName='w-full h-full object-cover'
					imageSrc={{ url: '/images/ascii-01.jpg' }}
					sizes='100vw'
					fill
				/>
			</div>
		</article>
	)
}
