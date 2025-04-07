import { expect, Locator, Page } from '@playwright/test'

export class RegistrationPage {
	private readonly page: Page
	private readonly firstNameInput: Locator
	private readonly lastNameInput: Locator
	private readonly dateOfBirthInput: Locator
	private readonly streetInput: Locator
	private readonly postalCodeInput: Locator
	private readonly cityInput: Locator
	private readonly stateInput: Locator
	private readonly countryInput: Locator
	private readonly phoneInput: Locator
	private readonly emailInput: Locator
	private readonly passwordInput: Locator
	private readonly registerButton: Locator


	constructor(page: Page) {
		this.page = page
		this.firstNameInput = page.locator('[data-test="first-name"]')
		this.lastNameInput = page.locator('[data-test="last-name"]')
		this.dateOfBirthInput = page.locator('[data-test="dob"]')
		this.streetInput = page.locator('[data-test="street"]')
		this.postalCodeInput = page.locator('[data-test="postal_code"]')
		this.cityInput = page.locator('[data-test="city"]')
		this.stateInput = page.locator('[data-test="state"]')
		this.countryInput = page.locator('[data-test="country"]')
		this.phoneInput = page.locator('[data-test="phone"]')
		this.emailInput = page.locator('[data-test="email"]')
		this.passwordInput = page.locator('[data-test="password"]')
		this.registerButton = page.locator('[data-test="register-submit"]')
	};


	async fillRegistrationForm(data: {
		firstName: string;
		lastName: string;
		dateOfBirth: string;
		street: string;
		postalCode: string;
		city: string;
		state: string;
		country: string;
		phone: string;
		email: string;
		password: string;
	}) {
		await this.firstNameInput.fill(data.firstName);
		await this.lastNameInput.fill(data.lastName);
		await this.dateOfBirthInput.fill(data.dateOfBirth);
		await this.streetInput.fill(data.street);
		await this.postalCodeInput.fill(data.postalCode);
		await this.cityInput.fill(data.city);
		await this.stateInput.fill(data.state);
		await this.countryInput.selectOption(data.country)
		await this.phoneInput.fill(data.phone);
		await this.emailInput.fill(data.email);
		await this.passwordInput.fill(data.password);
	}
	async clickOnRegister() {
		await this.registerButton.click()
		await expect(this.page).toHaveURL(/login/)
	}

}
