import { test, expect, devices } from 'playwright/test';


test('burger menu visibility', async ({ 
    browser
 }) => {
    const page = await browser.newPage();
  await page.setViewportSize({ width: 600, height: 600 });
  await page.goto('https://127.0.0.1:5000');
  await expect(page.locator('.item.toggle-burger').first()).toBeVisible();
 
})

test('top menu content visibility', async ({ 
    browser
 }) => {
    const page = await browser.newPage();
  await page.setViewportSize({ width: 600, height: 600 });
  await page.goto('https://127.0.0.1:5000');
  await expect(page.getByRole("button", { name: "RESTAUROVÁNÍ VŠCHT" }).locator('.ui.menu.top.fixed')).toBeHidden();
 
})


