// tests/01-homepage-navigation/02-navigation-menu.spec.ts
import { test, expect } from '@playwright/test'
import { BasePage } from '../fixtures/base-page'
import { verifyNavLinksVisibleAndClickable } from '../helpers/assertions'

test.describe('Homepage & Navigation - 1.2 Navigation Menu Desktop', () => {
	test.use({ viewport: { width: 1024, height: 720 } })

	test('should display all navigation links with click and hover states', async ({
		page,
	}) => {
		const basePage = new BasePage(page)
		await basePage.goto('/')

		await verifyNavLinksVisibleAndClickable(basePage.page)
	})

	test('should keep navigation accessible while scrolling', async ({
		page,
	}) => {
		const basePage = new BasePage(page)
		await basePage.goto('/')

		// Wait for page to be fully loaded with scrollable content
		await page.waitForLoadState('networkidle')

		// Target desktop nav specifically (hidden on mobile with lg:block)
		const desktopNav = page.locator('.lg\\:block nav')
		await expect(desktopNav).toBeVisible()

		// Scroll down
		await page.evaluate(() => window.scrollBy(0, 500))

		// Wait a moment for scroll to complete
		await page.waitForTimeout(100)

		// Verify navigation still visible after scrolling
		await expect(desktopNav).toBeVisible()
	})
})
