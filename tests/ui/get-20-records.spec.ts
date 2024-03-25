import { test, expect } from "playwright/test";

let apiContext;
const url = "https://127.0.0.1:5000/";

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
  await page.goto(url);

  await page.getByRole("button", { name: "PROCHÁZET PŘEDMĚTY" }).click();
  await expect(page).toHaveURL(`${url}objekty/?q=&l=list&p=1&s=10&sort=newest`);

  const response = await page.evaluate(() =>
    fetch(`https://127.0.0.1:5000/api/user/objects`).then((res) => res.json())
  );
  expect(response.hits.total).toBe(20);
});
