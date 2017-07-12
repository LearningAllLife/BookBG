const async = () => {
    return Promise.resolve();
};

const config = require('./config/config');

async().then(() => require('./app/db/db').init(config.db))
    .then((db) => require('./app/data/data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        app.listen(config.port, () => console.log(`Server running on port :${config.port}`));
    });