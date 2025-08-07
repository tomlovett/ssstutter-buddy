import { expect } from '@playwright/test'

export const expectToast = async (page, text) =>
  await expect(
    page.locator(`[data-sonner-toast]:has-text("${text}")`)
  ).toBeVisible()
