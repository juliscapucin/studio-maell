// spec: tests/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Services Section', () => {
	test('Navigate to Services Page', async ({ page }) => {
		// 1. Navigate to homepage to access navigation menu
		await page.goto('https://studio-maell.vercel.app/');

		// 2. Click "Services" navigation link
		await page.getByRole('link', { name: 'Services' }).click();

		// 3. Verify page title is "Studio Maell | Services"
		await expect(page.getByText('Studio Maell | Services')).toBeVisible();

		// 4. Verify main heading "Services" is visible
		await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible();

		// 5. Verify subtitle "Areas of expertise" is visible
		await expect(page.getByText('Areas of expertise')).toBeVisible();

		// 6. Verify service card "EAA Compliant Product Design" is visible
		await expect(page.getByRole('heading', { name: 'EAA Compliant Product Design' })).toBeVisible();

		// 7. Verify service card "Accessible Design Systems" is visible
		await expect(page.getByRole('heading', { name: 'Accessible Design Systems' })).toBeVisible();

		// 8. Verify service card "Inclusive Research & Testing" is visible
		await expect(page.getByRole('heading', { name: 'Inclusive Research & Testing' })).toBeVisible();
	});
});
