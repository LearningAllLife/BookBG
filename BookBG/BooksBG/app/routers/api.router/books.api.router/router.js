const { Router } = require('express');

const attachTo = (app, data) => {
    const apiRouter = new Router();

    apiRouter
        .get('/', (req, res) => {
            return data.books.getAll()
                .then((books) => {
                    return res.json(books);
                });
        });

    app.use('/api/books', apiRouter);
};

module.exports = { attachTo };