import { test as base } from '@playwright/test'
import { HomePage } from '@pages/HomePage'
import { constants } from '@fixtures/constants/constants'
import { LoginPage } from '@pages/LoginPage.js'
import { SignupComponent } from '@pages/SignupComponent'
import { ContactUsPage } from '@pages/ContactUsPage'
import { TestCasesPage } from '@pages/TestCasesPage'
import { ProductsPage } from '@pages/ProductsPage'
import { CartPage } from '@pages/CartPage'
import { SingleProductPage } from '@pages/SingleProductPage'
import { mergeExpects } from '@playwright/test'
import { expect as toBeOneOfValuesExpect } from '@fixtures/toBeOneOfValues'
import { expect as toBeValidDate } from '@fixtures/toBeValidDate'
import { expect as typesExpects } from '@fixtures/typesExpects'

// Declare the types of your fixtures.
type MyFixtures = {
  homePage: HomePage
  loginPage: LoginPage
  signupComponent: SignupComponent
  contactUsPage: ContactUsPage
  testCasesPage: TestCasesPage
  productsPage: ProductsPage
  singleProductPage: SingleProductPage
  cartPage: CartPage
}

export const test = base.extend<MyFixtures>({
  page: async ({ page }, use) => {
    await page.route('**/*', route => {
      if (route.request().url().startsWith('https://googleads.g.doubleclick.net')) {
        return route.abort()
      }
      return route.continue()
    })
    await use(page)
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await loginPage.openPage(constants.baseURL)
    await use(loginPage)
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page)
    await use(homePage)
  },
  signupComponent: async ({ page }, use) => {
    const signupComponent = new SignupComponent(page)
    await use(signupComponent)
  },
  contactUsPage: async ({ page }, use) => {
    const contactUsPage = new ContactUsPage(page)
    await use(contactUsPage)
  },
  testCasesPage: async ({ page }, use) => {
    const testCasesPage = new TestCasesPage(page)
    await use(testCasesPage)
  },
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page)
    await use(productsPage)
  },
  singleProductPage: async ({ page }, use) => {
    const singleProductPage = new SingleProductPage(page)
    await use(singleProductPage)
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page)
    await use(cartPage)
  }
})
export const expect = mergeExpects(toBeOneOfValuesExpect, toBeValidDate, typesExpects)
