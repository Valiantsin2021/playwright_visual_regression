import { type Page, type Locator } from "@playwright/test"

export class SignupComponent {
  page: Page
  radioMail: Locator
  signupUsernameInput: Locator
  signupEmailInput: Locator
  passwordInput: Locator
  daysDropdown: Locator
  monthsDropdown: Locator
  yearsDropdown: Locator
  newsLetterCheckbox: Locator
  firstnameInput: Locator
  lastnameInput: Locator
  addressInput: Locator
  countryDropdown: Locator
  stateInput: Locator
  cityInput: Locator
  zipCodeInput: Locator
  mobilePhoneInput: Locator
  createAccountBtn: Locator
  
  constructor(page: Page) {
    this.page = page
    this.radioMail = page.getByLabel('Mr.')
    this.signupUsernameInput = page.getByTestId('name')
    this.signupEmailInput = page.getByTestId('email')
    this.signupEmailInput = page.getByTestId('email')
    this.passwordInput = page.getByTestId('password')
    this.daysDropdown = page.getByTestId('days')
    this.monthsDropdown = page.getByTestId('months')
    this.yearsDropdown = page.getByTestId('years')
    this.newsLetterCheckbox = page.locator('#newsletter')
    this.firstnameInput = page.getByTestId('first_name')
    this.lastnameInput = page.getByTestId('last_name')
    this.addressInput = page.getByTestId('address')
    this.countryDropdown = page.getByTestId('country')
    this.stateInput = page.getByTestId('state')
    this.cityInput = page.getByTestId('city')
    this.zipCodeInput = page.getByTestId('zipcode')
    this.mobilePhoneInput = page.getByTestId('mobile_number')
    this.createAccountBtn = page.getByTestId('create-account')
  }
  /**
   * Register a new user with the provided information.
   *
   * @param {Object} user - the user object containing the user information
   * @return {Promise<void>} a promise that resolves when the user is successfully registered
   */
  async registerUser(user): Promise<void> {
    await this.passwordInput.fill(user.password)
    await this.daysDropdown.selectOption({ value: user.dateOfBirth.match(/\d+/)[2] })
    await this.monthsDropdown.selectOption({ value: user.dateOfBirth.match(/\d+/)[1] })
    await this.yearsDropdown.selectOption({ value: user.dateOfBirth.match(/\d+/)[0] })
    await this.newsLetterCheckbox.check()
    await this.firstnameInput.fill(user.firstName)
    await this.lastnameInput.fill(user.lastName)
    await this.addressInput.fill(user.street)
    await this.countryDropdown.selectOption({ value: user.country })
    await this.stateInput.fill(user.state)
    await this.cityInput.fill(user.city)
    await this.zipCodeInput.fill(user.postalCode)
    await this.mobilePhoneInput.fill(user.phoneNumber)
    await this.createAccountBtn.click()
  }
}
