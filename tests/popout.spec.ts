import { test, expect } from "./setup";

test.beforeEach(async ({ page, openExtension }) => {
    await page.goto("https://duckduckgo.com", { waitUntil: "networkidle" });

    const combobox = page.getByRole("combobox");
    await combobox.focus();
    await openExtension();
});

test("Category selector closes after pressing close button", async ({ page, openExtension }) => {
    const PERSONENAUTO = page.getByText("Personenauto");
    const MOTOR = page.getByText("Motor");

    expect(PERSONENAUTO).toBeVisible();
    expect(MOTOR).toBeVisible();

    await page.getByRole("button", { name: "Close" }).click();

    expect(await PERSONENAUTO.isVisible()).toBeFalsy();
    expect(await MOTOR.isVisible()).toBeFalsy();
});