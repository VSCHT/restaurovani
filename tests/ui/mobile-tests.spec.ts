import { test, expect } from "playwright/test";
const call = require("./api-call.spec.ts");

const url = "https://127.0.0.1:5000/";

test.use({
  viewport: { width: 400, height: 300 },
});

test("burger menu visibility", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".item.toggle-burger").first()).toBeVisible();
});

test("top menu content visibility", async ({ page }) => {
  await page.goto("/");
  await expect(
    page
      .locator(".ui.menu.top.fixed a").first()
  ).toBeHidden();
});

test("images carousel 2", async ({ page, request, baseURL }) => {
  const responseData = await call( baseURL, request );
  const responseID = responseData.id;

  await page.goto(`/objekty/${responseID}`);

  await expect(page.locator(".slick-arrow.slick-next")).toBeVisible();
});

test("search filter button", async ({ page }) => {
  await page.goto(`/objekty`);

  await expect(page.locator(".ui.button.filter")).toBeVisible();

  await page.locator(".ui.button.filter").click();
  await expect(page.locator(".ui.modal")).toBeVisible();
});

test("sidebar search", async ({ page, baseURL }) => {
  await page.goto(url);

  await page.locator(".item").first().click();

  await expect(page.locator(".sidebar")).toBeVisible();

  await page
    .locator("nav")
    .filter({ hasText: "RESTAUROVÁNÍ VŠCHT Praha" })
    .getByPlaceholder("Vyhledat předmět")
    .fill("sklo");
  await page.locator(`[type='submit']`).click();

  await expect(page).toHaveURL(`${baseURL}objekty/?q=sklo`);
});

test("sidebar homepage", async ({ page, baseURL }) => {
  await page.goto(`/objekty`);
  await page.locator(".item").first().click();
  await expect(page.locator(".sidebar")).toBeVisible();
  await page
    .locator("div.item")
    .filter({ hasText: "RESTAUROVÁNÍ VŠCHT Praha" })
    .click();

  await expect(page).toHaveURL(`${baseURL}`);
});

test("sidebar new item", async ({ page, baseURL }) => {
  await page.goto(`/objekty`);
  await page.locator(".item").first().click();
  await expect(page.locator(".sidebar")).toBeVisible();
  await page.locator("div.item").filter({ hasText: "Nový předmět" }).click();

  await expect(page).toHaveURL(`${baseURL}objekty/_new`);
});

test("sidebar logout", async ({ page, baseURL }) => {
  await page.goto(`/objekty`);
  await page.locator(".item").first().click();
  await expect(page.locator(".sidebar")).toBeVisible();
  await page.waitForSelector(".sidebar .item .account-dropdown", {
    visible: true,
  });

  await page.locator(".sidebar .item .account-dropdown").click();
  await expect(page.locator(".sidebar .menu.transition")).toBeVisible();

  await page.getByRole("link", { name: "Odhlášení" }).click();

  await expect(page).toHaveURL(`${baseURL}`);
});

test("sidebar close", async ({ page }) => {
  await page.goto(`/objekty`);
  await page.locator(".item").first().click();
  await expect(page.locator(".sidebar")).toBeVisible();
  await page.locator(".ui.close").click();

  await expect(page.locator(".sidebar")).toBeHidden();
});

// отделить повторяющиеся части
// селекторы полобрать получше
// слайд мобил следущие картинки
