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
            .then(object => {
                let resultObject = object.ops[0];
                return resultObject;
            })
            .then(book => {
                this.data.genres.findOrCreateBy({ name: book.genre, content: book });
                this.data.authors.findOrCreateBy({ name: book.author, content: book });
            }).then(() => {
                return res.redirect('/');
            })
            .catch((err) => {
                // connect-flash
                req.flash('error', err.message);
                res.redirect(req.get('referer'));
            });
    }

    getById(req, res) {
        let id = req.params.id;
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
        let input = req.originalUrl;
        let index = input.indexOf('=');
        let searchWord = input.substring(index + 1);

        console.log(searchWord);
        // this.data.books.getAll({ _name: new RegExp(searchWord, 'i') })
        //     .then(result => {
        //         let books = result;
        //     })
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