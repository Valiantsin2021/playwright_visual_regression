import { ProductsPage } from '@pages/ProductsPage'
import { type Page, type Locator } from '@playwright/test'

export class SingleProductPage extends ProductsPage {
  productInfo: Locator
  productPrice: Locator
  productName: Locator
  productImage: Locator
  productCategory: Locator
  quantityInput: Locator
  addToCartBtn: Locator
  constructor(page: Page) {
    super(page)
    this.page = page
    this.productInfo = page.locator('.product-information')
    this.productPrice = this.productInfo.locator('span > span')
    this.productName = this.productInfo.locator('h2')
    this.productImage = this.productInfo.locator('img')
    this.productCategory = this.productInfo.locator('p')
    this.quantityInput = page.locator('#quantity')
    this.addToCartBtn = page.locator('button.cart')
  }
}
