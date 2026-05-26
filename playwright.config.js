const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  timeout: 30000,
  retries: 0, // ✅ Retry failed tests once

  reporter: [
    ['list'],
    ['allure-playwright']
  ],

  use: {
    headless: true,
    baseURL: 'https://example.com',

    actionTimeout: 15000,
    navigationTimeout: 30000,

    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'off',

    ignoreHTTPSErrors: true // ✅ optional but helpful in CI
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        ignoreHTTPSErrors: true
      }
    }
  ],
});