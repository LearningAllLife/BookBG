/* eslint-disable no-console,max-len,eol-last*/
/* eslint linebreak-style: ["error", "windows"]*/
const { Router } = require('express');
const passport = require('passport');

const attachTo = (app, data) => {
    const apiRouter = new Router();
    const controller = require('./controller').init(data);

    apiRouter
        .get('/', passport.authenticate('token'), (req, res, next) => {
            if (req.user._role !== 'admin') {
                return res.json('You must be admin');
            }
            return controller.getAll(req, res);
        });

    app.use('/api/orders', apiRouter);
};

module.exports = { attachTo };