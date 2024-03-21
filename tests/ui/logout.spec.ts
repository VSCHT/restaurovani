// import { test, expect } from "./playwright/fixtures";
import { test, expect, Locator } from "playwright/test";

const url = "https://127.0.0.1:5000/";

test("logout", async ({ page }) => {
  await page.goto(`${url}objekty`);

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

  await expect(page).toHaveURL(url);
});
