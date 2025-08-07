import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

const PASSWORD = 'password123'
const E2E_EMAIL_PREFIX = 'e2e_1658498146584'

export const loginUser = async (page, userData) => {
  await page.goto('/login')
  await page.fill('input[name="email"]', userData.email)
  await page.fill('input[name="password"]', PASSWORD)
  await page.click('button[type="submit"]')

  await expect(page).toHaveURL(/.*\/(p|r)$/)
}

export const signupNewUser = async (page, userData = {}) => {
  await page.goto('/signup')
  await page.fill('input[name="firstName"]', userData.firstName || faker.person.firstName())
  await page.fill('input[name="lastName"]', userData.lastName || faker.person.lastName())
  await page.fill('input[name="email"]', userData.email || `${E2E_EMAIL_PREFIX}_${faker.internet.email()}`)
  await page.fill('input[name="password"]', PASSWORD)
  await page.fill('input[name="passwordConfirmation"]', PASSWORD)
  await page.click('button[type="submit"]')
}

export const selectRole = async (page, role) => {
  await page.click(`button:has-text("${role.charAt(0).toUpperCase() + role.slice(1)}")`)
  await page.click('button:has-text("Next")')
}

export const logout = async page => {
  await page.click('button:has-text("Logout")')
  await expect(page).toHaveURL('/')
}
