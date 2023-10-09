import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/login?redirectTo=%2F');
  await page.getByLabel('Username').fill('minhnguyen_2024');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('pass');
  await page.getByLabel('Password').press('Enter');
  await page.getByRole('link', { name: 'Reserve a Study Room' }).click();
  await page.locator('div:nth-child(2) > div:nth-child(3) > .border > div > form > .inline-flex').click();
  await page.locator('#reservable').check();
  await page.locator('#power').check();
  await page.getByRole('button', { name: 'Filter' }).click();
  await page.getByRole('row', { name: '10 Accessible, Power, Reservable, Soft-seating, Table and Chairs, Monitor,' }).getByRole('radio').check();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('link', { name: 'Check Reservation Status' }).click();
  await page.getByRole('button', { name: 'Cancel Reservation' }).click();
  await page.locator('div:nth-child(3) > div:nth-child(4) > .border > div > form > .inline-flex').click();
  await page.locator('#monitor').check();
  await page.locator('#whiteboard').check();
  await page.getByRole('button', { name: 'Filter' }).click();
  await page.locator('td').nth(2).click();
  await page.getByRole('radio').check();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('link', { name: 'Check Reservation Status' }).click();
});