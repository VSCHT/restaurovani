import { test, expect } from "playwright/test";
const call = require("./api-call.spec.ts");

test("search and check URL 2", async ({ page, baseURL }) => {
  await page.goto(`/objekty`);
  await page.locator(".ui.input input").fill("sklo");
  await page.locator(".ui.input input").press("Enter");
  await expect(page).toHaveURL(
    `${baseURL}objekty/?q=sklo&l=list&p=1&s=10&sort=bestmatch`
  );

  await page.locator(".ui.input input").fill("sklo");
  await page.locator(".ui > button:nth-child(2)").click();
  await expect(page).toHaveURL(
    `${baseURL}objekty/?q=sklo&l=list&p=1&s=10&sort=bestmatch`
  );
});

test("redirection to create page", async ({ page, baseURL }) => {
  await page.goto(`/objekty`);
  await page.locator(".aside .secondary.button").click();
  await expect(page).toHaveURL(`${baseURL}objekty/_new`);
});

test("checkbox string", async ({ page, request, baseURL }) => {
  await page.goto(`/objekty`);

  await page
    .locator('text="metadata/restorationObject/category.label"')
    .click();

  const checkbox = await page.locator(
    'input[type="checkbox"][value="keramika"]'
  );

  await checkbox.click({ force: true });
  const isChecked = await checkbox.evaluate((element) => element.checked);

  expect(isChecked).toBeTruthy();

  const url =
    "/api/user/objects/?q=&page=1&size=10&metadata_restorationObject_category=keramika";

  const responseData = await call(baseURL, request, false, url);

  expect(responseData.hits.total).toBe(20);
  expect(page.url()).toBe(
    `${baseURL}objekty/?q=&f=metadata_restorationObject_category%3Akeramika&l=list&p=1&s=10`
  );
});

test("checkbox num", async ({ page, request, baseURL }) => {
  await page.goto(`/objekty/?q=&l=list&p=1&s=10&sort=newest`);

  await page
    .locator('text="metadata/restorationObject/creationPeriod/since.label"')
    .click();

  const checkbox = await page
    .locator('input[type="checkbox"][value="1550"]')
    .first();

  await checkbox.click({ force: true });
  const isChecked = await checkbox.evaluate((element) => element.checked);

  expect(isChecked).toBeTruthy();

  const url =
    "/api/user/objects/?q=&page=1&size=10&metadata_restorationObject_creationPeriod_since=1550";

  const responseData = await call(baseURL, request, false, url);

  expect(responseData.hits.total).toBe(2);
  expect(page.url()).toBe(
    `${baseURL}objekty/?q=&f=metadata_restorationObject_creationPeriod_since%3A1550&l=list&p=1&s=10&sort=newest`
  );
});

test("checkbox bool", async ({ page, request, baseURL }) => {
  await page.goto(`/objekty/?q=&l=list&p=1&s=10&sort=newest`);

  await page
    .locator('text="metadata/restorationObject/archeologic.label"')
    .click();

  const checkbox = await page.locator('input[type="checkbox"][value="true"]');

  await checkbox.click({ force: true });
  const isChecked = await checkbox.evaluate((element) => element.checked);

  expect(isChecked).toBeTruthy();

  const url =
    "/api/user/objects/?q=&page=1&size=10&metadata_restorationObject_archeologic=true";

  const responseData = await call(baseURL, request, false, url);
  expect(responseData.hits.total).toBe(15);

  expect(page.url()).toBe(
    `${baseURL}objekty/?q=&f=metadata_restorationObject_archeologic%3Atrue&l=list&p=1&s=10&sort=newest`
  );
});

test("clear search results", async ({ page, baseURL }) => {
  const urlEnding = "&l=list&p=1&s=10&sort=newest";
  await page.goto(`/objekty/?q=sklo${urlEnding}`);
  const pagenav = page.waitForNavigation({ waitUntil: "networkidle" });
  await page.locator(".row > div > div > button").first().click();
  await pagenav;

  expect(page.url()).toBe(`${baseURL}objekty/?q=${urlEnding}`);
});

test("pagination", async ({ page, baseURL }) => {
  await page.goto(`/objekty/?q=&l=list&p=1&s=10&sort=newest`);
  const pagenav = page.waitForNavigation({ waitUntil: "networkidle" });
  await page.locator("#main").getByRole("navigation").getByText("2").click();
  await pagenav;

  expect(page.url()).toBe(`${baseURL}objekty/?q=&l=list&p=2&s=10&sort=newest`);
});

test("redirection to detail page after search page", async ({
  page,
  request,
  baseURL,
}) => {
  await page.goto(`/objekty/?q=&l=list&p=2&s=10&sort=newest`);

  try {
    const responseData = await call(baseURL, request);
    const responseID = responseData.id;

    const responseName = responseData.metadata.restorationObject.title;

    const linkElement = await page.waitForSelector(
      `a:has-text("${responseName}")`,
      { timeout: 10000 }
    );

    await linkElement.click();
    const expectedURL = `${baseURL}objekty/${responseID}`;
    expect(await page.waitForURL(expectedURL));
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});
