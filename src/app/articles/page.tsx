import { ArticleCard } from '@/components'
import { PageHeader, PageWrapper } from '@/components/ui'

export default function Connect() {
	return (
		<PageWrapper classes='flex flex-col h-svh'>
			<PageHeader title='Articles' />
			<div className='mt-48'>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((article, index) => (
					<ArticleCard key={`article-${index}`} />
				))}
			</div>
		</PageWrapper>
	)
}
