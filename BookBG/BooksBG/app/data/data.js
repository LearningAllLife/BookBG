const UserData = require('./user-data');

const init = (db) => {
    return Promise.resolve(
        new UserData(db)
    );
};

module.exports = { init };