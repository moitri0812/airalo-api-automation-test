const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const api = require('../support/api');

let token = '';
let orderResponse;
let esimResponse;

Given('I authenticate with the API', async () => {
    token = await api.getToken();
    expect(token).toBeTruthy();
});

When('I place an order for 6 {string} eSIMs', async (packageSlug) => {
    orderResponse = await api.placeOrder(token, packageSlug, 6);
});

Then('the response should have status {int}', (statusCode) => {
    const response = orderResponse || esimResponse;
    expect(response.status).toBe(statusCode);
});

When('I fetch the eSIM list for {string} with quantity {int}', async function (packageSlug, quantity) {
    this.esims = await api.getEsims(token, packageSlug, quantity);
});


Then('the response body should have {string} as eSIMs', function (packageSlug) {
    if (!this.esims) {
        throw new Error('No eSIMs found in response.');
    }

    this.esims.forEach(esim => {
        expect(esim.package_slug).toBe(packageSlug);
    });
});

Then('there should be {int} eSIMs with the {string} package slug', function (expectedCount, packageSlug) {
    const filtered = this.esims.filter(esim => esim.package_id === packageSlug);
    expect(filtered.length).toBe(expectedCount);
});
