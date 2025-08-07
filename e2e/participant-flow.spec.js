import { test, expect } from '@playwright/test'
import { seedTestData, cleanupTestData } from './utils/database-seeder'
import { loginUser } from './utils/auth-helpers'
import { expectToast } from './utils/toast-helper'
import {
  openLocationTool,
  setCountry,
  clearCountry,
  setState,
  clearState,
  setCity,
  clearCity,
  saveLocation,
  expectLocationDisplay,
} from './utils/location-tool-helper'

// Store seeded data at module level for access across all tests
let seededData

test.describe('Participant Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await cleanupTestData()

    seededData = await seedTestData()

    await loginUser(page, seededData.participant)
  })
  test.afterAll(async () => await cleanupTestData())

  test('participant can view and edit profile', async ({ page }) => {
    await expect(page).toHaveURL('/p')

    const { participant } = seededData

    await page.click('a:has-text("My profile")')

    await expect(page).toHaveURL(`/p/participants/${participant.id}`)

    await expect(page.locator('h3:has-text("Your Participant Profile")')).toBeVisible()
    await expect(page.locator('p:has-text("Test Participant")')).toBeVisible()
    await expect(page.locator('span:has-text("@TestParticipant")')).toBeVisible()
    await expect(page.locator('li:has-text("Birthday:")')).toBeVisible()
    await expect(page.locator('li:has-text("1990")')).toBeVisible()

    await page.click('a:has-text("Edit Profile")')

    await expect(page).toHaveURL(`/p/participants/${participant.id}/edit`)

    await page.fill('input[name="codename"]', 'UpdatedCodename')

    await page.click('button[type="submit"]')

    await page.waitForTimeout(1000)
    await expectToast(page, 'Success!')

    await expect(page).toHaveURL(`/p/participants/${participant.id}`)

    await expect(page.locator('span:has-text("@UpdatedCodename")')).toBeVisible()
  })

  test('participant can edit location using LocationTool', async ({ page }) => {
    const { participant } = seededData

    await page.click('a:has-text("My profile")')
    await expect(page).toHaveURL(`/p/participants/${participant.id}`)

    await page.click('a:has-text("Edit Profile")')
    await expect(page).toHaveURL(`/p/participants/${participant.id}/edit`)

    await openLocationTool(page)

    await setCountry(page, 'United States')
    await page.waitForTimeout(500)
    await clearCountry(page)
    await page.waitForTimeout(500)
    await setCountry(page, 'United States')

    await page.waitForTimeout(500)
    await setState(page, 'Maryland')
    await page.waitForTimeout(500)
    await clearState(page)
    await page.waitForTimeout(500)
    await setState(page, 'Maryland')

    await setCity(page, 'Baltimore')
    await page.waitForTimeout(500)
    await clearCity(page)
    await page.waitForTimeout(500)
    await setCity(page, 'Baltimore')
    await page.waitForTimeout(500)

    await saveLocation(page)

    await expectLocationDisplay(page, 'Baltimore, MD, US')
  })

  test('participant can view digital studies', async ({ page }) => {
    await page.click('a:has-text("Digital Studies")')

    await expect(page).toHaveURL('/p/digital-studies')

    await expect(page.locator('h3:has-text("Digital-Friendly Studies")')).toBeVisible()

    // Table headers
    await expect(page.locator('th').filter({ hasText: 'Study Name' })).toBeVisible()
    await expect(page.locator('th').filter({ hasText: 'Methodologies' })).toBeVisible()
    await expect(page.locator('th').filter({ hasText: 'Age Range' })).toBeVisible()
    await expect(page.locator('th').filter({ hasText: 'Estimated Commitment' })).toBeVisible()
    await expect(page.locator('th').filter({ hasText: 'Location' })).toBeVisible()
    await expect(page.locator('th').filter({ hasText: 'Posted' })).toBeVisible()

    // Verify presence of digital study we created in seed data
    await expect(page.locator('td').filter({ hasText: 'Digital Survey Study' })).toBeVisible()
    await expect(page.locator('td').filter({ hasText: '18-65' })).toBeVisible()
    await expect(page.locator('td').filter({ hasText: '2 hours in one session' })).toBeVisible()

    await page.locator('tr').filter({ hasText: 'Digital Survey Study' }).click()

    await expect(page).toHaveURL(/\/p\/studies\/\d+/)

    await expect(page.locator('h3.text-2xl.font-bold')).toContainText('Digital Survey Study')
  })

  test('participant can express interest in study', async ({ page }) => {
    const { studies } = seededData

    const digitalStudy = studies.find(study => study.title === 'Digital Survey Study')
    await page.goto(`/p/studies/${digitalStudy.id}`)

    await expect(page.locator('h3.text-2xl.font-bold')).toContainText(digitalStudy.title)

    await page.click('button:has-text("Express Interest")')

    await expect(page.locator('h2:has-text("Confirm your interest")')).toBeVisible()

    await page.click('button:has-text("Cancel")')

    await page.click('button:has-text("Express Interest")')

    await page.click('button:has-text("Confirm")')

    // toast success
    // await expect(page.locator('div[role="alert"]:has-text("Success!")')).toBeVisible()

    await expect(page).toHaveURL(`/p/studies/${digitalStudy.id}`)

    // expect connected to be visible and disabled
    await expect(page.locator('button:has-text("Connected")')).toBeDisabled()
  })

  test('participant can reject interest in study', async ({ page }) => {
    const { studies } = seededData

    const digitalStudy = studies.find(study => study.title === 'Digital Survey Study')
    await page.goto(`/p/studies/${digitalStudy.id}`)

    await expect(page.locator('h3.text-2xl.font-bold')).toContainText(digitalStudy.title)
    await page.click('button:has-text("Not Interested")')

    await expect(page.locator('h2:has-text("Is this study not a good fit for you?")')).toBeVisible()

    await page.click('button:has-text("Cancel")')
    await page.click('button:has-text("Not Interested")')
    await page.fill('textarea[name="status_explanation"]', 'This study is not a good fit for me.')
    await page.click('button:has-text("Confirm")')

    // toast success
    // await expect(page.locator('div[role="alert"]:has-text("Success!")')).toBeVisible()

    await expect(page).toHaveURL(`/p/studies/${digitalStudy.id}`)
    await expect(
      page.locator('p:has-text("You declined interest in this study. Change your mind?")')
    ).toBeVisible()

    await expect(page.locator('button:has-text("Express Interest")')).toBeVisible()

    await page.click('button:has-text("Express Interest")')
    await page.click('button:has-text("Confirm")')

    // toast success
    // await expect(page.locator('div[role="alert"]:has-text("Success!")')).toBeVisible()

    await expect(page).toHaveURL(`/p/studies/${digitalStudy.id}`)

    await page.waitForTimeout(1000)

    await expect(page.locator('button:has-text("Connected")')).toBeDisabled()
  })
})
