const { Router } = require('express');
const passport = require('passport');
const { isAdmin } = require('../../auth/checkAuth');

const attachTo = (app, data, validator) => {
    const router = new Router();
    const controller = require('./controller').init(data, validator);

    router
        .get('/', isAdmin, (req, res) => {
            return controller.getAllUsers(req, res);
        })
        .get('/register', (req, res) => {
            return controller.register(req, res);
        })
        .post('/register', (req, res) => {
            controller.createUser(req, res);
        })
        .get('/login', (req, res) => {
            controller.loadLogin(req, res);
        })
        .post('/login', passport.authenticate('local', {
            successRedirect: '/',
            successFlash: true,
            failureRedirect: '/users/login',
            failureFlash: true,
        }))
        .get('/sign-out', (req, res) => {
            req.logout();
            res.redirect('/');
        })
        .put('/remove', isAdmin, (req, res) => {
            return controller.deleteUser(req, res);
        });

    app.use('/users', router);
};

module.exports = { attachTo };