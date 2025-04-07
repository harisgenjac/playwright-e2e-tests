import { expect, Locator, Page } from '@playwright/test'
import { CartCheckoutLocators } from './cartCheckoutLocators'
import { PaymentOption } from '../types'

export class CartPage extends CartCheckoutLocators {
    private readonly productName: Locator
    private readonly productQuantity: Locator
    private readonly productPrice: Locator
    private readonly deleteFromCartButton: Locator
    private readonly proceedToCheckoutButton: Locator
    private readonly productDeletedFromCartFB: Locator
    private readonly cartTable: Locator

    constructor(page: Page) {
        super(page)
        this.productName = page.locator('[data-test="product-title"]')
        this.productQuantity = page.locator('[data-test="product-quantity"]')
        this.productPrice = page.locator('[data-test="product-price"]')
        this.deleteFromCartButton = page.locator('[class="btn btn-danger"]')
        this.proceedToCheckoutButton = page.locator('[data-test="proceed-1"]')
        this.productDeletedFromCartFB = page.getByRole('alert', { name: 'Product deleted.' })
        this.cartTable = page.getByRole('cell').first()
    }

    async checkProductNameInCart(productName) {
        await expect(this.productName).toHaveText(productName)
    }
    async checkProductQuantityInCart(quantity) {
        await expect(this.productQuantity).toHaveValue(quantity)
    }
    async checkProductPriceInCart(price) {
        await expect(this.productPrice).toHaveText(price)
    }
    async deleteProductFromCart() {
        await this.deleteFromCartButton.click()
        await expect(this.productDeletedFromCartFB).toBeVisible()
    }
    async checkCartIsEmpty() {
        await expect(this.cartTable).toBeEmpty()
    }
    async clickOnProceedToCheckout() {
        await this.proceedToCheckoutButton.click()
    }
    async clickOnProceedToBillingForm() {
        await this.proceedToBillingFormButton.click()
    }
    async fillBillingAddressForm(data: {
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
    }) {
        await this.streetInput.fill(data.street)
        await this.cityInput.fill(data.city)
        await this.stateInput.fill(data.state)
        await this.countryInput.fill(data.country)
        await this.postcodeInput.fill(data.postalCode)
    }
    async clickOnProceedToPaymentForm() {
        await this.proceedToPaymentButton.click()
    }
    async selectPaymentOption(paymentOption: PaymentOption) {
        await this.paymentMethodDropdown.selectOption(paymentOption)
    }
    async fillPaymentForm(data: {
        cardNumber: string;
        expDate: string;
        cvv: string;
        holderName: string;
    }) {
        await this.cardNumberInput.fill(data.cardNumber)
        await this.expirationDateInput.fill(data.expDate)
        await this.cvvInput.fill(data.cvv)
        await this.holderNameInput.fill(data.holderName)
        await this.confirmButton.click()
    }
    async placeOrder() {
        await this.page.waitForTimeout(1000)
        await this.confirmButton.click()
    }
    async verifyOrderConfirmationMessage(message) {
        await expect(this.productOrderedFB).toContainText(message)
    }
}
