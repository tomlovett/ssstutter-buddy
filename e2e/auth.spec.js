import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

import { seedTestData, cleanupTestData } from './utils/database-seeder'
import { loginUser, signupNewUser, selectRole } from './utils/auth-helpers'
import {
  setLocationAndSave,
  expectLocationDisplay,
} from './utils/location-tool-helper'

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

  // TODO: Request reset password

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
      faker.date
        .birthdate({ min: 18, max: 85, mode: 'age' })
        .toISOString()
        .split('T')[0]
    )

    const gender = faker.helpers.arrayElement(['m', 'f'])

    await page.locator('form button[role="combobox"]').first().click()

    await page.waitForSelector('[role="listbox"]', {
      state: 'visible',
      timeout: 5000,
    })
    const optionText = gender === 'm' ? 'Male' : 'Female'
    await page.click(
      `[role="listbox"] [role="option"]:has-text("${optionText}")`
    )

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
    await page.fill(
      'input[name="university_profile_url"]',
      faker.internet.url()
    )
    await page.fill('textarea[name="bio"]', faker.lorem.paragraph())

    await page.click('button[type="submit"]')

    // await page.waitForSelector('div[role="alert"]', { state: 'visible' })
    // await expect(page.locator('div[role="alert"]')).toHaveText(/success/i)

    // Is not on edit page, but regex does not verify that
    await expect(page).toHaveURL(/\/r\/researchers\/\d+/)
    // await expect(page).not.toHaveURL(/\/r\/researchers\/\d+\/edit/)
  })
})
