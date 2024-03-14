import { test as baseTest, expect } from "playwright/test";
import fs from "fs-extra";
import path from "path";



export * from "playwright/test";

export const test = baseTest.extend<{}, { workerStorageState: string }>({
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  workerStorageState: [
    async ({ browser}, use) => {
      const id = test.info().parallelIndex;
      const fileName = path.resolve(
        test.info().project.outputDir,
        `.auth/${id}.json`
      );

      if (fs.existsSync(fileName)) {
        await use(fileName);
        return;
      }

      const page = await browser.newPage({ storageState: undefined });
      const url =' https://127.0.0.1:5000/'
    
      await page.goto(`${url}login`);
      await page.getByPlaceholder("Email Address").fill("makisheva@cesnet.cz");
      await page.getByPlaceholder("Password").fill("cesnet1");
      await page.getByRole("button", { name: "Log in" }).click();

      await page.waitForURL(url);

      await page.context().storageState({ path: fileName });
      await page.close();
      await use(fileName);
    },
    { scope: "worker" },
  ],
});
