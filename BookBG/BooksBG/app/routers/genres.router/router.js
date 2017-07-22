const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/add', (req, res) => {
            return res.render('genres/addGenreForm');
        })
        .post('/add', (req, res) => {
            return controller.create(req, res);
        })
        .get('/allForDropDown', (req, res) => {
            return controller.getAllByFilter(req, res)
                .then(genres => {
                    res.render('genres/partialViews/forDropDown.pug', { data: genres });
                });
        })

    app.use('/genres', router);
};

module.exports = { attachTo };