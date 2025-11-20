import { test, expect } from '@playwright/test'
import { BasePage } from '../fixtures/base-page'

// Scenario 7.2 - Verify Page Meta Tags
// Validates proper meta tags for SEO and social sharing

test.describe('Page Metadata & SEO: Verify Page Meta Tags (7.2)', () => {
	test('homepage has required meta tags', async ({ page }) => {
		const basePage = new BasePage(page)
		await basePage.goto('/')

		// Meta description is present and contains relevant content
		const description = page.locator('meta[name="description"]')
		await expect(description).toHaveCount(1)
		const descContent = await description.getAttribute('content')
		expect(descContent, 'description content should not be empty').toBeTruthy()
		expect(
			descContent!.length,
			'description should have reasonable length'
		).toBeGreaterThan(10)

		// Viewport is properly configured
		const viewport = page.locator('meta[name="viewport"]')
		await expect(viewport).toHaveCount(1)
		const viewportContent = await viewport.getAttribute('content')
		expect(
			viewportContent,
			'viewport should contain width=device-width'
		).toContain('width=device-width')

		// Open Graph tags are present for social sharing
		const ogTags = await page.locator('meta[property^="og:"]').count()
		expect(
			ogTags,
			'at least some Open Graph tags should be present'
		).toBeGreaterThan(0)

		// Favicon is present in the document
		const favicon = page.locator('link[rel="icon"]')
		const faviconCount = await favicon.count()
		expect(
			faviconCount,
			'at least one favicon link should be present'
		).toBeGreaterThan(0)

		// No missing or broken meta tag references
		// Verify no meta tags with empty content (except for allowed exceptions)
		const allMetaTags = await page.locator('meta').all()
		const allowedEmptyMetaTags = ['next-size-adjust', 'charset'] // Meta tags that can have empty content

		for (const meta of allMetaTags) {
			const content = await meta.getAttribute('content')
			const name = await meta.getAttribute('name')
			const property = await meta.getAttribute('property')
			const identifier = name || property || 'unknown'

			// Skip meta tags that are allowed to have empty content
			if (name && allowedEmptyMetaTags.includes(name)) {
				continue
			}

			// If meta has content attribute, it shouldn't be empty
			if (
				(await meta.evaluate((el) => el.hasAttribute('content'))) &&
				content !== null
			) {
				expect(
					content.length,
					`meta tag ${identifier} should not have empty content`
				).toBeGreaterThan(0)
			}
		}
	})
})
