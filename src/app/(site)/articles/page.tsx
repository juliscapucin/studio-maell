import { cache } from 'react'

import { ArticleCard } from '@/components'
import { PageHeader, PageWrapper, EmptyResults } from '@/components/ui'
import { ArticleType } from '@/types/ArticleType'
import { getAllArticles, getPageContent } from '@/sanity/lib/queries'

import { metadataFallback } from '@/data'
import { cleanSanityInputs } from '@/utils'

// Memoize query as in Next docs: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
const pageData = cache(async () => {
	return await getPageContent('articlesPage')
})

export async function generateMetadata() {
	const page = await pageData()

	if (!page) {
		return metadataFallback
	}

	const cleanTitle = cleanSanityInputs(page.metadataTitle)
	const cleanDescription = cleanSanityInputs(page.metadataDescription)
	const cleanKeywords = cleanSanityInputs(page.metadataKeywords)

	return {
		metadataBase: metadataFallback.metadataBase,
		title: cleanTitle || metadataFallback.title,
		description: cleanDescription || metadataFallback.description,
		keywords: cleanKeywords || metadataFallback.keywords,
	}
}

export default async function Connect() {
	const page = await pageData()
	const articles = await getAllArticles()
	return (
		<PageWrapper classes='flex flex-col h-svh'>
			<PageHeader title={page.title || 'Articles'} subtitle={page.subtitle} />
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
