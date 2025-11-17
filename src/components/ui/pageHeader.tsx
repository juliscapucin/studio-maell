type PageHeaderProps = {
	title: string
	subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
	return (
		<>
			<div className='relative h-header-mobile md:h-header-tablet lg:h-header-desktop'>
				{/* TITLE */}
				<h1 className='heading-display'>{title}</h1>

				{subtitle && (
					<>
						{/* SUBTITLE */}
						<p className='absolute z-20 right-0 top-[72px] sm:top-[76px] md:top-[100px] lg:top-[100px] pl-6 max-w-64 md:max-w-94 text-lg md:text-2xl font-medium text-pretty leading-[0.95] bg-primary'>
							{subtitle}
						</p>
						{/* HORIZONTAL LINE */}
						<div
							className='header-line -mt-6 -left-6 w-3/4 md:w-[90%] max-w-[2800px] -z-10'
							aria-hidden='true'></div>
					</>
				)}
			</div>
		</>
	)
}
