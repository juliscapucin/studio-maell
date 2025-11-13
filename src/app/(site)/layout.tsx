import type { Metadata } from 'next'
import { Geist_Mono, Work_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import { defineQuery } from 'next-sanity'

import { MenuDesktop, MenuMobile } from '@/components/ui'
import { DisableDraftMode } from '@/components'
import { sanityFetch } from '@/sanity/lib/live'

const navLinksQuery = defineQuery(`*[_type == "navLink"]|order(order asc) {
			label,
			"slug": slug.current,
		 }`)

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

const workSans = Work_Sans({
	variable: '--font-work-sans',
	subsets: ['latin'],
	weight: ['400', '700'],
})

// Load custom font //
const fontPrimary = localFont({
	variable: '--font-primary',
	src: [
		{
			path: '../../../public/fonts/Satoshi-Black.woff2',
			weight: '900',
		},
	],
})

export const metadata: Metadata = {
	title: 'Studio Maell',
	description: 'A design studio crafting unique digital experiences.',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const { data: navLinks } = await sanityFetch({ query: navLinksQuery })

	return (
		<html lang='en'>
			<body
				className={`${workSans.variable} ${fontPrimary.variable} antialiased bg-primary text-secondary font-secondary`}>
				{/* SKIP TO MAIN CONTENT LINK - for screen readers */}
				<a
					href='#main-content'
					className='fixed top-0 left-0 z-50 -translate-y-full bg-secondary text-primary px-4 py-2 underline focus:translate-y-0'>
					Skip to main content
				</a>
				<MenuDesktop navLinks={navLinks} />
				<MenuMobile navLinks={navLinks} />
				{(await draftMode()).isEnabled && (
					<>
						<VisualEditing />
						<DisableDraftMode />
					</>
				)}
				<div className='container mx-auto flex relative'>
					{/* SPACER FOR DESKTOP MENU */}
					<div className='hidden md:block flex-1/4'></div>
					{/* MAIN CONTENT */}
					{children}
				</div>
			</body>
		</html>
	)
}
