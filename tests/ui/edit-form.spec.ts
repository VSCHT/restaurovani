import { test, expect } from "playwright/test";

test("tree-field visibility, mouse manipulation and selected result check", async ({
  page,
}) => {
  await page.goto("/objekty");
  const firstItem = page.getByTestId('result-item').first();
  await firstItem.locator(".extra .ui.button").click();

  await page.locator(".container a:right-of(.ui.header)").click();

  // const vocabField = `[name='metadata.restorationObject.itemTypes']`;

  // await page.click(`[name='metadata.restorationObject.itemTypes']:not(a.label):not(.icon)`);
 

  
    const dropdown = await page.$('div[name="metadata.restorationObject.itemTypes"]');
    
    if (dropdown) { 
      const boundingBox = await dropdown.boundingBox();
      
      if (boundingBox) { 
        const clickX = boundingBox.x + boundingBox.width / 2;
        const clickY = boundingBox.y + boundingBox.height / 2;
         
        await page.mouse.click(clickX, clickY);
      }
    }
 
   
  page.waitForSelector(".ui.modal.tree-field");
  await expect(page.locator(".ui.modal.tree-field")).toBeVisible();

  const submitButton = page.locator(".actions button:not(.ui.label button)");

  const numberOfOptions = await page
    .locator(".tree-column.column .row")
    .locator("visible=true")
    .count();
  const randomIndex = await Math.floor(Math.random() * numberOfOptions);

  await page
    .locator(".tree-column .row.spaced")
    .locator("visible=true")
    .nth(randomIndex)
    .dblclick();

  const checkedButtonText = await page
    .locator(".tree-column .row.spaced")
    .locator("visible=true")
    .nth(randomIndex)
    .innerText();

  const breadcrumbText = await page.evaluate(() => {
    const breadcrumb = document.querySelector(".actions .ui.breadcrumb");
    return breadcrumb ? breadcrumb.innerText.trim() : null;
  });

  expect(`${breadcrumbText}:has-text("${checkedButtonText}")`).toBeTruthy();

  await submitButton.click();

  await expect(page.locator(".tree-field").first()).toBeHidden();
  expect(
    page.locator("a").filter({ hasText: `${checkedButtonText}` })
  ).toBeTruthy();
});

test("tree-field keyboard manipulation and selected result check", async ({
  page,
}) => {
  await page.goto("/objekty");
  const firstItem = page.getByTestId('result-item').first();
  await firstItem.locator(".extra .ui.button").click();

  await page.locator(".container a:right-of(.ui.header)").click();

  await page
    .locator(`[name="metadata.restorationObject.secondaryMaterialTypes"]`)
    .click();
  await page.getByRole("button", { name: "keramika" }).click();
  await page.getByRole("button", { name: "keramika" }).press("ArrowDown");
  await page.getByRole("button", { name: "keramika" }).press("ArrowDown");
  await page.getByRole("button", { name: "keramika" }).press("ArrowRight");

  expect(page.locator(".column.tree-column:nth-child(2)")).toBeVisible();

  await page.getByRole("button", { name: "keramika" }).press("ArrowDown");
  await page.getByRole("button", { name: "keramika" }).press("Enter");

  const checkedButtonText = await page.evaluate(() => {
    const checkedCheckboxContainer = document.querySelector(
      ".row.spaced .ui.checked.fitted.checkbox"
    );
    const buttonText =
      checkedCheckboxContainer?.nextElementSibling?.innerText.trim() ||
      "No text found";
    return buttonText;
  });

  const buttonTextIndeter = await page.evaluate(() => {
    const indeterminateCheckbox = document.querySelector(
      ".ui.indeterminate.fitted.checkbox"
    );
    const buttonNextToCheckbox = indeterminateCheckbox
      .closest(".row")
      .querySelector("button.ui.black.basic.button");
    return buttonNextToCheckbox
      ? buttonNextToCheckbox.innerText.trim()
      : "Button not found";
  });

  const breadcrumbText = await page.evaluate(() => {
    const breadcrumb = document.querySelector(".actions .ui.breadcrumb");
    return breadcrumb ? breadcrumb.innerText.trim() : null;
  });

  const expectedBreadcrumbText = `${checkedButtonText}${buttonTextIndeter}`;
  if (breadcrumbText != expectedBreadcrumbText) {
    throw new Error("Breadcrumb does not match.");
  }

  expect(expectedBreadcrumbText == breadcrumbText).toBeTruthy();
});

test("date error 1", async ({ page }) => {
  try {
    await page.goto("/objekty");
    const firstItem = page.getByTestId('result-item').first();
    await firstItem.locator(".extra .ui.button").click();

    await page.locator(".container a:right-of(.ui.header)").click();

    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.since']`)
      .click();
    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.since']`)
      .fill("-10000000");
    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.until']`)
      .click();
    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.until']`)
      .fill("-100");
    await page.locator(".ui.primary.button").click();

    await expect(page.locator('.ui.label[role="alert"]')).toBeVisible();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});

test("date error 2", async ({ page }) => {
  try {
    await page.goto("/objekty");
    const firstItem = page.getByTestId('result-item').first();
    await firstItem.locator(".extra .ui.button").click();

    await page.locator(".container a:right-of(.ui.header)").click();

    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.since']`)
      .click();
    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.since']`)
      .fill("-100");
    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.until']`)
      .click();
    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.until']`)
      .fill("-1000");
    await page.locator(".ui.primary.button").click();

    await expect(page.locator('.ui.label[role="alert"]')).toHaveCount(2);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});

test("valid num", async ({ page }) => {
  try {
    await page.goto("/objekty");
    const firstItem = page.getByTestId('result-item').first();
    await firstItem.locator(".extra .ui.button").click();

    await page.locator(".container a:right-of(.ui.header)").click();

    await page
      .locator(
        '.field:has(label[for="metadata.restorationObject.dimensions"]) .ui.button'
      )
      .click();
    await page
      .locator(
        '[id="metadata\\.restorationObject\\.dimensions\\[0\\]\\.value"]'
      )
      .click();
    await page
      .locator(
        '[id="metadata\\.restorationObject\\.dimensions\\[0\\]\\.value"]'
      )
      .fill("447e");
    await page.getByTestId("submit-button").click();

    await expect(page.locator('.ui.label[role="alert"]')).toBeVisible();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});

test("array field", async ({ page }) => {
  try {
    await page.goto("/objekty");
    const firstItem = page.getByTestId('result-item').first();
    await firstItem.locator(".extra .ui.button").click();

    await page.locator(".container a:right-of(.ui.header)").click();

    const numberOfFields = await page
      .locator("[name='metadata.restorationWork.supervisors']")
      .locator("visible=true")
      .count();

    const buttonSelector =
      '.field:has(label[for="metadata.restorationWork.supervisors"]) .ui.labeled.button';

    await page.click(buttonSelector);
    await page.waitForSelector(buttonSelector);

    page.waitForSelector(
      `input[id="metadata.restorationWork.supervisors[${numberOfFields}].fullName"]`
    );
    await expect(
      page.locator(
        `input[id="metadata.restorationWork.supervisors[${numberOfFields}].fullName"]`
      )
    ).toBeVisible();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});

test("successful edit form submit", async ({ page }) => {
  try {
    await page.goto("/objekty");
    const firstItem = page.getByTestId('result-item').first();
    const itemName = firstItem
      .locator(".header a")
      .textContent();
    await firstItem.locator(".extra .ui.button").click();

    await page.locator(".container a:right-of(.ui.header)").click();
    await page
      .locator(`[name='metadata.restorationObject.description']`)
      .fill("Description");

    // await page.click(`[name='metadata.restorationObject.itemTypes']:not(a.label):not(.icon)`);
    const dropdown = await page.$('div[name="metadata.restorationObject.itemTypes"]');
    
    if (dropdown) { 
      const boundingBox = await dropdown.boundingBox();
      
      if (boundingBox) { 
        const clickX = boundingBox.x + boundingBox.width / 2;
        const clickY = boundingBox.y + boundingBox.height / 2;
         
        await page.mouse.click(clickX, clickY);
      }
    }
    
    const treeFieldSubmitButton = page.locator(
      ".actions button:not(.ui.label button)"
    );

    const numberOfOptions = await page
      .locator(".tree-column.column .row")
      .locator("visible=true")
      .count();
    const randomIndex = await Math.floor(Math.random() * numberOfOptions);

    await page
      .locator(".tree-column .row.spaced")
      .locator("visible=true")
      .nth(randomIndex)
      .dblclick();

    await treeFieldSubmitButton.click();

    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.since']`)
      .click();
    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.since']`)
      .fill("-100");
    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.until']`)
      .click();
    await page
      .locator(`[name='metadata.restorationObject.creationPeriod.until']`)
      .fill("-10");

    const pagenav = page.waitForNavigation({ waitUntil: "load" });
    await page.getByTestId("submit-button").click();

    await pagenav;

    await expect(page).toHaveTitle(`${itemName} | Detail`);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});
