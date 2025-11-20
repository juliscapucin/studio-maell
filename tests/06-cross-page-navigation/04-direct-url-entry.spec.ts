import { test, expect } from '@playwright/test'

// Scenario 6.4 – Direct URL Entry
// Verifies that entering key URLs directly loads correct pages, content, and metadata.

const PAGES = [
	{
		url: 'https://studio-maell.vercel.app/work',
		title: 'Studio Maell | Work',
		heading: 'Work',
	},
	{
		url: 'https://studio-maell.vercel.app/services',
		title: 'Studio Maell | Services',
		heading: 'Services',
	},
	{
		url: 'https://studio-maell.vercel.app/articles',
		title: 'Studio Maell | Articles',
		heading: 'Articles',
	},
	{
		url: 'https://studio-maell.vercel.app/connect',
		title: 'Studio Maell | Connect',
		heading: 'Connect',
	},
	{
		url: 'https://studio-maell.vercel.app/work/improving-machine-management-by-creating-a-100-digital-user-journey',
		title: 'Studio Maell | Case',
		heading:
			'Improving machine management by creating a 100% digital user journey',
	},
]

async function verifyNavLinksVisible(page: import('@playwright/test').Page) {
	await expect(page.getByRole('link', { name: 'Work' })).toBeVisible()
	await expect(page.getByRole('link', { name: 'Services' })).toBeVisible()
	await expect(page.getByRole('link', { name: 'Articles' })).toBeVisible()
	await expect(page.getByRole('link', { name: 'Connect' })).toBeVisible()
}

test.describe('Cross-Page Navigation: Direct URL Entry (6.4)', () => {
	test('loads each page directly and shows correct content + metadata', async ({
		page,
	}) => {
		for (const { url, title, heading } of PAGES) {
			const response = await page.goto(url, { waitUntil: 'domcontentloaded' })

			// No 404/routing errors: network response OK
			expect(response, `No response returned for ${url}`).toBeTruthy()
			expect(
				response!.ok(),
				`Non-OK response for ${url}: ${response && response.status()}`
			).toBeTruthy()

			// URL and page title
			await expect(page).toHaveURL(url)
			await expect(page).toHaveTitle(title)

			// Core heading/content representative of each page
			await expect(page.getByRole('heading', { name: heading })).toBeVisible()

			// Navigation menu remains functional (links visible)
			await verifyNavLinksVisible(page)

			// Basic metadata sanity: presence of key meta tags
			await expect(page.locator('head meta[name="description"]')).toHaveCount(1)
			await expect(page.locator('head meta[name="viewport"]')).toHaveCount(1)
		}
	})
})
