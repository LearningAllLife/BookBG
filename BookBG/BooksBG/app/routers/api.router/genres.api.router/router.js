const { Router } = require('express');

const attachTo = (app, data) => {
    const apiRouter = new Router();

    apiRouter
        .get('/', (req, res) => {
            return data.genres.getAll()
                .then((genres) => {
                    return res.send(genres);
                });
        });

    app.use('/api/genres', apiRouter);
};

module.exports = { attachTo };