import { test, expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright'; 
const call = require("./api-call.spec.ts");


test.describe('homepage', () => { 
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/'); 

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 

    expect(accessibilityScanResults.violations).toEqual([]); 
  });
});

test.describe('search', () => { 
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto(`/objekty`); 

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 

    expect(accessibilityScanResults.violations).toEqual([]); 
  });
});

test.describe('detail', () => { 
  test('should not have any automatically detectable accessibility issues', async ({ page, request, baseURL }) => {
    const responseData = await call(baseURL, request );
    const responseID = responseData.id;

    await page.goto(`${baseURL}objekty/${responseID}/edit`);

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 

    expect(accessibilityScanResults.violations).toEqual([]); 
  });
});

test.describe('create', () => { 
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto(`/objekty/_new`); 

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 

    expect(accessibilityScanResults.violations).toEqual([]); 
  });
});