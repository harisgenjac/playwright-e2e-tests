import { expect, Locator, Page } from '@playwright/test'

export class ProductsPage {
    private readonly page: Page
    private readonly productName: Locator
    private readonly addToCartButton: Locator
    private readonly quantityInput: Locator
    private readonly productAddedToCartFB: Locator

    constructor(page: Page) {
        this.page = page
        this.productName = page.locator('[data-test="product-name"]')
        this.addToCartButton = page.locator('[data-test="add-to-cart"]')
        this.quantityInput = page.locator('[data-test="quantity"]')
        this.productAddedToCartFB = page.getByRole('alert', { name: 'Product added to shopping' })
    }
    
    async checkIfProductIsFound(product) {
        await expect(this.productName).toContainText(product)
    }
    async fillQuantityOfProduct(number) {
        await this.quantityInput.clear()
        await this.quantityInput.fill(number)
    }
    async addProductToCart() {
        await this.addToCartButton.click()
        await expect(this.productAddedToCartFB).toBeVisible()
    }
}
