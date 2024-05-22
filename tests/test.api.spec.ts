import { test, expect } from '@fixtures/fixtureApi.ts'
import { constants } from '@fixtures/constants/constants'

test.describe('API tests', () => {
  test(`GET Pikachu`, async ({ api }) => {
    const response = await api.getReq(constants.pokedex + '/pikachu')
    const data = await response.json()
    expect.soft(data.name).toBe('pikachu')
  })
})
