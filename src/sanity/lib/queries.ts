import { defineQuery } from 'next-sanity'

import type { CaseType, NavLinkType } from '@/types'
import { client } from '@/sanity/lib/client'
import { sanityFetch } from '@/sanity/lib/live'

export async function getNavLinks(): Promise<NavLinkType[]> {
	const query = defineQuery(`*[_type == "navLink"]|order(order asc) {
			label,
			"slug": slug.current,
		 }`)

	const data = await client.fetch(query)

	return [{ label: 'Home', slug: '/', order: 0 }, ...data]
}

export async function getWorkPageContent() {
	const query = defineQuery(`*[_type == "workPage"][0] {
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
			email,
			socials[] {
				label,
				url,
			},
		 }`)

	const connectPageContent = await client.fetch(query)
	return connectPageContent
}
