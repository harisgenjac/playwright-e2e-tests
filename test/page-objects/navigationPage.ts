import { expect, Locator, Page } from '@playwright/test'

export class NavigationPage {
    private readonly page: Page
    private readonly homeButton: Locator
    private readonly contactButton: Locator
    private readonly signInButton: Locator
    private readonly cartButton: Locator

    constructor(page: Page) {
        this.page = page
        this.homeButton = page.locator('[data-test="nav-home"]')
        this.contactButton = page.locator('[data-test="nav-contact"]')
        this.signInButton = page.locator('[data-test="nav-sign-in"]')
        this.cartButton = page.locator('[data-test="nav-cart"]')
    }

    async goToHomePage() {
        await this.homeButton.click()
    }
    async goToContactPage() {
        await this.contactButton.click()
    }
    async goToLoginPage() {
        await this.signInButton.click()
    }
    async goToCartPage() {
        await this.cartButton.click()
    }

}
