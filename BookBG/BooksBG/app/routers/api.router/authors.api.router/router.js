const { Router } = require('express');

const attachTo = (app, data) => {
    const apiRouter = new Router();

    apiRouter
        .get('/', (req, res) => {
            return data.authors.getAll()
                .then((authors) => {
                    return res.send(authors);
                });
        });

    app.use('/api/authors', apiRouter);
};

module.exports = { attachTo };