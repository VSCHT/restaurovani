import { test, expect } from "playwright/test";

test.use({
  viewport: { width: 400, height: 300 },
});

test("burger menu visibility", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".item.toggle-burger")).toBeVisible();
});

test("top menu content visibility", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".ui.menu.top.fixed a").first()).toBeHidden();
});

test("images carousel mobile", async ({ page }) => {
  await page.goto("/objekty");
  const firstItem = page.getByTestId('result-item').first();
  
  await firstItem.locator(".extra .ui.button").click();

  await expect(page.locator(".slick-arrow.slick-next")).toBeVisible();
  await page.locator(".slick-arrow.slick-next").click();

  const imgBox = page.locator(`[data-index="2"]`);
  const classList = await imgBox.evaluate((element) =>
    element.classList.contains("slick-active")
  );

  expect(classList).toBeTruthy();
});

test("search filter button", async ({ page }) => {
  await page.goto(`/objekty`);

  await expect(page.locator(".ui.button.filter")).toBeVisible();

  await page.locator(".ui.button.filter").click();
  await expect(page.locator(".ui.modal")).toBeVisible();
});

test("sidebar search", async ({ page, baseURL }) => {
  await page.goto("/");
  await page.locator(".item.toggle-burger").click();
  await expect(page.locator(".sidebar")).toBeVisible();

  await page.locator(`.sidebar .ui.input[name="q"]`).fill("sklo");
  await page.locator(`.sidebar button[type="submit"]`).click();

  await expect(page).toHaveURL(`${baseURL}objekty/?q=sklo`);
});

test("sidebar homepage", async ({ page, baseURL }) => {
  await page.goto(`/objekty`);
  await page.locator(".item.toggle-burger").click();
  await expect(page.locator(".sidebar")).toBeVisible();

  await page.locator(".sidebar a:has(.left)").click();

  await expect(page).toHaveURL(`${baseURL}`);
});

test("sidebar new item", async ({ page, baseURL }) => {
  await page.goto(`/objekty`);
  await page.locator(".item.toggle-burger").click();
  await expect(page.locator(".sidebar")).toBeVisible();
  await page.getByTestId("newObject-button").click();

  await expect(page).toHaveURL(`${baseURL}objekty/_new`);
});

test("sidebar logout", async ({ page, baseURL }) => {
  await page.goto(`/objekty`);
  await page.locator(".item.toggle-burger").click();
  await expect(page.locator(".sidebar")).toBeVisible();
  await page.waitForSelector(".sidebar .item .account-dropdown", {
    visible: true,
  });

  await page.locator(".sidebar .item .account-dropdown").click();
  await expect(page.locator(".sidebar .menu.transition")).toBeVisible();
  const pagenav = page.waitForNavigation({ waitUntil: "load" });
  await page.locator('.sidebar').getByTestId('logout-button').click();

  await pagenav;
  await expect(page).toHaveURL(`${baseURL}`);
});

test("sidebar close", async ({ page }) => {
  await page.goto(`/objekty`);
  await page.locator(".item.toggle-burger").click();
  await expect(page.locator(".sidebar")).toBeVisible();
  await page.locator(".ui.close").click();

  await expect(page.locator(".sidebar")).toBeHidden();
});
