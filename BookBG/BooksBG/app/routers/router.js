/* eslint linebreak-style: ["error", "windows"]*/
/* globals __dirname */
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const attachTo = (app, data, validator) => {
    app.get('*', (req, res, next) => {
        if (req.user) {
            if (req.user._role === 'admin') {
                req.user._isAdmin = true;
            } else {
                req.user._isAdmin = false;
            }
        }
        console.log('----user-----');
        console.log(req.user);
        next();
    });
    app.get('/', (req, res) => {
        return res.render('home', req.user);
    });
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data, validator);
        });
};

module.exports = { attachTo };
