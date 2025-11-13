type PageHeaderProps = {
	title: string
	subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
	return (
		<div className='relative flex items-end h-header'>
			<h1 className='heading-display mb-30'>{title}</h1>

			{subtitle && (
				<div className='fixed left-0 top-0 right-0 z-20'>
					<div className='relative h-header custom-container mx-auto flex items-start justify-end px-6'>
						<p className='w-fit max-w-94 lg:text-2xl bg-primary pl-8 font-medium mt-32 text-pretty'>
							{subtitle ? subtitle : ''}
						</p>
						<div className='absolute top-36 left-0 h-px w-[90%] bg-secondary -z-10'></div>
					</div>
				</div>
			)}
		</div>
	)
}
