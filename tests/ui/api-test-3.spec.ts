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

test("get error on unfilled form", async ({ page }) => {
  await page.goto(`${url}objekty/_new`);

  await page.getByLabel("tlacitko vytvoreni predmetu").click();
  expect(await page.getByText("Pole je povinné").isVisible()).toBe(3); //fix
});
