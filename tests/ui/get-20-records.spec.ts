import { test, expect } from "playwright/test";

let apiContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: "https://127.0.0.1:5000/",
    extraHTTPHeaders: {
      Accept: "application/vnd.inveniordm.v1+json",
      Authorization: `token ${process.env.API_TOKEN}`,
    },
  });
});

test.afterAll(async ({}) => {
  await apiContext.dispose();
});

test("redirection to search page with 20 records", async ({ page }) => {
  await page.goto("/");

  await page
    .locator('form[role="search"]:not(.sidebar form) .ui.button')
    .click();

  await expect(page.getByTestId("result-item")).toHaveCount(10);

  const resPerPage = page.locator('.computer div[role="listbox"]');

  await resPerPage.click();

  await resPerPage.locator("span", { hasText: "50" }).click();

  await expect(page.getByTestId("result-item")).toHaveCount(20);
});
