type PageHeaderProps = {
	title: string
	subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
	return (
		<div className='flex'>
			<h1 className='heading-display'>{title}</h1>
			{subtitle && <p>{subtitle}</p>}
		</div>
	)
}
