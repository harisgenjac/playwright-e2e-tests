import { Page } from '@playwright/test'
import { LoginPage } from './auth/loginPage.ts'
import { NavigationPage } from './navigationPage.ts'
import { RegistrationPage } from './auth/registrationPage.ts'
import { HomePage } from './homePage.ts'
import { ProductsPage } from './productsPage.ts'
import { CartPage } from './cart/cartPage.ts'

export class PageManager {
    private readonly page: Page
    private readonly loginPage: LoginPage
    private readonly navigatePage: NavigationPage
    private readonly registrationPage: RegistrationPage
    private readonly homePage: HomePage
    private readonly productsPage: ProductsPage
    private readonly cartPage: CartPage

    constructor(page: Page) {
        this.page = page
        this.loginPage = new LoginPage(page)
        this.navigatePage = new NavigationPage(page)
        this.registrationPage = new RegistrationPage(page)
        this.homePage = new HomePage(page)
        this.productsPage = new ProductsPage(page)
        this.cartPage = new CartPage(page)
    }

    navigateTo() {
        return this.navigatePage
    }
    onLoginPage() {
        return this.loginPage
    }
    onRegistrationPage() {
        return this.registrationPage
    }
    onHomePage() {
        return this.homePage
    }
    onProductsPage() {
        return this.productsPage
    }
    onCartPage() {
        return this.cartPage
    }
}