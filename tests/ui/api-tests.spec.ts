import { test, expect } from "playwright/test";

let apiContext;
const url = "https://127.0.0.1:5000/";

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
  await page.goto(`${url}objekty/?q=&l=list&p=1&s=10&sort=newest`);

  await page
    .getByText("metadata/restorationObject/creationPeriod/since.label")
    .click();
  await page
    .getByRole("list")
    .locator("div")
    .filter({ hasText: "1700" })
    .first()
    .click();

  const response = await page.waitForResponse(
    (response) =>
      response.url().includes("/api/user/objects") && response.status() === 200
  );

  expect(response.ok()).toBeTruthy();
  const responseData = await response.json();

  expect(responseData.hits.total).toBe(4);
});
