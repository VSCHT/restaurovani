import { test, expect, devices } from "playwright/test";

const url = "https://127.0.0.1:5000/";

test.use({
  viewport: { width: 600, height: 300 },
});

test("burger menu visibility", async ({ page }) => {
  await page.goto(url);
  await expect(page.locator(".item.toggle-burger").first()).toBeVisible();
});

test("top menu content visibility", async ({ page }) => {
  await page.goto(url);
  await expect(
    page
      .getByRole("button", { name: "RESTAUROVÁNÍ VŠCHT" })
      .locator(".ui.menu.top.fixed")
  ).toBeHidden();
});

test("images carousel 2", async ({ page }) => {
  await page.goto(`${url}objekty/xtejz-jpj71`);

  await expect(page.locator(".slick-arrow.slick-next")).toBeVisible();
});

test("search filter button", async ({ page }) => {
  await page.goto(`${url}objekty`);

  await expect(page.locator(".ui.button.filter")).toBeVisible();

  await page.locator(".ui.button.filter").click();
  await expect(page.locator(".ui.modal")).toBeVisible();
});

test("sidebar search", async ({ page }) => {
  await page.goto(url);

  await page.locator(".item").first().click();

  await expect(page.locator(".sidebar")).toBeVisible();

  await page
    .locator("nav")
    .filter({ hasText: "RESTAUROVÁNÍ VŠCHT Praha" })
    .getByPlaceholder("Vyhledat předmět")
    .fill("sklo");
  await page.locator(`[type='submit']`).click();

  await expect(page).toHaveURL(`${url}objekty/?q=sklo`);
});

test("sidebar homepage", async ({ page }) => {
  await page.goto(`${url}objekty`);
  await page.locator(".item").first().click();
  await expect(page.locator(".sidebar")).toBeVisible();
  await page
    .locator("div.item")
    .filter({ hasText: "RESTAUROVÁNÍ VŠCHT Praha" })
    .click();

  await expect(page).toHaveURL(url);
});

test("sidebar new item", async ({ page }) => {
  await page.goto(`${url}objekty`);
  await page.locator(".item").first().click();
  await expect(page.locator(".sidebar")).toBeVisible();
  await page.locator("div.item").filter({ hasText: "Nový předmět" }).click();

  await expect(page).toHaveURL(`${url}objekty/_new`);
});

test("sidebar logout", async ({ page }) => {
    await page.goto(`${url}objekty`);
    await page.locator(".item").first().click();
    await expect(page.locator(".sidebar")).toBeVisible();
    await page.waitForSelector('.sidebar .item .account-dropdown', { visible: true });

    await page.locator('.sidebar .item .account-dropdown').click();
    await expect(page.locator('.sidebar .menu.transition')).toBeVisible();

    await page.getByRole('link', { name: 'Odhlášení' }).click()

    await expect(page).toHaveURL(url);
});




test("sidebar close", async ({ page }) => {
  await page.goto(`${url}objekty`);
  await page.locator(".item").first().click();
  await expect(page.locator(".sidebar")).toBeVisible();
  await page.locator(".ui.close").click();

  await expect(page.locator(".sidebar")).toBeHidden();
});
