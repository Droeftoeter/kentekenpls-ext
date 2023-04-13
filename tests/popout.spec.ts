import { test, expect } from "./setup";

test.beforeEach(async ({ page, openExtension }) => {
    await page.goto("https://duckduckgo.com", { waitUntil: "networkidle" });

    const combobox = page.getByRole("combobox");
    await combobox.focus();
    await openExtension();
});

test("Category selector closes after pressing close button", async ({ page }) => {
    const popout = page.getByTestId("kentekenpls-window");

    const PERSONENAUTO = popout.getByText("Personenauto");
    const MOTOR = popout.getByText("Motor");

    expect(PERSONENAUTO).toBeVisible();
    expect(MOTOR).toBeVisible();

    await page.getByRole("button", { name: "Close" }).click();

    expect(await PERSONENAUTO.isVisible()).toBeFalsy();
    expect(await MOTOR.isVisible()).toBeFalsy();
});

test("Clicking on a folder moves the navigator into the folder", async ({ page }) => {
    const popout = page.getByTestId("kentekenpls-window");

    const PERSONENAUTO = popout.getByText("Personenauto");
    const DIEFSTALGEVOELIG = popout.getByText("Diefstalgevoelig")
    const GENERAL = popout.getByText("Algemeen");

    expect(await PERSONENAUTO.isVisible()).toBeTruthy();
    expect(await DIEFSTALGEVOELIG.isVisible()).toBeFalsy();

    await PERSONENAUTO.click();
    await DIEFSTALGEVOELIG.waitFor({ state: "visible" });
    expect(await DIEFSTALGEVOELIG.isVisible()).toBeTruthy();
    expect(await GENERAL.isVisible()).toBeFalsy();

    await DIEFSTALGEVOELIG.click();
    await GENERAL.waitFor({ state: "visible" });
    expect(await GENERAL.isVisible()).toBeTruthy();
});

test("Clicking on the arrow returns user to the parent folder", async ({ page }) => {
    const popout = page.getByTestId("kentekenpls-window");

    const PERSONENAUTO = popout.getByText("Personenauto");
    const BACK_ARROW = popout.getByRole("button", { name: "Back" });

    expect(await BACK_ARROW.isVisible()).toBeFalsy();

    await PERSONENAUTO.click();
    expect(await BACK_ARROW.isVisible()).toBeTruthy();

    await BACK_ARROW.click();
    expect(await BACK_ARROW.isVisible()).toBeFalsy();
});

test("Picking a category injects a license plate into the focused field", async ({ page }) => {
    const popout = page.getByTestId("kentekenpls-window");

    const BEDRIJFSWAGEN = popout.getByText("Bedrijfswagen");
    const MIDDELZWAAR = popout.getByText("Middelzwaar");
    const LOADER = popout.locator(`header[aria-busy="true"]`);

    await BEDRIJFSWAGEN.click();
    await MIDDELZWAAR.click();

    await LOADER.waitFor({ state: "hidden" });

    expect(await popout.isVisible()).toBeFalsy();

    const combobox = page.getByRole("combobox");
    expect(await combobox.inputValue()).toMatch(/[0-9A-Za-z]{6}/);
});