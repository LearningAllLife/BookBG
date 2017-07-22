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

        return this.data.books.create(book);
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
                res.render('books/info.pug', { book: book });
            });
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