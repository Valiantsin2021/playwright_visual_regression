//@ts-check
import { BasePage } from '@pages/BasePage'
import { constants } from '@fixtures/constants/constants'
import { type Locator, type Page } from '@playwright/test'

export class LoginPage extends BasePage {
  signupUsernameInput: Locator
  signupEmailInput: Locator
  loginEmailInput: Locator
  loginPasswordInput: Locator
  loginBtn: Locator
  signupBtn: Locator
  failedLoginMsg: Locator
  failedRegistrationMsg: Locator
  constructor(page: Page) {
    super(page)
    this.page = page
    this.signupUsernameInput = page.getByTestId('signup-name')
    this.signupEmailInput = page.getByTestId('signup-email')
    this.loginEmailInput = page.getByTestId('login-email')
    this.loginPasswordInput = page.getByTestId('login-password')
    this.loginBtn = page.getByTestId('login-button')
    this.signupBtn = page.getByTestId('signup-button')
    this.failedLoginMsg = page.getByText(constants.failedLoginMsg)
    this.failedRegistrationMsg = page.getByText(constants.failedRegistrationMsg)
  }

  /**
   * Logs in to the application with the provided email and password.
   * @param {string} email - The email address of the user.
   * @param {string} pass - The password of the user.
   * @returns {Promise<void>} - A promise that resolves after the login process is complete.
   */
  async login(email: string, pass: string): Promise<void> {
    await this.loginEmailInput.fill(email)
    await this.loginPasswordInput.fill(pass)
    await this.loginBtn.click()
    await this.page.waitForLoadState('domcontentloaded')
  }
  /**
   * Signs up a new user with the provided username and email.
   * @param {string} name - The username of the new user.
   * @param {string} email - The email address of the new user.
   * @returns {Promise<void>} - A promise that resolves after the signup process is complete.
   */
  async signUp(name: string, email: string): Promise<void> {
    await this.signupUsernameInput.fill(name)
    await this.signupEmailInput.fill(email)
    await this.signupBtn.click()
  }
}
