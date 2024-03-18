//@ts-check
import { BasePage } from '@pages/BasePage'
import { constants } from '@fixtures/constants/constants'
import { type Locator, type Page } from '@playwright/test'

export class TestCasesPage extends BasePage {
  header: Locator
  note: Locator
  links: Locator
  constructor(page: Page) {
    super(page)
    this.page = page
    this.header = page.locator('h2.title.text-center')
    this.note = page.getByText(constants.note)
    this.links = page.locator('.panel-title a')
  }
}
