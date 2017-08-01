/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last*/
let driver = null;

const getGenre = function() {
    const genres = ['Romans', 'Draman', 'Sci-fi', 'Action', 'Mind games',
        'Crime', 'Tales', 'Kids books', 'Short stories', 'Psycho',
    ];
    const which = Math.floor(Math.random() * 9);
    return genres[which];
};

const ui = require('./ui');

const async = require('../../../utils/async');


const createItem = (text) => {
    return async()
        .then(() => ui.click('#nav-btn-addbook'))
        .then(() => ui.setValue('input[name="title"]', text))
        .then(() => ui.setValue('input[name="author"]', text))
        .then(() => ui.setValue('input[name="genre"]', getGenre()))
        .then(() => ui.setValue('input[name="rating"]', Math.floor(Math.random() * 9) + 1))
        .then(() => ui.setValue('input[name="price"]', Math.floor(Math.random() * 99) + 1))
        .then(() => ui.setValue('input[name="picture"]', text))
        .then(() => ui.click('form button[type="submit"]'));
};

module.exports = {
    setDriver(_driver) {
        driver = _driver;
        ui.setDriver(driver);
    },

    createItem,
};