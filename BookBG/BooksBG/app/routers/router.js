/* globals __dirname */

const fs = require('fs');
const path = require('path');

const attachTo = (app, data) => {
    app.get('/', (req, res) => {
        var a = req.query;
        if (a.p === 'undefined' && a.i === 'undefined') {
            res.redirect('/?p=1&i=30');
        } else {
            return res.render('home');
        }
    });

    // app.get('/?:pageNumber&:orderByCode', function(context) {
    //     var pageNumber = this.params['pageNumber'];
    //     var orderByCode = this.params['orderByCode'] | 0;

    //     booksController.home($content, pageNumber, orderByCode);

    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data);
        });
};

module.exports = { attachTo };