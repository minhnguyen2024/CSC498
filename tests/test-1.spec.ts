import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/login?redirectTo=%2F');
  await page.getByLabel('Username').fill('minhnguyen_2024');
  await page.getByText('UsernamePasswordLog in').click();
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('pass');
  await page.getByLabel('Password').press('Enter');

  await expect(page).toHaveURL("http://localhost:3000/dashboard")

  await page.getByRole('link', { name: 'Reserve a Study Room' }).click();
  await expect(page).toHaveURL("http://localhost:3000/dashboard/reserve")

  await page.locator('.w-full > form > .inline-flex').first().click();

  await page.getByRole('button', { name: 'Confirm' }).click();

  await expect(page).toHaveURL("http://localhost:3000/dashboard/reservationStatus")
});