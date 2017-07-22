const BaseData = require('./base-data');
const User = require('../models/user-model');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }
    findByUsername(username) {
        return this.getAll({ _username: new RegExp(username, 'i') })
            .then(([user]) => user);
    }
    checkPassword(username, password) {
        return this.findByUsername(username)
            .then((user) => {
                if (!user) {
                    throw new Error('Invalid user');
                }
                if (user._password !== password) {
                    throw new Error('Invalid password');
                }

                return true;
            });
    }
}

module.exports = UsersData;