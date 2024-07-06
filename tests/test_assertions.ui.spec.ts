import { expect } from '@fixtures/fixture'
import { test } from '@fixtures/fixtureApi'

test(`request intercept, mock and control`, async ({ page }) => {
  await page.route('*/**/portal/**', async route => {
    const json = [{ name: 'Strawberry', id: 21 }]
    const res = await route.fetch()
    console.log((await res.body()).toString('utf-8'))
    await route.fulfill({ json })
  })
  expect.soft(42).toBeNumber()
  page.once('request', request => console.log(`Request sent: ${request.url()}`))
  const listener = request => console.log(`Request finished: ${request.url()}`)
  page.once('requestfinished', listener)
  await page.goto('https://wikipedia.org')

  page.off('requestfinished', listener)
  page.on('request', request => console.log(`Request sent: ${request.url()}`))
  await page.goto('https://www.openstreetmap.org/')
})
test(`assertions`, async ({ api }) => {
  const response = await api.getReq('https://jsonplaceholder.typicode.com/todos/1')
  await expect.soft(response).toBeOK()
  expect.soft(response.status()).toBe(200)
})
