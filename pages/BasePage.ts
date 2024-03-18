import { type Page } from '@playwright/test'

export class BasePage {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  /**
   * @property {Function} openPage Opens Job Status page and wait until it loads
   * @param {string} link the url to open
   * @returns {Promise<void>}
   */

  async openPage(link: string): Promise<void> {
    await this.page.goto(link, {
      waitUntil: 'load'
    })
  }

  /**
   * @property {Function} goBack Opens Job Status page and wait until it loads
   * @returns {Promise<void>}
   */

  async goBack(): Promise<void> {
    await this.page.goBack({
      waitUntil: 'load'
    })
  }

  /**
   * @property {Function} close Opens Job Status page and wait until it loads
   * @returns {Promise<void>}
   */

  async close(): Promise<void> {
    await this.page.close()
  }

  /**
   * The method to save the session into the auth json file
   * @property {Function} saveStorage Waits untill the Batch job table to completely load
   * @param {string} file the string with the path to the file to save the storage state
   * @returns {Promise<void>}
   */

  async saveStorage(file: string): Promise<void> {
    await this.page.context().storageState({ path: file })
  }
}
