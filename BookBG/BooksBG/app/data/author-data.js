const BaseData = require('./base-data');
const Genre = require('../models/author-model');

class AuthorsData extends BaseData {
    constructor(db) {
        super(db, Genre);
    }
}

module.exports = AuthorsData;