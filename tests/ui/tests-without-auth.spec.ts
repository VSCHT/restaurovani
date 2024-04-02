import { test, expect } from "playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(
    /Repozitář dokumentace restaurování uměleckých předmětů/
  );
});

test("redirection to login page", async ({ page }) => {
  await page.goto("/");
  await page.locator(".right.menu a").click();
  await expect(page).toHaveURL(`/login/`);
});

test("redirection to title page", async ({ page, baseURL }) => {
  await page.goto("/objekty");
  const button = page.locator(".ui.menu.top.fixed a").first();
  await button.click();
  await expect(page).toHaveURL(`${baseURL}`);
});

test("redirection to create page", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}objekty`);
  await page.locator(".aside .ui.secondary.button").click();
  await expect(page).toHaveURL(`${baseURL}login/?next=%2Fobjekty%2F_new`);
});

test("burger menu visibility", async ({ page }) => {
  await expect(page.locator(".item .toggle-burger")).toBeHidden();
});

test("falsy search", async ({ page }) => {
  await page.goto("/objekty");
  const response = await page.waitForResponse((response) =>
    response.url().includes("/api/user/objects")
  );

  const responseData = await response.json();
  expect(responseData).toStrictEqual({
    message: "Permission denied.",
    status: 403,
  });
});
