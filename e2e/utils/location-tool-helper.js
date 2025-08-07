import { expect } from '@playwright/test'

export const openLocationTool = async page => {
  await page.click('button:has-text("Edit Location")')
  await expect(page.locator('[role="alertdialog"]')).toBeVisible()
  await expect(page.locator('[role="alertdialog"]')).toContainText('Location Selection')
}

// Abstraction used for setCountry, setState, setCity
const setComboBoxValue = async (page, testId, value) => {
  const combobox = page.locator(`[data-testid="${testId}"]`)

  // Check if the combobox is disabled
  const isDisabled = (await combobox.getAttribute('disabled')) !== null

  if (isDisabled) {
    // Clear dependent fields first based on the testId
    if (testId === 'country-combobox') {
      // Country is disabled - clear state and city first
      await clearComboBoxValue(page, 'clear-state')
      await clearComboBoxValue(page, 'clear-city')
    } else if (testId === 'state-combobox') {
      // State is disabled - clear city first
      await clearComboBoxValue(page, 'clear-city')
    }
    // Wait a bit for the UI to update
    await page.waitForTimeout(500)
  }

  await combobox.click()
  await page.waitForSelector('[role="listbox"]', {
    state: 'visible',
    timeout: 5000,
  })

  // Clear the input first, then type the exact value
  const input = page.locator('[data-slot="command-input"]')
  await input.clear()
  await input.fill(value)

  // Wait for the specific option to be available and click it
  await page.waitForSelector(`[role="option"]:has-text("${value}")`, {
    state: 'visible',
    timeout: 5000,
  })
  await page.click(`[role="option"]:has-text("${value}")`)
  await page.waitForTimeout(500)
  await expect(combobox).toContainText(value)
}

// Abstraction used for clearCountry, clearState, clearCity
const clearComboBoxValue = async (page, testId) => {
  const clearButton = page.locator(`[data-testid="${testId}"]`)
  if (await clearButton.isVisible()) {
    await clearButton.click()
    await page.waitForTimeout(500)
  }
}

export const setCountry = async (page, countryName) =>
  await setComboBoxValue(page, 'country-combobox', countryName)

export const setState = async (page, stateName) => await setComboBoxValue(page, 'state-combobox', stateName)

export const setCity = async (page, cityName) => await setComboBoxValue(page, 'city-combobox', cityName)

export const clearCountry = async page => await clearComboBoxValue(page, 'clear-country')

export const clearState = async page => await clearComboBoxValue(page, 'clear-state')

export const clearCity = async page => await clearComboBoxValue(page, 'clear-city')

export const saveLocation = async page => {
  await page.click('[role="alertdialog"] button:has-text("Save Changes")')
  await expect(page.locator('[role="alertdialog"]')).not.toBeVisible()
}

export const cancelLocation = async page => {
  await page.click('[role="alertdialog"] button:has-text("Cancel")')
  await expect(page.locator('[role="alertdialog"]')).not.toBeVisible()
}

export const setCompleteLocation = async (page, { country, state, city }) => {
  await openLocationTool(page)

  if (country) {
    await setCountry(page, country)
  }

  if (state) {
    await setState(page, state)
  }

  if (city) {
    await setCity(page, city)
  }
}

export const setLocationAndSave = async (page, { country, state, city }) => {
  await setCompleteLocation(page, { country, state, city })

  await saveLocation(page)
  await page.waitForTimeout(500)
}

// Verifies that the location is displayed correctly in the LocationTool component
export const expectLocationDisplay = async (page, stringToMatch = '') => {
  await expect(page.locator('div.flex.items-center.gap-2.text-gray-600 span')).toContainText(stringToMatch)
}
