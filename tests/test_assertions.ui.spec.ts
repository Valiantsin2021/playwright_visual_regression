import { test, expect } from '@fixtures/fixture'

test(``, async ({ page }) => {
  expect.soft(42).toBeNumber()
  page.once('request', request => console.log(`Request sent: ${request.url()}`))
  const listener = request => console.log(`Request finished: ${request.url()}`)
  page.once('requestfinished', listener)
  await page.goto('https://wikipedia.org')

  page.off('requestfinished', listener)
  page.on('request', request => console.log(`Request sent: ${request.url()}`))
  await page.goto('https://www.openstreetmap.org/')
})
