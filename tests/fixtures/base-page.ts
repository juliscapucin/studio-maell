import { Page } from '@playwright/test'

export class BasePage {
	constructor(public readonly page: Page) {}

	async goto(path: string = '/') {
		await this.page.goto(path)
	}

	async waitForPageLoad() {
		await this.page.waitForLoadState('networkidle')
	}

	async getPageTitle() {
		return await this.page.title()
	}

	async clickNavLink(linkText: string) {
		await this.page.getByRole('link', { name: linkText }).click()
	}

	async verifyURL(expectedPath: string) {
		return this.page.url().includes(expectedPath)
	}
}
