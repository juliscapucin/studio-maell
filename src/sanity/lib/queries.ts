import { defineQuery } from 'next-sanity'
import type { NavLinkType } from '@/types'
import { client } from '@/sanity/lib/client'

export async function getNavLinks(): Promise<NavLinkType[]> {
	const query = defineQuery(`*[_type == "navLink"]|order(order asc) {
			label,
			"slug": slug.current,
		 }`)

	const navLinks = await client.fetch(query)

	return [{ label: 'Home', slug: '/', order: 0 }, ...navLinks]
}
