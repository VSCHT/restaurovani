import { test, expect } from "playwright/test";

let apiContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: "https://127.0.0.1:5000",
    extraHTTPHeaders: {
      Accept: "application/vnd.inveniordm.v1+json",
      Authorization: `token ${process.env.API_TOKEN}`,
    },
  });
});

test.afterAll(async ({}) => {
  await apiContext.dispose();
});

test("get filtered objects", async ({ page }) => {
  await page.goto("/objekty");

  await page.locator('.title:has-text("category")').click();

  await page
    .locator('input[type="checkbox"][value="keramika"]')
    .click({ force: true });

  const response = await page.waitForResponse((response) =>
    response.url().includes("/api/user/objects")
  );

  expect(response.ok()).toBeTruthy();
  const responseData = await response.json();
  expect(responseData.hits.total).toBe(20);

  expect(
    responseData.hits.hits.every((element) => {
      return element.metadata.restorationObject.category === "keramika";
    })
  ).toBeTruthy();
});
