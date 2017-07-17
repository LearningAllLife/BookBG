const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/add', (req, res) => {
            return res.render('books/addBookForm');
        })
        .post('/add', (req, res) => {
            return controller.create(req, res)
                .then(result => {
                    return res.redirect('/');
                })
                .catch((err) => {
                    // connect-flash
                    req.flash('error', err.message);
                    return res.redirect('/');
                });
        })
        .get('/allPartial', (req, res) => {
            //todo implement logic for paging
            return controller.getAllByFilter(req, res)
                .then(books => {
                    res.render('books/partialViews/booksContent.pug', { context: books, indeces: [1, 2, 3, 4, 5] })
                });
        })
        .get('/allPartialByGenre', (req, res) => {
            let query = req.query;
            return controller.getAllByFilter(req, res, query)
                .then(books => {
                    res.render('books/partialViews/booksContent.pug', { context: books, indeces: [1, 2, 3, 4, 5] })
                });
        })

    // .post('register', (req, res) => {
    //     return controller.createUser(req, res)
    //         .then(result => {
    //             return res.redirect('/users/register');
    //         })
    //         .catch((err) => {
    //             // connect-flash
    //             req.flash('error', err.message);
    //             return res.redirect('/');
    //         });
    // })
    // .get('/login', (req, res) => {
    //     controller.loadLogin(req, res);
    // })
    // .get('/search', (req, res) => {
    //     let userName = req.body;

    //     return controller.searchUser(userName, req, res);
    // });

    app.use('/books', router);
};

module.exports = { attachTo };