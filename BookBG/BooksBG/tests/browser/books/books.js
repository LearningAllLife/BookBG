/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-unused-expressions,max-len,eol-last */
/* eslint-disable no-console,max-len*/
// /* eslint-disable no-unused-expressions */
// const { expect } = require('chai');
// const { setupDriver } = require('../utils/setup-driver');
// const ui = require('../utils/ui');
// const itemsUtils = require('../utils/items.utils');

// const async = require('../../../utils/async');

// describe('Items routes', () => {
//     let driver = null;

//     // let driver =
//     //     new webdriver.Builder()
//     //         .build();

//     const appUrl = 'http://localhost:3002';

//     beforeEach(() => {
//         driver = setupDriver('chrome');
//         ui.setDriver(driver);
//         return driver.get(appUrl);
//     });

//     afterEach(() => {
//         return driver.quit();
//     });

//     describe('Not subscribed user', () => {
//         const count = 5;
//         const itemTexts = null;
//         it('Open main page', () => {
//             return async()
//                 .then(() => ui.click('#nav-btn-toggle-items'))
//                 .then(() => ui.click('#nav-btn-item-all'))
//                 .then(() => ui.getTexts('.container ul li'))
//                 .then((texts) => {
//                     expect(texts).to.has.length(itemTexts.length);
//                     texts.forEach((text) => {
//                         expect(itemTexts).to.contain(text);
//                     });
//                 });
//         });

//         // beforeEach(() => {
//         //     itemTexts = Array.from({ length: count })
//         //         .map((_, index) => 'Text ' + index);

//         //     return itemTexts.reduce(
//         //         (pr, text) =>
//         //         pr.then(() => itemsUtils.createItem(text)),
//         //         Promise.resolve());
//         // });

//         // it('expect to be visible in /items', () => {
//         //     return async()
//         //         .then(() => ui.click('#nav-btn-toggle-items'))
//         //         .then(() => ui.click('#nav-btn-item-all'))
//         //         .then(() => ui.getTexts('.container ul li'))
//         //         .then((texts) => {
//         //             expect(texts).to.has.length(itemTexts.length);
//         //             texts.forEach((text) => {
//         //                 expect(itemTexts).to.contain(text);
//         //             });
//         //         });
//         // });
//     });
// });