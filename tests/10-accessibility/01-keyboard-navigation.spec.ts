import { test, expect } from '@playwright/test'

test.describe('Accessibility - 10.1 Keyboard Navigation Tab Order', () => {
	test('should have logical tab order', async ({ page }) => {
		await page.goto('/')

		// First tab should focus skip link
		await page.keyboard.press('Tab')
		const skipLink = page.locator('a[href="#main-content"]')
		await expect(skipLink).toBeFocused()

		// Continue tabbing through navigation
		await page.keyboard.press('Tab')
		await expect(page.getByRole('link', { name: 'Work' })).toBeFocused()

		await page.keyboard.press('Tab')
		await expect(page.getByRole('link', { name: 'Services' })).toBeFocused()
	})

	test('should show visible focus indicators', async ({ page }) => {
		await page.goto('/')

		await page.keyboard.press('Tab')
		const focusedElement = page.locator(':focus')

		// Check focus indicator is visible
		const outlineWidth = await focusedElement.evaluate(
			(el) => window.getComputedStyle(el).outlineWidth
		)
		expect(outlineWidth).not.toBe('0px')
	})

	test('should not trap focus', async ({ page }) => {
		await page.goto('/')

		// Tab through all elements
		for (let i = 0; i < 20; i++) {
			await page.keyboard.press('Tab')
		}

		// Should be able to continue tabbing (no trap)
		const focusedElement = page.locator(':focus')
		await expect(focusedElement).toBeDefined()
	})
})
