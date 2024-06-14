import { test, expect } from "playwright/test";

test("has title", async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(
    /Repozitář dokumentace restaurování uměleckých předmětů/
  );
});

test("search and check URL", async ({ page, baseURL }) => {
  await page.goto('/');
  await page.locator(`.pusher .ui.input[name='q']`).fill("sklo");
  await page.locator(`.pusher .ui.input[name='q']`).press("Enter");
  await expect(page).toHaveURL(`${baseURL}objekty/?q=sklo`);
});
