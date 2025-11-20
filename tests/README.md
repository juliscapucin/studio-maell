# Studio Maell Test Suite

## Structure

Tests are organized by test plan categories (01-12):

- **01-homepage-navigation**: Homepage loading and navigation menu tests
- **02-work-case-studies**: Case studies list and detail page tests
- **03-services**: Services page tests
- **04-articles**: Articles page tests
- **05-connect**: Contact page tests
- **06-cross-page-navigation**: Browser navigation and routing tests
- **07-metadata-seo**: SEO and metadata tests
- **08-error-handling**: Error cases and edge scenarios
- **09-mobile-responsive**: Mobile and responsive design tests
- **10-accessibility**: WCAG compliance and accessibility tests
- **11-performance**: Performance and loading tests
- **12-cms-integration**: Sanity CMS integration tests

## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific category
npx playwright test tests/01-homepage-navigation

# Run specific test file
npx playwright test tests/01-homepage-navigation/01-homepage-load.spec.ts

# Run with UI mode
npx playwright test --ui

# Run only critical tests (tagged)
npx playwright test --grep @critical

# Run only high priority tests
npx playwright test --grep @high

# Run critical and high priority tests
npx playwright test --grep "@critical|@high"

# Exclude medium priority tests
npx playwright test --grep-invert @medium

# Run smoke tests only (fast CI checks)
npx playwright test --grep @smoke

# Generate HTML report
npx playwright show-report
```

## Single Tag Tests

- **@critical**: Tests that are critical to the core functionality of the site
- **@high**: Tests that are high priority and important for user experience
- **@medium**: Tests that are medium priority and important for functionality
- **@low**: Tests that are low priority and important for usability

## Multiple Tag Tests

- **@high @accessibility**: Tests that are high priority and important for accessibility
- **@high @performance**: Tests that are high priority and important for performance
- **@critical @accessibility**: Tests that are critical to the core functionality and important for accessibility

## Adding Tags to Tests

```typescript
// Single tag
test('should load homepage @critical', async ({ page }) => {
	// test code
})

// Multiple tags
test('should navigate with keyboard @high @accessibility', async ({ page }) => {
	// test code
})

// Tag entire describe block
test.describe('Homepage Tests @critical', () => {
	test('should display content', async ({ page }) => {
		// inherits @critical tag
	})
})
```
