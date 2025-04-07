import { expect, Locator, Page } from '@playwright/test';
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export class LoginPage {
  private readonly page: Page;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly userFullNameWithDropdown: Locator;
  private readonly registerYourAccButton: Locator;
  private readonly forgotYourPassButton: Locator;
  private readonly wrongLoginFB: Locator;

  private userCredentials = {
    admin: {
      email: process.env.ADMIN_USER,
      password: process.env.ADMIN_PASSWORD,
    },
    user: {
      email: process.env.TEST_USER,
      password: process.env.TEST_PASSWORD,
    },
    wrong: {
      email: process.env.WRONG_USER,
      password: process.env.WRONG_USER,
    },
  };

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-submit"]');
    this.userFullNameWithDropdown = page.locator('[data-test="nav-menu"]');
    this.registerYourAccButton = page.locator('[data-test="register-link"]');
    this.forgotYourPassButton = page.locator('[data-test="forgot-password-link"]');
    this.wrongLoginFB = page.locator('[data-test="login-error"]');
  }

  async login(userType: 'admin' | 'user' | 'wrong') {
    if (!process.env.BASE_URL) {
      throw new Error('BASE_URL is not defined');
    }
    await this.page.goto(process.env.BASE_URL);
    const credentials = this.userCredentials[userType];
    if (!credentials?.email || !credentials?.password) {
      throw new Error(`Missing credentials for user type: ${userType}`);
    }
    await this.emailInput.fill(credentials.email);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
    if (userType === 'wrong') {
      await expect(this.page).toHaveURL(/login/);
    } else {
      if (userType === 'admin') {
        await expect(this.page).toHaveURL(/dashboard/);
      }
      if (userType === 'user') {
        await expect(this.page).toHaveURL(/account/);
      }
    }
  }
  async verifySuccessfulLogin() {
    await expect(this.userFullNameWithDropdown).toBeVisible();
  }
  async verifyLoginError() {
    await expect(this.wrongLoginFB).toBeVisible();
    await expect(this.wrongLoginFB).toHaveText('Invalid email or password');
  }
  async verifySuccessfulLogout() {
    await expect(this.page).toHaveURL(/login/);
  }
  async registerNewAccount() {
    if (!process.env.BASE_URL) {
      throw new Error('BASE_URL is not defined');
    }
    await this.page.goto(process.env.BASE_URL);
    await this.registerYourAccButton.click();
  }
}
