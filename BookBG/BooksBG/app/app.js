/* eslint linebreak-style: ["error", "windows"]*/
/* globals __dirname */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const exprMesssages = require('express-messages');
const { initAuth } = require('./auth');
const validator = require('validator');

const init = (data, db) => {
    const app = express();

    initAuth(app, data, db, 'Top app');

    // confing start 
    app.use('/public', express.static(path.join(__dirname, '../public')));
    app.use('/libs', express.static(path.join(__dirname, '../node_modules')));
    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(flash());
    app.use(cookieParser('keyboard cat'));
    app.use((req, res, next) => {
        res.locals.messages = exprMesssages(req, res);
        next();
    });

    require('./routers')
        .attachTo(app, data, validator);

    return Promise.resolve(app);
};

module.exports = {
    init,
};
