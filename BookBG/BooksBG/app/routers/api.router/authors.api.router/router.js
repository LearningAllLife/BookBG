const { Router } = require('express');

const attachTo = (app, data) => {
    const apiRouter = new Router();

    apiRouter
        .get('/', (req, res) => {
            return data.authors.getAll()
                .then((authors) => {
                    return res.json(authors);
                });
        });

    app.use('/api/authors', apiRouter);
};

module.exports = { attachTo };