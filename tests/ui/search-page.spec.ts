import { test, expect } from "playwright/test";
import { getAgg } from "./util";

test("search and check URL 2", async ({ page }) => {
  await page.goto(`/objekty`);
  await page.locator("input").locator("visible=true").fill("sklo");
  await page.locator("input").locator("visible=true").press("Enter");
  await expect(page).toHaveURL(/q=sklo/);

  await page.locator("input").locator("visible=true").fill("sklo");
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
  await page.waitForSelector(".ui.accordion", { state: "visible" });
  const accordions = page.locator(".ui.accordion");

  for (let i = 0; i < (await accordions.count()); i++) {
    await accordions.nth(i).click();
  }

  const accordionLists = page.locator(".content .ui.list");

  const { selectedAgg, selectedValue } = await getAgg(
    accordions,
    accordionLists,
    "string"
  );
  await selectedAgg.click();

  const checkbox = page.locator(
    `input[type="checkbox"][value="${selectedValue}"]`
  );

  await checkbox.click({ force: true });
  const isChecked = await checkbox.evaluate((element) => element.checked);

  expect(isChecked).toBeTruthy();

  await expect(page.getByTestId("result-item")).toHaveCount(10);

  const resPerPage = page.locator('.computer div[role="listbox"]');

  await resPerPage.click();

  await resPerPage.locator("span", { hasText: "50" }).click();

  await expect(page.getByTestId("result-item")).toHaveCount(20);

  expect(page.url().includes(selectedValue)).toBeTruthy();
});

test("checkbox num", async ({ page }) => {
  await page.goto("/objekty");

  await page.waitForSelector(".ui.accordion", { state: "visible" });
  const accordions = page.locator(".ui.accordion");

  for (let i = 0; i < (await accordions.count()); i++) {
    await accordions.nth(i).click();
    await page.waitForSelector(".content.active .ui.list", {
      state: "visible",
    });
  }

  const accordionLists = page.locator(".content .ui.list");

  const { selectedAgg, selectedValue } = await getAgg(
    accordions,
    accordionLists,
    "number"
  );

  if (!selectedAgg || !selectedValue) {
    throw new Error("No valid aggregation found");
  }

  await selectedAgg.click();

  const checkbox = page.locator(
    `input[type="checkbox"][value="${selectedValue}"]`
  );

  await checkbox.click({ force: true });
  const isChecked = await checkbox.evaluate((element) => element.checked);

  expect(isChecked).toBeTruthy();

  await expect(page.getByTestId("result-item")).toHaveCount(1);

  expect(page.url().includes(selectedValue)).toBeTruthy();
});

test("checkbox bool", async ({ page }) => {
  await page.goto(`/objekty`);
  await page.waitForSelector(".ui.accordion", { state: "visible" });
  const accordions = page.locator(".ui.accordion");

  for (let i = 0; i < (await accordions.count()); i++) {
    await accordions.nth(i).click();
  }

  const accordionLists = page.locator(".content .ui.list");

  const { selectedAgg, selectedValue } = await getAgg(
    accordions,
    accordionLists,
    "boolean"
  );
  await selectedAgg.click();

  const checkbox = page.locator(
    `input[type="checkbox"][value="${selectedValue}"]`
  );
  await checkbox.click({ force: true });
  const isChecked = await checkbox.evaluate((element) => element.checked);

  expect(isChecked).toBeTruthy();

  await expect(page.getByTestId("result-item")).toHaveCount(10);

  const resPerPage = page.locator('.computer div[role="listbox"]');

  await resPerPage.click();

  await resPerPage.locator("span", { hasText: "50" }).click();

  await expect(page.getByTestId("result-item")).toHaveCount(15);

  expect(page.url().includes(selectedValue)).toBeTruthy();
});

test("clear search results", async ({ page }) => {
  await page.goto(`/objekty/?q=sklo`);
  const pagenav = page.waitForNavigation({ waitUntil: "networkidle" });
  await page.getByTestId("clear-button").click();
  await pagenav;

  await expect(page).not.toHaveURL(/q=sklo/);
});

test("pagination", async ({ page }) => {
  await page.goto(`/objekty`);
  const pagenav = page.waitForNavigation({ waitUntil: "networkidle" });
  await page.locator(".computer .pagination").getByText("2").click();
  await pagenav;

  await expect(page).toHaveURL(/p=2/);
});

test("get facets names", async ({ page }) => {
  await page.goto(`/objekty`);
  await page.waitForSelector(".ui.accordion", { state: "visible" });

  const accText = await page.evaluate(() => {
    const acc = document.querySelector(".ui.accordion .title");
    return acc ? acc.innerText.trim() : null;
  });

  expect(accText).toBe("Archeologický nález");
});
