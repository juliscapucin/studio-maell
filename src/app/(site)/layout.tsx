import { Work_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'

import { MenuDesktop, MenuMobile } from '@/components/ui'
import { DisableDraftMode } from '@/components'
import {
	getAllCasesSlugs,
	getNavLinks,
	getPageContent,
} from '@/sanity/lib/queries'

import { cleanSanityInputs } from '@/utils'
import { metadataFallback } from '@/data'

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

export async function generateMetadata() {
	const pageData = getPageContent('workPage')
	const page = await pageData

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

const navLinks = await getNavLinks()
const casesSlugs = await getAllCasesSlugs()

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className='gutter-stable'>
			<body
				className={`${workSans.variable} ${fontPrimary.variable} antialiased bg-primary text-secondary font-secondary`}>
				{/* SKIP TO MAIN CONTENT LINK - for screen readers */}
				<a
					href='#main-content'
					className='fixed top-0 left-0 z-50 -translate-y-full bg-secondary text-primary px-4 py-2 underline focus:translate-y-0'>
					Skip to main content
				</a>
				<MenuDesktop navLinks={navLinks} casesSlugs={casesSlugs} />
				<MenuMobile navLinks={navLinks} />
				{(await draftMode()).isEnabled && (
					<>
						<VisualEditing />
						<DisableDraftMode />
					</>
				)}
				<div className='custom-container mx-auto flex relative'>
					{/* SPACER FOR DESKTOP MENU */}
					<div className='hidden md:block flex-1/4'></div>
					{/* MAIN CONTENT */}
					{children}
				</div>
			</body>
		</html>
	)
}
