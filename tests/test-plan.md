# Studio Maell - Comprehensive Test Plan

## Application Overview

Studio Maell is a portfolio website for a freelance product designer specializing in accessibility and inclusive design. The application is built with Next.js and features:

- **Case Studies (Work)**: Portfolio showcasing design projects with detailed case study pages
- **Services**: Display of three core service offerings (EAA Compliant Product Design, Accessible Design Systems, Inclusive Research & Testing)
- **Articles**: Blog-style content featuring design articles published on external platforms
- **Connect**: Contact information page with email and LinkedIn links
- **Accessibility Features**: Skip to content link, proper semantic HTML, keyboard navigation support
- **Responsive Navigation**: Desktop and mobile menu system with burger menu
- **Content Management**: Integrated with Sanity CMS for content management
- **SEO**: Proper meta tags, page titles, and Open Graph support

## Test Environment

**Base URL**: `https://studio-maell.vercel.app/`  
**Seed File**: `tests/seed.spec.ts`  
**Technology Stack**: Next.js, React, Sanity CMS

---

## Test Scenarios

### 1. Homepage & Navigation

**Seed:** `tests/seed.spec.ts`

#### 1.1 Verify Homepage Load

**Steps:**

1. Navigate to `https://studio-maell.vercel.app/`
2. Wait for page to fully load

**Expected Results:**

- Page title contains "Studio Maell | Work"
- URL is exactly `https://studio-maell.vercel.app/`
- Header displays "Studio Maell" brand button
- Tagline "Freelance Product Designer, specialised in accessibility and inclusive design." is visible
- "Skip to main content" link is present in DOM
- Navigation menu displays all sections: Work, Services, Articles, Connect
- Work section displays case studies with images and titles

#### 1.2 Navigation Menu - Desktop Links

**Steps:**

1. Navigate to `https://studio-maell.vercel.app/`
2. Verify all navigation links are visible:
   - Work
   - Services
   - Articles
   - Connect
3. Note: Case study preview links also appear in navigation on desktop

**Expected Results:**

- All four main navigation links are visible and clickable
- Links display correct text labels
- Hover states are functional (visual feedback)
- Navigation remains fixed/accessible while scrolling

#### 1.3 Brand Button Navigation

**Steps:**

1. Navigate to any page (e.g., `/services`)
2. Click the "Studio Maell" brand button in header

**Expected Results:**

- User is redirected to homepage `/work`
- Page loads without errors
- All homepage content displays correctly

#### 1.4 Accessibility - Skip to Content Link

**Steps:**

1. Navigate to `https://studio-maell.vercel.app/`
2. Press Tab key once (or inspect DOM for skip link)
3. Verify skip link appears or is present with href="#main-content"

**Expected Results:**

- Skip to content link is present in the DOM
- Link has proper ARIA attributes
- Link targets main content area with id="main-content"

---

### 2. Work (Case Studies) Section

**Seed:** `tests/seed.spec.ts`

#### 2.1 View Case Studies List

**Steps:**

1. Navigate to `https://studio-maell.vercel.app/`
2. Verify Work page displays

**Expected Results:**

- Page heading shows "Work"
- Subtitle displays: "6 years of inclusive digital design summarized in a few highlights"
- At least 2 case study cards are visible:
  - "Advising caretakers in the sensitive process of name adjustment" (Ministry of Justice)
  - "Improving machine management by creating a 100% digital user journey" (Jacob Douwe Egberts Professional)
- Each case study card displays:
  - Featured image
  - Case study title
  - Client name
  - "Read case" button with arrow icon

#### 2.2 Navigate to Case Study Detail Page

**Steps:**

1. Navigate to `https://studio-maell.vercel.app/`
2. Click "Read case" button on "Jacob Douwe Egberts Professional" case study
3. Alternatively, navigate directly to `/work/improving-machine-management-by-creating-a-100-digital-user-journey`

**Expected Results:**

- URL changes to `/work/[case-study-slug]`
- Page title updates to "Studio Maell | Case"
- "Back to work" button with arrow icon is visible at top
- Case study title displays: "Improving machine management by creating a 100% digital user journey"
- Client name shows: "Jacob Douwe Egberts Professional"
- Services section lists: "Concept Design", "Product Implementation"
- Role section shows: "Lead Designer"
- Detailed case study content is visible including images
- Challenge section and goals are displayed

#### 2.3 Back Navigation from Case Study

**Steps:**

1. Navigate to any case study detail page
2. Click "Back to work" button/link

**Expected Results:**

- User returns to Work homepage at `/work`
- All case studies are visible again
- Page scroll position resets to top

#### 2.4 Case Study URL Direct Access

**Steps:**

1. Navigate directly to `https://studio-maell.vercel.app/work/advising-caretakers-in-the-sensitive-process-of-name-adjustment`

**Expected Results:**

- Page loads successfully
- Correct case study content displays
- Title shows: "Advising caretakers in the sensitive process of name adjustment"
- Client shows: "Ministry of Justice"
- All case study elements render properly
- Navigation menu remains accessible

---

### 3. Services Section

**Seed:** `tests/seed.spec.ts`

#### 3.1 Navigate to Services Page

**Steps:**

1. From homepage, click "Services" in navigation menu
2. Alternatively, navigate directly to `/services`

**Expected Results:**

- URL changes to `/services`
- Page title updates to "Studio Maell | Services"
- Main heading displays "Services"
- Subtitle shows: "Areas of expertise"
- Three service cards are visible

#### 3.2 Verify Service Offerings Display

**Steps:**

1. Navigate to `/services`
2. Verify all three service cards are present and readable

**Expected Results:**

- **Service 1**: "EAA Compliant Product Design"
  - Description: "From concept to detail design and documentation for development. Completely conform the legal requirements of the European Accessibility Act."
- **Service 2**: "Accessible Design Systems"
  - Description: "Building upon existing design systems or creating them from scratch. Assuring scalability and accessibility for the upcoming years."
- **Service 3**: "Inclusive Research & Testing"
  - Description: "Validating designs with real users, before development. Minimising risks, maximising potential."

- Each service card has a separator/divider line
- Content is properly formatted and readable
- No layout or rendering issues

#### 3.3 Services Page Layout & Responsiveness

**Steps:**

1. Navigate to `/services`
2. View page at different viewport sizes (desktop, tablet, mobile)

**Expected Results:**

- Services layout adapts to screen size
- Text remains readable at all breakpoints
- Service cards stack appropriately on mobile
- No horizontal scrolling required
- Images and icons (if present) scale properly

---

### 4. Articles Section

**Seed:** `tests/seed.spec.ts`

#### 4.1 Navigate to Articles Page

**Steps:**

1. From homepage, click "Articles" in navigation menu
2. Alternatively, navigate directly to `/articles`

**Expected Results:**

- URL changes to `/articles`
- Page title updates to "Studio Maell | Articles"
- Main heading displays "Articles"
- Article list is visible

#### 4.2 Verify Articles List Display

**Steps:**

1. Navigate to `/articles`
2. Scroll through articles list

**Expected Results:**

- At least 3 articles are visible:
  - **Article 1**: "The Importance of User-Centered Design in Product Development"
    - Publication: Smashing Magazine
    - Date: November 16, 2025
    - Featured image present
  - **Article 2**: "Accessible Design vs. Inclusive Design: What's the Difference?"
    - Publication: Medium
    - Date: November 4, 2025
    - Featured image present
  - **Article 3**: "Advising caretakers in the sensitive process of name adjustment"
    - Publication: Ministry of Justice
    - Date: October 28, 2025
    - Featured image present

- Each article card displays:
  - Publication date
  - Publication name
  - Article title (as clickable link)
  - Featured image with loading spinner
  - Properly formatted metadata

#### 4.3 External Article Links

**Steps:**

1. Navigate to `/articles`
2. Click on article title link for "The Importance of User-Centered Design in Product Development"

**Expected Results:**

- Link opens in new tab/window (target="\_blank")
- External URL is valid (http://example.com or actual publication URL)
- Original tab remains on articles page
- No console errors or broken links

#### 4.4 Article Images Loading

**Steps:**

1. Navigate to `/articles`
2. Observe article images as they load
3. Verify all images eventually display

**Expected Results:**

- Loading spinner appears while images load
- Images load successfully without errors
- Proper alt text is present for accessibility
- Images are appropriately sized
- No broken image placeholders

---

### 5. Connect Section

**Seed:** `tests/seed.spec.ts`

#### 5.1 Navigate to Connect Page

**Steps:**

1. From homepage, click "Connect" in navigation menu
2. Alternatively, navigate directly to `/connect`

**Expected Results:**

- URL changes to `/connect`
- Page title updates to "Studio Maell | Connect"
- Main heading displays "Connect"
- Contact information is visible

#### 5.2 Verify Contact Information Display

**Steps:**

1. Navigate to `/connect`
2. Verify all contact details are present and functional

**Expected Results:**

- Heading shows: "Excited about Design, Inclusion or Accessibility? Let's chat!"
- Email contact link is visible: "monsehopman@gmail.com"
  - Link has mailto: protocol
  - Clicking opens default email client
  - Email icon is displayed
- LinkedIn profile link is visible: "linkedin.com/user/monsemaell"
  - Link opens in new tab
  - LinkedIn icon is displayed
  - Full URL is: `https://linkedin.com/user/monsemaell`

#### 5.3 Email Link Functionality

**Steps:**

1. Navigate to `/connect`
2. Click email link "monsehopman@gmail.com"

**Expected Results:**

- System default email client opens (or web mail if configured)
- "To" field is pre-populated with "monsehopman@gmail.com"
- Subject and body are empty (ready for user input)
- Browser does not navigate away from page

#### 5.4 LinkedIn Link Functionality

**Steps:**

1. Navigate to `/connect`
2. Right-click LinkedIn link and verify URL
3. Click LinkedIn link

**Expected Results:**

- Link href is `https://linkedin.com/user/monsemaell`
- Link opens in new tab (target="\_blank")
- LinkedIn profile page attempts to load
- Original tab remains on connect page
- Link has appropriate rel attributes for security (rel="noopener noreferrer")

---

### 6. Cross-Page Navigation & Browser Controls

**Seed:** `tests/seed.spec.ts`

#### 6.1 Sequential Page Navigation

**Steps:**

1. Navigate to homepage `/`
2. Click "Services" link
3. Click "Articles" link
4. Click "Connect" link
5. Click "Work" link

**Expected Results:**

- Each navigation action successfully loads the target page
- URLs update correctly for each page
- No broken navigation or 404 errors
- Browser back button history is properly maintained
- Each page displays its unique content correctly

#### 6.2 Browser Back Button Navigation

**Steps:**

1. Navigate through: Home → Services → Articles → Connect
2. Press browser back button 3 times

**Expected Results:**

- Back button returns to: Connect → Articles → Services → Home
- Each page loads with correct content
- URLs update correctly
- Page state is maintained (no data loss)
- Navigation menu reflects current page

#### 6.3 Browser Forward Button Navigation

**Steps:**

1. Navigate: Home → Services → Articles
2. Press back button twice (returns to Home)
3. Press forward button twice

**Expected Results:**

- Forward button navigates: Home → Services → Articles
- Pages load correctly
- URLs match expected paths
- Content displays without errors

#### 6.4 Direct URL Entry

**Steps:**

1. Manually enter URLs in browser address bar:
   - `https://studio-maell.vercel.app/work`
   - `https://studio-maell.vercel.app/services`
   - `https://studio-maell.vercel.app/articles`
   - `https://studio-maell.vercel.app/connect`
   - `https://studio-maell.vercel.app/work/improving-machine-management-by-creating-a-100-digital-user-journey`

**Expected Results:**

- All URLs load successfully
- Correct content displays for each page
- No 404 or routing errors
- Navigation menu remains functional
- Page metadata (title, meta tags) loads correctly

---

### 7. Page Metadata & SEO

**Seed:** `tests/seed.spec.ts`

#### 7.1 Verify Page Titles

**Steps:**

1. Navigate to each main page and verify browser tab title

**Expected Results:**

- Homepage (`/`): "Studio Maell | Work"
- Work (`/work`): "Studio Maell | Work"
- Services (`/services`): "Studio Maell | Services"
- Articles (`/articles`): "Studio Maell | Articles"
- Connect (`/connect`): "Studio Maell | Connect"
- Case Study: "Studio Maell | Case"

#### 7.2 Verify Page Meta Tags

**Steps:**

1. Navigate to homepage
2. Inspect page source or use browser dev tools
3. Verify meta tags are present

**Expected Results:**

- `<meta name="description">` is present and contains relevant content
- `<meta name="viewport">` is properly configured
- Open Graph tags are present for social sharing
- Favicon is loaded successfully
- No missing or broken meta tag references

#### 7.3 Verify Semantic HTML Structure

**Steps:**

1. Navigate to any page
2. Inspect HTML structure in dev tools

**Expected Results:**

- Proper use of semantic HTML5 elements:
  - `<header>` for page header
  - `<nav>` for navigation
  - `<main>` for main content
  - `<article>` for case studies/articles
  - `<heading>` hierarchy (h1, h2, h3) is logical
- Accessibility landmarks are properly implemented
- ARIA labels are present where needed

---

### 8. Error Handling & Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 8.1 Invalid URL Navigation

**Steps:**

1. Navigate to `https://studio-maell.vercel.app/invalid-page`
2. Navigate to `https://studio-maell.vercel.app/work/non-existent-case-study`

**Expected Results:**

- Custom 404 page displays (or appropriate error page)
- User is informed that page doesn't exist
- Navigation menu remains functional
- User can navigate back to valid pages
- No application crash or white screen

#### 8.2 Rapid Navigation Switching

**Steps:**

1. Rapidly click between navigation links:
   - Work → Services → Articles → Connect → Work (repeat 5 times quickly)

**Expected Results:**

- Application handles rapid navigation without crashes
- No race conditions or loading errors
- Final clicked page loads correctly
- No JavaScript errors in console
- Content renders properly despite rapid switching

#### 8.3 Network Interruption Handling

**Steps:**

1. Navigate to homepage
2. Disable network connection
3. Try to navigate to another page
4. Re-enable network
5. Retry navigation

**Expected Results:**

- Application displays appropriate error message when offline
- User is informed of network issue
- After reconnection, navigation works normally
- No permanent application state corruption
- Cached content (if any) displays appropriately

#### 8.4 Image Loading Failure

**Steps:**

1. Block image requests using browser dev tools
2. Navigate to case studies or articles page

**Expected Results:**

- Pages load without crashing
- Alt text displays in place of images
- Layout doesn't break without images
- Loading spinners eventually timeout gracefully
- Content remains readable and accessible

---

### 9. Mobile & Responsive Design

**Seed:** `tests/seed.spec.ts`

#### 9.1 Mobile Navigation Menu

**Steps:**

1. Resize browser to mobile viewport (375px width)
2. Navigate to homepage
3. Observe navigation menu

**Expected Results:**

- Burger menu icon appears in header
- Desktop navigation links are hidden
- Brand button remains visible
- Page layout adapts to mobile viewport
- Content is readable without horizontal scrolling

#### 9.2 Mobile Menu Interaction

**Steps:**

1. Set viewport to mobile size
2. Click burger menu icon
3. Verify menu opens
4. Click a navigation link
5. Verify menu closes and navigation occurs

**Expected Results:**

- Burger menu button is clickable and visible
- Mobile menu overlay/drawer opens smoothly
- All navigation links are visible in mobile menu
- Selecting a link navigates to correct page
- Menu automatically closes after navigation
- No layout issues or overlapping content

#### 9.3 Tablet Viewport Testing

**Steps:**

1. Resize browser to tablet viewport (768px width)
2. Navigate through all main pages

**Expected Results:**

- Layout adapts appropriately for tablet
- Navigation remains accessible
- Content reflows correctly
- Images scale proportionally
- Touch targets are appropriately sized
- No horizontal scrolling required

#### 9.4 Responsive Breakpoints

**Steps:**

1. Gradually resize browser from 320px to 1920px width
2. Observe layout changes at various breakpoints

**Expected Results:**

- Layout transitions smoothly between breakpoints
- No sudden jumps or broken layouts
- Content remains readable at all sizes
- Images and media scale appropriately
- Navigation adapts to available space
- No content cut off or hidden unintentionally

---

### 10. Accessibility Testing

**Seed:** `tests/seed.spec.ts`

#### 10.1 Keyboard Navigation - Tab Order

**Steps:**

1. Navigate to homepage
2. Press Tab key repeatedly to cycle through all interactive elements
3. Verify focus indicators are visible

**Expected Results:**

- Tab order is logical and follows visual layout
- Focus indicator is clearly visible on all interactive elements
- Skip to content link appears first
- Navigation links receive focus in correct order
- Can reach all interactive elements using keyboard only
- No focus trap preventing navigation

#### 10.2 Keyboard Navigation - Enter Key Activation

**Steps:**

1. Navigate to homepage
2. Tab to "Services" navigation link
3. Press Enter key

**Expected Results:**

- Services page loads when Enter is pressed
- All navigation links activate on Enter key
- Buttons can be activated with Enter or Space
- Form controls (if any) respond to appropriate keys
- No need for mouse to interact with site

#### 10.3 Screen Reader Compatibility

**Steps:**

1. Enable screen reader (VoiceOver on Mac, NVDA on Windows)
2. Navigate through homepage
3. Listen to announcements

**Expected Results:**

- Page title is announced when loading
- Landmarks are properly announced (banner, navigation, main)
- Headings are properly announced with levels
- Links have descriptive text (not just "click here")
- Images have appropriate alt text
- Current page/location is announced
- Interactive elements have clear labels

#### 10.4 Color Contrast & Visual Accessibility

**Steps:**

1. Navigate to all pages
2. Use browser dev tools or accessibility checker to verify contrast ratios

**Expected Results:**

- Text has sufficient contrast against background (WCAG AA minimum 4.5:1)
- Large text meets 3:1 contrast ratio
- Interactive elements have visible focus indicators
- Color is not the only means of conveying information
- Consistent visual design aids comprehension

#### 10.5 Zoom & Text Scaling

**Steps:**

1. Navigate to homepage
2. Zoom browser to 200%
3. Verify all content remains accessible

**Expected Results:**

- Layout adapts to zoom level
- Text remains readable and doesn't overflow
- All functionality remains accessible
- No horizontal scrolling at 200% zoom (at standard viewport)
- Images scale appropriately
- Interactive elements remain clickable

---

### 11. Performance & Loading

**Seed:** `tests/seed.spec.ts`

#### 11.1 Initial Page Load Performance

**Steps:**

1. Clear browser cache
2. Navigate to homepage
3. Use browser dev tools to measure load time
4. Observe time to interactive

**Expected Results:**

- Page loads within 3 seconds on good connection
- Critical content (text, layout) appears quickly
- Images load progressively
- No blocking resources prevent rendering
- Loading spinners appear for delayed content
- Page is interactive within reasonable time

#### 11.2 Subsequent Page Navigation Performance

**Steps:**

1. Navigate to homepage
2. Click through to Services, Articles, Connect
3. Measure navigation transition times

**Expected Results:**

- Page transitions feel smooth and responsive
- Client-side routing is fast (if using SPA navigation)
- Content appears without significant delay
- Images from previous pages don't reload unnecessarily
- Browser back/forward navigation is instant

#### 11.3 Image Loading Performance

**Steps:**

1. Navigate to case studies page with multiple images
2. Observe image loading behavior
3. Check Network tab for image optimization

**Expected Results:**

- Images are lazy-loaded when scrolling
- Appropriate image formats used (WebP where supported)
- Images are properly sized (not oversized)
- Loading spinners indicate pending images
- Multiple images load in parallel
- No excessive image file sizes

---

### 12. Content Management (Sanity CMS Integration)

**Seed:** `tests/seed.spec.ts`

#### 12.1 Dynamic Content Display

**Steps:**

1. Navigate to homepage and verify case studies load
2. Navigate to articles page and verify articles load
3. Navigate to services page and verify services load

**Expected Results:**

- All content from Sanity CMS displays correctly
- Content structure matches expected format
- Images from CMS load properly
- Rich text formatting displays correctly
- No "undefined" or missing content errors
- API calls to Sanity complete successfully

#### 12.2 Draft Mode Toggle

**Steps:**

1. Navigate to `/api/draft-mode/enable`
2. Verify draft mode activates (if authentication allows)
3. Check for draft mode indicator

**Expected Results:**

- Draft mode API endpoint responds
- Draft content becomes visible (if enabled)
- Draft mode indicator appears (if implemented)
- Can exit draft mode
- Published content remains visible in non-draft mode

---

## Testing Notes

### Pre-Test Setup

- Ensure stable internet connection for loading external resources
- Clear browser cache between test runs for accurate performance testing
- Use multiple browsers for cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Test on actual mobile devices in addition to browser emulation

### Known Limitations

- Articles link to external URLs which may change or become unavailable
- Case study images depend on CMS availability
- Network-dependent features require internet connectivity

### Bug Reporting Format

When reporting bugs found during testing, include:

- Test scenario number and name
- Steps to reproduce
- Expected result
- Actual result
- Browser and version
- Screenshot or video if applicable
- Console errors (if any)

### Success Criteria

For this test plan to pass:

- All navigation flows work correctly
- All pages load without errors
- Content displays properly across all sections
- Accessibility standards are met (WCAG 2.1 Level AA minimum)
- Performance is acceptable (pages load within 3 seconds)
- No broken links or images
- Mobile responsiveness works correctly
- Keyboard navigation is fully functional

---

## Test Execution Summary

**Total Test Scenarios**: 46  
**Test Categories**: 12  
**Estimated Execution Time**: 4-6 hours (full manual test pass)

**Priority Levels:**

- **Critical**: Scenarios 1.1, 2.1, 2.2, 3.1, 4.1, 5.1, 6.1, 6.4 (Core functionality)
- **High**: Scenarios 2.3, 3.2, 4.2, 5.2, 7.1, 10.1, 10.2 (User experience & accessibility)
- **Medium**: All other scenarios (Enhanced features and edge cases)

**Recommended Testing Frequency:**

- Smoke tests (Critical scenarios): Before each deployment
- Full regression: Weekly or before major releases
- Accessibility audit: Monthly
- Performance testing: Before each release

---

_Test Plan Version 1.0_  
_Created: November 19, 2025_  
_Next Review: December 19, 2025_
