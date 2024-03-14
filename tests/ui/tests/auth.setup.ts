import { test as setup, expect } from 'playwright/test';

const authFile = 'playwright/.auth/user.json';
const url = "https://127.0.0.1:5000";

setup('authenticate', async ({ page }) => {
  await page.goto(`${url}/login`);
  await page.getByPlaceholder('Email Address').fill('makisheva@cesnet.cz');
  await page.getByPlaceholder('Password').fill('cesnet1');
  await page.getByRole('button', { name: 'Log in' }).click();
  
  await page.waitForURL(url);


  await page.context().storageState({ path: authFile });
});