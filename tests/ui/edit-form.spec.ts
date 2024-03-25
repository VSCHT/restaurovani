import { test, expect, Locator } from "playwright/test";

const url = "https://127.0.0.1:5000/";

test("tree-field visibility", async ({ page, request }) => {
  const response = await request.get(
    `https://127.0.0.1:5000/api/user/objects/?q=&sort=newest&page=2&size=10`
  );

  expect(response.ok()).toBeTruthy();

  const responseBody = await response.body();
  const responseData = JSON.parse(responseBody.toString());
  const responseID = responseData.hits.hits[4].id;

  await page.goto(`${url}objekty/${responseID}/edit`);

  await page.click(`[name='metadata.restorationObject.itemTypes']`);
  await expect(page.locator(".tree-field").first()).toBeVisible();
});

test("tree-field manipulation", async ({ page, request }) => {
  const response = await request.get(
    `https://127.0.0.1:5000/api/user/objects/?q=&sort=newest&page=2&size=10`
  );

  expect(response.ok()).toBeTruthy();

  const responseBody = await response.body();
  const responseData = JSON.parse(responseBody.toString());
  const responseID = responseData.hits.hits[4].id;

  await page.goto(`${url}objekty/${responseID}/edit`);
  

  await page.click(`[name='metadata.restorationObject.itemTypes']`);

  const submitButton = page.locator(
    ".ui.icon.secondary.right.floated.right.labeled.button"
  );

  const choiceButton = page.getByRole("button", { name: "popelnice" });

  await choiceButton.click();
  await submitButton.first().click();

  await expect(page.locator(".tree-field").first()).toBeHidden();
  expect(page.locator("a").filter({ hasText: "popelnice" })).toBeTruthy();
});

test("accordion edit form", async ({ page, request }) => {
  const response = await request.get(
    `https://127.0.0.1:5000/api/user/objects/?q=&sort=newest&page=2&size=10`
  );

  expect(response.ok()).toBeTruthy();

  const responseBody = await response.body();
  const responseData = JSON.parse(responseBody.toString());
  const responseID = responseData.hits.hits[4].id;

  await page.goto(`${url}objekty/${responseID}/edit`);

  await page.getByText("Práce", { exact: true }).click();

  const titleElement = page.locator('div.title:has-text("Práce")');
  const classList = await titleElement.evaluate((element) => element.classList);
  expect(classList).not.toContain("active");
});

test("checkbox edit form", async ({ page, request }) => {
  const response = await request.get(
    `https://127.0.0.1:5000/api/user/objects/?q=&sort=newest&page=2&size=10`
  );

  expect(response.ok()).toBeTruthy();

  const responseBody = await response.body();
  const responseData = JSON.parse(responseBody.toString());
  const responseID = responseData.hits.hits[4].id;

  await page.goto(`${url}objekty/${responseID}/edit`);

  const checkbox = page.locator(
    'div > input[name="metadata.restorationObject.archeologic"]'
  );

  await page.waitForTimeout(500);

  const initialState = await checkbox.evaluate((element) => element.checked);

  if (initialState) {
    await checkbox.click({ force: true });
    const clickedState = await checkbox.evaluate((element) => element.checked);
    expect(clickedState).toBeFalsy();
  } else {
    await checkbox.click({ force: true });
    const clickedState = await checkbox.evaluate((element) => element.checked);
    expect(clickedState).toBeTruthy();
  }
});


test("redirection to detail page after edit form", async ({
  page,
  request,
}) => {
  try {
    const response = await request.get(
      `https://127.0.0.1:5000/api/user/objects/?q=&sort=newest&page=2&size=10`
    );

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.body();
    const responseData = JSON.parse(responseBody.toString());
    const responseID = responseData.hits.hits[4].id;

    await page.goto(`${url}objekty/${responseID}/edit`);
    const pagenav = page.waitForNavigation({ waitUntil: "networkidle" });
    await page.getByLabel("tlacitko vytvoreni predmetu").click();
    await pagenav;

    const expectedURL = `${url}objekty/${responseID}`;

    expect(page.url()).toBe(expectedURL);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});
