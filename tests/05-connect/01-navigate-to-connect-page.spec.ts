// spec: tests/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test'

test.describe('Connect Section', () => {
	test('Navigate to Connect Page', async ({ page }) => {
		// 1. Navigate to homepage to access navigation menu
		await page.goto('https://studio-maell.vercel.app/')

		// 2. Click "Connect" navigation link
		await page.getByRole('link', { name: 'Connect' }).click()

		// 3. Verify main heading "Connect" is visible
		await expect(page.getByRole('heading', { name: 'Connect' })).toBeVisible()

		// 4. Verify page title "Studio Maell | Connect" is visible
		await expect(page.getByText('Studio Maell | Connect')).toBeVisible()
	})
})
