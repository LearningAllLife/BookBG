// const $ = require('../../../node_modules/jquery/dist/jquery.min.js');
// const toastr = require('../../../node_modules/toastr/build/toastr.min.js');
const PAGESIZE = 5;

class BooksConroller {

    constructor(data) {
        this.data = data;
    }

    create(req, res) {
        const book = req.body;

        if (typeof book === 'undefined') {
            throw new Error('invalid book');
        }

        let len = book.title.length;
        let sub = book.title.substring(0, len);

        this.data.books.getAll({ _title: new RegExp(sub, 'i') })
            .then((books) => {
                let isFound = false;

                books.forEach((b) => {
                    if (b._title === book.title &&
                        b._author === book.author) {
                        isFound = true;
                    }
                })

                return isFound;
            })
            .then((isFound) => {
                if (!isFound) {
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
                } else {
                    throw Error('Book already exist!');
                }
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
            })
            .catch((err) => {
                req.flash('error', err.message);
                res.redirect(req.get('referer'));
            });
    }

    getAllOrdered(req, res) {
        let user = req.user;
        let typeOfOrdering = req.body.input;

        this.data.books.getAll()
            .then(result => {
                let books = result;

                if (typeOfOrdering === 'Default') {
                    return books;
                }
                if (typeOfOrdering === 'Author ascending') {
                    return books.sort((a, b) => this._compare(a, b, 'author'));
                }
                if (typeOfOrdering === 'Author descending') {
                    return books.sort((a, b) => this._compare(a, b, 'author')).reverse();
                }
                if (typeOfOrdering === 'Price ascending') {
                    return books.sort((a, b) => this._compare(a, b, 'price'));
                }
                if (typeOfOrdering === 'Price descending') {
                    return books.sort((a, b) => this._compare(a, b, 'price')).reverse();
                }
                if (typeOfOrdering === 'Title ascending') {
                    return books.sort((a, b) => this._compare(a, b, 'title'));
                }
                if (typeOfOrdering === 'Title descending') {
                    return books.sort((a, b) => this._compare(a, b, 'title')).reverse();
                }
            })
            .then((books) => {
                if (!user) {
                    user = {};
                    user._isAdmin = false;
                } else {
                    if (user._role === 'admin') {
                        user._isAdmin = true;
                    } else {
                        user._isAdmin = false;
                    }
                }
                return res.render('books/partialViews/booksContent.pug', { context: books, isAdmin: user._isAdmin, indeces: [] });
            })
    }

    search(req, res) {
        let user = req.user;
        const page = req.params.page || 1;
        const skip = (page - 1) * PAGESIZE;
        const limit = PAGESIZE;
        let totalCount = 0;
        const input = req.body;
        let books = [];
        let set = {};
        let booksResult = [];

        this.data.books.getAll({ _title: new RegExp(input.input, 'i') })
            .then((result) => {
                books = result;
                this._collectBooks(books, set);
                return this.data.authors.getAll({ _name: new RegExp(input.input, 'i') });
            })
            .then((result) => {
                const authors = result;
                authors.forEach((author) => {
                    this._collectBooks(author._books, set);
                });
                Object.keys(set).forEach((key) => {
                    booksResult.push(set[key]);
                });

                return booksResult;
            })
            .then((booksToRender) => {
                totalCount = booksToRender.length;
                const pagesNumber = (totalCount / PAGESIZE | 0) + 1;
                const indeces = [];
                for (let a = 1; a <= pagesNumber; a += 1) {
                    indeces.push(a);
                }
                booksToRender = booksToRender.slice(skip, skip + limit);

                if (!user) {
                    user = {};
                    user._isAdmin = false;
                } else {
                    if (user._role === 'admin') {
                        user._isAdmin = true;
                    } else {
                        user._isAdmin = false;
                    }
                }

                res.render('books/partialViews/booksContent.pug', { context: booksToRender, isAdmin: user._isAdmin, indeces: indeces, marker: 'search' });
            });
    }

    _compare(item1, item2, type) {
        if (type === 'author') {
            if (item1._author < item2._author)
                return -1
            if (item1._author > item2._author)
                return 1
            return 0
        } else if (type === 'title') {
            if (item1._title < item2._title)
                return -1
            if (item1._title > item2._title)
                return 1
            return 0
        } else if (type === 'price') {
            return item1._price - item2._price;
        }
    }

    _collectBooks(books, set) {
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
        });
    }

    deleteBook(req, res, bookId) {
        this.data.books.getById(bookId)
            .then((book) => {

                Promise.all(
                        [
                            this.data.genres.getAll({ _name: book._genre }),
                            this.data.authors.getAll({ _name: book._author }),
                            this.data.books.update({ _title: book._title }, { $set: { "_isDeleted": true } }),
                        ])
                    .then((result) => {
                        let genreBooks = result[0][0]._books;
                        let authorBooks = result[1][0]._books;
                        var b = book;

                        for (let i = 0; i < genreBooks.length; i++) {

                            let currentBook = genreBooks[i];

                            if (currentBook._title === b._title &&
                                currentBook._author === b._author) {
                                genreBooks = genreBooks.splice(i, 1);
                                break;
                            }
                        }

                        for (let i = 0; i < authorBooks.length; i++) {

                            let currentBook = authorBooks[i];

                            if (currentBook._title === book._title &&
                                currentBook._author === book._author) {
                                authorBooks = authorBooks.splice(i, 1);
                                break;
                            }
                        }

                        let genre = result[0][0];
                        let author = result[1][0];

                        this.data.genres.update({ _name: book._genre }, genre);
                        this.data.authors.update({ _name: book._author }, author);
                    })
            })
    }

    getAllByFilter(req, res, filter) {
        let user = req.user;
        const route = req.path.slice(1, req.path.indexOf('/', 1));
        const page = req.params.page || 1;
        const skip = (page - 1) * PAGESIZE;
        const limit = PAGESIZE;
        let totalCount = 0;

        return this.data.books.count(filter)
            .then((count) => {
                totalCount = count;
                return this.data.books.getAll(filter, {}, skip, limit);
            })
            .then((books) => {
                const pagesNumber = Math.ceil(totalCount / PAGESIZE);
                const indeces = [];
                for (let a = 1; a <= pagesNumber; a += 1) {
                    indeces.push(a);
                }

                if (!user) {
                    user = {};
                    user._isAdmin = false;
                }

                res.render('books/partialViews/booksContent.pug', { context: books, isAdmin: user._isAdmin, indeces: indeces, marker: route });
            });
    }
}

const init = (data) => {
    return new BooksConroller(data);
};

module.exports = {
    init,
};