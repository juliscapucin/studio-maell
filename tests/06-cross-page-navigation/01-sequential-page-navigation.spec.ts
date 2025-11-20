// spec: tests/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test'
import { BasePage } from '../fixtures/base-page'

test.describe('Cross-Page Navigation & Browser Controls', () => {
	test('Sequential Page Navigation', async ({ page }) => {
		// 1. Navigate to homepage `/`
		const basePage = new BasePage(page)
		await basePage.goto('/')

		// 2. Click "Services" link
		await page.getByRole('link', { name: 'Services' }).click()
		await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible()

		// 3. Click "Articles" link
		await page.getByRole('link', { name: 'Articles' }).click()
		await expect(page.getByRole('heading', { name: 'Articles' })).toBeVisible()

		// 4. Click "Connect" link
		await page.getByRole('link', { name: 'Connect' }).click()
		await expect(page.getByRole('heading', { name: 'Connect' })).toBeVisible()

		// 5. Click "Work" link
		await page.getByRole('link', { name: 'Work' }).click()
		await expect(page.getByRole('heading', { name: 'Work' })).toBeVisible()
	})
})
