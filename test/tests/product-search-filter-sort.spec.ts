import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

let pm: PageManager;

test.describe('Product search, filter, and sort functionality', () => {
    test.beforeEach(async ({ page }) => {
            pm = new PageManager(page)
            await pm.onLoginPage().login('user')
            await pm.onLoginPage().verifySuccessfulLogin()
        })
    test('Search functionality', async () => {
        const product = 'Slip Joint Pliers'
        await pm.navigateTo().goToHomePage()
        await pm.onHomePage().searchForProduct(product)
        await pm.onProductsPage().checkIfProductIsFound(product)
    })
    test('Filter functionality', async () => {
        await pm.navigateTo().goToHomePage()
        await pm.onHomePage().filterProductsByCategory(['Hammer', 'Pliers'])
        await pm.onHomePage().checkIfProductsAreFiltered()
    })
    test('Sorting functionality', async () => {
        await pm.navigateTo().goToHomePage()
        await pm.onHomePage().sortBy('price,asc')
        await pm.onHomePage().getProductPrices()
        await expect(await pm.onHomePage().checkIfPriceIsSortedAscending()).toBe(true);
    })
})