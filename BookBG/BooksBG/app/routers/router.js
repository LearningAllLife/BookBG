const attachTo = (app, data) => {
    const controller = require('../controllers/userController').init(data);

    app.get('/', (req, res) => {
        res.render('../../public');
    })

    app.get('/users/register', (req, res) => {
        return controller.getAllUsers(req, res);
    });

    app.post('/users/register', (req, res) => {
        return controller.createUser(req, res)
            .then(result => {
                return res.redirect('/users/register');
            })
            .catch((err) => {
                // connect-flash
                req.flash('error', err.message);
                return res.redirect('/');
            });
    });

    app.get('/user/user@login', (req, res) => {
        controller.loadLogin(req, res);
    })


    app.get('/users/login', (req, res) => {
        let userName = req.body;

        return controller.searchUser(userName, req, res);
    })
};

module.exports = { attachTo };