const { Router } = require('express');
const { isAdmin } = require('../../auth/checkAuth');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/add', isAdmin, (req, res) => {
            return controller.getAddForm(req, res);
        })
        .post('/add', isAdmin, (req, res) => {
            return controller.create(req, res);
        })
        .get('/allForDropDown', (req, res) => {
            return controller.getGenresForDropDown(req, res);
        });

    app.use('/genres', router);
};

module.exports = { attachTo };
