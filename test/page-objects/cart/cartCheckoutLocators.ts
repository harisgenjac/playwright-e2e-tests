import { Locator, Page } from '@playwright/test'

export class CartCheckoutLocators {
    readonly page: Page
    readonly proceedToBillingFormButton: Locator
    readonly streetInput: Locator
    readonly cityInput: Locator
    readonly stateInput: Locator
    readonly countryInput: Locator
    readonly postcodeInput: Locator
    readonly proceedToPaymentButton: Locator
    readonly paymentMethodDropdown: Locator
    readonly cardNumberInput: Locator
    readonly expirationDateInput: Locator
    readonly cvvInput: Locator
    readonly holderNameInput: Locator
    readonly confirmButton: Locator
    readonly productOrderedFB: Locator

    constructor(page: Page) {
        this.page = page
        this.proceedToBillingFormButton = page.locator('[data-test="proceed-2"]')
        this.streetInput = page.locator('[data-test="street"]')
        this.cityInput = page.locator('[data-test="city"]')
        this.stateInput = page.locator('[data-test="state"]')
        this.countryInput = page.locator('[data-test="country"]')
        this.postcodeInput = page.locator('[data-test="postal_code"]')
        this.proceedToPaymentButton = page.locator('[data-test="proceed-3"]')
        this.paymentMethodDropdown = page.locator('[data-test="payment-method"]')
        this.cardNumberInput = page.locator('[data-test="credit_card_number"]')
        this.expirationDateInput = page.locator('[data-test="expiration_date"]')
        this.cvvInput = page.locator('[data-test="cvv"]')
        this.holderNameInput = page.locator('[data-test="card_holder_name"]')
        this.confirmButton = page.locator('[data-test="finish"]')
        this.productOrderedFB = page.locator('[id="order-confirmation"]')
    }
}