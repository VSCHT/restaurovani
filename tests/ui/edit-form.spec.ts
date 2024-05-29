import { test, expect } from "playwright/test";

async function getClickLocation(dropdownLocator) {
  const dropdownBox = await dropdownLocator.boundingBox();
  if (!dropdownBox) {
    throw new Error("Dropdown not found");
  }

  const labels = await dropdownLocator.locator(".label").elementHandles();
  const icons = await dropdownLocator.locator(".icon").elementHandles();

  const isPointInsideBox = (point, box) => {
    return (
      point.x >= box.x &&
      point.x <= box.x + box.width &&
      point.y >= box.y &&
      point.y <= box.y + box.height
    );
  };

  const findNonCollidingPoint = async () => {
    for (let i = 0; i < 10; i++) {
      const point = {
        x: dropdownBox.x + Math.random() * dropdownBox.width,
        y: dropdownBox.y + Math.random() * dropdownBox.height,
      };

      let collision = false;
      for (const element of [...labels, ...icons]) {
        const box = await element.boundingBox();
        if (box && isPointInsideBox(point, box)) {
          collision = true;
          break;
        }
      }

      if (!collision) {
        return point;
      }
    }

    return {
      x: dropdownBox.x + dropdownBox.width / 2,
      y: dropdownBox.y + dropdownBox.height / 2,
    };
  };

  return await findNonCollidingPoint();
}

test("tree-field visibility, mouse manipulation and selected result check", async ({
  page,
}) => {
  await page.goto("/objekty");
  const firstItem = page.getByTestId("result-item").first();
  await firstItem.locator(".extra .ui.button").click();

  await page.locator(".container a:right-of(.ui.header)").click();

  const dropdownLocator = page.locator(
    '.ui.dropdown[name="metadata.restorationObject.itemTypes"]'
  );
  const clickPoint = await getClickLocation(dropdownLocator);
  await page.mouse.click(clickPoint.x, clickPoint.y);

  await page.waitForSelector(".ui.modal.tree-field");
  await expect(page.locator(".ui.modal.tree-field")).toBeVisible();

  const submitButton = page.locator(".actions button:not(.ui.label button)");

  const numberOfOptions = await page
    .locator(".tree-column.column .row")
    .locator("visible=true")
    .count();
  const randomIndex = Math.floor(Math.random() * numberOfOptions);

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

  const lastLabelBreadcrumbText = await page
    .locator(".ui.label .ui.breadcrumb")
    .last()
    .innerText();

  expect(lastLabelBreadcrumbText).toContain(checkedButtonText);

  await submitButton.click();

  await expect(page.locator(".tree-field").first()).toBeHidden();
  await expect(
    page.locator("a").filter({ hasText: checkedButtonText })
  ).toHaveCount(1);
});

test("tree-field keyboard manipulation and selected result check", async ({
  page,
}) => {
  await page.goto("/objekty");
  const firstItem = page.getByTestId("result-item").first();
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
    const firstItem = page.getByTestId("result-item").first();
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
    const firstItem = page.getByTestId("result-item").first();
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
    await page.locator('.title:has-text("category")').click();

    const checkbox = await page.locator('input[type="checkbox"][value="sklo"]');

    await checkbox.click({ force: true });

    const firstItem = page.getByTestId("result-item").first();
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

    const firstItem = page.getByTestId("result-item").first();
    await firstItem.locator(".extra .ui.button").click();

    await page.locator(".container a:right-of(.ui.header)").click();

    const numberOfFields = await page
      .locator("[name='metadata.restorationWork.supervisors']")
      .locator(":visible")
      .count();

    const buttonSelector =
      '.field:has(label[for="metadata.restorationWork.supervisors"]) .ui.labeled.button';

    await page.click(buttonSelector);
    await page.waitForSelector(buttonSelector);

    await page.waitForSelector(
      `input[id="metadata.restorationWork.supervisors[${numberOfFields}].fullName"]`,
      { state: "visible" }
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

    const firstItem = page.getByTestId("result-item").first();
    const itemName = (await firstItem.locator(".header a").textContent()) || "";

    await firstItem.locator(".extra .ui.button").click();
    await page.locator(".container a:right-of(.ui.header)").click();

    await page
      .locator(`[name='metadata.restorationObject.description']`)
      .fill("Description");

    const dropdownLocator = page.locator(
      '.ui.dropdown[name="metadata.restorationObject.itemTypes"]'
    );
    const clickPoint = await getClickLocation(dropdownLocator);
    await page.mouse.click(clickPoint.x, clickPoint.y);

    const treeFieldSubmitButton = page.locator(
      ".actions button:not(.ui.label button)"
    );

    const numberOfOptions = await page
      .locator(".tree-column.column .row:visible")
      .count();
    const randomIndex = Math.floor(Math.random() * numberOfOptions);

    await page
      .locator(".tree-column .row.spaced:visible")
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
