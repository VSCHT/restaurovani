import { test, expect } from "playwright/test";

const url = "https://127.0.0.1:5000/";

test("search and check URL 2", async ({ page }) => {
  await page.goto(`${url}objekty`);
  await page.getByRole("textbox", { name: "Hledat..." }).fill("sklo");
  await page.getByRole("textbox", { name: "Hledat..." }).press("Enter");
  await expect(page).toHaveURL(
    `${url}objekty/?q=sklo&l=list&p=1&s=10&sort=bestmatch`
  );

  await page.getByRole("textbox", { name: "Hledat..." }).fill("sklo");
  await page.locator(".ui > button:nth-child(2)").click();
  await expect(page).toHaveURL(
    `${url}objekty/?q=sklo&l=list&p=1&s=10&sort=bestmatch`
  );
});

test("redirection to create page", async ({ page }) => {
  await page.goto(`${url}objekty`);
  await page.getByRole("button", { name: "Nový předmět" }).click();
  await expect(page).toHaveURL(`${url}objekty/_new`);
});

test("checkbox string", async ({ page, request }) => {
  await page.goto(`${url}objekty/?q=&l=list&p=1&s=10&sort=newest`);

  await page
    .locator('text="metadata/restorationObject/category.label"')
    .click();

  const checkbox = await page.locator(
    'input[type="checkbox"][value="keramika"]'
  );

  await checkbox.click({ force: true });
  const isChecked = await checkbox.evaluate((element) => element.checked);

  expect(isChecked).toBeTruthy();

  const response = await request.get(
    "/api/user/objects/?q=&page=1&size=10&metadata_restorationObject_category=keramika"
  );

  const responseBody = await response.body();
  const responseData = JSON.parse(responseBody.toString());

  expect(responseData.hits.total).toBe(20);
  expect(page.url()).toBe(
    `${url}objekty/?q=&f=metadata_restorationObject_category%3Akeramika&l=list&p=1&s=10&sort=newest`
  );
});

test("checkbox num", async ({ page, request }) => {
  await page.goto(`${url}objekty/?q=&l=list&p=1&s=10&sort=newest`);

  await page
    .locator('text="metadata/restorationObject/creationPeriod/since.label"')
    .click();

  const checkbox = await page.locator('input[type="checkbox"][value="1550"]').first();

  await checkbox.click({ force: true });
  const isChecked = await checkbox.evaluate((element) => element.checked);

//   expect(isChecked).toBeTruthy(); 
// TODO: FIX above

  const response = await request.get(
    "/api/user/objects/?q=&page=1&size=10&metadata_restorationObject_creationPeriod_since=1550"
  );

  const responseBody = await response.body();
  const responseData = JSON.parse(responseBody.toString());

  expect(responseData.hits.total).toBe(3);
  expect(page.url()).toBe(
    `${url}objekty/?q=&f=metadata_restorationObject_creationPeriod_since%3A1550&l=list&p=1&s=10&sort=newest`
  );
});

test("checkbox bool", async ({ page, request }) => {
  await page.goto(`${url}objekty/?q=&l=list&p=1&s=10&sort=newest`);

  await page
    .locator('text="metadata/restorationObject/archeologic.label"')
    .click();

  const checkbox = await page.locator('input[type="checkbox"][value="true"]');

  await checkbox.click({ force: true });
  const isChecked = await checkbox.evaluate((element) => element.checked);

  expect(isChecked).toBeTruthy();

  const response = await request.get(
    "/api/user/objects/?q=&page=1&size=10&metadata_restorationObject_archeologic=true"
  );

  const responseBody = await response.body();
  const responseData = JSON.parse(responseBody.toString());

  expect(responseData.hits.total).toBe(15);

  expect(page.url()).toBe(
    `${url}objekty/?q=&f=metadata_restorationObject_archeologic%3Atrue&l=list&p=1&s=10&sort=newest`
  );
});

//   let responsData = await loginResponse.body().then((b) => {
//     let data = JSON.parse(b.toString());
//     console.log(data);
//     return data;
//   });

test("clear search results", async ({ page }) => {
  const urlEnding = "&l=list&p=1&s=10&sort=newest";
  await page.goto(`${url}objekty/?q=sklo${urlEnding}`);
  const pagenav = page.waitForNavigation({ waitUntil: "networkidle" });
  await page.locator(".row > div > div > button").first().click();
  await pagenav;

  expect(page.url()).toBe(`${url}objekty/?q=${urlEnding}`);
});

test("pagination", async ({ page }) => {
  await page.goto(`${url}objekty/?q=&l=list&p=1&s=10&sort=newest`);
  const pagenav = page.waitForNavigation({ waitUntil: "networkidle" });
  await page.locator("#main").getByRole("navigation").getByText("2").click();
  await pagenav;

  expect(page.url()).toBe(`${url}objekty/?q=&l=list&p=2&s=10&sort=newest`);
});

test("redirection to detail page after search page", async ({
  page,
  request,
}) => {
  await page.goto(`${url}objekty/?q=&l=list&p=2&s=10&sort=newest`);

  try {
    const response = await request.get(
      `https://127.0.0.1:5000/api/user/objects/?q=&sort=newest&page=2&size=10`
    );

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.body();
    const responseData = JSON.parse(responseBody.toString());
    const responseID = responseData.hits.hits[4].id;
    const responseName =
      responseData.hits.hits[4].metadata.restorationObject.title;

    const linkElement = await page.waitForSelector(
      `a:has-text("${responseName}")`,
      { timeout: 10000 }
    );

    await linkElement.click();
    const expectedURL = `${url}objekty/${responseID}`;
    expect(await page.waitForURL(expectedURL));
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});
