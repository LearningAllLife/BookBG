/* globals __dirname */
const path = require('path');
const rootPath = path.normalize(__dirname + '/..');

const config = {
    development: {
        root: rootPath,
        app: {
            name: 'booksbg',
        },
        port: 80,
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
