/* globals __dirname */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const exprMesssages = require('express-messages');
const session = require('express-session');
const { initAuth } = require('./auth');


const init = (data) => {

    const app = express();

    // confing start 
    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({ cookie: { maxAge: 60000 }, secret: 'Unicorns' }));
    app.use(flash());
    app.use('/public', express.static(path.join(__dirname, '../public')));
    app.use('/libs', express.static(path.join(__dirname, '../node_modules')));
    app.use(cookieParser('keyboard cat'));
    app.use((req, res, next) => {
        res.locals.messages = exprMesssages(req, res);
        next();
    });
    // confing end

    //log user 
    app.use((req, res, next) => {
        console.log('----user-----');
        console.log(req.user);
        next();
    });

    //atach authentication
    initAuth(app, data, 'Top app');

    //atach routers
    require('./routers')
        .attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = {
    init,
};