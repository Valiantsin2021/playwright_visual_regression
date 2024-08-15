import { expect as baseExpect } from '@playwright/test'

export { test } from '@playwright/test'

// eslint-disable-next-line playwright/require-soft-assertions
export const expect = baseExpect.extend({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toBeValidDate(received: any) {
    const pass = Date.parse(received) && typeof received === 'string' ? true : false
    if (pass) {
      return {
        message: () => 'passed',
        pass: true
      }
    } else {
      return {
        message: () => `toBeValidDate() assertion failed.\nYou expected '${received}' to be a valid date.\n`,
        pass: false
      }
    }
  }
})
