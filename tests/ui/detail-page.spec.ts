import { test, expect } from "playwright/test";


test("file download after clicking link", async ({ page }) => {
  try {
    await page.goto("/objekty");

    const firstItem = page.getByTestId("result-item").first();
    await firstItem.locator(".extra .ui.button").click();

    const downloadPromise = page.waitForEvent("download");

    const section = page.getByTestId("document-section");
    const numberOfFiles = await section.locator("a").count();

    const randomIndex = Math.floor(Math.random() * numberOfFiles);

    await section.locator("a").nth(randomIndex).click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain(".pdf");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});

test("images carousel arrows", async ({ page }) => {
  await page.goto("/objekty");

  const firstItem = page.getByTestId("result-item").first();
  await firstItem.locator(".extra .ui.button").click();

  const firstImageImgBox = page.locator(`[data-index="1"]`);
  const firstImageClassList = await firstImageImgBox.evaluate((element) =>
    element.classList.contains("slick-active")
  );

  expect(firstImageClassList).toBeTruthy();

  await expect(page.locator(".slick-arrow.slick-next")).toBeVisible();
  await page.locator(".slick-arrow.slick-next").click();

  const firstImageClickedClassList = await firstImageImgBox.evaluate((element) =>
  element.classList.contains("slick-active")
);

  expect(firstImageClickedClassList).toBeFalsy();
});

test("modal images carousel", async ({ page }) => {
  await page.goto("/objekty");

  const firstItem = page.getByTestId("result-item").first();
  await firstItem.locator(".extra .ui.button").click();

  await page.locator(".image").first().click();

  await page.waitForSelector(".modal", { state: "visible" });
  const firstTitle = (await page.locator(".modal .header").textContent()) || "";

  await page.locator(".modal .right").click();

  const nextTitle = (await page.locator(".modal .header").textContent()) || "";

  expect(nextTitle).not.toMatch(firstTitle);
});

test("detail page title", async ({ page }) => {
  await page.goto("/objekty");
  const firstItem = page.getByTestId("result-item").first();
  const itemName = firstItem.locator(".header a").textContent();
  await firstItem.locator(".extra .ui.button").click();

  await expect(page).toHaveTitle(`${itemName} | Detail`);
});
