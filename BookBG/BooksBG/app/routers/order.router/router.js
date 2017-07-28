const { Router } = require('express');
const { isAuthenticated, isAdmin } = require('../../auth/checkAuth');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/all', isAdmin, (req, res) => {
            return controller.returnAll(res, res);
        })
        .post('/form', (req, res) => {
            return controller.registerOrder(req, res);
        })
        .post('/createOrder', (req, res) => {
            return controller.createOrder(req, res);
        })
        .post('/checkout', (req, res) => {
            return controller.create(req, res);
        })
        .get('/success', (req, res) => {
            return controller.success(req, res);
        })
        .put('/complete', (req, res) => {
            return controller.completeOrder(req, res);
        });
    app.use('/orders', isAuthenticated, router);
};

module.exports = { attachTo };