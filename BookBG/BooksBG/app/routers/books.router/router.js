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
        .get('/allPartial/:page', (req, res) => {
            return controller.getAllByFilter(req, res);
        })
        .post('/ordered', (req, res) => {
            return controller.getAllOrdered(req, res);
        })
        .get('/byGenre/:page', (req, res) => {
            const genre = req.query.input;
            return controller.getAllByFilter(req, res, { _genre: genre });
        })
        .get('/allResults', (req, res) => {
            return controller.getAllByFilter(req, res);
        })
        .get('/allPartialByGenre', (req, res) => {
            const query = req.query;
            return controller.getAllByFilter(req, res, query);
        })
        .post('/search/:page', (req, res) => {
            return controller.search(req, res);
        })
        .get('/:id', (req, res) => {
            return controller.getById(req, res)
                .catch((err) => {
                    req.flash('error', err.message);
                    res.redirect(req.get('referer'));
                });
        })
        .put('/delete', (req, res) => {
            const bookId = req.body.input;

            return controller.deleteBook(req, res, bookId);
        });

    app.use('/books', router);
};

module.exports = { attachTo };