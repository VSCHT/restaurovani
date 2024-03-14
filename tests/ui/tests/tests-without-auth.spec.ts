import { test, expect } from "playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });
const url = "https://127.0.0.1:5000";

test("has title", async ({ page }) => {
  await page.goto(url);
  await expect(page).toHaveTitle(
    /Repozitář dokumentace restaurování uměleckých předmětů/
  );
});

test("redirection to login page", async ({ page }) => {
  await page.goto(url);
  await page.getByRole("link", { name: "Přihlásit se" }).click();
  await expect(page).toHaveURL(`${url}/login/`);
});


test("redirection to title page", async ({ page }) => {
  await page.goto(url);
  await page.click('button[aria-label="Návrat na titulní stránku"]');
  await expect(page).toHaveURL(url);
});

test("redirection to create page", async ({ page }) => {
  await page.goto(`${url}/objekty`);
  await page.getByRole("button", { name: "Nový předmět" }).click();
  await expect(page).toHaveURL(`${url}/login/?next=%2Fobjekty%2F_new`);
});

