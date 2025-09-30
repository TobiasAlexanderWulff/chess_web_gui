import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: {
    timeout: 5_000
  },
  webServer: {
    // Build then serve the production preview on a fixed port to avoid
    // dev-server flakiness and port conflicts.
    command: "bash -c 'npm run build && npm run preview -- --port 5174 --strictPort'",
    url: "http://localhost:5174",
    timeout: 180_000,
    reuseExistingServer: !process.env.CI
  },
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:5174",
    trace: "retain-on-failure",
    video: "retain-on-failure"
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] }
    }
  ]
});
