/* globals __dirname */

const fs = require('fs');
const path = require('path');

const attachTo = (app, data) => {
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
        const a = req.query;
        //todo change logic for paging
        if (a.p === 'undefined') {
            res.redirect('/?p=1');
        } else {
            return res.render('home', req.user);
        }
    });
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data);
        });
};

module.exports = { attachTo };