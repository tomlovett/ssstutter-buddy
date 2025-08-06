import { test, expect } from '@playwright/test'
import { seedTestData, cleanupTestData } from './utils/database-seeder'
import { loginUser } from './utils/auth-helpers'
import { expectToast } from './utils/toast-helper'

// Store seeded data at module level for access across all tests
let seededData

test.describe('Researcher Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await cleanupTestData()
    seededData = await seedTestData()

    const { researcher } = seededData
    await loginUser(page, researcher)

    await expect(page).toHaveURL('/r')
  })
  test.afterAll(async () => await cleanupTestData())

  test('researcher can create a new study', async ({ page }) => {
    // Navigate to studies
    await page.click('a:has-text("Studies")')

    await expect(page).toHaveURL('/r/studies')

    // Click create new study (this opens the modal)
    await page.click('button:has-text("Create Study")')

    // Wait for modal to be visible and check its content
    await expect(page.locator('[role="alertdialog"]')).toBeVisible()
    await expect(page.locator('[role="alertdialog"] h2')).toContainText(
      'Create New Study'
    )
    await expect(page.locator('input[id="title"]')).toBeVisible()

    await page.fill('input[id="title"]', 'New Test Study')

    // Click the Create Study button inside the modal
    await page
      .locator('[role="alertdialog"] button:has-text("Create Study")')
      .click()

    await expect(page).toHaveURL(/\/r\/studies\/\d+\/edit/)

    await page.fill('input[name="title"]', 'Newer Study Name')
    await page.fill('input[name="short_desc"]', 'A test study description')
    await page.fill(
      'textarea[name="long_desc"]',
      'A detailed test study description'
    )

    // Scroll to the Study timeline section to get to the right area of the page
    const timelineSection = page.locator('p:has-text("Study timeline:")')
    await timelineSection.scrollIntoViewIfNeeded()

    // Fill out the checkboxes at bottom of section
    // Click checkboxes by finding them near their labels
    await page.locator('label:has-text("Genetic Sample Collection")').click()
    await page.locator('label:has-text("Pharmaceutical")').click()
    await page.locator('label:has-text("Speaker Panel")').click()

    // Fill age fields
    await page.fill('input[name="min_age"]', '18')
    await page.fill('input[name="max_age"]', '65')

    // scroll down til "submit" button is visible
    const submitButton = page.locator('button[type="submit"]')
    await submitButton.scrollIntoViewIfNeeded()

    // Fill timeline fields
    await page.fill('input[name="total_hours"]', '2')
    await page.fill('input[name="duration"]', '2 hours')

    // Fill remuneration
    await page.fill('input[name="remuneration"]', '$50')

    // Submit form
    await page.click('button[type="submit"]')

    await expectToast(page, 'Success!')

    await expect(page).toHaveURL(/\/r\/studies\/\d+/)

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(1000)

    await expect(page.locator('input[name="title"]')).toHaveValue(
      'Newer Study Name'
    )

    // save and exit
    // await expect(page.locator('h1')).toContainText('Newer Study Name')
  })

  test('researcher can edit existing study', async ({ page }) => {
    const { studies } = seededData
    const firstStudy = studies[0]

    await page.goto(`/r/studies/${firstStudy.id}`)

    await page.click('a:has-text("Edit")')

    await expect(page).toHaveURL(`/r/studies/${firstStudy.id}/edit`)

    await page.fill('input[name="title"]', 'Updated Study Title')

    await page.click('button[type="submit"]')

    await expect(page).toHaveURL(`/r/studies/${firstStudy.id}`)
  })

  test('researcher can publish draft study that is ready to be published', async ({
    page,
  }) => {
    const { studies } = seededData
    const draftStudy = studies.find(study => study.title === 'Draft Study')

    await page.goto(`/r/studies/${draftStudy.id}/edit`)

    await page.click('button:has-text("Publish")')

    await expectToast(page, 'Success!')

    await expect(page).toHaveURL(`/r/studies/${draftStudy.id}`)
  })

  test('with an active study, researcher can see and manage study participants', async ({
    page,
  }) => {
    const { studies, participant } = seededData
    const activeStudy = studies.find(
      study => study.title === 'Digital Survey Study'
    )

    await page.goto(`/r/studies/${activeStudy.id}`)

    await expect(
      page.locator('h3:has-text("Active Connections")')
    ).toBeVisible()
    await expect(page.locator('h3:has-text("Invitations")')).toBeVisible()
    await expect(
      page.locator('h3:has-text("Completed Connections")')
    ).toBeVisible()
    await expect(
      page.locator('h3:has-text("Declined Connections")')
    ).toBeVisible()

    const activeConnectionsTable = page.locator(
      '[id="active-connections-table"]'
    )
    await expect(activeConnectionsTable).toBeVisible()

    const tableRows = activeConnectionsTable.locator('tbody tr')
    await expect(tableRows).toHaveCount(1) // Should have one row with the participant

    await expect(activeConnectionsTable.locator('td').first()).toContainText(
      `${participant.first_name} ${participant.last_name}`
    )

    const statusDropdown = activeConnectionsTable.locator('[role="combobox"]')
    await expect(statusDropdown).toBeVisible()
    await expect(page.locator('[data-slot="select-value"]')).toContainText(
      'Study began'
    )

    await statusDropdown.click()
    await expect(
      page.locator('[role="option"]:has-text("Study began")')
    ).toBeVisible()
    await page.locator('[role="option"]:has-text("Study completed")').click()

    await expectToast(page, 'Changes saved!')
  })
})
