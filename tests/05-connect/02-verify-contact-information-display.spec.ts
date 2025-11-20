// spec: tests/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test'
import { BasePage } from '../fixtures/base-page'

test.describe('Connect Section', () => {
	test('Verify Contact Information Display', async ({ page }) => {
		// 1. Navigate to `/connect`
		const basePage = new BasePage(page)
		await basePage.goto('/connect')

		// 2. Verify heading "Excited about Design, Inclusion or Accessibility? Let's chat!" is displayed
		await expect(
			page.getByRole('heading', {
				name: "Excited about Design, Inclusion or Accessibility? Let's chat!",
			})
		).toBeVisible()

		// 3. Verify email contact link is visible: "monsehopman@gmail.com"
		const emailLink = page.getByRole('link', { name: 'monsehopman@gmail.com' })
		await expect(emailLink).toBeVisible()

		// Verify email link has mailto: protocol
		await expect(emailLink).toHaveAttribute(
			'href',
			'mailto:monsehopman@gmail.com'
		)

		// 4. Verify LinkedIn profile link is visible: "linkedin.com/user/monsemaell"
		const linkedInLink = page.getByRole('link', {
			name: 'linkedin.com/user/monsemaell',
		})
		await expect(page.getByText('linkedin.com/user/monsemaell')).toBeVisible()

		// Verify LinkedIn link has correct URL
		await expect(linkedInLink).toHaveAttribute(
			'href',
			'https://linkedin.com/user/monsemaell'
		)

		// Verify LinkedIn link opens in new tab
		await expect(linkedInLink).toHaveAttribute('target', '_blank')
	})
})
