import { test, expect } from '@playwright/test';

test.describe('authentication', () =>{
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/');
    });
    
    test('login page', async ({ page }) => {
        await expect(page).toHaveTitle(/Authentication/);
      });
    
    test('auth path', async ({ page }) => {
    await page.getByRole('link', { name: 'Log In' }).click();
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill('minhnguyen_2024');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('pass');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL('http://localhost:3000/dashboard')
    });
    
})