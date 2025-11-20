// spec: tests/test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test'
import { BasePage } from '../fixtures/base-page'
import { verifyNavLinksVisibleAndClickable } from '../helpers/assertions'

test.describe('Homepage & Navigation', () => {
	test('Navigation Menu - Desktop Links', async ({ page }) => {
		// 1. Navigate to homepage
		const basePage = new BasePage(page)
		await basePage.goto('/')

		// 2. Verify all navigation links are visible and clickable: Work, Services, Articles, Connect
		verifyNavLinksVisibleAndClickable(basePage.page)

		// (Desktop) Case study preview links also appear (assert presence of sample case study headings under nav area)
		await expect(
			page.getByText(
				'Advising caretakers in the sensitive process of name adjustment'
			)
		).toBeVisible()
		await expect(
			page.getByText(
				'Improving machine management by creating a 100% digital user journey'
			)
		).toBeVisible()

		// Expected: Navigation remains fixed/accessible while scrolling (scroll and re-check one link)
		await page.mouse.wheel(0, 800)
		await expect(page.getByRole('link', { name: 'Work' })).toBeVisible()
	})
})
