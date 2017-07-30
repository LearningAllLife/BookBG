const { Router } = require('express');
const passport = require('passport');


const attachTo = (app, data) => {
    const apiRouter = new Router();
    const controller = require('./controller').init(data);

    apiRouter
        .get('/', passport.authenticate('token'), (req, res) => {
            return controller.getAll(req, res);
        });

    app.use('/api/orders', apiRouter);
};

module.exports = { attachTo };
