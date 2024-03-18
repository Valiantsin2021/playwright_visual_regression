import { BasePage } from '@pages/BasePage'
import { type Locator, type Page } from '@playwright/test'

export class HomePage extends BasePage {
  menu: Locator
  loginLink: Locator
  subscribeInput: Locator
  subscribeBtn: Locator
  subscribedMsg: Locator
  contuctUsLink: Locator
  testCasesLink: Locator
  productsLink: Locator
  cartLink: Locator
  header: Locator
  deleteUserBtn: Locator
  logoutBtn: Locator
  continueBtn: Locator
  accountCreatedMessage: Locator
  accountDeletedMessage: Locator
  carousel: Locator
  leftSideBar: Locator
  footerWidget: Locator
  featureItemsContainer: Locator
  constructor(page: Page) {
    super(page)
    this.page = page
    this.menu = page.locator('div.shop-menu')
    this.loginLink = page.getByText(' Signup / Login')
    this.subscribeInput = page.locator('#susbscribe_email')
    this.subscribeBtn = page.locator('#subscribe')
    this.subscribedMsg = page.getByText('You have been successfully subscribed!')
    this.contuctUsLink = page.getByText(' Contact us')
    this.testCasesLink = page.getByRole('link', { name: ' Test Cases' })
    this.productsLink = page.getByRole('link', { name: ' Products' })
    this.cartLink = page.getByRole('link', { name: ' Cart' })
    this.header = page.getByRole('heading', { name: 'AutomationExercise' }).locator('span')
    this.deleteUserBtn = page.getByText(' Delete Account')
    this.logoutBtn = page.getByText(' Logout')
    this.continueBtn = page.getByTestId('continue-button')
    this.accountCreatedMessage = page.getByText('ACCOUNT CREATED!')
    this.accountDeletedMessage = page.getByText('ACCOUNT DELETED!')
    this.carousel = page.locator('.carousel-inner')
    this.leftSideBar = page.locator('.left-sidebar')
    this.footerWidget = page.locator('.footer-widget')
    this.featureItemsContainer = page.locator('.features_items')
  }
  /**
   * getUserNameLoggedIn - Get the element containing the logged in username.
   *
   * @param {string} username - The username of the logged in user.
   */
  async getUserNameLoggedIn(username) {
    return this.page.getByText(` Logged in as ${username}`)
  }
}
