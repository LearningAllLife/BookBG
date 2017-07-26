const { Router } = require('express');
const { isAuthenticated, isAdmin } = require('../../auth/checkAuth');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/all', isAdmin, (req, res) => {
            //get all orders for a admin to use
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
            const id = req.body.id;
            return data.orders.getById(id)
                .then((order) => {
                    const updateModel = order;
                    updateModel._isDone = true;
                    return data.orders.update({ _id: order._id }, updateModel);
                })
                .then(() => {
                    res.status(200);
                    res.end();
                });
        });
    app.use('/orders', isAuthenticated, router);
};

module.exports = { attachTo };