/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len,eol-last*/
// const $ = require('../../../node_modules/jquery/dist/jquery.min.js');
// const toastr = require('../../../node_modules/toastr/build/toastr.min.js');
const { Router } = require('express');
const passport = require('passport');

const attachTo = (app, data) => {
    const apiRouter = new Router();
    const controller = require('./controller').init(data);

    apiRouter
        .post('/auth', passport.authenticate('local', {
            session: false,
        }), (req, res) => {
            return controller.authenticate(req, res);
        })
        .get('/', passport.authenticate('token'), (req, res) => {
            if (req.user._role !== 'admin') {
                return res.json('You must be admin');
            }
            return controller.getAll(req, res);
        })
        .put('/makeAdmin', passport.authenticate('token'), (req, res) => {
            return controller.makeAdmin(req, res);
        });
    app.use('/api/users', apiRouter);
};

module.exports = { attachTo };