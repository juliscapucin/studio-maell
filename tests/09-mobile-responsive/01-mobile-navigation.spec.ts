import { test, expect, devices } from '@playwright/test'

test.use({ ...devices['iPhone 12'] })

test.describe('Mobile Responsive - 9.1 & 9.2 Mobile Navigation', () => {
	test('should show burger menu on mobile', async ({ page }) => {
		await page.goto('/')

		// Find the burger menu button using exact button text/label
		const burgerMenu = page.getByRole('button', { name: 'open menu' }).first()
		await expect(burgerMenu).toBeVisible()

		// Mobile menu dialog should not be visible initially
		const mobileMenu = page.getByRole('dialog', { name: 'Navigation Menu' })
		await expect(mobileMenu).not.toBeInViewport()
	})

	test('should open and close mobile menu', async ({ page }) => {
		await page.goto('/')

		// Click the first burger menu button (the one in the collapsed header)
		const burgerMenu = page.getByRole('button', { name: 'open menu' }).first()
		await burgerMenu.click()

		// Menu should be open - check for the dialog
		const mobileMenu = page.getByRole('dialog', { name: 'Navigation Menu' })

		// Wait for animation to complete - wait for navigation to be visible
		const navigation = mobileMenu.getByRole('navigation', {
			name: 'Navigation',
		})
		await expect(navigation).toBeVisible({ timeout: 2000 })

		// All navigation links should be visible within the dialog
		await expect(mobileMenu.getByRole('link', { name: /^Work/ })).toBeVisible()
		await expect(
			mobileMenu.getByRole('link', { name: /^Services/ })
		).toBeVisible()

		// Click the Close button to test menu closing
		const closeButton = mobileMenu.getByRole('button', {
			name: 'Close navigation menu',
		})
		await expect(closeButton).toBeVisible()
		await closeButton.click({ timeout: 5000 })

		// Wait a moment for close animation to start
		await page.waitForTimeout(500)

		// Menu should be hidden
		await expect(navigation).not.toBeVisible({ timeout: 2000 })
	})
})
