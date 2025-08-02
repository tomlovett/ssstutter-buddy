# End-to-End Testing Guide

## Overview

This project uses **Playwright** for end-to-end testing, which provides excellent support for Rails/Inertia.js applications.

## Quick Start

### 1. Install Dependencies

```bash
yarn install
yarn test:e2e:install
```

### 2. Run Tests

```bash
# Run all E2E tests
yarn test:e2e

# Run with UI (interactive)
yarn test:e2e:ui

# Run in headed mode (see browser)
yarn test:e2e:headed

# Run in debug mode
yarn test:e2e:debug
```

## Test Structure

```
e2e/
├── auth.spec.ts              # Authentication flow tests
├── participant-flow.spec.ts   # Participant workflow tests
├── researcher-flow.spec.ts    # Researcher workflow tests
├── factories/
│   └── user-factory.ts       # Data factories (similar to Factory Bot)
├── utils/
│   ├── auth-helpers.ts       # Authentication utilities
│   ├── test-data.ts          # Test data constants
│   └── database-seeder.ts    # Database seeding utilities
├── setup/
│   └── seed-test-data.ts     # Test data setup
└── examples/
    └── factory-usage.spec.ts # Examples of using factories
```

## Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    // Navigate to page
    await page.goto('/path')

    // Interact with elements
    await page.fill('input[name="email"]', 'test@example.com')
    await page.click('button[type="submit"]')

    // Assert results
    await expect(page).toHaveURL('/expected-path')
    await expect(page.locator('h1')).toContainText('Expected Title')
  })
})
```

### Using Test Helpers

```typescript
import { test, expect } from '@playwright/test'
import { AuthHelpers } from './utils/auth-helpers'
import { TestUsers } from './utils/test-data'

test.describe('Authenticated Flow', () => {
  test('participant can access dashboard', async ({ page }) => {
    const auth = new AuthHelpers(page)

    // Login using helper
    await auth.loginAsParticipant()

    // Continue with test...
  })
})
```

### Test Data

Use the factory system (similar to Factory Bot in Rails) from `factories/user-factory.ts`:

```typescript
import {
  UserFactory,
  StudyFactory,
  LocationFactory,
} from './factories/user-factory'

test('create study', async ({ page }) => {
  // Generate random data
  const userData = UserFactory.createUser()
  const studyData = StudyFactory.createStudy()

  // Use in forms
  await page.fill('input[name="title"]', studyData.title)
  await page.fill('input[name="email"]', userData.email)
  // ...
})
```

#### Factory Methods Available

```typescript
// User factories
UserFactory.createUser() // Random user
UserFactory.createParticipant() // Random participant
UserFactory.createResearcher() // Random researcher
UserFactory.createUserWithParticipant() // User + participant
UserFactory.createUserWithResearcher() // User + researcher
UserFactory.createTestUsers() // Predefined test users

// Study factories
StudyFactory.createStudy() // Random study
StudyFactory.createDraftStudy() // Draft study
StudyFactory.createPublishedStudy() // Published study
StudyFactory.createDigitalStudy() // Digital study
StudyFactory.createInPersonStudy() // In-person study
StudyFactory.createHybridStudy() // Hybrid study

// Location factories
LocationFactory.createLocation() // Random location
LocationFactory.createUSLocation() // US location
LocationFactory.createDigitalLocation() // Digital location
```

#### Overriding Factory Data

```typescript
// Override specific fields
const user = UserFactory.createUser({
  email: 'specific@example.com',
  first_name: 'Jane',
})

const study = StudyFactory.createStudy({
  title: 'Custom Study Title',
  location_type: 'digital',
})
```

## Best Practices

### 1. Use Descriptive Test Names

```typescript
// Good
test('user can sign up and complete participant onboarding', async ({ page }) => {

// Bad
test('signup works', async ({ page }) => {
```

### 2. Use Page Object Pattern for Complex Flows

```typescript
class ParticipantDashboard {
  constructor(private page: Page) {}

  async navigateToProfile() {
    await this.page.click('a:has-text("Profile")')
  }

  async editCodename(newCodename: string) {
    await this.page.fill('input[name="codename"]', newCodename)
    await this.page.click('button[type="submit"]')
  }
}
```

### 3. Use beforeEach for Common Setup

```typescript
test.describe('Participant Workflow', () => {
  test.beforeEach(async ({ page }) => {
    const auth = new AuthHelpers(page)
    await auth.loginAsParticipant()
  })

  test('can edit profile', async ({ page }) => {
    // Test implementation...
  })
})
```

### 4. Handle Async Operations

```typescript
// Wait for navigation
await expect(page).toHaveURL('/expected-path')

// Wait for element to be visible
await expect(page.locator('.success-message')).toBeVisible()

// Wait for network request
await page.waitForResponse(response => response.url().includes('/api/'))
```

## Configuration

### Playwright Config (`playwright.config.ts`)

- **Base URL**: `http://localhost:3000`
- **Web Server**: Automatically starts `bin/dev`
- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Screenshots**: On failure only
- **Videos**: Retained on failure
- **Traces**: On first retry

### Environment Variables

```bash
# Run tests against staging
PLAYWRIGHT_BASE_URL=https://staging.example.com yarn test:e2e

# Run tests in CI mode
CI=true yarn test:e2e
```

## Debugging

### 1. Debug Mode

```bash
yarn test:e2e:debug
```

This opens the browser and pauses execution, allowing you to step through the test.

### 2. UI Mode

```bash
yarn test:e2e:ui
```

This opens Playwright's test runner UI for interactive debugging.

### 3. Screenshots and Videos

Failed tests automatically generate:

- Screenshots in `test-results/`
- Videos in `test-results/`
- Traces in `test-results/`

### 4. Console Logs

```typescript
// Add logging to tests
console.log('Current URL:', page.url())
console.log('Element text:', await page.locator('h1').textContent())
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: yarn install
      - run: yarn test:e2e:install
      - run: yarn test:e2e
```

## Troubleshooting

### Common Issues

1. **Tests failing due to timing**: Add explicit waits
2. **Element not found**: Check selectors and page structure
3. **Network errors**: Ensure test server is running
4. **Authentication issues**: Verify test user credentials

### Performance Tips

1. **Use `page.waitForLoadState()`** for page loads
2. **Use `page.waitForSelector()`** for dynamic content
3. **Avoid `page.waitForTimeout()`** - use explicit waits instead
4. **Run tests in parallel** when possible

## Database Seeding

### Programmatic Seeding

Use the `DatabaseSeeder` class to create test data programmatically:

```typescript
import { DatabaseSeeder } from './utils/database-seeder'

const seeder = new DatabaseSeeder()

// Seed predefined test data
await seeder.seedTestData()

// Create random test data
const randomData = await seeder.createRandomTestData(5)

// Clean up test data
await seeder.cleanupTestData()
```

### Rails Console Seeding

For more efficient seeding, use the `RailsSeeder` class:

```typescript
import { RailsSeeder } from './utils/database-seeder'

// Seed via Rails console (faster than API calls)
await RailsSeeder.seedViaRailsConsole()
```

## Next Steps

1. **Add more test coverage** for critical user flows
2. **Implement visual regression testing**
3. **Add performance testing**
4. **Set up test reporting and analytics**
5. **Create more specialized factories** for complex scenarios
6. **Add factory traits** for different user states (verified, unverified, etc.)
