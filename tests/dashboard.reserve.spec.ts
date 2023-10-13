import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByLabel('Username').fill('minhnguyen_2024');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('pass');
  await page.getByLabel('Password').press('Enter')
});


test('able to access reserve calendar', async ({ page }) => {
  await page.locator('li').filter({ hasText: 'Reserve a Study Room' }).click();
  await page.locator('.w-full > form > .inline-flex').first().click();
  await expect(page).toHaveURL("http://localhost:3000/dashboard/1")
});


test('able to use filter by room amenities', async ({ page }) => {
  await page.getByRole('link', { name: 'Reserve a Study Room' }).click();
  await page.locator('div:nth-child(2) > div:nth-child(3) > .border > div > form > .inline-flex').click();
  await page.locator('#reservable').check();
  await page.locator('#power').check();
  await page.getByRole('button', { name: 'Filter' }).click();
  await expect(page.getByRole("table")).toContainText("Power")
  await expect(page.getByRole("table")).toContainText("Reservable")
});


test('able to use confirm study room', async ({ page }) => {
  await page.getByRole('link', { name: 'Reserve a Study Room' }).click();
  await page.locator('div:nth-child(2) > div:nth-child(3) > .border > div > form > .inline-flex').click();
  await page.locator('#reservable').check();
  await page.locator('#power').check();
  await page.getByRole('button', { name: 'Filter' }).click();
  await expect(page.getByRole("table")).toContainText("Power")
  await expect(page.getByRole("table")).toContainText("Reservable")
  await page.getByRole('row', { name: '10 Accessible, Power, Reservable, Soft-seating, Table and Chairs, Monitor,' }).getByRole('radio').check();
  await page.getByRole('button', { name: 'Confirm' }).click();
});





