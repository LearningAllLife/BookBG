/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len,eol-last*/
// const $ = require('../../../node_modules/jquery/dist/jquery.min.js');
// const toastr = require('../../../node_modules/toastr/build/toastr.min.js');
/* globals __dirname */
const fs = require('fs');
const path = require('path');

const attachTo = (app, data) => {
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data);
        });
};

module.exports = { attachTo };