// spec: tests/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test'

test.describe('Articles Section', () => {
	test('Verify Articles List Display', async ({ page }) => {
		// 1. Navigate to `/articles`
		await page.goto('https://studio-maell.vercel.app/articles')

		// Verify at least 3 articles are visible
		const articleCount = await page.locator('article').count()
		expect(articleCount).toBeGreaterThanOrEqual(3)

		// 2. Verify Article 1: "The Importance of User-Centered Design in Product Development"
		await expect(
			page.getByRole('heading', {
				name: 'The Importance of User-Centered Design in Product Development',
			})
		).toBeVisible()
		await expect(page.getByText('Smashing Magazine').first()).toBeVisible()
		await expect(page.getByText('November 16, 2025').first()).toBeVisible()
	})
})
