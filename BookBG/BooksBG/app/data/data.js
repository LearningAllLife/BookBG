/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len,eol-last*/
const UsersData = require('./user-data');
const BooksData = require('./book-data');
const GenresData = require('./genre-data');
const OrdersData = require('./order-data');
const AuthorsData = require('./author-data');

const init = (db) => {
    return Promise.resolve({
        users: new UsersData(db),
        books: new BooksData(db),
        genres: new GenresData(db),
        orders: new OrdersData(db),
        authors: new AuthorsData(db),
    });
};

module.exports = { init };