import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  timeout: 45000,

  expect: {
    timeout: 10000
  },

  fullyParallel: true,

  retries: 1,

  reporter: [
    ['html', { open: 'never' }]
  ],

  use: {

    baseURL: 'https://qualidade.apprbs.com.br',

    headless: false,

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    ignoreHTTPSErrors: true

  },

  projects: [

    {
      name: 'edge-desktop',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge'
      }
    },

    {
      name: 'edge-mobile',
      use: {
        ...devices['iPhone 13'],
        channel: 'msedge'
      }
    }

  ]

});