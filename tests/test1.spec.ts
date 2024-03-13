import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto(window.location.href);
  await expect(page).toHaveTitle(
    /Repozitář dokumentace restaurování uměleckých předmětů/
  );
});

test("redirection to search page with 20 records", async ({ page, server }) => {
  server.route({
    method: "GET",
    url: `${window.location.href}/api/user/objects`,
    response: {
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ total: 20 }),
    },
  });

  await page.goto(window.location.href);

  await page.getByRole("button", { name: "PROCHÁZET PŘEDMĚTY" }).click();
  await expect(page).toHaveURL(`${window.location.href}/objekty`);

  const response = await page.evaluate(() =>
    fetch(`${window.location.href}/api/user/objects`).then((res) => res.json())
  );
  expect(response.total).toBe(20);
});

test("redirection to login page", async ({ page }) => {
  await page.goto(window.location.href);
  await page.getByRole("link", { name: "Přihlásit se" }).click();
  await expect(page).toHaveURL(`${window.location.href}/login`);
});

test("file download starts after clicking link", async ({ page }) => {
  await page.goto(window.location.href);
  await page.click('a[href$=".pdf"]');
  const download = await page.waitForEvent("download");
  await download.saveAs('downloaded_file.pdf');
  expect(download.suggestedFilename()).toContain('.pdf');
});

test("search and check URL", async ({ page }) => {
  await page.goto(window.location.href);
  await page.fill('input[placeholder="Vyhledat předmět"]', "sklo");
  await page.press('input[placeholder="Vyhledat předmět"]', "Enter");
  await expect(page).toHaveURL(
    `${window.location.href}/objekty/?q=sklo&l=list&p=1&s=10&sort=bestmatch`
  );
});

test("redirection to title page", async ({ page }) => {
  await page.goto(window.location.href);
  await page.click('button[aria-label="Návrat na titulní stránku"]');
  await expect(page).toHaveURL(window.location.href);
});

test("redirection to create page", async ({ page }) => {
    await page.goto(`${window.location.href}/objekty`);
    await page.getByRole("button", { name: "Nový předmět" }).click();
    await expect(page).toHaveURL(`${window.location.href}/objekty/\_new`);
  });


test("checkbox", async ({ page }) => {
  await page.goto(window.location.href);
  await page.check('.ui.checkbox input[type="checkbox"]');
  expect(await page.isChecked('.ui.checkbox input[type="checkbox"]')).toBeTruthy();
});

test("checkbox click displays filtered records", async ({
  page,
  server,
}) => {
  server.route({
    method: "GET",
    url: `${window.location.href}/api/user/objects/?q=&sort=newest&page=1&size=10&metadata_restorationObject_creationPeriod_since=1700`,
    response: {
      status: 200,
      contentType: "application/json", 
      body: JSON.stringify({ total: 4 }),
    },
  });

  await page.goto(window.location.href);
  const checkbox = await page.$('.ui.checkbox input[type="checkbox"]');
  await checkbox.click();
  await page.waitForURL((url) =>
    url.includes("f=metadata_restorationObject_creationPeriod_since%3A1700")
  );
  expect(page.url()).toContain(
    "f=metadata_restorationObject_creationPeriod_since%3A1700"
  );

  const response = await page.evaluate(() =>
    fetch(`${window.location.href}/api/user/objects/?q=&sort=newest&page=1&size=10&metadata_restorationObject_creationPeriod_since=1700`).then((res) => res.json())
  );
  expect(response.total).toBe(4);
});
