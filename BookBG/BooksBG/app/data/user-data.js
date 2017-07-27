const BaseData = require('./base-data');
const User = require('../models/user-model');
const crypto = require('crypto');

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

                let pass = this._encrypt(password);

                if (user._password !== pass) {
                    throw new Error('Invalid password');
                }

                return true;
            });
    }

    create(model) {
        return Promise.resolve()
            .then(() => {
                const instance = this.createInstanceOfClass(model);

                instance._password = this._encrypt(instance.password);

                return this.collection.insert(instance);
            });
    }

    _encrypt(password) {
        var hash = crypto.createHash('sha256')
            .update(password)
            .digest('hex');
        return hash;
    }
}

module.exports = UsersData;