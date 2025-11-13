import { ArticleCard } from '@/components'
import { PageHeader, PageWrapper, EmptyResults } from '@/components/ui'
import { ArticleType } from '@/types/ArticleType'
import { getAllArticles, getPageContent } from '@/sanity/lib/queries'

export default async function Connect() {
	const pageData = await getPageContent('articlesPage')
	const articles = await getAllArticles()

	return (
		<PageWrapper classes='flex flex-col h-svh'>
			<PageHeader
				title={pageData.title || 'Articles'}
				subtitle={pageData.subtitle}
			/>
			<div className='mt-48'>
				{articles && articles.length > 0 ? (
					articles.map((article: ArticleType) => (
						<ArticleCard key={article.title} article={article} />
					))
				) : (
					<EmptyResults message='No articles available at the moment' />
				)}
			</div>
		</PageWrapper>
	)
}
