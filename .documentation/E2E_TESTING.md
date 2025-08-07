# End-to-End Testing Guide

## Overview

This project uses **Playwright** for end-to-end testing, which provides excellent support for Rails/Inertia.js applications. The testing approach uses a database seeder to create test data and a special email prefix to identify and clean up test records.

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
├── auth.spec.js              # Authentication flow tests
├── participant-flow.spec.js   # Participant workflow tests
├── researcher-flow.spec.js    # Researcher workflow tests
└── utils/
    ├── auth-helpers.js        # Authentication utilities
    └── database-seeder.js     # Database seeding utilities
```

## Database Seeding Strategy

### Test Data Management

The E2E tests use a centralized database seeding approach:

1. **Test Data Creation**: The `/test/seed` endpoint creates predefined test data. (It also verifies the connection to the local server instance)
2. **Email Prefix**: All test users use the prefix `e2e_1658498146584_` in their email addresses
3. **Cascading Cleanup**: Test data is cleaned up by deleting users with the email prefix, which triggers cascading deletes for all related records

### Seeding Controller

The `Test::SeedingController` creates the following test data:

- **Participant**: User with participant profile and location
- **Researcher**: User with researcher profile and institution details
- **Admin User**: Admin-level user account
- **Studies**: Multiple studies in different states (active, draft, paused, digital, in-person)

### Database Seeder Utility

```javascript
import { seedTestData, cleanupTestData } from './utils/database-seeder'

// Seed test data and get created records
const { participant, researcher, studies } = await seedTestData()

// Clean up all test data
await cleanupTestData()
```

## Writing Tests

### Basic Test Structure

```javascript
import { test, expect } from '@playwright/test'
import { seedTestData, cleanupTestData } from './utils/database-seeder'
import { loginUser } from './utils/auth-helpers'

test.describe('Feature Name', () => {
  test.afterAll(async () => await cleanupTestData())

  test('should do something', async ({ page }) => {
    const { participant } = await seedTestData()

    await loginUser(page, participant)

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

```javascript
import { test, expect } from '@playwright/test'
import { seedTestData, cleanupTestData } from './utils/database-seeder'
import { loginUser, signupNewUser, selectRole } from './utils/auth-helpers'

test.describe('Authentication Flow', () => {
  test.afterAll(async () => await cleanupTestData())

  test('participant can log in with existing account', async ({ page }) => {
    const { participant } = await seedTestData()

    await loginUser(page, participant)

    await expect(page).toHaveURL('/p')
  })
})
```

### Authentication Helpers

The `auth-helpers.js` provides utilities for common authentication flows:

```javascript
// Login with existing user
await loginUser(page, participant)

// Sign up new user
await signupNewUser(page, {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
})

// Select user role
await selectRole(page, 'participant') // or 'researcher'

// Logout
await logout(page)
```

## Test Data

### Predefined Test Data

The seeding controller creates the following test data:

#### Users

- **Participant**: `Test Participant` with codename `TestParticipant`
- **Researcher**: `Dr. Test Researcher` from `Test University`
- **Admin**: Admin user for administrative testing

#### Studies

- **Digital Survey Study**: Active digital study with survey methodology
- **In-Person Interview Study**: Active in-person study with interview methodology
- **Draft Study**: Unpublished draft study
- **Paused Study**: Temporarily paused study

### Test Data Structure

```javascript
const { participant, researcher, admin_user, studies } = await seedTestData()

// participant object contains:
// - id, codename, birthdate, gender, user (with email, first_name, last_name)

// researcher object contains:
// - id, institution, research_interests, titles, user (with email, first_name, last_name)

// studies array contains:
// - id, title, short_desc, long_desc, methodologies, status, etc.
```

## Best Practices

### 1. Use Descriptive Test Names

```javascript
// Good
test('participant can view and edit profile', async ({ page }) => {

// Bad
test('profile works', async ({ page }) => {
```

### 2. Always Clean Up Test Data

```javascript
test.describe('Feature Name', () => {
  test.afterAll(async () => await cleanupTestData())

  // Your tests here...
})
```

### 3. Use beforeEach for Common Setup

```javascript
test.describe('Participant Workflow', () => {
  test.beforeEach(async ({ page }) => {
    const { participant } = await seedTestData()
    await loginUser(page, participant)
  })

  test('can edit profile', async ({ page }) => {
    // Test implementation...
  })
})
```

### 4. Handle Async Operations

```javascript
// Wait for navigation
await expect(page).toHaveURL('/expected-path')

// Wait for element to be visible
await expect(page.locator('.success-message')).toBeVisible()

// Wait for network request
await page.waitForResponse(response => response.url().includes('/api/'))
```

## Configuration

### Playwright Config (`playwright.config.js`)

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

```javascript
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
5. **Test data not cleaned up**: Check that `cleanupTestData()` is called in `afterAll`

### Performance Tips

1. **Use `page.waitForLoadState()`** for page loads
2. **Use `page.waitForSelector()`** for dynamic content
3. **Avoid `page.waitForTimeout()`** - use explicit waits instead
4. **Run tests in parallel** when possible

## Database Seeding Details

### Email Prefix System

All test users are created with the email prefix `e2E_EMAIL_PREFIX = 'e2e_1658498146584_'`:

```ruby
# In Test::SeedingController
email: "#{E2E_EMAIL_PREFIX}_#{Faker::Internet.email}"
```

### Cleanup Strategy

Test data cleanup works by:

1. **Finding test users**: `User.where('email LIKE ?', "#{E2E_EMAIL_PREFIX}%")`
2. **Cascading deletes**: Using `dependent: :destroy` relationships to clean up all related records
3. **Automatic cleanup**: Called in test `afterAll` hooks

### Seeding Endpoints

- **POST `/test/seed`**: Creates test data and returns JSON with created records
- **POST `/test/cleanup`**: Removes all test data by deleting users with email prefix

## Next Steps

1. **Add more test coverage** for critical user flows
2. **Implement visual regression testing**
3. **Add performance testing**
4. **Set up test reporting and analytics**
5. **Create more specialized test scenarios** for complex workflows
6. **Add test data factories** for different user states (verified, unverified, etc.)
