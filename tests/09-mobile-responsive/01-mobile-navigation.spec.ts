import { test, expect, devices } from '@playwright/test'

test.use({ ...devices['iPhone 12'] })

test.describe('Mobile Responsive - 9.1 & 9.2 Mobile Navigation', () => {
	test('should show burger menu on mobile', async ({ page }) => {
		await page.goto('/')

		const burgerMenu = page.getByRole('button', { name: /menu/i })
		await expect(burgerMenu).toBeVisible()

		// Desktop links should be hidden
		const desktopNav = page.locator('nav >> a >> visible=true')
		const visibleLinks = await desktopNav.count()
		expect(visibleLinks).toBeLessThan(4)
	})

	test('should open and close mobile menu', async ({ page }) => {
		await page.goto('/')

		const burgerMenu = page.getByRole('button', { name: /menu/i })
		await burgerMenu.click()

		// Menu should be open
		const mobileMenu = page.locator('[data-testid="mobile-menu"]')
		await expect(mobileMenu).toBeVisible()

		// All navigation links should be visible
		await expect(page.getByRole('link', { name: 'Work' })).toBeVisible()
		await expect(page.getByRole('link', { name: 'Services' })).toBeVisible()

		// Click a link
		await page.getByRole('link', { name: 'Services' }).click()

		// Menu should close and navigate
		await expect(mobileMenu).not.toBeVisible()
		await expect(page).toHaveURL(/\/services/)
	})
})
