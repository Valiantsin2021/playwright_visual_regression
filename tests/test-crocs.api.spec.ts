import { expect, test } from '@fixtures/fixtureApi'
const baseUrl = process.env.CROCODILES_URI

test.describe.serial('API tests', () => {
  test.beforeAll(async ({ api }) => {
    const { USER: user, PASS: password } = process.env
    const payload = {
      username: user,
      password: password
    }
    const response = await api.postReq(baseUrl + '/auth/token/login/', payload)
    expect.soft([200, 201, 204, 207], 'Response status code is one of [200, 201, 204, 207]').toContain(response.status())
    const body = await response.json()
    const token = body['access']
    process.env.TOKEN = token
  })
  test(`GET Crocs`, async ({ api }) => {
    const response = await api.getReq(baseUrl + '/public/crocodiles')
    expect.soft([200, 201, 204, 207], 'Response status code is one of [200, 201, 204, 207]').toContain(response.status())
    const body = await response.json()
    expect.soft(body[0]['id'], 'Assert body[0]["id"] is a number 1').toBe(1)
    expect.soft(body[0]['name'], 'Assert body[0]["name"] is a string "Bert"').toBe('Bert')
    expect.soft(body[0]['sex'], 'Assert body[0]["sex"] is a string "M"').toBe('M')
    expect.soft(body[0]['date_of_birth'], 'Assert body[0]["date_of_birth"] matches pattern').toMatch(/^(\d{4})(-|\/)(\d{2})(-|\/)(\d{2})$/)
    expect.soft(body[0]['age'], 'Assert body[0]["age"] is a number 13').toBe(14)
    expect.soft(body[1]['id'], 'Assert body[1]["id"] is a number 2').toBe(2)
    expect.soft(body[1]['name'], 'Assert body[1]["name"] is a string "Ed"').toBe('Ed')
    expect.soft(body[1]['sex'], 'Assert body[1]["sex"] is a string "M"').toBe('M')
    expect.soft(body[1]['date_of_birth'], 'Assert body[1]["date_of_birth"] matches pattern').toMatch(/^(\d{4})(-|\/)(\d{2})(-|\/)(\d{2})$/)
    expect.soft(body[1]['age'], 'Assert body[1]["age"] is a number 29').toBe(29)
    expect.soft(body[2]['id'], 'Assert body[2]["id"] is a number 3').toBe(3)
    expect.soft(body[2]['name'], 'Assert body[2]["name"] is a string "Lyle the Crocodile"').toBe('Lyle the Crocodile')
    expect.soft(body[2]['sex'], 'Assert body[2]["sex"] is a string "M"').toBe('M')
    expect.soft(body[2]['date_of_birth'], 'Assert body[2]["date_of_birth"] matches pattern').toMatch(/^(\d{4})(-|\/)(\d{2})(-|\/)(\d{2})$/)
    expect.soft(body[2]['age'], 'Assert body[2]["age"] is a number 39').toBe(39)
    expect.soft(body[3]['id'], 'Assert body[3]["id"] is a number 4').toBe(4)
    expect.soft(body[3]['name'], 'Assert body[3]["name"] is a string "Solomon"').toBe('Solomon')
    expect.soft(body[3]['sex'], 'Assert body[3]["sex"] is a string "M"').toBe('M')
    expect.soft(body[3]['date_of_birth'], 'Assert body[3]["date_of_birth"] matches pattern').toMatch(/^(\d{4})(-|\/)(\d{2})(-|\/)(\d{2})$/)
    expect.soft(body[3]['age'], 'Assert body[3]["age"] is a number 30').toBe(30)
    expect.soft(body[4]['id'], 'Assert body[4]["id"] is a number 5').toBe(5)
    expect.soft(body[4]['name'], 'Assert body[4]["name"] is a string "The gharial"').toBe('The gharial')
    expect.soft(body[4]['sex'], 'Assert body[4]["sex"] is a string "F"').toBe('F')
    expect.soft(body[4]['date_of_birth'], 'Assert body[4]["date_of_birth"] matches pattern').toMatch(/^(\d{4})(-|\/)(\d{2})(-|\/)(\d{2})$/)
    expect.soft(body[4]['age'], 'Assert body[4]["age"] is a number 20').toBe(20)
    expect.soft(body[5]['id'], 'Assert body[5]["id"] is a number 6').toBe(6)
    expect.soft(body[5]['name'], 'Assert body[5]["name"] is a string "Sang Buaya"').toBe('Sang Buaya')
    expect.soft(body[5]['sex'], 'Assert body[5]["sex"] is a string "F"').toBe('F')
    expect.soft(body[5]['date_of_birth'], 'Assert body[5]["date_of_birth"] matches pattern').toMatch(/^(\d{4})(-|\/)(\d{2})(-|\/)(\d{2})$/)
    expect.soft(body[5]['age'], 'Assert body[5]["age"] is a number 18').toBe(18)
    expect.soft(body[6]['id'], 'Assert body[6]["id"] is a number 7').toBe(7)
    expect.soft(body[6]['name'], 'Assert body[6]["name"] is a string "Sobek"').toBe('Sobek')
    expect.soft(body[6]['sex'], 'Assert body[6]["sex"] is a string "F"').toBe('F')
    expect.soft(body[6]['date_of_birth'], 'Assert body[6]["date_of_birth"] matches pattern').toMatch(/^(\d{4})(-|\/)(\d{2})(-|\/)(\d{2})$/)
    expect.soft(body[6]['age'], 'Assert body[6]["age"] is a number 169').toBe(169)
    expect.soft(body[7]['id'], 'Assert body[7]["id"] is a number 8').toBe(8)
    expect.soft(body[7]['name'], 'Assert body[7]["name"] is a string "Curious George"').toBe('Curious George')
    expect.soft(body[7]['sex'], 'Assert body[7]["sex"] is a string "M"').toBe('M')
    expect.soft(body[7]['date_of_birth'], 'Assert body[7]["date_of_birth"] matches pattern').toMatch(/^(\d{4})(-|\/)(\d{2})(-|\/)(\d{2})$/)
    expect.soft(body[7]['age'], 'Assert body[7]["age"] is a number 43').toBe(43)
  })
  test(`GET my crocodiles`, async ({ api }) => {
    const response = await api.getReq(baseUrl + '/my/crocodiles', process.env.TOKEN)
    const body = await response.json()
    console.log(body)
  })
})
