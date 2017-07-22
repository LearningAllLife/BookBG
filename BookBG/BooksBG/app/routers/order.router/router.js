const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/all', (req, res) => {
            return controller.returnAll(res, res);
        })
        .post('/form', (req, res) => {
            return controller.registerOrder(req, res);
        })
        .post('/create', (req, res) => {
            return controller.create(req, res);
        });
    app.use('/orders', router);
};

module.exports = { attachTo };