// spec: tests/test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Homepage & Navigation', () => {
	test('Verify Homepage Load', async ({ page }) => {
		// 1. Navigate to `https://studio-maell.vercel.app/`
		await page.goto('https://studio-maell.vercel.app/')

		// 2. Wait for page to fully load (implicit by awaited goto and assertions)

		// Expected: Page title contains "Studio Maell | Work"
		await expect(page).toHaveTitle(/Studio Maell \| Work/)

		// Expected: URL is exactly `https://studio-maell.vercel.app/`
		await expect(page).toHaveURL('https://studio-maell.vercel.app/')

		// Expected: Header displays "Studio Maell" brand button
		const brandButton = page.getByRole('button', { name: 'Studio Maell' })
		await expect(brandButton).toBeVisible()

		// Expected: Skip to main content link present
		await expect(
			page.getByRole('link', { name: 'Skip to main content' })
		).toBeVisible()

		// Expected: Navigation menu displays sections
		const navLinks = ['Work', 'Services', 'Articles', 'Connect']
		for (const text of navLinks) {
			await expect(page.getByRole('link', { name: text })).toBeVisible()
		}

		// Expected: Work section displays case studies (two sample headings)
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

		// Expected: Read case buttons visible
		const readCaseButtons = page.getByRole('button', { name: 'Read case' })
		await expect(readCaseButtons).toHaveCount(2)
		await expect(readCaseButtons.nth(0)).toBeVisible()
		await expect(readCaseButtons.nth(1)).toBeVisible()
	})
})
