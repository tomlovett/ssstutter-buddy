import { test, expect } from '@playwright/test'
import { seedTestData, cleanupTestData } from './utils/database-seeder'

test.describe('Participant Workflow', () => {
  test.beforeAll(async () => await seedTestData())
  test.afterAll(async () => await cleanupTestData())

  test.beforeEach(async ({ page }) => {
    // Login as participant
    await page.goto('/login')
    await page.fill('input[name="email"]', 'participant@example.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')

    // Wait for redirect to participant home
    await expect(page).toHaveURL(/\/p\/participants\/home/)
  })

  test('participant can view and edit profile', async ({ page }) => {
    // Navigate to profile
    await page.click('a:has-text("Profile")')

    // Should be on profile page
    await expect(page).toHaveURL(/\/p\/participants\/show/)

    // Click edit button
    await page.click('a:has-text("Edit Profile")')

    // Should be on edit page
    await expect(page).toHaveURL(/\/p\/participants\/edit/)

    // Update codename
    await page.fill('input[name="codename"]', 'UpdatedCodename')

    // Save changes
    await page.click('button[type="submit"]')

    // Should show success message
    await expect(page.locator('text=Profile updated')).toBeVisible()
  })

  test('participant can browse studies', async ({ page }) => {
    // Navigate to studies
    await page.click('a:has-text("Studies")')

    // Should be on studies page
    await expect(page).toHaveURL(/\/p\/studies/)

    // Should see study list
    await expect(page.locator('h1:has-text("Studies")')).toBeVisible()
  })

  test('participant can express interest in study', async ({ page }) => {
    // Navigate to a specific study
    await page.goto('/p/studies/1')

    // Should see study details
    await expect(page.locator('h1')).toContainText('Study')

    // Click express interest
    await page.click('button:has-text("Express Interest")')

    // Should show success message
    await expect(page.locator('text=Interest expressed')).toBeVisible()
  })

  test('participant can view connections', async ({ page }) => {
    // Navigate to connections
    await page.click('a:has-text("Connections")')

    // Should be on connections page
    await expect(page).toHaveURL(/\/p\/connections/)

    // Should see connections list
    await expect(
      page.locator('h1:has-text("My Study Connections")')
    ).toBeVisible()
  })
})
