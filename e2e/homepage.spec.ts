import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Zuno Marketplace/i);
  });

  test("should have navigation", async ({ page }) => {
    await page.goto("/");

    // Check for common navigation elements
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();
  });

  test("should be responsive", async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });
});
