const { Router } = require('express');
const passport = require('passport');
const auth = require('../../../auth/tokenAuth');

const attachTo = (app, data) => {
    const apiRouter = new Router();

    apiRouter
        .get('/', (req, res) => {
            return data.users.getAll()
                .then((users) => {
                    return res.json(users);
                });
        })
        .post('/auth', (req, res, next) => {
            passport.authenticate(
                    'local', {
                        session: false,
                    })
                .then(() => {
                    auth.serialize(req, res, next);
                    return { req, res, next };
                })
                .then(({ req, res, next }) => {
                    auth.generateToken(req, res, next);
                    return { req, res, next };
                })
                .then(({ req, res, next }) => {
                    return auth.respond(req, res, next);
                });
        });


    app.use('/api/users', apiRouter);
};

module.exports = { attachTo };
