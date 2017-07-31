/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const webdriver = require('selenium-webdriver');
const ui = require('./utils/ui');
const async = require('../../utils/async');

describe('Items routes', () => {
    let driver = null;

    // const driver =
    //     new webdriver.Builder()
    //     .build();

    const appUrl = 'http://localhost:3002';

    beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
        return driver.get(appUrl);
    });
    afterEach(() => {
        return driver.quit();
    });

    it('expect h1 with text "Search through our library"', () => {
        return async()
            .then(() => {
                return ui.waitFor('h1');
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                expect(text).to.contain('Search through our library');
            });
    });
    it('Login button leads to login form', () => {
        return async()
            .then(() => ui.click('#nav-btn-login'))
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('form[action="/users/login"]'));
            })
            .then((element) => {
                return element.getText();
            })
            .then((text) => {
                expect(text).to.contain('Username');
            });
    });
});
