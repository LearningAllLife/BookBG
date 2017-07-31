/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len,eol-last*/
const { MongoClient } = require('mongodb');

const init = (connectionString) => {
    return MongoClient.connect(connectionString)
        .then((db) => {
            console.log('Databases connected');
            return db;
        });
};

module.exports = { init };