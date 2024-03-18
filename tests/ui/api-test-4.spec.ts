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

test("get error on unfilled form", async ({ page, request }) => {
  await page.goto(`https://127.0.0.1:5000/objekty/\_new`);

  const response = await request.post(`https://127.0.0.1:5000/api/objects`, {
    data: {
      files: { enabled: true },
      metadata: {},
    },
  });

  expect(response.ok()).toBeTruthy();
  console.log(response);
});

