/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last*/
// const $ = require('../../../node_modules/jquery/dist/jquery.min.js');
// const toastr = require('../../../node_modules/toastr/build/toastr.min.js');
const { Router } = require('express');

const attachTo = (app, data) => {
    const apiRouter = new Router();
    const controller = require('./controller').init(data);

    apiRouter
        .get('/', (req, res) => {
            controller.getAll(req, res);
        });

    app.use('/api/books', apiRouter);
};

module.exports = { attachTo };