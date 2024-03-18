// @ts-check
import { defineConfig } from '@playwright/test'
import 'dotenv/config'
const date = new Date().getTime()
const outputDir = `./report/${date}`
const isCI = !!process.env.CI
/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // workers: 3,
  timeout: 120_000,
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
  },
  // ignoreSnapshots: !process.env.CI,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reportSlowTests: null,
  ignoreSnapshots: isCI,
  snapshotPathTemplate: '.screenshots/snaps/{projectName}/{testFilePath}/{testName}/{arg}{ext}',
  reporter: [
    ['list', { printSteps: true }],
    [
      'monocart-reporter',
      {
        name: 'My Test Report',
        outputFile: `${outputDir}/index.html`
      }
    ],
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: './report/allure-results',
        suiteTitle: true,
        environmentInfo: {
          Environment: process.env.ENV,
          User: process.env.USER,
          NodeJS_version: process.version,
          OS: process.platform
        }
      }
    ],
    ['junit', { outputFile: `./report/playwright_${new Date().getTime()}.xml` }]
  ],
  use: {
    bypassCSP: true,
    retries: 1,
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
      name: 'Visual_regression_tests',
      testMatch: /\w+.ui.spec.ts/,
      use: {
        channel: 'chrome'
      }
    }
  ]
})
