import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
	await page.goto('https://studio-maell.vercel.app/')

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Studio Maell/)
})

test('services link', async ({ page }) => {
	await page.goto('https://studio-maell.vercel.app/')

	// Click the services link.
	await page.getByRole('link', { name: 'Services' }).click()

	// Expects page to have a heading with the name of Services.
	await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible()

	// Expects URL to contain /services
	await expect(page).toHaveURL(/.*services/)

	// Expects title to contain Services
	await expect(page).toHaveTitle(/Services/)
})
