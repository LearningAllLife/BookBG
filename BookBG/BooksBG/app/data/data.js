const UsersData = require('./user-data');
const BooksData = require('./book-data');
const GenreData = require('./genre-data');

const init = (db) => {
    return Promise.resolve({
        users: new UsersData(db),
        books: new BooksData(db),
        genres: new GenreData(db),
    });
};

module.exports = { init };