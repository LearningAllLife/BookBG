const { Router } = require('express');
const passport = require('passport');
const { isAdmin } = require('../../auth/checkAuth');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/', isAdmin, (req, res) => {
            return controller.getAllUsers(req, res);
        })
        .get('/register', (req, res) => {
            return controller.register(req, res);
        })
        .post('/register', (req, res) => {
            return controller.createUser(req, res)
                .then(result => {
                    return res.redirect('/');
                })
                .catch((err) => {
                    req.flash('error', err.message);
                    res.redirect(req.get('referer'));
                });
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