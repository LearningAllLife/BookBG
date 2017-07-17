const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
    // .get('/add', (req, res) => {
    //     return res.render('books/addBookForm');
    // })
    // .post('/add', (req, res) => {
    //     return controller.create(req, res)
    //         .then(result => {
    //             return res.redirect('/');
    //         })
    //         .catch((err) => {
    //             // connect-flash
    //             req.flash('error', err.message);
    //             return res.redirect('/');
    //         });
    // })
        .get('/allForDropDown', (req, res) => {
        return controller.getAllByFilter(req, res)
            .then(genres => {
                res.render('genres/partialViews/forDropDown.pug', { data: genres })
            });
    })

    app.use('/genres', router);
};

module.exports = { attachTo };