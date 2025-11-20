// spec: tests/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test'
import { singlePageDefinition } from '../helpers/page-definitions'

test.describe('Keyboard Navigation - Enter Key Activation', () => {
	test('should navigate when Enter pressed on navigation links', async ({
		page,
	}) => {
		// Navigate to homepage
		await page.goto('/')

		// Tab to Services navigation link
		await page.keyboard.press('Tab') // Skip link
		await page.keyboard.press('Tab') // Studio Maell button
		await page.keyboard.press('Tab') // Work link
		await page.keyboard.press('Tab') // Services link

		// Press Enter to activate Services link navigation
		await page.keyboard.press('Enter')

		const servicesPage = singlePageDefinition('services')
		await expect(servicesPage).toBeDefined()

		// Verify navigation occurred
		await expect(page).toHaveURL(servicesPage!.url)
		await expect(page).toHaveTitle(servicesPage!.title)
	})

	test('should activate buttons with Enter key', async ({ page }) => {
		// Navigate to homepage
		await page.goto('/')

		// Tab to first Read case button
		await page.keyboard.press('Tab') // Skip link

		// Press Enter to skip to main content
		await page.keyboard.press('Enter')

		// Tab to first Read case button
		await page.keyboard.press('Tab')

		// Press Enter key to activate the focused button
		await page.keyboard.press('Enter')

		// Verify navigation to case study occurred
		await expect(page).toHaveURL(/\/work\//)
		await expect(page).toHaveTitle(/Studio Maell \|/)
	})

	test('should activate buttons with Space key', async ({ page }) => {
		// Navigate to homepage
		await page.goto('/')

		// Tab to first Read case button
		await page.keyboard.press('Tab') // Skip link
		await page.keyboard.press('Tab') // Studio Maell button
		await page.keyboard.press('Tab') // Work link
		await page.keyboard.press('Tab') // Services link
		await page.keyboard.press('Tab') // Articles link
		await page.keyboard.press('Tab') // Connect link
		await page.keyboard.press('Tab') // First Read case button

		// Press Space key to activate the focused button
		await page.keyboard.press('Space')

		// Verify navigation to case study occurred
		await expect(page).toHaveURL(/\/work\//)
		await expect(page).toHaveTitle(/Studio Maell \|/)
	})
})
