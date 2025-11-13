type PageHeaderProps = {
	title: string
	subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
	return (
		<div className='relative flex items-end h-header'>
			<h1 className='heading-display mb-30'>{title}</h1>

			{subtitle && (
				<div className='fixed w-full h-full left-0 z-20'>
					<div className='relative h-full custom-container mx-auto flex flex-col items-end justify-end px-6'>
						<p className='w-96 lg:text-2xl bg-primary pl-8 font-medium mb-6'>
							{subtitle ? subtitle : ''}
						</p>
						<div className='absolute bottom-0 h-px w-full bg-secondary -z-10 mb-26'></div>
					</div>
				</div>
			)}
		</div>
	)
}
