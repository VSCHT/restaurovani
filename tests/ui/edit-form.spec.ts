import { test, expect } from "playwright/test";
const callAPI = require("./api-call.spec.ts");

test("tree-field visibility", async ({ page, request, baseURL }) => {
  const responseData = await callAPI(baseURL, request);
  const responseID = responseData.id;

  await page.goto(`/objekty/${responseID}/edit`);

  await page.click(`[name='metadata.restorationObject.itemTypes']`);
  await expect(page.locator(".tree-field").first()).toBeVisible();
});

test("tree-field manipulation", async ({ page, request, baseURL }) => {
  const responseData = await callAPI(baseURL, request);
  const responseID = responseData.id;

  await page.goto(`/objekty/${responseID}/edit`);

  await page.click(`[name='metadata.restorationObject.itemTypes']`);

  const submitButton = page.locator(
    ".ui.icon.secondary.right.floated.right.labeled.button"
  );

  const numberOfOptions = await page
    .locator(".tree-column.column .row")
    .locator("visible=true")
    .count();
  const randomIndex = await Math.floor(Math.random() * numberOfOptions);

  await page
    .locator(".tree-column .row.spaced")
    .locator("visible=true")
    .nth(randomIndex)
    .dblclick();

  const checkedButtonText = await page
    .locator(".tree-column .row.spaced")
    .locator("visible=true")
    .nth(randomIndex)
    .innerText();

  const breadcrumbText = await page.evaluate(() => {
    const breadcrumb = document.querySelector(".actions .ui.breadcrumb");
    return breadcrumb ? breadcrumb.innerText.trim() : null;
  });

  expect(`${breadcrumbText}:has-text("${checkedButtonText}")`).toBeTruthy();

  await submitButton.first().click();

  await expect(page.locator(".tree-field").first()).toBeHidden();
  expect(
    page.locator("a").filter({ hasText: `${checkedButtonText}` })
  ).toBeTruthy();
});

test("tree-field manipulation 2", async ({ page, request, baseURL }) => {
  const responseData = await callAPI(baseURL, request);
  const responseID = responseData.id;

  await page.goto(`/objekty/${responseID}/edit`);
  await page
    .locator(`[name="metadata.restorationObject.secondaryMaterialTypes"]`)
    .click();
  await page.getByRole("button", { name: "keramika" }).click();
  await page.getByRole("button", { name: "keramika" }).press("ArrowDown");
  await page.getByRole("button", { name: "keramika" }).press("ArrowDown");
  await page.getByRole("button", { name: "keramika" }).press("ArrowRight");

  expect(page.locator(".column.tree-column:nth-child(3)")).toBeVisible();

  await page.getByRole("button", { name: "keramika" }).press("ArrowDown");
  await page.getByRole("button", { name: "keramika" }).press("Enter");

  const checkedButtonText = await page.evaluate(() => {
    const checkedCheckboxContainer = document.querySelector(
      ".row.spaced .ui.checked.fitted.checkbox"
    );
    const buttonText =
      checkedCheckboxContainer?.nextElementSibling?.innerText.trim() ||
      "No text found";
    return buttonText;
  });

  const buttonTextIndeter = await page.evaluate(() => {
    const indeterminateCheckbox = document.querySelector(
      ".ui.indeterminate.fitted.checkbox"
    );
    const buttonNextToCheckbox = indeterminateCheckbox
      .closest(".row")
      .querySelector("button.ui.black.basic.button");
    return buttonNextToCheckbox
      ? buttonNextToCheckbox.innerText.trim()
      : "Button not found";
  });

  const breadcrumbText = await page.evaluate(() => {
    const breadcrumb = document.querySelector(".actions .ui.breadcrumb");
    return breadcrumb ? breadcrumb.innerText.trim() : null;
  });

  const expectedBreadcrumbText = `${checkedButtonText}${buttonTextIndeter}`;
  if (breadcrumbText != expectedBreadcrumbText) {
    throw new Error("Breadcrumb does not match.");
  }

  expect(expectedBreadcrumbText == breadcrumbText).toBeTruthy();
});

test("accordion edit form", async ({ page, request, baseURL }) => {
  const responseData = await callAPI(baseURL, request);
  const responseID = responseData.id;

  await page.goto(`/objekty/${responseID}/edit`);

  await page.locator(".ui.accordion:nth-child(2)").click();

  const titleElement = page.locator(".ui.accordion:nth-child(2) .title");
  const classList = await titleElement.evaluate((element) =>
    element.classList.contains("active")
  );
  expect(classList).toBeTruthy();
});

test("checkbox edit form", async ({ page, request, baseURL }) => {
  const responseData = await callAPI(baseURL, request);
  const responseID = responseData.id;

  await page.goto(`/objekty/${responseID}/edit`);

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

test("date error 1", async ({ page, request, baseURL }) => {
  try {
    const responseData = await callAPI(baseURL, request);
    const responseID = responseData.id;

    await page.goto(`/objekty/${responseID}/edit`);

    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.since']`)
      .click();
    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.since']`)
      .fill("-10000000");
    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.until']`)
      .click();
    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.until']`)
      .fill("-100");
    await page.locator(".ui.primary.button").click();

    await expect(page.getByText("Příliš velké datum")).toBeVisible();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});

test("date error 2", async ({ page, request, baseURL }) => {
  try {
    const responseData = await callAPI(baseURL, request);
    const responseID = responseData.id;

    await page.goto(`/objekty/${responseID}/edit`);

    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.since']`)
      .click();
    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.since']`)
      .fill("-100");
    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.until']`)
      .click();
    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.until']`)
      .fill("-1000");
    await page.locator(".ui.primary.button").click();

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

test("valid num", async ({ page, request, baseURL }) => {
  try {
    const responseData = await callAPI(baseURL, request);
    const responseID = responseData.id;

    await page.goto(`/objekty/${responseID}/edit`);
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
    await page.locator(".ui.primary.button").click();

    await expect(page.getByText("Musí byt číslo")).toBeVisible();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});

test("array field", async ({ page, request, baseURL }) => {
  try {
    const responseData = await callAPI(baseURL, request);
    const responseID = responseData.id;

    await page.goto(`/objekty/${responseID}/edit`);

    const numberOfFields = await page
      .locator("[name='metadata.restorationWork.supervisors']")
      .locator("visible=true")
      .count();

    const buttonSelector =
      'div.field:has(input[name="metadata.restorationWork.supervisors[0].fullName"]) .left.labeled.button';

    await page.click(buttonSelector);

    await expect(
      page.locator(
        `[id="metadata\\.restorationWork\\.supervisors\\[${numberOfFields}\\]\\.fullName"]`
      )
    ).toBeVisible();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});

test("successful edit form submit", async ({ page, request, baseURL }) => {
  try {
    const responseData = await callAPI(baseURL, request);
    const responseID = responseData.id;

    await page.goto(`/objekty/${responseID}/edit`);

    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.since']`)
      .click();
    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.since']`)
      .fill("-100");
    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.until']`)
      .click();
    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.until']`)
      .fill("-10");

    const pagenav = page.waitForNavigation({ waitUntil: "load" });
    await page.locator(".ui.primary.button").click();

    await pagenav;

    const expectedURL = `${baseURL}objekty/${responseID}`;
    expect(page.url()).toBe(expectedURL);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});

test("redirection to detail page after edit form", async ({
  page,
  request,
  baseURL,
}) => {
  try {
    const responseData = await callAPI(baseURL, request);
    const responseID = responseData.id;

    await page.goto(`/objekty/${responseID}/edit`);

    const pagenav = page.waitForNavigation();
    await page.locator(".ui.primary.button").click();
    await pagenav;

    const expectedURL = `${baseURL}objekty/${responseID}`;

    expect(page.url()).toBe(expectedURL);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});
