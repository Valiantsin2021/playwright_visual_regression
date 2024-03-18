import { BasePage } from '@pages/BasePage'
import { type Locator, type Page } from '@playwright/test'

export class ContactUsPage extends BasePage {
  noteMsg: Locator
  nameInput: Locator
  emailInput: Locator
  subjectInput: Locator
  messageTextarea: Locator
  filePicker: Locator
  submitBtn: Locator
  successMsg: Locator
  goHomeBtn: Locator
  constructor(page: Page) {
    super(page)
    this.page = page
    this.noteMsg = page.getByText('Note: Below contact form is for testing purpose.')
    this.nameInput = page.getByTestId('name')
    this.emailInput = page.getByTestId('email')
    this.subjectInput = page.getByTestId('subject')
    this.messageTextarea = page.getByTestId('message')
    this.filePicker = page.locator('[name="upload_file"]')
    this.submitBtn = page.getByTestId('submit-button')
    this.successMsg = page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.')
    this.goHomeBtn = page.locator('#form-section a')
  }
  /**
   * The method to upload the file to Batch job modal
   * @property {Function} uploadFile Set input file for upload
   * @param {string} filename the file name to upload
   * @returns {Promise<void>} A promise that resolves when the file is successfully uploaded.
   */

  async uploadFile(filename: string): Promise<void> {
    await this.filePicker.setInputFiles(filename)
  }
  /**
   * Asynchronously fills in the contact form with the provided name, email, subject, message, and filename, and then submits the form.
   *
   * @param {string} name - The name to be filled in the contact form.
   * @param {string} email - The email to be filled in the contact form.
   * @param {string} subject - The subject to be filled in the contact form.
   * @param {string} message - The message to be filled in the contact form.
   * @param {string} filename - The name of the file to be uploaded.
   * @return {Promise<void>} A promise that resolves when the form is successfully submitted.
   */
  async getInTouch(name: string, email: string, subject: string, message: string, filename: string): Promise<void> {
    await this.nameInput.fill(name)
    await this.emailInput.fill(email)
    await this.subjectInput.fill(subject)
    await this.messageTextarea.fill(message)
    await this.uploadFile(filename)
    await this.submitBtn.click()
  }
}
