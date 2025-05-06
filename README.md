# Airalo Partner API Automation

This project automates end-to-end testing of the [Airalo Partner API](https://partner.airalo.com/api-docs) using **JavaScript**, **Playwright**, and **Cucumber.js**. 
It covers authentication, placing an order for eSIMs, retrieving the eSIM list, and verifying the responses.

---

## Project Structure

airalo-api-automation-test/
├── features/ # Gherkin feature files
│ └── airalo.feature
├── step-definitions/ # Step implementations
│ └── airalo.steps.js
├── support/ # Reusable API logic
│ └── api.js
├── cucumber.js # Cucumber config
└── README.md

## Clone the Repository

git clone https://github.com/moitri0812/airalo-api-automation-test.git
cd airalo-api-automation-test

## Install Dependencies

npm install
npm i @playwright/test

## Run the Tests

npx cucumber-js


## Test Scenarios

Scenario: Place Order and Validate eSIMs
Defined in features/airalo.feature

## Approach to Test Case Implementation

1. Authentication
A POST request is sent to v2/token with client_id and client_secret to obtain a valid OAuth2 token.

Token is stored and used for authenticated requests.

2. Place Order
A POST request to /v2/orders is made with:

package_id = merhaba-7days-1gb

quantity = 6

Validates response status (201 Created).

3. Fetch eSIM List
A GET request to /v2/simss is made using the same token.

Verifies:

Status code is 200

Exactly 6 eSIMs are returned

All have the expected package_id = merhaba-7days-1gb

4. Assertions
Response status codes are validated using Playwright’s expect.
The eSIM list is parsed and validated using a loop to ensure all slugs match.

## Future Improvements

Add environment variable support using dotenv

Include negative test cases (invalid token, incorrect package id, etc.)

Integrate with CI tools like GitHub Actions
