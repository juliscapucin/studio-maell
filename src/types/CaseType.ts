import { PortableTextBlock } from 'next-sanity'

export type CaseType = {
	title: string
	slug: string
	client: string
	coverImage: string
	publishedOn: string
	categories: string[]
	excerpt: string
	body: PortableTextBlock[]
	services: string[]
	role: string
}
