import { test, expect } from '@playwright/test';

test.describe('authentication', () =>{
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
    });
    
    test('login page', async ({ page }) => {
        await expect(page).toHaveTitle(/Authentication/);
        await expect(page).toHaveURL("http://localhost:3000/login?redirectTo=%2F")
      });
    
    test('auth normal path', async ({ page }) => {
        await page.getByLabel('Username').click();
        await page.getByLabel('Username').fill('minhnguyen_2024');
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('pass');
        await page.getByRole('button', { name: 'Log in' }).click();
        await expect(page).toHaveURL('http://localhost:3000/dashboard')
    });

    test('auth correct username wrong password', async ({ page }) => {
        await page.getByLabel('Username').click();
        await page.getByLabel('Username').fill('minhnguyen_2024');
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('incorrectPassword');
        await page.getByRole('button', { name: 'Log in' }).click();
        await expect(page).toHaveURL('http://localhost:3000/login?redirectTo=%2F')
    });

    test('auth wrong username correct password', async ({ page }) => {
        await page.getByLabel('Username').click();
        await page.getByLabel('Username').fill('minhnguyen_2023');
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('pass');
        await page.getByRole('button', { name: 'Log in' }).click();
        await expect(page).toHaveURL('http://localhost:3000/login?redirectTo=%2F')
    });

    test('auth wrong username wrong password', async ({ page }) => {
        await page.getByLabel('Username').click();
        await page.getByLabel('Username').fill('minhnguyen_2023');
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('wrongPass');
        await page.getByRole('button', { name: 'Log in' }).click();
        await expect(page).toHaveURL('http://localhost:3000/login?redirectTo=%2F')
    });

    test('accessing /dashboard without cookie', async ({ page }) => {
        await page.goto('http://localhost:3000/dashboard');
        await expect(page).toHaveURL('http://localhost:3000/login?redirectTo=%2Fdashboard')
    });

    test('accessing /dashboard/reserve without cookie', async ({ page }) => {
        await page.goto('http://localhost:3000/dashboard/reserve');
        await expect(page).toHaveURL('http://localhost:3000/login?redirectTo=%2Fdashboard%2Freserve')
    });

})