import { test as base, chromium, type BrowserContext } from "@playwright/test";
import path from "node:path";

export const test = base.extend<{
  context: BrowserContext;
  openExtension: () => Promise<void>;
}>({
  // biome-ignore lint/correctness/noEmptyPattern: <explanation>
  context: async ({}, use) => {
    const pathToExtension = path.join(__dirname, "../extension/dist/chrome");
    const dataDir = path.join(__dirname, "../.chromium");

    const context = await chromium.launchPersistentContext(dataDir, {
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
      ignoreDefaultArgs: [
        "--disable-component-extensions-with-background-pages",
      ],
    });

    await use(context);
    await context.close();
  },
  openExtension: async ({ context }, use) => {
    const [worker] = context.serviceWorkers();

    if (worker) {
      use(async () => {
        await worker.evaluate(() => {
          // @ts-ignore
          chrome.commands.onCommand.dispatch("kenteken-pls");
        });
      });
    }
  },
});

export const expect = test.expect;
