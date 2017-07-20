const async = () => {
    return Promise.resolve();
};

const config = require('./config/config');
var database;
async().then(() => require('./app/db/db').init(config.db))
    .then((db) => { database = db; return require('./app/data/data').init(db) })
    .then((data) => require('./app/app').init(data, database))
    .then((app) => {
        app.listen(config.port, () => console.log(`Server running on port :${config.port}`));
    });