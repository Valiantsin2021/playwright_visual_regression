import { API } from '@myhelper/ApiHandler'
import { Logger } from '@myhelper/Logger'
import { test as base } from '@playwright/test'
// Declare the types of your fixtures.
type MyFixtures = {
  api: API
}

export const test = base.extend<MyFixtures>({
  api: async ({ request }, use, testInfo) => {
    const api = new API(request)
    await api.enableLog(process.env.LOG || true)
    await use(api)
    if (testInfo.status !== testInfo.expectedStatus) {
      Logger.logToFile(`FAILED: ${testInfo.title} -- ${testInfo.status} \n${testInfo.error.message}`)
    }
  }
})
export { expect } from '@playwright/test'
