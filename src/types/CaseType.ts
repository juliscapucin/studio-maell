import { PortableTextBlock } from 'next-sanity'
import { Image } from 'sanity'

export type CaseType = {
	title: string
	slug: string
	client: string
	mainImage: Image
	publishedOn: string
	categories: string[]
	excerpt: string
	body: PortableTextBlock[]
	services: string[]
	role: string
}
