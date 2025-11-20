// spec: tests/test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test'
import { BasePage } from '../fixtures/base-page'

test.describe('Homepage & Navigation', () => {
	test('Accessibility - Skip to Content Link', async ({ page }) => {
		// 1. Navigate to homepage
		const basePage = new BasePage(page)
		await basePage.goto('/')

		// 2. Press Tab key once (focus should move to skip link)
		await page.keyboard.press('Tab')

		const skipLink = page.getByRole('link', { name: 'Skip to main content' })

		// 3. Verify skip link appears / is present with href="#main-content"
		await expect(skipLink).toBeVisible()
		await expect(skipLink).toHaveAttribute('href', '#main-content')

		// Expected: ARIA attributes (basic landmark presence)
		// Header landmark
		await expect(page.getByRole('banner')).toBeVisible()
		// Navigation landmark
		await expect(page.getByRole('navigation')).toBeVisible()
		// Main landmark
		// Using '#main-content' target existence
		const mainContent = page.locator('#main-content')
		await expect(mainContent).toBeVisible()
	})
})
