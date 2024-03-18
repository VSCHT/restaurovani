// import { test, expect } from "./playwright/fixtures";
import { test, expect } from "playwright/test";

const url = "https://127.0.0.1:5000/";

test("has title", async ({ page }) => {
  await page.goto(url);
  await expect(page).toHaveTitle(
    /Repozitář dokumentace restaurování uměleckých předmětů/
  );
});

test("file download after clicking link", async ({ page, request }) => {
  const response = await request.get(
    `https://127.0.0.1:5000/api/user/objects/?q=&sort=newest&page=5&size=10`
  );

  expect(response.ok()).toBeTruthy();

  const responseBody = await response.body();
  const responseData = JSON.parse(responseBody.toString());
  const responseID = responseData.hits.hits[4].id;

  const response2 = await request.get(responseData.hits.hits[4].links.files);

  const responseBody2 = await response2.body();
  const responseData2 = JSON.parse(responseBody2.toString());

  const lastFile = responseData2.entries.slice(-1);
  const fileName = lastFile[0].key;
  const downloadPromise = page.waitForEvent("download");
  await page.goto(`${url}objekty/${responseID}`);

  await page.locator(`a:text('${fileName}')`).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toContain(".pdf");
});

test("search and check URL", async ({ page }) => {
  await page.goto(url);
  await page.getByRole("textbox", { name: "Vyhledat předmět" }).fill("sklo");
  await page.getByRole("textbox", { name: "Vyhledat předmět" }).press("Enter");
  await expect(page).toHaveURL(`${url}objekty/?q=sklo`);
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

// test("checkbox", async ({ page }) => {
//   await page.goto(`${url}objekty/?q=&l=list&p=1&s=10&sort=newest`);

//   await page
//     .getByText("metadata/restorationObject/creationPeriod/since.label")
//     .click();

//   await page
//     .getByRole("list")
//     .locator("div")
//     .filter({ hasText: "1700" })
//     .first()
//     .click();

//    await page.getByRole("list")
//     .filter(new Locator.FilterOptions()
//         .setHas(page.GetByRole('checkbox',
//                                new Page.GetByRoleOptions().setName("1700"))))

//  await expect(page.locator('.checkbox:left-of(:text("1700"))')).toHaveClass(/checked/);
// });

test("images carousel", async ({ page }) => {
  await page.goto(`${url}objekty/mwa1x-1kj76`);
  await page.getByRole("img", { name: "před restaurováním" }).nth(1).click();
  await expect(page.locator(".image > div > img")).toHaveAttribute(
    "src",
    "https://127.0.0.1:5000/api/objects/mwa1x-1kj76/draft/files/sal-282-pred-zezadu.jpg/content"
  );
  await page.getByRole("button").nth(3).click();
  await expect(page.locator(".image > div > img")).toHaveAttribute(
    "src",
    "https://127.0.0.1:5000/api/objects/mwa1x-1kj76/draft/files/sal-282-pred.jpg/content"
  );
});

test("tree-field visibility", async ({ page }) => {
  await page.goto(`${url}objekty/g9fpw-1qw39/edit`);

  await page.click(`[name='metadata.restorationObject.itemTypes']`);
  await expect(page.locator(".tree-field").first()).toBeVisible();
});

test("tree-field manipulation", async ({ page }) => {
  await page.goto(`${url}objekty/g9fpw-1qw39/edit`);

  await page.click(`[name='metadata.restorationObject.itemTypes']`);

  const submitButton = page.locator(
    ".ui.icon.secondary.right.floated.right.labeled.button"
  );

  const choiceButton = page.getByRole("button", { name: "popelnice" });

  await choiceButton.click();
  await submitButton.first().click();

  await expect(page.locator(".tree-field").first()).toBeHidden();
  expect(page.locator("a").filter({ hasText: "popelnice" })).toBeTruthy();
});

test("redirection to detail page after search page", async ({
  page,
  request,
}) => {
  await page.goto(`${url}objekty/?q=&l=list&p=5&s=10&sort=newest`);

  try {
    const response = await request.get(
      `https://127.0.0.1:5000/api/user/objects/?q=&sort=newest&page=5&size=10`
    );

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.body();
    const responseData = JSON.parse(responseBody.toString());
    const responseID = responseData.hits.hits[4].id;
    const responseName =
      responseData.hits.hits[4].metadata.restorationObject.title;

    await page.getByRole("link", { name: responseName }).first().click();

    const expectedURL = `${url}objekty/${responseID}`;
    expect(await page.waitForURL(expectedURL));
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});

test("redirection to detail page after edit form", async ({
  page,
  request,
}) => {
  try {
    const response = await request.get(
      `https://127.0.0.1:5000/api/user/objects/?q=&sort=newest&page=5&size=10`
    );

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.body();
    const responseData = JSON.parse(responseBody.toString());
    const responseID = responseData.hits.hits[4].id;

    await page.goto(`${url}objekty/${responseID}/edit`);
    const pagenav = page.waitForNavigation({ waitUntil: "networkidle" });
    await page.getByLabel("tlacitko vytvoreni predmetu").click();
    await pagenav;

    const expectedURL = `${url}objekty/${responseID}`;

    expect(page.url()).toBe(expectedURL);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});
