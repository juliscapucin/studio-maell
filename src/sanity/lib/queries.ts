import { defineQuery } from 'next-sanity'

import type { CaseType, NavLinkType } from '@/types'
import { client } from '@/sanity/lib/client'

export async function getNavLinks(): Promise<NavLinkType[]> {
	const query = defineQuery(`*[_type == "navLink"]|order(order asc) {
			label,
			"slug": slug.current,
		 }`)

	const data = await client.fetch(query)

	return [{ label: 'Home', slug: '/', order: 0 }, ...data]
}

export async function getPageContent($type: string) {
	const query = defineQuery(`*[_type == "${$type}"][0] {
			title,
			subtitle,
		 }`)

	const data = await client.fetch(query)
	return data
}

export async function getAllCases(): Promise<CaseType[]> {
	const query = defineQuery(`*[_type == "case"]|order(publishedOn desc) {
			title,
			"slug": slug.current,
			"coverImage": coverImage.asset->url,
			publishedOn,
			"categories": categories[]->title,
			"excerpt": excerpt,
		 }`)

	const cases = await client.fetch(query)
	return cases
}

export async function getAllCasesSlugs() {
	const query = defineQuery(`*[_type == "case"] {
			"slug": slug.current,
		 }`)

	const casesSlugs = await client.fetch(query)
	return casesSlugs
}

export async function getAllServices() {
	const query = defineQuery(`*[_type == "service"]|order(publishedOn desc) {
			title,
			description,
		 }`)

	const services = await client.fetch(query)
	return services
}

export async function getAllArticles() {
	const query = defineQuery(`*[_type == "article"]|order(publishedOn desc) {
			title,
			url,
			publication,
			publishedOn,
		 }`)

	const articles = await client.fetch(query)
	return articles
}

export async function getConnectPageContent() {
	const query = defineQuery(`*[_type == "connectPage"][0] {
			title,
			subtitle,
			cta,
			email,
			socials[] {
				label,
				url,
			},
		 }`)

	const connectPageContent = await client.fetch(query)
	return connectPageContent
}
