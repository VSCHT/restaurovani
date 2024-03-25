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

  await Promise.all([
    page.waitForSelector(
      "#metadata\\.restorationWork\\.restorer-error-message",
      { visible: true }
    ),
    page.waitForSelector(
      "#metadata\\.restorationObject\\.title-error-message",
      { visible: true }
    ),
  ]);

  const isRestorerErrorMessageVisible = await page.isVisible(
    "#metadata\\.restorationWork\\.restorer-error-message"
  );
  const isTitleErrorMessageVisible = await page.isVisible(
    "#metadata\\.restorationObject\\.title-error-message"
  );

  expect(isRestorerErrorMessageVisible).toBe(true);
  expect(isTitleErrorMessageVisible).toBe(true);
});


test("successful form submit", async ({ page, request }) => {
  try {
    await page.goto(`${url}objekty/_new`);

    await page.getByLabel("Název").fill("test");
    await page.getByLabel("Restauroval(a)").fill("test");
    await page.getByText("Kovy").click();

    await page.route("**/*", (route) => {
      if (route.request().isNavigationRequest()) {
        route.abort();
      } else {
        route.continue();
      }
    });
    const response = await page.waitForResponse(
      (response) =>
        response.url().includes("/api/objects") && response.status() === 201
    );

    await page.getByLabel("tlacitko vytvoreni predmetu").click();

    const responseBody = await response.body();
    const responseData = JSON.parse(responseBody.toString());
    const responseID = responseData.id;

    const expectedURL = `${url}objects/${responseID}/edit`;
    expect(page.url()).toBe(expectedURL);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});
