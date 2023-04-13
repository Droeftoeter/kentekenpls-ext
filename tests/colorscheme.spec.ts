import { test, expect } from "./setup";

test.beforeEach(async ({ page, openExtension }) => {
    await page.goto("https://duckduckgo.com", { waitUntil: "networkidle" });

    const combobox = page.getByRole("combobox");
    await combobox.focus();
    await openExtension();
});

test.describe("user prefers a light colorscheme", () => {
    test.use({ colorScheme: "light" });

    test("shows category selector in light mode", async ({ page }) => {
        const popout = page.getByTestId("kentekenpls-window");

        const backgroundColor = await popout.evaluate(element => window.getComputedStyle(element).getPropertyValue("background-color"));
        expect(backgroundColor).toBe("rgb(255, 255, 255)");
    });
});

test.describe("user prefers a dark colorscheme", () => {
    test.use({ colorScheme: "dark" });

    test("shows category selector in dark mode", async ({ page }) => {
        const popout = page.getByTestId("kentekenpls-window");

        const backgroundColor = await popout.evaluate(element => window.getComputedStyle(element).getPropertyValue("background-color"));
        expect(backgroundColor).toBe("rgb(18, 18, 18)");
    });
});

