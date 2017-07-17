const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/register', (req, res) => {
            return controller.getAllUsers(req, res);
        })
        .post('/register', (req, res) => {
            return controller.createUser(req, res)
                .then(result => {
                    return res.redirect('/users/register');
                })
                .catch((err) => {
                    // connect-flash
                    req.flash('error', err.message);
                    return res.redirect('/');
                });
        })
        .get('/login', (req, res) => {
            controller.loadLogin(req, res);
        })
        .get('/search', (req, res) => {
            let userName = req.body;

            return controller.searchUser(userName, req, res);
        });

    app.use('/users', router);
};

module.exports = { attachTo };