// const $ = require('../../../node_modules/jquery/dist/jquery.min.js');
// const toastr = require('../../../node_modules/toastr/build/toastr.min.js');

class BooksConroller {
    constructor(data) {
        this.data = data;
    }

    create(req, res) {
        const book = req.body;

        if (typeof book === 'undefined') {
            throw new Error('invalid book');
        }

        this.data.books.create(book)
            .then((object) => {
                const resultObject = object.ops[0];
                return resultObject;
            })
            .then((resultBook) => {
                this.data.genres.findOrCreateBy({ name: resultBook.genre, content: resultBook });
                this.data.authors.findOrCreateBy({ name: resultBook.author, content: resultBook });
            })
            .then(() => {
                return res.redirect('/');
            })
            .catch((err) => {
                // connect-flash
                req.flash('error', err.message);
                res.redirect(req.get('referer'));
            });
    }

    getById(req, res) {
        const id = req.params.id;
        if (!id) {
            throw Error('No such book');
        }
        return this.data.books.getById(id)
            .then((book) => {
                if (!book) {
                    throw Error('No such book');
                }
                res.render('books/info.pug', { book: book, user: req.user });
            });
    }

    search(req, res) {
        const input = req.body;

        this.data.books.getAll({ _title: new RegExp(input.input, 'i') })
            .then(result => {
                let books = result;
                let set = {};

                this.collectBooks(books, set);

                return set;
            })
            .then(set => {
                this.data.authors.getAll({ _name: new RegExp(input.input, 'i') })
                    .then(result => {
                        let authors = result;
                        authors.forEach((author) => {
                            this.collectBooks(author._books, set);
                        })

                        return set;
                    })
                    .then((set) => {
                        let result = [];

                        Object.keys(set).forEach((key) => {
                            result.push(set[key]);
                        })

                        return result;
                    })
                    .then((books) => {
                        res.render('books/partialViews/booksContent.pug', { context: books, indeces: [1, 2, 3, 4, 5] });
                    })
            })
    }

    collectBooks(books, set) {
        books.forEach((book) => {
            let title = book._title;

            if (set[title] === undefined) {
                set[title] = book;
            } else {
                let author = book._author;
                let bookToCheck = set[title];

                if (set[author] === undefined) {
                    if (bookToCheck._author !== author) {
                        set[author] = book;
                    }
                }
            }
        })
    }

    getAllByFilter(req, res, filter) {
        return this.data.books.getAll(filter);
    }
}

const init = (data) => {
    return new BooksConroller(data);
};

module.exports = {
    init,
};