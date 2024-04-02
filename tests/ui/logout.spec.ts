import { test, expect } from "playwright/test";


test("logout", async ({ page, baseURL }) => {
  await page.goto(`/objekty`);

  await page.locator(".right.menu .account-dropdown").click();
  await page.waitForSelector(".menu.transition");

  await page.evaluate(() => {
    const links = Array.from(
      document.querySelectorAll(".menu.transition a.item")
    );
    const logoutLink = links.find(
      (link) => link.textContent.trim() === "Odhlášení"
    );
    logoutLink.click();
  });

  await expect(page).toHaveURL(`${baseURL}`);
});
