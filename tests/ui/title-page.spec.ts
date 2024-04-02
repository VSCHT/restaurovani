import { test, expect } from "playwright/test";

const url = "https://127.0.0.1:5000/";

test("has title", async ({ page }) => {
  await page.goto(url);
  await expect(page).toHaveTitle(
    /Repozitář dokumentace restaurování uměleckých předmětů/
  );
});

test("search and check URL", async ({ page }) => {
  await page.goto(url);
  await page.getByRole("textbox", { name: "Vyhledat předmět" }).fill("sklo");
  await page.getByRole("textbox", { name: "Vyhledat předmět" }).press("Enter");
  await expect(page).toHaveURL(`${url}objekty/?q=sklo`);
});
