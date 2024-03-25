import { test, expect, Locator } from "playwright/test";

const url = "https://127.0.0.1:5000/";

test("file download after clicking link", async ({ page, request }) => {
  try {
    const response = await request.get(
      `https://127.0.0.1:5000/api/user/objects/?q=&sort=newest&page=2&size=10`
    );

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.body();
    const responseData = JSON.parse(responseBody.toString());
    const responseID = responseData.hits.hits[4].id;

    const response2 = await request.get(responseData.hits.hits[4].links.files);

    const responseBody2 = await response2.body();
    const responseData2 = JSON.parse(responseBody2.toString());

    if (responseData2.entries && responseData2.entries.length > 0) {
      const pdfFile = responseData2.entries.find(
        (entry) => entry.metadata.mimetype === "application/pdf"
      );

      if (pdfFile) {
        const fileName = pdfFile.key;

        const downloadPromise = page.waitForEvent("download");
        await page.goto(`${url}objekty/${responseID}`);

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

test("images carousel", async ({ page, request }) => {
    const response = await request.get(
      `https://127.0.0.1:5000/api/user/objects/?q=&sort=newest&page=2&size=10`
    );
  
    expect(response.ok()).toBeTruthy();
  
    const responseBody = await response.body();
    const responseData = JSON.parse(responseBody.toString());
    const responseID = responseData.hits.hits[4].id;
    const filesLinks = responseData.hits.hits[4].links.files;
  
    const responseFiles = await request.get(filesLinks);
  
    expect(response.ok()).toBeTruthy();
  
    const responseBodyFiles = await responseFiles.body();
    const responseDataFiles = JSON.parse(responseBodyFiles.toString());
  
    const filesContents = [];
    const filesNames = [];
  
    responseDataFiles.entries.map((element) => {
      filesContents.push(element.links.content);
      filesNames.push(element.metadata.caption);
    });
  
    await page.goto(`${url}objekty/${responseID}`);
    await page.getByRole("img", { name: `${filesNames[0]}` }).first().click();
  
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