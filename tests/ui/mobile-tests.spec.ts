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

  await page
    .getByRole("button", { name: "slick-arrow slick-next" })
    .isVisible();
});

test("search filter button", async ({ page }) => {
  await page.goto(`${url}objekty`);

  await page
    .getByRole("button", { name: "ui button transparent filter" })
    .isVisible();
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
