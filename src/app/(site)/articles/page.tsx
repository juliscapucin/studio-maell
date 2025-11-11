import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'

const pageQuery = defineQuery(`*[_type == "articlesPage"][0] {
		title,
		subtitle,
	 }`)

const articlesQuery =
	defineQuery(`*[_type == "article"]|order(publishedOn desc) {
			title,
			url,
			publishedOn,
			publication
		 }`)

import { ArticleCard } from '@/components'
import { EmptyResults, PageHeader, PageWrapper } from '@/components/ui'
import { ArticleType } from '@/types/ArticleType'

export default async function Connect() {
	const { data: pageData } = await sanityFetch({ query: pageQuery })
	const { data: articles } = await sanityFetch({ query: articlesQuery })

	if (!pageData || !articles) {
		return (
			<EmptyResults message='Work page content is not available at the moment' />
		)
	}
	return (
		<PageWrapper classes='flex flex-col h-svh'>
			<PageHeader title={pageData.title} subtitle={pageData.subtitle} />
			<div className='mt-48'>
				{articles.map((article: ArticleType) => (
					<ArticleCard key={article.title} article={article} />
				))}
			</div>
		</PageWrapper>
	)
}
