/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console */
const async = () => {
    return Promise.resolve();
};

const config = require('./config/config');
let database;

async().then(() => require('./app/db').init(config.db))
    .then((db) => {
        database = db;
        return require('./app/data').init(db);
    })
    .then((data) => require('./app').init(data, database))
    .then((app) => {
        const server = app.listen(config.port, () => {
            console.log(`Server running on port :${config.port}`);
        });
        require('./app/socket').init(server);
    });
