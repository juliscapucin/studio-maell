import { expect, Page } from '@playwright/test'

export async function verifyNavLinksVisibleAndClickable(page: Page) {
	const links = ['Work', 'Services', 'Articles', 'Connect']
	for (const link of links) {
		const linkElement = page.getByRole('link', { name: link })
		await expect(linkElement).toBeVisible()
		await expect(linkElement).toBeEnabled()
	}
}

export async function verifySkipLink(page: Page) {
	const skipLink = page.locator('a[href="#main-content"]')
	await expect(skipLink).toBeVisible()
}
