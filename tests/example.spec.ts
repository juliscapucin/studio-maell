import { test, expect } from '@playwright/test'
import { BasePage } from '../tests/fixtures/base-page'

test('has title', async ({ page }) => {
	const basePage = new BasePage(page)
	await basePage.goto('/')

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Studio Maell/)
})

test('services link', async ({ page }) => {
	const basePage = new BasePage(page)
	await basePage.goto('/services')
	// Click the services link.
	await page.getByRole('link', { name: 'Services' }).click()

	// Expects page to have a heading with the name of Services.
	await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible()

	// Expects URL to contain /services
	await expect(page).toHaveURL(/.*services/)

	// Expects title to contain Services
	await expect(page).toHaveTitle(/Services/)
})
