/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len,eol-last*/
const BaseData = require('./base-data');
const User = require('../models/user-model');
const crypto = require('crypto');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }
    findByUsername(username) {
        return this.collection.findOne({ _username: username })
            .then((user) => user);
    }
    checkPassword(username, password) {
        return this.findByUsername(username)
            .then((user) => {
                if (!user) {
                    throw new Error('Invalid user');
                }

                const pass = this._encrypt(password);

                if (user._password !== pass) {
                    throw new Error('Invalid password');
                }

                return user;
            });
    }

    create(model) {
        return Promise.resolve()
            .then(() => {
                let instance;
                try {
                    instance = this.createInstanceOfClass(model);
                    instance._password = this._encrypt(instance.password);
                } catch (err) {
                    throw Error(err.message);
                }

                return this.collection.insert(instance);
            });
    }

    _encrypt(password) {
        const hash = crypto.createHash('sha256')
            .update(password)
            .digest('hex');
        return hash;
    }
}

module.exports = UsersData;