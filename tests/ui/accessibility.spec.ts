import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "playwright/test";

async function checkAccessibility(page) {
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
}

test.describe("homepage", () => {
  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("/");
    await checkAccessibility(page);
  });
});

test.describe("search", () => {
  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("/objekty");
    await checkAccessibility(page);
  });
});

test.describe("detail", () => {
  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("/objekty");
    const firstItem = page.getByTestId('result-item').first();
    await firstItem.locator(".extra .ui.button").click();
    await checkAccessibility(page);
  });
});

test.describe("create", () => {
  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("/objekty/_new");
    await checkAccessibility(page);
  });
});
