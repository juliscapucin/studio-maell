// spec: tests/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test'

test.describe('Work (Case Studies) Section', () => {
	test('Navigate to Case Study Detail Page', async ({ page }) => {
		// 1. Navigate to homepage to find case study
		await page.goto('https://studio-maell.vercel.app/')

		// 2. Click "Read case" button on Jacob Douwe Egberts Professional case study
		await page
			.getByRole('article')
			.filter({ hasText: 'Improving machine management' })
			.getByRole('button')
			.click()

		// 3. Verify "Back to work" button is visible on case study detail page
		await expect(
			page.getByRole('link', { name: 'Go back to previous page' })
		).toBeVisible()

		// 4. Verify case study title "Improving machine management by creating a 100% digital user journey" is visible
		await expect(
			page.getByRole('heading', {
				name: 'Improving machine management by creating a 100% digital user journey',
			})
		).toBeVisible()

		// 5. Verify client name "Jacob Douwe Egberts Professsional" is visible
		await expect(
			page
				.locator('#main-content')
				.getByText('Jacob Douwe Egberts Professsional')
		).toBeVisible()

		// 6. Verify service "Concept Design" is visible
		await expect(page.getByText('Concept Design').first()).toBeVisible()

		// 7. Verify service "Product Implementation" is visible
		await expect(page.getByText('Product Implementation').first()).toBeVisible()

		// 8. Verify role "Lead Designer" is visible
		await expect(page.getByText('Lead Designer')).toBeVisible()
	})
})
