import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 1,
  workers: 3,
  reporter: "html",
  use: {
    // baseURL: "https://studcode.ru",
    baseURL: "http://localhost:3030",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  webServer: {
    command: "pnpm run dev ",
    url: "http://localhost:3030",
    reuseExistingServer: !process.env.CI,
  },
})
