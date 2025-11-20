// spec: tests/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test'
import { BasePage } from '../fixtures/base-page'
import { singlePageDefinition } from '../helpers/page-definitions'

test.describe('Connect Section', () => {
	test('Navigate to Connect Page', async ({ page }) => {
		// 1. Navigate to homepage to access navigation menu
		const basePage = new BasePage(page)
		await basePage.goto('/')

		// 2. Click "Connect" navigation link
		await page.getByRole('link', { name: 'Connect' }).click()

		const connectPage = singlePageDefinition('connect')
		await expect(connectPage).toBeDefined()

		// 3. Verify main heading "Connect" is visible
		await expect(
			page.getByRole('heading', { name: connectPage!.heading })
		).toBeVisible()

		// 4. Verify page title "Studio Maell | Connect"
		await expect(page).toHaveTitle(connectPage!.title)
	})
})
