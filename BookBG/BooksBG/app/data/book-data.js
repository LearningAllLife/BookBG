const BaseData = require('./base-data');
const Book = require('../models/book-model');

class BooksData extends BaseData {
    constructor(db) {
        super(db, Book);
    }

    getAll(filter, options, skip, limit) {
        if (typeof filter === 'undefined') {
            filter = { _isDeleted: false };
        } else if (typeof filter !== 'undefined') {
            filter._isDeleted = false;
        }

        if (typeof options === 'undefined') {
            options = {};
        }
        if (typeof skip === 'undefined') {
            skip = 0;
        }
        if (typeof limit === 'undefined') {
            limit = 0;
        }
        const result = this.collection
            .find(filter, options, skip, limit)
            .toArray();

        return result;
    }
}

module.exports = BooksData;