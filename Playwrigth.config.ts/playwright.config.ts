import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 30000,

  expect: {
    timeout: 10000
  },

  fullyParallel: false,

  retries: 0,

  reporter: [['html', { open: 'never' }]],

  use: {

    headless: false,

    browserName: 'chromium',

    launchOptions: {
      executablePath: 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe'
    },

    ignoreHTTPSErrors: true,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'on-first-retry'
  }
});