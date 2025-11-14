type PageHeaderProps = {
	title: string
	subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
	return (
		<div className='relative h-header-mobile md:h-header-desktop'>
			<h1 className='heading-display'>{title}</h1>

			{subtitle && (
				<div className='md:flex w-full items-start gap-4'>
					<div className='w-4/6 md:flex-1 h-px bg-secondary mt-4 mb-4 md:mb-0'></div>
					<p className='max-w-64 md:max-w-94 ml-auto md:ml-unset text-lg md:text-xl lg:text-2xl font-medium text-pretty leading-[0.95]'>
						{subtitle ? subtitle : ''}
					</p>
				</div>
			)}
		</div>
	)
}
