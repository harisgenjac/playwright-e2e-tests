import { test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { billingData, paymentData } from '../data/helperData';

test.describe('Checkout and Payment Functionality', () => {
    test('Place order and go through checkout and payment', async ({ page }) => {
        const pm = new PageManager(page)
        const product = {
            name: 'Slip Joint Pliers',
            quantity: '5',
            price: '$9.17',
        }
        await pm.onLoginPage().login('user')
        await pm.onLoginPage().verifySuccessfulLogin()
        await pm.navigateTo().goToHomePage()
        await pm.onHomePage().searchForProduct(product.name)
        await pm.onProductsPage().fillQuantityOfProduct(product.quantity)
        await pm.onProductsPage().addProductToCart()
        await pm.navigateTo().goToCartPage()
        await pm.onCartPage().checkProductNameInCart(product.name)
        await pm.onCartPage().checkProductQuantityInCart(product.quantity)
        await pm.onCartPage().checkProductPriceInCart(product.price)
        await pm.onCartPage().clickOnProceedToCheckout()
        await pm.onCartPage().clickOnProceedToBillingForm()
        await pm.onCartPage().fillBillingAddressForm(billingData)
        await pm.onCartPage().clickOnProceedToPaymentForm()
        await pm.onCartPage().selectPaymentOption('Credit Card')
        await pm.onCartPage().fillPaymentForm(paymentData)
        await pm.onCartPage().placeOrder()
        await pm.onCartPage().verifyOrderConfirmationMessage('Thanks for your order!')
    })
})