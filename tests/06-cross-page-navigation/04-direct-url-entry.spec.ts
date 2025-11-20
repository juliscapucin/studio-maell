import { test, expect } from '@playwright/test'
import { verifyNavLinksVisibleAndClickable } from '../helpers/assertions'
import { PAGES } from '../helpers/page-definitions'

// Scenario 6.4 - Direct URL Entry
// Verifies that entering key URLs directly loads correct pages, content, and metadata.

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

			// Core h1 representative of each page
			await expect(
				page.getByRole('heading', { name: heading, level: 1 })
			).toBeVisible()

			// Navigation menu remains functional (links visible)
			await verifyNavLinksVisibleAndClickable(page)

			// Basic metadata sanity: presence of key meta tags
			await expect(page.locator('meta[name="description"]')).toHaveCount(1)
			await expect(page.locator('meta[name="viewport"]')).toHaveCount(1)
		}
	})
})
