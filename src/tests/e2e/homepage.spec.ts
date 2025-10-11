import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    // Set a longer timeout for navigation
    page.setDefaultTimeout(60000);
    page.setDefaultNavigationTimeout(60000);
  });

  test("should load successfully", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Check the title contains marketplace text
    const title = await page.title();
    expect(title.toLowerCase()).toContain("marketplace");
  });

  test("should have navigation", async ({ page, isMobile }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Wait for the page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Check for header existence
    const header = page.locator("header").first();
    await expect(header).toBeVisible({ timeout: 10000 });

    // Only check for desktop nav on non-mobile devices
    if (!isMobile) {
      // Check for some navigation presence (be flexible with the selector)
      const navElement = page.locator("nav").first();
      const count = await navElement.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test("should be responsive", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Just check that the page loads at different viewport sizes
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator("body")).toBeVisible();

    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator("body")).toBeVisible();
  });
});
