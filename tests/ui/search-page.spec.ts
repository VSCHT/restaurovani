import { test, expect, Locator } from "playwright/test";

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

test("checkbox", async ({ page }) => {
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
});

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
