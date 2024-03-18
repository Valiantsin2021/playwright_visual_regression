import { defineConfig, devices } from '@playwright/test'

const crossBrowserConfig = {
  testDir: './tests',
  testMatch: /\w+.ui.spec.ts/,
  snapshotPathTemplate: '.screenshots/cross/{projectName}/{testFilePath}/{testName}/{arg}{ext}',
  expect: {
    timeout: 15_000,
    toHaveScreenshot: {
      threshold: 0.25,
      maxDiffPixelRatio: 0.025,
      maxDiffPixels: 25
    },
    toMatchSnapshot: {
      threshold: 0.25,
      maxDiffPixelRatio: 0.025,
      maxDiffPixels: 25
    }
  }
}

export default defineConfig({
  // other config here...
  use: {
    bypassCSP: true,
    viewport: null,
    launchOptions: { args: ['--start-maximized', '--ignore-certificate-errors'] },
    baseURL: 'https://www.automationexercise.com',
    headless: true,
    testIdAttribute: 'data-note',
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'cross-chromium',
      use: { ...devices['Desktop Chrome'] },
      ...crossBrowserConfig
    },
    {
      name: 'cross-firefox',
      use: { ...devices['Desktop Firefox'] },
      // dependencies: ['cross-chromium'],
      ...crossBrowserConfig
    },
    {
      name: 'cross-safari',
      use: { ...devices['Desktop Safari'], launchOptions: {} },
      // dependencies: ['cross-firefox'],
      ...crossBrowserConfig
    }
  ]
})
