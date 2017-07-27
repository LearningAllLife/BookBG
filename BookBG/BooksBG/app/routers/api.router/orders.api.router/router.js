const { Router } = require('express');

const attachTo = (app, data) => {
    const apiRouter = new Router();

    apiRouter
        .get('/', (req, res) => {
            return data.orders.getAll()
                .then((orders) => {
                    return res.json(orders);
                });
        });

    app.use('/api/orders', apiRouter);
};

module.exports = { attachTo };