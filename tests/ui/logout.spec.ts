import { test, expect } from "playwright/test";


test("logout", async ({ page, baseURL }) => {
  await page.goto(`/objekty`);

  await page.locator(".right.menu .account-dropdown").click();
  await page.waitForSelector(".menu.transition", { state: "visible" });

  await page.getByTestId('logout-button').click()

  await expect(page).toHaveURL(`${baseURL}`);
});
