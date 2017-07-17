const BaseData = require('./base-data');
const Genre = require('../models/genre-model');

class GenresData extends BaseData {
    constructor(db) {
        super(db, Genre);
    }
}

module.exports = GenresData;