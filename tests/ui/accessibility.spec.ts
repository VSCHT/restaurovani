import { test, expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright'; 

const url = "https://127.0.0.1:5000/";

test.describe('homepage', () => { 
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto(url); 

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 

    expect(accessibilityScanResults.violations).toEqual([]); 
  });
});

test.describe('search', () => { 
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto(`${url}/objekty`); 

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 

    expect(accessibilityScanResults.violations).toEqual([]); 
  });
});

test.describe('detail', () => { 
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    const response = await request.get(
      `https://127.0.0.1:5000/api/user/objects/?q=&sort=newest&page=2&size=10`
    );

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.body();
    const responseData = JSON.parse(responseBody.toString());
    const responseID = responseData.hits.hits[4].id;

    await page.goto(`${url}objekty/${responseID}/edit`);

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 

    expect(accessibilityScanResults.violations).toEqual([]); 
  });
});

test.describe('create', () => { 
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto(`${url}/objekty/_new`); 

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 

    expect(accessibilityScanResults.violations).toEqual([]); 
  });
});