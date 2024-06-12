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

test("get error on unfilled form", async ({ page }) => {
  await page.goto(`/objekty/_new`);

  await page.getByTestId("submit-button").click();

  await Promise.all([
    page.waitForSelector("#metadata.restorationWork.restorer-error-message", {
      visible: true,
    }),
    page.waitForSelector("#metadata.restorationObject.title-error-message", {
      visible: true,
    }),
  ]);

  const isRestorerErrorMessageVisible = await page.isVisible(
    "#metadata.restorationWork.restorer-error-message"
  );
  const isTitleErrorMessageVisible = await page.isVisible(
    "#metadata.restorationObject.title-error-message"
  );

  expect(isRestorerErrorMessageVisible).toBe(true);
  expect(isTitleErrorMessageVisible).toBe(true);
});

test("successful form submit", async ({ page }) => {
  try {
    await page.goto(`/objekty/_new`);

    await page
      .locator(`[name='metadata.restorationObject.title']`)
      .fill("test");
    await page
      .locator(`[name='metadata.restorationWork.restorer']`)
      .fill("test");

    const parentSelector =
      '.field:has(input[name="metadata.restorationObject.category"])';

    const labels = await page.$$(`${parentSelector} label`);

    const randomIndex = Math.floor(Math.random() * labels.length);
    const labelToClick = labels[randomIndex];
    await labelToClick.click();

    const pagenav = page.waitForNavigation({ waitUntil: "networkidle" });
    await page.getByTestId("submit-button").click();

    await pagenav;

    expect(page.url().includes("edit")).toBeTruthy();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});
