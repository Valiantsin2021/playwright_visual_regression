import { ProductsPage } from '@pages/ProductsPage'
import { type Locator, type Page } from '@playwright/test'

export class CartPage extends ProductsPage {
  defaultMsg: Locator
  cartTable: Locator
  cartProductRow: Locator
  cartInfo: Locator
  constructor(page: Page) {
    super(page)
    this.page = page
    this.defaultMsg = page.getByText('Cart is empty! Click here to buy products.')
    this.cartTable = page.locator('#cart_info_table tbody')
    this.cartProductRow = this.cartTable.locator('tr')
    this.cartInfo = page.getByText('Home Shopping Cart Cart is')
  }

  /**
   * Asynchronously gets the cart product cell.
   *
   * @param {string} product - description of parameter
   * @param {string} cellName - description of parameter
   * @return {Promise<import('@playwright/test').Locator>} description of return value
   */
  async getCartProductCellbyText(product: string, cellName: string): Promise<import('@playwright/test').Locator> {
    const productRow = await this.cartProductRow.filter({ hasText: product })
    return productRow.locator('td').filter({ hasText: cellName }).first()
  }
  /**
   * Asynchronously gets the cart product cell.
   *
   * @param {string} product - description of parameter
   * @return {Promise<import('@playwright/test').Locator>} description of return value
   */
  async getCartProductTotal(product: string): Promise<import('@playwright/test').Locator> {
    const productRow = await this.cartTable.locator('tr').filter({ hasText: product })
    return productRow.locator('td').locator('p.cart_total_price')
  }
  /**
   * Async function to get the quantity of a product in the cart.
   *
   * @param {string} product - description of parameter
   * @return {Promise<import('@playwright/test').Locator>} description of return value
   */
  async getCartProductQuantity(product: string): Promise<import('@playwright/test').Locator> {
    const productRow = await this.cartTable.locator('tr').filter({ hasText: product })
    return productRow.locator('td.cart_quantity button')
  }
  /**
   * Retrieves the delete button for a specific product in the cart table.
   *
   * @param {string} product - description of parameter
   * @return {Promise<import('@playwright/test').Locator>} description of return value
   */
  async getCartProductDeleteBtn(product: string): Promise<import('@playwright/test').Locator> {
    const productRow = await this.cartTable.locator('tr').filter({ hasText: product })
    return productRow.locator('td.cart_delete a')
  }
}
