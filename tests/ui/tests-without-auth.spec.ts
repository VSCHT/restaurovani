import { test, expect } from "playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

const url = "https://127.0.0.1:5000/";

test("has title", async ({ page }) => {
  await page.goto(url);
  await expect(page).toHaveTitle(
    /Repozitář dokumentace restaurování uměleckých předmětů/
  );
});

test("redirection to login page", async ({ page }) => {
  await page.goto(url);
  await page.getByRole("link", { name: "Přihlásit se" }).click();
  await expect(page).toHaveURL(`${url}login/`);
});

test("redirection to title page", async ({ page }) => {
  await page.goto(url);
  page.getByRole("button", { name: "RESTAUROVÁNÍ VŠCHT" });
  await expect(page).toHaveURL(url);
});

test("redirection to create page", async ({ page }) => {
  await page.goto(`${url}objekty/?q=&l=list&p=1&s=10&sort=newest`);
  await page.getByRole("button", { name: "Nový předmět" }).click();
  await expect(page).toHaveURL(`${url}login/?next=%2Fobjekty%2F_new`);
});

test("burger menu visibility", async ({ page }) => {
  await expect(
    page.getByRole("button", { name: "item toggle-burger" })
  ).toBeHidden();
});

test("falsy search", async ({ page }) => {
  await page.goto(`${url}objekty`);
  const response = await page.evaluate(() =>
    fetch(
      `https://127.0.0.1:5000/api/user/objects/?q=&sort=newest&page=1&size=10&metadata_restorationObject_creationPeriod_since=1700`
    ).then((res) => res.json())
  );
  expect(response).toStrictEqual({
    message: "Permission denied.",
    status: 403,
  });
});
