import { test as base } from '@playwright/test'
import { API } from '@myhelper/ApiHandler'

// Declare the types of your fixtures.
type MyFixtures = {
  api: API
}

export const test = base.extend<MyFixtures>({
  api: async ({ request }, use) => {
    const api = new API(request)
    await use(api)
  }
})
export { expect } from '@playwright/test'
