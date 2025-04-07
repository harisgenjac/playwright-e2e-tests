import { test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { registrationData } from '../data/helperData';

test.describe('Registration and Login Functionality', () => {
    test('Register new account ', async ({ page }) => {
        const pm = new PageManager(page)
        await pm.onLoginPage().registerNewAccount()
        await pm.onRegistrationPage().fillRegistrationForm(registrationData)
        await pm.onRegistrationPage().clickOnRegister()
    })
    test('Login with correct email and password ', async ({ page }) => {
        const pm = new PageManager(page)
        await pm.onLoginPage().login('user')
        await pm.onLoginPage().verifySuccessfulLogin()
    })
    test('Login with wrong email and password ', async ({ page }) => {
        const pm = new PageManager(page)
        await pm.onLoginPage().login('wrong')
        await pm.onLoginPage().verifyLoginError()
    })
    test('Logout', async ({ page }) => {
        const pm = new PageManager(page)
        await pm.onLoginPage().login('user')
        await pm.onHomePage().logout()
        await pm.onLoginPage().verifySuccessfulLogout()
    })

})