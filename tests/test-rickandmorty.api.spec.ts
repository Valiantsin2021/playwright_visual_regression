import { test, expect } from '@fixtures/fixtureApi.ts'
import { constants } from '@fixtures/constants/constants'
// import fs from 'fs'
const links = []

test.describe.serial('API tests Rick and Morty', () => {
  test(`GET list of links from main endpoint`, async ({ api }) => {
    const response = await api.getReq(constants.rickAndMorty)
    const data = await response.json()
    Object.values(data).forEach(el => {
      expect.soft(el).toMatch(/https?:\/\/\w+.com\/api\/\w+/)
      links.push(el)
    })
  })
  test(`GET check links count`, async ({ api }) => {
    for (let i = 0; i < links.length; i++) {
      const response = await api.getReq(links[i])
      const data = await response.json()
      expect.soft(data.info.count).toBeGreaterThan(0)
    }
  })
  test.skip(`GET all persons from the locations links recursively`, async ({ api }) => {
    const persons = {}
    const getPerson = async function (url) {
      const response = await api.getReq(url)
      const data = await response.json()
      if (!persons[data.name]) {
        persons[data.name] = {}
        persons[data.name]['status'] = data.status
        persons[data.name]['species'] = data.species
        persons[data.name]['gender'] = data.gender
        persons[data.name]['image'] = data.image
      }
    }
    const locations = links.filter(el => el.includes('location'))
    const results = await api.getReq(locations[0])
    const data = await results.json()
    const count = data.info.pages
    for (let i = 1; i <= count; i++) {
      const result = await api.getReq(locations[0] + `?page=${i}`)
      const data = await result.json()
      for (let j = 0; j < data.results.length; j++) {
        for (let k = 0; k < data.results[j].residents.length; k++) {
          await getPerson(data.results[j].residents[k])
        }
      }
    }
    expect.soft(Object.keys(persons).length).toBe(736)
    console.log(`Total persons: ${Object.keys(persons).length}`)
    // fs.writeFileSync('./fixtures/persons.json', JSON.stringify(persons))
  })
  test.skip(`GET all persons from the characters links recursively`, async ({ api }) => {
    const persons = {}
    const personsEndpoint = links.filter(el => el.includes('character'))
    const response = await api.getReq(personsEndpoint[0])
    const data = await response.json()
    const {pages} = data.info
    for (let i = 1; i <= pages; i++) {
      const result = await api.getReq(personsEndpoint[0] + `?page=${i}`)
      const data = await result.json()
      for (let j = 0; j < data.results.length; j++) {
        if (!persons[data.results[j].name]) {
          // console.log(data.results[j].name)
          persons[data.results[j].name] = {}
          persons[data.results[j].name]['status'] = data.results[j].status
          persons[data.results[j].name]['species'] = data.results[j].species
          persons[data.results[j].name]['gender'] = data.results[j].gender
          persons[data.results[j].name]['image'] = data.results[j].image
        }
      }
    }
    // fs.writeFileSync('./fixtures/persons.json', JSON.stringify(persons))
  })
})
