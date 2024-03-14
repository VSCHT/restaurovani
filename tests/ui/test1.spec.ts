// import { test, expect } from "./playwright/fixtures";
import { test, expect } from "playwright/test";

const url = "https://127.0.0.1:5000/";

test("has title", async ({ page }) => {
  await page.goto(url);
  await expect(page).toHaveTitle(
    /Repozitář dokumentace restaurování uměleckých předmětů/
  );
});

test("file download start after clicking link", async ({ page }) => {
  await page.goto(`${url}objekty/g6fbq-qas91`);
  const downloadPromise =  page.waitForEvent("download");
  await page.locator('a:text("bp-pulcova-beroun.pdf")').click()
  const download= await downloadPromise;
  expect(download.suggestedFilename()).toContain(".pdf");
});

test("search and check URL", async ({ page }) => {
  await page.goto(url);
  await page.getByRole("textbox", { name: "Vyhledat předmět" }).fill("sklo");
  await page.getByRole("textbox", { name: "Vyhledat předmět" }).press("Enter");
  await expect(page).toHaveURL(
    `${url}objekty/?q=sklo`
  );
});

test("search and check URL 2", async ({ page }) => {
  await page.goto(`${url}objekty`);
  await page.getByRole("textbox", { name: "Hledat..." }).fill("sklo");
  await page.getByRole("textbox", { name: "Hledat..." }).press("Enter");
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
    .getByText("metadata/restorationObject/creationPeriod/since.label")
    .click();
    
  await page
    .getByRole("list")
    .locator("div")
    .filter({ hasText: "1700" })
    .first()
    .click();

  expect(
    await  page
    .locator("div:nth-child(3)> .content >div> div> .row > label")
    .first().isChecked()
  ).toBeTruthy();
});



