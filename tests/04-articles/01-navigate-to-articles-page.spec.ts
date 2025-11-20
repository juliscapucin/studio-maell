// spec: tests/test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Articles Section', () => {
	test('Navigate to Articles Page', async ({ page }) => {
		// 1. Navigate to homepage to access navigation menu
		await page.goto('https://studio-maell.vercel.app/');

		// 2. Click "Articles" navigation link
		await page.getByRole('link', { name: 'Articles' }).click();

		// 3. Verify main heading "Articles" is visible
		await expect(page.getByRole('heading', { name: 'Articles' })).toBeVisible();

		// 4. Verify page title "Studio Maell | Articles" is visible
		await expect(page.getByText('Studio Maell | Articles')).toBeVisible();
	});
});
