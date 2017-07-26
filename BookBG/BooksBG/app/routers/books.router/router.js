const { Router } = require('express');
const { isAdmin } = require('../../auth/checkAuth');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/add', isAdmin, (req, res) => {
            return res.render('books/addBookForm');
        })
        .post('/add', isAdmin, (req, res) => {
            return controller.create(req, res);
        })
        .get('/allPartial', (req, res) => {
            //todo implement logic for paging
            return controller.getAllByFilter(req, res)
                .then((books) => {
                    res.render('books/partialViews/booksContent.pug', { context: books, indeces: [1, 2, 3, 4, 5] });
                });
        })
        .post('/ordered', (req, res) => {
            return controller.getAllOrdered(req, res);
        })

    .get('/byGenre', (req, res) => {
        let body = req.url;
        let index = body.indexOf('=');
        let genre = body.substring(index + 1);

        return controller.getAllByFilter(req, res, { _genre: genre })
            .then((books) => {
                res.render('books/partialViews/booksContent.pug', { context: books, indeces: [1, 2, 3, 4, 5] });
            })
    })

    .get('/allResults', (req, res) => {
            //todo implement logic for paging
            return controller.getAllByFilter(req, res)
                .then((books) => {
                    res.render('books/partialViews/booksContent.pug', { context: books, indeces: [1, 2, 3, 4, 5] });
                });
        })
        .get('/allPartialByGenre', (req, res) => {
            const query = req.query;
            return controller.getAllByFilter(req, res, query)
                .then((books) => {
                    res.render('books/partialViews/booksContent.pug', { context: books, indeces: [1, 2, 3, 4, 5] });
                });
        })
        .post('/search', (req, res) => {
            return controller.search(req, res);
        })
        .get('/:id', (req, res) => {
            return controller.getById(req, res)
                .catch((err) => {
                    req.flash('error', err.message);
                    res.redirect(req.get('referer'));
                });
        });
    app.use('/books', router);
};

module.exports = { attachTo };