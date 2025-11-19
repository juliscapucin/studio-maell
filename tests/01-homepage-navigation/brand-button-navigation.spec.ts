// spec: tests/test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage & Navigation', () => {
  test('Brand Button Navigation', async ({ page }) => {
    // 1. Navigate to any page (e.g., `/services`)
    await page.goto('https://studio-maell.vercel.app/services');

    // 2. Click the "Studio Maell" brand button in header
    await page.getByRole('button', { name: 'Studio Maell' }).click();

    // Expected: User is redirected to homepage `/work` (root resolves to Work)
    await expect(page).toHaveURL('https://studio-maell.vercel.app/');
    await expect(page).toHaveTitle(/Studio Maell \| Work/);

    // Expected: Brand button visible
    await expect(page.getByRole('button', { name: 'Studio Maell' })).toBeVisible();

    // Expected: Homepage content (sample case studies) visible
    await expect(page.getByText('Advising caretakers in the sensitive process of name adjustment')).toBeVisible();
    await expect(page.getByText('Improving machine management by creating a 100% digital user journey')).toBeVisible();
  });
});
