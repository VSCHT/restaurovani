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
  await page.waitForSelector(
    "#metadata.restorationWork.restorer-error-message"
  );
  await page.waitForSelector("#metadata.restorationObject.title-error-message");

  expect(
    await page.isVisible("#metadata.restorationWork.restorer-error-message")
  ).toBe(true);
  expect(
    await page.isVisible("#metadata.restorationObject.title-error-message")
  ).toBe(true);
});

test("successful form submit", async ({ page, request }) => {
  try {
    const response = await request.post(`https://127.0.0.1:5000/api/objects`, {
      data: {
        files: { enabled: true },
        metadata: {
          restorationObject: { category: "keramika", title: "test" },
          restorationWork: { restorer: "test" },
        },
      },
    });

    expect(response.ok()).toBeTruthy();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});

test("successful form submit 2", async ({ page, request }) => {
  try {
    await page.goto(`${url}objekty/_new`);

    await page.getByLabel("Název").fill("test");
    await page.getByLabel("Restauroval(a)").fill("test");
    await page.getByText("Kovy").click();

    await page.getByLabel("tlacitko vytvoreni predmetu").click();

    const response = await Promise.all([
      page.waitForResponse(
        (resp) => resp.url().includes("/api/objects") && resp.status() === 201
      ),
      page.waitForNavigation({ waitUntil: "networkidle" }),
    ]);

    console.log(response);

    const responseBody = await response.body();
    const responseData = JSON.parse(responseBody.toString());
    const responseID = responseData.id;

    const expectedURL = `${url}objekty/${responseID}/edit`;
    expect(page.url()).toBe(expectedURL);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});


