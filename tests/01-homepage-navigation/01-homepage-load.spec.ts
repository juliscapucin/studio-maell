import { test, expect } from '@playwright/test'
import { BasePage } from '../fixtures/base-page'
import {
	verifyNavLinksVisibleAndClickable,
	verifyPageTitle,
	verifySkipLink,
} from '../helpers/assertions'

test.describe('Homepage & Navigation - 1.1 Verify Homepage Load', () => {
	let basePage: BasePage

	test.beforeEach(async ({ page }) => {
		basePage = new BasePage(page)
		await basePage.goto('/')
	})

	test('should load homepage with correct title', async ({ page }) => {
		await verifyPageTitle(page, 'Studio Maell | Work')
	})

	test('should display brand button', async ({ page }) => {
		const brandButton = page.getByRole('button', { name: /studio maell/i })
		await expect(brandButton).toBeVisible()
	})

	test('should display tagline', async ({ page }) => {
		const tagline = page
			.getByTestId('logo-description-desktop')
			.filter({
				hasText:
					/Freelance Product Designer, specialised in accessibility and inclusive design/i,
			})
		await expect(tagline).toBeVisible()
	})

	test('should have skip to content link', async ({ page }) => {
		await verifySkipLink(page)
	})

	test('should display all navigation links', async ({ page }) => {
		await verifyNavLinksVisibleAndClickable(page)
	})

	test('should display work section with case studies', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Work' })).toBeVisible()
		const caseStudies = page.locator('[data-testid="case-study-card"]')
		await expect(caseStudies).toHaveCount(2, { timeout: 10000 })
	})
})
