const { Router } = require('express');

const attachTo = (app, data) => {
    const apiRouter = new Router();

    apiRouter
        .get('/', (req, res) => {
            return data.genres.getAll()
                .then((genres) => {
                    return res.json(genres);
                });
        });

    app.use('/api/genres', apiRouter);
};

module.exports = { attachTo };