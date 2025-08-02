import { test, expect } from '@playwright/test'
import { seedTestData, cleanupTestData } from './utils/database-seeder'

test.describe('Researcher Workflow', () => {
  test.beforeAll(async () => await seedTestData())
  test.afterAll(async () => await cleanupTestData())

  test.beforeEach(async ({ page }) => {
    // Login as researcher
    await page.goto('/login')
    await page.fill('input[name="email"]', 'researcher@example.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')

    // Wait for redirect to researcher home
    await expect(page).toHaveURL(/\/r\/researchers\/home/)
  })

  test('researcher can create a new study', async ({ page }) => {
    // Navigate to studies
    await page.click('a:has-text("Studies")')

    // Click create new study
    await page.click('button:has-text("Create Study")')

    // Fill out study form
    await page.fill('input[name="title"]', 'New Test Study')
    await page.fill('textarea[name="short_desc"]', 'A test study description')
    await page.fill(
      'textarea[name="long_desc"]',
      'A detailed test study description'
    )
    await page.selectOption('select[name="methodologies"]', 'online')
    await page.fill('input[name="min_age"]', '18')
    await page.fill('input[name="max_age"]', '65')
    await page.fill('input[name="total_hours"]', '2')
    await page.fill('input[name="duration"]', '2 hours')
    await page.fill('input[name="remuneration"]', '$50')

    // Submit form
    await page.click('button[type="submit"]')

    // Should redirect to study show page
    await expect(page).toHaveURL(/\/r\/studies\/\d+/)

    // Should show study title
    await expect(page.locator('h1')).toContainText('New Test Study')
  })

  test('researcher can edit existing study', async ({ page }) => {
    // Navigate to existing study
    await page.goto('/r/studies/1/edit')

    // Update title
    await page.fill('input[name="title"]', 'Updated Study Title')

    // Save changes
    await page.click('button[type="submit"]')

    // Should show success message
    await expect(page.locator('text=Study updated')).toBeVisible()
  })

  test('researcher can publish study', async ({ page }) => {
    // Navigate to study
    await page.goto('/r/studies/1')

    // Click publish button
    await page.click('button:has-text("Publish")')

    // Should show success message
    await expect(page.locator('text=Study published')).toBeVisible()
  })

  test('researcher can view connections', async ({ page }) => {
    // Navigate to connections
    await page.click('a:has-text("Connections")')

    // Should be on connections page
    await expect(page).toHaveURL(/\/r\/connections/)

    // Should see connections list
    await expect(page.locator('h1:has-text("Study Connections")')).toBeVisible()
  })

  test('researcher can manage study participants', async ({ page }) => {
    // Navigate to study
    await page.goto('/r/studies/1')

    // Click on participants tab
    await page.click('a:has-text("Participants")')

    // Should see participants list
    await expect(
      page.locator('h2:has-text("Study Participants")')
    ).toBeVisible()
  })
})
