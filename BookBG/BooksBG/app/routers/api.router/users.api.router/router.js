const { Router } = require('express');

const attachTo = (app, data) => {
    const apiRouter = new Router();

    apiRouter
        .get('/', (req, res) => {
            return data.users.getAll()
                .then((users) => {
                    return res.json(users);
                });
        });

    app.use('/api/users', apiRouter);
};

module.exports = { attachTo };