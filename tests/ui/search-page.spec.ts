import { test, expect } from "playwright/test";

test("search and check URL 2", async ({ page }) => {
  await page.goto(`/objekty`);
  await page.locator(".ui.input input").fill("sklo");
  await page.locator(".ui.input input").press("Enter");
  await expect(page).toHaveURL(/q=sklo/);

  await page.locator(".ui.input input").fill("sklo");
  await page.getByTestId("search-button").click();
  await expect(page).toHaveURL(/q=sklo/);
});

test("redirection to create page", async ({ page }) => {
  await page.goto(`/objekty`);
  await page.locator(".aside .ui.button").click();
  await expect(page).toHaveURL(/_new/);
});

test("checkbox string", async ({ page }) => {
  await page.goto(`/objekty`);

  await page.locator('.title:has-text("category")').click();

  const checkbox = await page.locator(
    'input[type="checkbox"][value="keramika"]'
  );

  await checkbox.click({ force: true });
  const isChecked = await checkbox.evaluate((element) => element.checked);

  expect(isChecked).toBeTruthy();

  await expect(page.getByTestId("result-item")).toHaveCount(10);

  const resPerPage = page.locator('.computer div[role="listbox"]');

  await resPerPage.click();

  await resPerPage.locator("span", { hasText: "50" }).click();

  await expect(page.getByTestId("result-item")).toHaveCount(20);

  await expect(page).toHaveURL(
    /f=metadata_restorationObject_category%3Akeramika/
  );
});

test("checkbox num", async ({ page }) => {
  await page.goto(`/objekty`);

  await page.locator('.title:has-text("since")').click();

  const checkbox = await page
    .locator('input[type="checkbox"][value="1550"]')
    .first();

  await checkbox.click({ force: true });
  const isChecked = await checkbox.evaluate((element) => element.checked);

  expect(isChecked).toBeTruthy();

  await expect(page.getByTestId("result-item")).toHaveCount(3);

  await expect(page).toHaveURL(
    /f=metadata_restorationObject_creationPeriod_since%3A1550/
  );
});

test("checkbox bool", async ({ page }) => {
  await page.goto(`/objekty`);

  await page
    .locator('text="metadata/restorationObject/archeologic.label"')
    .click();

  const checkbox = await page.locator('input[type="checkbox"][value="true"]');

  await checkbox.click({ force: true });
  const isChecked = await checkbox.evaluate((element) => element.checked);

  expect(isChecked).toBeTruthy();

  await expect(page.getByTestId("result-item")).toHaveCount(10);

  const resPerPage = page.locator('.computer div[role="listbox"]');

  await resPerPage.click();

  await resPerPage.locator("span", { hasText: "50" }).click();

  await expect(page.getByTestId("result-item")).toHaveCount(15);

  await expect(page).toHaveURL(
    /f=metadata_restorationObject_archeologic%3Atrue/
  );
});

test("clear search results", async ({ page }) => {
  await page.goto(`/objekty/?q=sklo`);
  const pagenav = page.waitForNavigation({ waitUntil: "networkidle" });
  await page.locator(".input .buttons .button").first().click();
  await pagenav;

  await expect(page).not.toHaveURL(/q=sklo/);
});

test("pagination", async ({ page }) => {
  await page.goto(`/objekty`);
  const pagenav = page.waitForNavigation({ waitUntil: "networkidle" });
  await page.locator("#main").getByRole("navigation").getByText("2").click();
  await pagenav;

  await expect(page).toHaveURL(/p=2/);
});

test("get facets names", async ({ page }) => {
  await page.goto(`/objekty`);
  await page.waitForSelector(".ui.accordion");

  const accText = await page.evaluate(() => {
    const acc = document.querySelector(".ui.accordion .title");
    return acc ? acc.innerText.trim() : null;
  });

  expect(accText).toBe("Archeologický nález");
});
