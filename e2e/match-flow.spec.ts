import { test, expect } from "@playwright/test";

test.describe("Match setup", () => {
  test("selecting connectors updates the UI", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Chess Web GUI" })).toBeVisible();

    const httpButton = page.getByRole("button", { name: "Hosted Engine" });
    await expect(httpButton).toHaveClass(/selected/);

    const uciButton = page.getByRole("button", { name: "Local UCI" });
    await uciButton.click();

    await expect(uciButton).toHaveClass(/selected/);
  });
});
