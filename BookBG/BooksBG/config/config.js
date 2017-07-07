var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = 'development';

var config = {
    development: {
        root: rootPath,
        app: {
            name: 'booksbg'
        },
        port: 3000,
        db: 'mongodb://localhost/booksbg-development'
    },

    test: {
        root: rootPath,
        app: {
            name: 'booksbg'
        },
        port: process.env.PORT || 3000,
        db: 'mongodb://localhost/booksbg-test'
    },
};

module.exports = config[env];