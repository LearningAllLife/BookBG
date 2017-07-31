/* globals __dirname */
/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len,eol-last,no-undef,no-process-env*/
const path = require('path');
const rootPath = path.normalize(__dirname + '/..');

const config = {
    development: {
        root: rootPath,
        app: {
            name: 'booksbg',
        },
        port: 3000,
        db: 'mongodb://localhost/booksbg-development',
    },

    test: {
        root: rootPath,
        app: {
            name: 'booksbg',
        },
        port: process.env.PORT || 3000,
        db: 'mongodb://localhost/booksbg-test',
    },
};

module.exports = config.development;