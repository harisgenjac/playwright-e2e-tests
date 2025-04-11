# Playwright E2E Tests

Automated end-to-end testing for the web application using Playwright.

## PREREQUISITES

Before using this project, ensure you have installed:

- Node.js 20 (Download from https://nodejs.org/)
- npm (comes with Node.js)
- Git (optional, for cloning)

## INSTALLATION & SETUP

1. Clone the repository:
   ```bash
   git clone https://github.com/harisgenjac/playwright-e2e-tests.git
   cd playwright-e2e-tests
   
2. Install dependencies:
   - npm install
   - npx playwright install

3. For headless mode:
   - npx playwright test

4. For interactive mode (GUI):
   - npx playwright open

## Project structure
```
playwright-e2e-tests/
│
├── data/                        # Test data (helperData.ts, etc.)
│   └── helperData.ts            # Contains test data (e.g., registrationData, billingData)
│
├── page-objects/                # Page Object Model classes
│   ├── auth/                    # Authentication related pages
│   │   ├── loginPage.ts         # Login page object
│   │   └── registrationPage.ts  # Registration page object
│   ├── cart/                    # Cart related page objects
│   │   ├── cartPage.ts          # Cart page object
│   │   └── CartCheckoutLocators.ts # Cart checkout locators
│   ├── homePage.ts              # Home page object
│   ├── navigationPage.ts        # Navigation bar page object
│   ├── productsPage.ts          # Products page object
│   ├── pageManager.ts           # Manages page object initialization and navigation
│   └── types.ts                 # Type definitions (e.g., HandTools, SortOptions, etc.)
│
├── tests/                       # Test files (e2e tests)
│   ├── cart-functionality.spec.ts    # Cart related tests
│   ├── checkout-and-payment.spec.ts   # Checkout and payment tests
│   ├── product-search-filter-sort.spec.ts # Product search, filter, and sort tests
│   ├── user-authentication.spec.ts      # User authentication tests (login, registration)
│
├── env.local                    # Environment-specific configuration (API URLs, credentials, etc.)
├── playwright.config.ts          # Playwright configuration file
├── package.json                 # Project's npm dependencies and scripts
└── README.md                    # Project overview and setup guide
```

## Author:
Haris Genjac

## NOTE
This is an educational project and not affiliated with the official practicesoftwaretesting.com website.

