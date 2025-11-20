// tests/01-homepage-navigation/02-navigation-menu.spec.ts
import { test, expect } from '@playwright/test'
import { BasePage } from '../fixtures/base-page'
import { verifyNavLinksVisibleAndClickable } from '../helpers/assertions'

test.describe('Homepage & Navigation - 1.2 Navigation Menu Desktop', () => {
	test('should display all navigation links with hover states', async ({
		page,
	}) => {
		const basePage = new BasePage(page)
		await basePage.goto('/')

		verifyNavLinksVisibleAndClickable(basePage.page)
	})

	test('should keep navigation accessible while scrolling', async ({
		page,
	}) => {
		const basePage = new BasePage(page)
		await basePage.goto('/')

		// Scroll down
		await page.evaluate(() => window.scrollBy(0, 500))

		// Verify navigation still visible
		const nav = page.locator('nav')
		await expect(nav).toBeVisible()
	})
})
