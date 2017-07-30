const { Router } = require('express');

const attachTo = (app, data) => {
    const apiRouter = new Router();
    const controller = require('./controller').init(data);

    apiRouter
        .get('/', (req, res) => {
            return controller.getAll(req, res);
        });

    app.use('/api/genres', apiRouter);
};

module.exports = { attachTo };
