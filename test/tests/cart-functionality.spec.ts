import { test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

let pm: PageManager;
let product: { name: string; quantity: string; price: string };

test.describe('Cart functionality', () => {
    test.beforeEach(async ({ page }) => {
        pm = new PageManager(page)
        product = {
            name: 'Slip Joint Pliers',
            quantity: '5',
            price: '$9.17',
        }
        await pm.onLoginPage().login('user')
        await pm.onLoginPage().verifySuccessfulLogin()
    })
    test('Add product to cart', async () => {
        await pm.navigateTo().goToHomePage()
        await pm.onHomePage().searchForProduct(product.name)
        await pm.onProductsPage().fillQuantityOfProduct(product.quantity)
        await pm.onProductsPage().addProductToCart()
        await pm.navigateTo().goToCartPage()
        await pm.onCartPage().checkProductNameInCart(product.name)
        await pm.onCartPage().checkProductQuantityInCart(product.quantity)
        await pm.onCartPage().checkProductPriceInCart(product.price)
    })
    test('Remove product from cart', async () => {
        await pm.navigateTo().goToHomePage()
        await pm.onHomePage().searchForProduct(product.name)
        await pm.onProductsPage().fillQuantityOfProduct(product.quantity)
        await pm.onProductsPage().addProductToCart()
        await pm.navigateTo().goToCartPage()
        await pm.onCartPage().deleteProductFromCart()
        await pm.onCartPage().checkCartIsEmpty()
    })
})