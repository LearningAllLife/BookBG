const BaseData = require('./base-data');
const Book = require('../models/book-model');

class BooksData extends BaseData {
    constructor(db) {
        super(db, Book);
    }
}

module.exports = BooksData;