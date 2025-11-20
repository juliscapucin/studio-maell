// spec: tests/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test'
import { BasePage } from '../fixtures/base-page'
import { singlePageDefinition } from '../helpers/page-definitions'

test.describe('Articles Section', () => {
	test('Navigate to Articles Page', async ({ page }) => {
		// 1. Navigate to homepage to access navigation menu
		const basePage = new BasePage(page)
		await basePage.goto('/')

		// 2. Click "Articles" navigation link
		await page.getByRole('link', { name: 'Articles' }).click()

		const articlesPage = singlePageDefinition('articles')
		await expect(articlesPage).toBeDefined()

		// 3. Verify main heading "Articles" is visible
		await expect(
			page.getByRole('heading', { name: articlesPage!.heading })
		).toBeVisible()

		// 4. Verify page title "Studio Maell | Articles" is visible
		await expect(page).toHaveTitle(articlesPage!.title)
	})
})
