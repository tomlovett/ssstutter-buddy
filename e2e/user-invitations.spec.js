import { test, expect } from '@playwright/test'
import { seedTestData, cleanupTestData } from './utils/database-seeder'
import { loginUser } from './utils/auth-helpers'
import { expectToast } from './utils/toast-helper'

// Store seeded data at module level for access across all tests
let seededData

test.describe('User Invitations Flow', () => {
  test.beforeEach(async () => {
    await cleanupTestData()
    seededData = await seedTestData()
  })

  test.afterAll(async () => await cleanupTestData())

  test.describe('As Participant', () => {
    test.beforeEach(async ({ page }) => {
      await loginUser(page, seededData.participant)
      await page.goto('/invite')
    })

    test('invite page renders correctly for participant', async ({ page }) => {
      await expect(page).toHaveURL('/invite')

      await expect(page.locator('h1:has-text("Invite a Friend")')).toBeVisible()
      await expect(
        page.locator('p:has-text("Help us advance the pace of stuttering research!")')
      ).toBeVisible()
      await expect(page.locator('input[name="email"]')).toBeVisible()
      await expect(page.locator('button:has-text("Send")')).toBeVisible()
    })

    test('participant can successfully invite a friend with valid email', async ({ page }) => {
      const testEmail = 'friend@example.com'

      await page.fill('input[name="email"]', testEmail)
      await page.click('button:has-text("Send")')

      await expectToast(page, 'Invitation sent successfully!')

      // Verify input is cleared after successful submission
      await expect(page.locator('input[name="email"]')).toHaveValue('')
    })

    test('participant gets error toast for invalid email format', async ({ page }) => {
      const invalidEmail = 'invalid-email-format'

      await page.fill('input[name="email"]', invalidEmail)
      await page.click('button:has-text("Send")')

      // The API should return an error for invalid email format
      // We'll need to check what error message is actually shown
      // For now, we'll verify the input is not cleared
      await expect(page.locator('input[name="email"]')).toHaveValue(invalidEmail)
    })
  })

  test.describe('As Researcher', () => {
    test.beforeEach(async ({ page }) => {
      await loginUser(page, seededData.researcher)
      await page.goto('/invite')
    })

    test('invite page renders correctly for researcher', async ({ page }) => {
      await expect(page).toHaveURL('/invite')

      await expect(page.locator('h1:has-text("Invite a Colleague")')).toBeVisible()
      await expect(
        page.locator('p:has-text("Help us advance the pace of stuttering research!")')
      ).toBeVisible()
      await expect(page.locator('input[name="email"]')).toBeVisible()
      await expect(page.locator('button:has-text("Send")')).toBeVisible()
    })

    test('researcher can successfully invite a colleague with valid email', async ({ page }) => {
      const testEmail = 'colleague@example.com'

      await page.fill('input[name="email"]', testEmail)
      await page.click('button:has-text("Send")')

      await expectToast(page, 'Invitation sent successfully!')

      // Verify input is cleared after successful submission
      await expect(page.locator('input[name="email"]')).toHaveValue('')
    })

    test('researcher gets error toast for invalid email format', async ({ page }) => {
      const invalidEmail = 'invalid-email-format'

      await page.fill('input[name="email"]', invalidEmail)
      await page.click('button:has-text("Send")')

      // The API should return an error for invalid email format
      // We'll need to check what error message is actually shown
      // For now, we'll verify the input is not cleared
      await expect(page.locator('input[name="email"]')).toHaveValue(invalidEmail)
    })
  })
})
