// tests/11-performance/01-page-load-performance.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Performance - 11.1 Initial Page Load', () => {
	test('should load homepage within acceptable time', async ({ page }) => {
		const startTime = Date.now()
		await page.goto('/')
		await page.waitForLoadState('networkidle')
		const loadTime = Date.now() - startTime

		// Should load within 3 seconds (3000ms)
		expect(loadTime).toBeLessThan(3000)
	})

	test('should display critical content quickly', async ({ page }) => {
		await page.goto('/')

		// Critical content should appear quickly
		await expect(page.getByRole('heading', { name: 'Work' })).toBeVisible({
			timeout: 1000,
		})
		await expect(page.getByText(/Freelance Product Designer/i)).toBeVisible({
			timeout: 1000,
		})
	})

	test('should lazy-load images', async ({ page }) => {
		await page.goto('/')

		// Check for loading attribute on images
		const images = page.locator('img')
		const firstImage = images.first()
		const loading = await firstImage.getAttribute('loading')

		expect(loading).toBe('lazy')
	})
})
