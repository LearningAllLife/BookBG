const BaseData = require('./base-data');
const User = require('../models/user-model');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }
}

module.exports = UsersData;