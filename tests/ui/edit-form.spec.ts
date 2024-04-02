import { test, expect } from "playwright/test";

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

test("tree-field manipulation 2", async ({ page, request }) => {
  const response = await request.get(
    `https://127.0.0.1:5000/api/user/objects/?q=&sort=newest&page=2&size=10`
  );

  expect(response.ok()).toBeTruthy();

  const responseBody = await response.body();
  const responseData = JSON.parse(responseBody.toString());
  const responseID = responseData.hits.hits[4].id;

  await page.goto(`${url}objekty/${responseID}/edit`);
  await page
    .locator(
      "div:nth-child(4) > .content > div > div > div:nth-child(3) > .field > div"
    )
    .click();
  await page.getByRole("button", { name: "keramika" }).click();
  await page.getByRole("button", { name: "keramika" }).press("ArrowDown");
  await page.getByRole("button", { name: "keramika" }).press("ArrowDown");
  await page.getByRole("button", { name: "keramika" }).press("ArrowRight");
  await page.getByRole("button", { name: "keramika" }).press("ArrowDown");
  await page.getByRole("button", { name: "keramika" }).press("Enter");

  await expect(
    page.getByText("draselno-vápenaté sklosklo").nth(4)
  ).toBeVisible();

  const parentCheckbox = page.locator(
    ".ui.modal div:nth-child(2) > div:nth-child(3) > div"
  );

  await page.waitForTimeout(500);

  const classList = await parentCheckbox.evaluate((element) =>
    element.classList.contains("indeterminate")
  );

  expect(classList).toBeTruthy();

  await parentCheckbox.click();

  expect(
    await parentCheckbox.evaluate((element) =>
      element.classList.contains("checked")
    )
  ).toBeTruthy();

  await expect(
    page.getByText("draselno-vápenaté sklosklo").nth(4)
  ).toBeHidden();
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
  const classList = await titleElement.evaluate((element) =>
    element.classList.contains("active")
  );
  expect(classList).toBeFalsy();
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

test("date error 1", async ({ page, request }) => {
  try {
    const response = await request.get(
      `https://127.0.0.1:5000/api/user/objects/?q=&sort=newest&page=2&size=10`
    );

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.body();
    const responseData = JSON.parse(responseBody.toString());
    const responseID = responseData.hits.hits[4].id;

    await page.goto(`${url}objekty/${responseID}/edit`);

    await page.getByLabel("Datace od").click();
    await page.getByLabel("Datace od").fill("-10000000");
    await page.getByLabel("Datace do").click();
    await page.getByLabel("Datace do").fill("-100");
    await page.getByLabel("tlacitko vytvoreni predmetu").click();

    await expect(page.getByText("Příliš velké datum")).toBeVisible();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});

test("date error 2", async ({ page, request }) => {
  try {
    const response = await request.get(
      `https://127.0.0.1:5000/api/user/objects/?q=&sort=newest&page=2&size=10`
    );

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.body();
    const responseData = JSON.parse(responseBody.toString());
    const responseID = responseData.hits.hits[4].id;

    await page.goto(`${url}objekty/${responseID}/edit`);

    await page.getByLabel("Datace od").click();
    await page.getByLabel("Datace od").fill("-100");
    await page.getByLabel("Datace do").click();
    await page.getByLabel("Datace do").fill("-1000");
    await page.getByLabel("tlacitko vytvoreni predmetu").click();

    await expect(
      page.locator(
        '[id="metadata\\.restorationObject\\.creationPeriod\\.until-error-message"]'
      )
    ).toBeVisible();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});

test("valid num", async ({ page, request }) => {
  try {
    const response = await request.get(
      `https://127.0.0.1:5000/api/user/objects/?q=&sort=newest&page=2&size=10`
    );

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.body();
    const responseData = JSON.parse(responseBody.toString());
    const responseID = responseData.hits.hits[4].id;

    await page.goto(`${url}objekty/${responseID}/edit`);
    await page
      .locator(
        '[id="metadata\\.restorationObject\\.dimensions\\[0\\]\\.value"]'
      )
      .click();
    await page
      .locator(
        '[id="metadata\\.restorationObject\\.dimensions\\[0\\]\\.value"]'
      )
      .fill("447e");
    await page.getByLabel("tlacitko vytvoreni predmetu").click();

    await expect(page.getByText("Musí byt číslo")).toBeVisible();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});

test("array field", async ({ page, request }) => {
  try {
    const response = await request.get(
      `https://127.0.0.1:5000/api/user/objects/?q=&sort=newest&page=2&size=10`
    );

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.body();
    const responseData = JSON.parse(responseBody.toString());
    const responseID = responseData.hits.hits[4].id;

    await page.goto(`${url}objekty/${responseID}/edit`);

    await page.getByRole("button", { name: "Přidat vedoucího" }).click();
    await expect(
      page.locator(
        '[id="metadata\\.restorationWork\\.supervisors\\[2\\]\\.fullName"]'
      )
    ).toBeVisible();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});

test("successful edit form submit", async ({ page, request }) => {
  try {
    const response = await request.get(
      `https://127.0.0.1:5000/api/user/objects/?q=&sort=newest&page=2&size=10`
    );

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.body();
    const responseData = JSON.parse(responseBody.toString());
    const responseID = responseData.hits.hits[4].id;

    await page.goto(`${url}objekty/${responseID}/edit`);

    await page.getByLabel("Datace od").click();
    await page.getByLabel("Datace od").fill("-100");
    await page.getByLabel("Datace do").click();
    await page.getByLabel("Datace do").fill("-10");
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
