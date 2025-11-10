type ServiceCardProps = {
	title: string
	description: string
}

export default function ServiceCard({ title, description }: ServiceCardProps) {
	return (
		<article className='bg-secondary rounded-sm p-6 h-100 flex flex-col justify-between'>
			<div>
				<h2 className='heading-title'>{title}</h2>
				<hr className='my-4 border-tertiary' />
			</div>
			<p>{description}</p>
		</article>
	)
}
