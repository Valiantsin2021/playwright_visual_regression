import { test, expect } from '@fixtures/fixture'
test.describe('Visual regression', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.openPage('/')
    await expect.soft(homePage.header).toBeVisible()
  })
  test('home page elements ui', async ({ homePage }) => {
    expect.soft(await homePage.page.screenshot({ mask: [homePage.carousel] })).toMatchSnapshot('homepage.png')
    await expect.soft(homePage.leftSideBar).toHaveScreenshot('left-sidebar.png')
    await expect.soft(homePage.footerWidget).toHaveScreenshot('footer-widget.png')
    await expect.soft(homePage.featureItemsContainer).toHaveScreenshot('features_items.png')
  })
  test(`cart page elements ui`, async ({ homePage, cartPage }) => {
    await homePage.cartLink.click()
    await expect.soft(cartPage.cartInfo).toHaveScreenshot('cart-info.png')
  })
})
