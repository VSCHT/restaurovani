import { test, expect } from "playwright/test";
const callAPI = require("./api-call.spec.ts");

test("file download after clicking link", async ({
  page,
  request,
  baseURL,
}) => {
  try {
    const responseData = await callAPI(baseURL, request);
    const response2 = await request.get(responseData.links.files);

    const responseBody2 = await response2.body();
    const responseData2 = JSON.parse(responseBody2.toString());

    if (responseData2.entries && responseData2.entries.length > 0) {
      const pdfFile = responseData2.entries.find(
        (entry) => entry.metadata.mimetype === "application/pdf"
      );

      if (pdfFile) {
        const fileName = pdfFile.key;

        const downloadPromise = page.waitForEvent("download");
        await page.goto(`/objekty/${responseData.id}`);

        await page.waitForSelector(`a:text('${fileName}')`);
        await page.click(`a:text('${fileName}')`);

        const download = await downloadPromise;
        expect(download.suggestedFilename()).toContain(".pdf");
      } else {
        throw new Error("No PDF file found in responseData2.entries");
      }
    } else {
      throw new Error("No files found in responseData2.entries");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
});

test("images carousel", async ({ page, request, baseURL }) => {
  const responseData = await callAPI(baseURL, request);

  const responseID = responseData.id;
  const filesLinks = responseData.links.files;

  const responseFiles = await request.get(filesLinks);

  const responseBodyFiles = await responseFiles.body();
  const responseDataFiles = JSON.parse(responseBodyFiles.toString());

  const filesContents = [];
  const filesNames = [];

  responseDataFiles.entries.map((element) => {
    filesContents.push(element.links.content);
    filesNames.push(element.metadata.caption);
  });

  await page.goto(`/objekty/${responseID}`);
  await page
    .getByRole("img", { name: `${filesNames[0]}` })
    .first()
    .click();

  await expect(page.locator(".image > div > img")).toHaveAttribute(
    "src",
    filesContents[0]
  );
  await page.getByRole("button").nth(3).click();
  await expect(page.locator(".image > div > img")).toHaveAttribute(
    "src",
    filesContents[1]
  );
});

test("detail page title", async ({ page, request, baseURL }) => {
  const responseData = await callAPI(baseURL, request);

  const responseID = responseData.id;
  const responseName = responseData.metadata.restorationObject.title;

  await page.goto(`/objekty/${responseID}`);
  await expect(page).toHaveTitle(`${responseName} | Detail`);
});
