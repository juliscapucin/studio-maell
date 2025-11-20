import { test, expect } from '@playwright/test'

test.describe('Work Section - 2.1 View Case Studies List', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/')
	})

	test('should display work heading and subtitle', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Work' })).toBeVisible()
		await expect(
			page.getByText(/6 years of inclusive digital design/i)
		).toBeVisible()
	})

	test('should display at least 2 case study cards', async ({ page }) => {
		const caseStudyCards = page.locator('[data-testid="case-study-card"]')
		const count = await caseStudyCards.count()
		expect(count).toBeGreaterThanOrEqual(2)
	})

	test('should display Ministry of Justice case study', async ({ page }) => {
		const caseStudy = page.locator('text=Ministry of Justice')
		await expect(caseStudy).toBeVisible()

		const title = page.getByText(
			/Advising caretakers in the sensitive process/i
		)
		await expect(title).toBeVisible()
	})

	test('should display Jacob Douwe Egberts case study', async ({ page }) => {
		const caseStudy = page.locator('text=Jacob Douwe Egberts Professional')
		await expect(caseStudy).toBeVisible()

		const title = page.getByText(/Improving machine management/i)
		await expect(title).toBeVisible()
	})

	test('each case study should have required elements', async ({ page }) => {
		const firstCard = page.locator('[data-testid="case-study-card"]').first()

		await expect(firstCard.locator('img')).toBeVisible()
		await expect(
			firstCard.getByRole('button', { name: /read case/i })
		).toBeVisible()
	})
})
