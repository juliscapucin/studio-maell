// spec: tests/test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test'
import { singlePageDefinition } from '../helpers/page-definitions'
import { BasePage } from '../fixtures/base-page'

test.describe('Homepage & Navigation', () => {
	test('Brand Button Navigation', async ({ page }) => {
		// 1. Navigate to any page (e.g., `/services`)
		const basePage = new BasePage(page)
		await basePage.goto('/services')

		// 2. Click the "Studio Maell" brand button in header
		await page.getByRole('button', { name: 'Studio Maell' }).click()

		// Expected: User is redirected to homepage (root resolves to Work)
		const homepage = singlePageDefinition('homepage')
		if (!homepage) {
			throw new Error('Homepage definition not found')
		}
		await expect(page).toHaveURL(homepage.url)
		await expect(page).toHaveTitle(homepage.title)

		// Expected: Brand button visible
		await expect(
			page.getByRole('button', { name: 'Studio Maell' })
		).toBeVisible()

		// Expected: Homepage content (sample case studies) visible
		await expect(
			page.getByText(
				'Advising caretakers in the sensitive process of name adjustment'
			)
		).toBeVisible()
		await expect(
			page.getByText(
				'Improving machine management by creating a 100% digital user journey'
			)
		).toBeVisible()
	})
})
