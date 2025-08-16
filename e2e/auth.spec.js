import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

import { seedTestData, cleanupTestData } from './utils/database-seeder'
import { loginUser, signupNewUser, selectRole } from './utils/auth-helpers'
import { setLocationAndSave, expectLocationDisplay } from './utils/location-tool-helper'
import { searchEmailForString } from './utils/letter-opener'
import { expectToast } from './utils/toast-helper'

test.describe('Authentication Flow', () => {
  test.afterAll(async () => await cleanupTestData())

  test('participant can log in with existing account', async ({ page }) => {
    const { participant } = await seedTestData()

    await loginUser(page, participant)

    await expect(page).toHaveURL('/p')
  })

  test('researcher can log in with existing account', async ({ page }) => {
    const { researcher } = await seedTestData()

    await loginUser(page, researcher)

    await expect(page).toHaveURL('/r')
  })

  test('user can sign up as a participant', async ({ page }) => {
    // Navigate to signup page
    await page.goto('/signup')

    await signupNewUser(page)
    await selectRole(page, 'participant')

    // Should redirect to participant setup
    await expect(page).toHaveURL(/\/p\/participants\/\d+\/edit/)

    // Fill out participant form
    await page.fill('input[name="codename"]', faker.lorem.words(3))
    await page.fill(
      'input[name="birthdate"]',
      faker.date.birthdate({ min: 18, max: 85, mode: 'age' }).toISOString().split('T')[0]
    )

    const gender = faker.helpers.arrayElement(['m', 'f'])

    await page.locator('form button[role="combobox"]').first().click()

    await page.waitForSelector('[role="listbox"]', {
      state: 'visible',
      timeout: 5000,
    })
    const optionText = gender === 'm' ? 'Male' : 'Female'
    await page.click(`[role="listbox"] [role="option"]:has-text("${optionText}")`)

    await setLocationAndSave(page, {
      country: 'United States',
      state: 'Maryland',
      city: 'Baltimore',
    })
    await expectLocationDisplay(page, 'Baltimore, MD, US')

    await page.click('button[type="submit"]')

    // await page.waitForSelector('div[role="alert"]', { state: 'visible' })
    // await expect(page.locator('div[role="alert"]')).toHaveText(/success/i)

    // Is not on edit page, but regex does not verify that
    await expect(page).toHaveURL(/\/p\/participants\/\d+/)
    await expect(page).not.toHaveURL(/\/p\/participants\/\d+\/edit/)
  })

  test('user can sign up as a researcher', async ({ page }) => {
    await page.goto('/signup')

    await signupNewUser(page)
    await selectRole(page, 'researcher')

    await expect(page).toHaveURL(/\/r\/researchers\/\d+\/edit/)

    await page.fill('input[name="institution"]', faker.company.name())
    await page.fill('input[name="university_profile_url"]', faker.internet.url())
    await page.fill('textarea[name="bio"]', faker.lorem.paragraph())

    await page.click('button[type="submit"]')

    // await page.waitForSelector('div[role="alert"]', { state: 'visible' })
    // await expect(page.locator('div[role="alert"]')).toHaveText(/success/i)

    // Is not on edit page, but regex does not verify that
    await expect(page).toHaveURL(/\/r\/researchers\/\d+/)
    // await expect(page).not.toHaveURL(/\/r\/researchers\/\d+\/edit/)
  })

  test('user can use forgot password flow', async ({ page }) => {
    const { participant } = await seedTestData()

    await page.goto('/login')
    await page.click('a[href="/forgot-password"]')
    await expect(page).toHaveURL('/forgot-password')

    await page.fill('input[name="email"]', participant.email)
    await page.click('button[type="submit"]')

    await expectToast(page, 'If an account exists with this email, you will receive login instructions.')
    await page.waitForTimeout(1000)

    const activation_pin = await searchEmailForString('reset-password\\?pin=(\\d{6})')

    if (!activation_pin) {
      throw new Error('No activation pin found - forgot password flow may not have completed')
    }

    // simulate clicking on reset link in email with the actual pin
    await page.goto(`/reset-password?pin=${activation_pin}`)
    await expect(page).toHaveURL(/\/change-password/)

    await page.fill('input[name="password"]', 'newpassword')
    await page.fill('input[name="password_confirmation"]', 'newpassword')
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/p')

    await page.click('a:has-text("Logout")')

    await expect(page).toHaveURL('/login')

    // Login with the new password
    await page.fill('input[name="email"]', participant.email)
    await page.fill('input[name="password"]', 'newpassword')
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/p')
  })
})
