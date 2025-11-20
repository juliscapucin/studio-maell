import { expect, Page } from '@playwright/test'

export async function verifyNavLinksVisible(page: Page) {
	const links = ['Work', 'Services', 'Articles', 'Connect']
	for (const link of links) {
		await expect(page.getByRole('link', { name: link })).toBeVisible()
	}
}

export async function verifyPageTitle(page: Page, expectedTitle: string) {
	await expect(page).toHaveTitle(expectedTitle)
}

export async function verifySkipLink(page: Page) {
	const skipLink = page.locator('a[href="#main-content"]')
	await expect(skipLink).toBeVisible()
}
