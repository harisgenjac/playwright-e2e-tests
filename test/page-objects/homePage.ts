import { expect, Locator, Page } from '@playwright/test'
import { HandTools, SortOptions } from './types'

export class HomePage {
    private readonly page: Page
    private readonly userDropdown: Locator
    private readonly signOutButton: Locator
    private readonly searchInput: Locator
    private readonly searchButton: Locator
    private readonly selectProduct: Function
    private readonly allHandToolsCheckbox: Locator
    private readonly handToolsCheckboxes: Function
    private readonly filteredResults: Locator
    private readonly sortDropdown: Locator
    private readonly productPrices: Locator

    constructor(page: Page) {
        this.page = page
        this.userDropdown = page.locator('[data-test="nav-menu"]');
        this.signOutButton = page.locator('[data-test="nav-sign-out"]')
        this.searchInput = page.locator('[data-test="search-query"]')
        this.searchButton = page.locator('[data-test="search-submit"]')
        this.selectProduct = (product) => page.locator('[class="card-title"]').getByText(product).first()
        this.allHandToolsCheckbox = page.locator('#filters').getByText('Hand Tools').getByRole('checkbox')
        this.handToolsCheckboxes = (handTools: HandTools) => page.locator('ul fieldset div.checkbox label').filter({ hasText: handTools }).locator('input');
        this.filteredResults = page.locator('[data-test="filter_completed"]')
        this.sortDropdown = page.locator('[data-test="sort"]')
        this.productPrices = page.locator('[data-test="product-price"]')
    }

    async logout() {
        await this.userDropdown.click()
        await this.signOutButton.click()
    }
    async searchForProduct(nameOfProduct) {
        await this.searchInput.fill(nameOfProduct)
        await this.searchButton.click()
        await this.selectProduct(nameOfProduct).click()
    }
    async checkAllHandToolsCheckboxes() {
        await this.allHandToolsCheckbox.click()
    }
    /**
     * Selects (checks) multiple checkbox options from the hand tools list.
     * 
     * @param {HandTools[]} handTools - An array of tool names to be selected.
     * 
     * Usage example:
     * await checkHandToolsOptions(['Hammer', 'Wrench', 'Pliers']);
     */
    async filterProductsByCategory(handTools: HandTools[]) {
        for (const tool of handTools) {
            await this.handToolsCheckboxes(tool).check();
        }
    }
    async checkIfProductsAreFiltered() {
        await expect(this.filteredResults).toBeVisible()
    }
    async sortBy(sortOptions: SortOptions) {
        await this.sortDropdown.selectOption(sortOptions)
    }
    async getProductPrices(): Promise<number[]> {
        await this.productPrices.first().waitFor({ state: 'visible' })
        const pricesText = await this.productPrices.allInnerTexts();
        return pricesText.map(text => parseFloat(text.replace(/[^0-9.]/g, '')));
    }
    async checkIfPriceIsSortedAscending(): Promise<boolean> {
        await this.page.waitForTimeout(1000)
        const prices = await this.getProductPrices();
        return prices.every((price, i, arr) => i === 0 || arr[i - 1] <= price);
    }
    async checkPriceIsSortedDescending(): Promise<boolean> {
        const prices = await this.getProductPrices();
        return prices.every((price, i, arr) => i === 0 || arr[i - 1] >= price);
    }

}
