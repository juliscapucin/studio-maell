import { test, expect } from '@playwright/test';

// Scenario 7.2 – Verify Page Meta Tags
// Validates proper meta tags for SEO and social sharing

test.describe('Page Metadata & SEO: Verify Page Meta Tags (7.2)', () => {
    test('homepage has required meta tags', async ({ page }) => {
        await page.goto('https://studio-maell.vercel.app/');

        // Meta description is present and contains relevant content
        const description = page.locator('meta[name="description"]');
        await expect(description).toHaveCount(1);
        const descContent = await description.getAttribute('content');
        expect(descContent, 'description content should not be empty').toBeTruthy();
        expect(
            descContent!.length,
            'description should have reasonable length'
        ).toBeGreaterThan(10);

        // Viewport is properly configured
        const viewport = page.locator('meta[name="viewport"]');
        await expect(viewport).toHaveCount(1);
        const viewportContent = await viewport.getAttribute('content');
        expect(
            viewportContent,
            'viewport should contain width=device-width'
        ).toContain('width=device-width');

        // Open Graph tags are present for social sharing
        const ogTitle = page.locator('meta[property="og:title"]');
        await expect(ogTitle, 'og:title should be present').toHaveCount(1);

        const ogDescription = page.locator('meta[property="og:description"]');
        await expect(
            ogDescription,
            'og:description should be present'
        ).toHaveCount(1);

        const ogImage = page.locator('meta[property="og:image"]');
        await expect(ogImage, 'og:image should be present').toHaveCount(1);

        const ogUrl = page.locator('meta[property="og:url"]');
        await expect(ogUrl, 'og:url should be present').toHaveCount(1);

        // Favicon loads successfully
        const faviconResponse = await page.request.get(
            'https://studio-maell.vercel.app/favicon.ico'
        );
        expect(
            faviconResponse.ok(),
            'favicon should load successfully'
        ).toBeTruthy();

        // No missing or broken meta tag references
        // Verify no meta tags with empty content
        const allMetaTags = await page.locator('meta').all();
        for (const meta of allMetaTags) {
            const content = await meta.getAttribute('content');
            const name = await meta.getAttribute('name');
            const property = await meta.getAttribute('property');
            const identifier = name || property || 'unknown';

            // If meta has content attribute, it shouldn't be empty
            if ((await meta.evaluate((el) => el.hasAttribute('content'))) && content !== null) {
                expect(
                    content.length,
                    `meta tag ${identifier} should not have empty content`
                ).toBeGreaterThan(0);
            }
        }
    });
});