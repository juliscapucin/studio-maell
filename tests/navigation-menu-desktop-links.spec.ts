// spec: tests/test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage & Navigation', () => {
  test('Navigation Menu - Desktop Links', async ({ page }) => {
    // 1. Navigate to `https://studio-maell.vercel.app/`
    await page.goto('https://studio-maell.vercel.app/');

    // 2. Verify all navigation links are visible: Work, Services, Articles, Connect
    const navLinks = ['Work', 'Services', 'Articles', 'Connect'];
    for (const text of navLinks) {
      await expect(page.getByText(text)).toBeVisible();
    }

    // (Desktop) Case study preview links also appear (assert presence of sample case study headings under nav area)
    await expect(page.getByText('Advising caretakers in the sensitive process of name adjustment')).toBeVisible();
    await expect(page.getByText('Improving machine management by creating a 100% digital user journey')).toBeVisible();

    // Expected: Links clickable & hover states (basic interaction checks)
    for (const text of navLinks) {
      const link = page.getByText(text);
      await link.hover();
      await link.click({ trial: true }); // trial click ensures clickable without navigation side-effects
    }

    // Expected: Navigation remains fixed/accessible while scrolling (scroll and re-check one link)
    await page.mouse.wheel(0, 800);
    await expect(page.getByText('Work')).toBeVisible();
  });
});
