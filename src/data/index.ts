import type { Metadata } from 'next'

export const metadataFallback: Metadata = {
	title: 'Studio Maell',
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL || 'https://studio-maell.vercel.app/'
	),
	description:
		'Freelance Product Designer, specialised in accessibility and inclusive design.',
	keywords: [
		'Studio Maell',
		'Maell',
		'Product Designer',
		'Freelance Designer',
		'Accessibility',
		'Inclusive Design',
		'UX Design',
	],
}
