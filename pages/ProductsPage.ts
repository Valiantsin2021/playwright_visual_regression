import { BasePage } from '@pages/BasePage'
import { constants } from '@fixtures/constants/constants'
import { HomePage } from '@pages/HomePage'
import { type Locator, type Page } from '@playwright/test'


export class ProductsPage extends HomePage {  
  sideHeaderCategory: Locator
  sideHeaderBrands: Locator
  categories: Locator
  brands: Locator
  productContainer: Locator
  products: Locator
  viewProductsLinks: Locator
  searchInput: Locator
  searchBtn: Locator
  continueShoppingBtn: Locator
  viewCartLink: Locator
  productsOverlay: Locator
  productsOverlayCloseBtn: Locator
  productsImages: Locator

  constructor(page: Page) {
    super(page)
    this.page = page
    this.header = page.locator('h2.title.text-center')
    this.sideHeaderCategory = page.locator('.left-sidebar > h2')
    this.sideHeaderBrands = page.locator('.left-sidebar .brands_products > h2')
    this.categories = page.locator('[data-parent="#accordian"]')
    this.brands = page.locator('.brands-name a')
    this.productContainer = page.locator('.single-products')
    this.products = this.productContainer.locator('.productinfo.text-center p')
    this.viewProductsLinks = page.locator('.choose a')
    this.productsOverlay = page.locator('.overlay-content')
    this.productsImages = this.productContainer.locator('img')
    this.searchInput = page.locator('#search_product')
    this.searchBtn = page.locator('#submit_search')
    this.continueShoppingBtn = page.getByText('Continue Shopping')
    this.viewCartLink = page.getByRole('link', { name: 'View Cart' })
  }
  /**
   * Add a product to the cart.
   *
   * @param {string} product - the name of the product to be added to the cart
   * @return {Promise<void>} a Promise that resolves when the product is successfully added to the cart
   */
  async addToCart(product: string): Promise<void> {
    await this.page.getByText(product).first().hover()
    await this.productContainer.filter({ hasText: product }).locator('a').first().click()
    await this.page.getByText('Added!').waitFor({ state: 'visible' })
  }

  async clickViewProductLink(index: number) {
    await this.viewProductsLinks.nth(index).click()
  }
}
