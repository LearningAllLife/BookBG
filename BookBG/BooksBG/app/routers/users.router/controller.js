const init = (data) => {
    const controller = {
        getAllUsers(req, res) {
            return data.users.getAll()
                .then((users) => {
                    res.render('./users/getAll', users);
                })
        },
        register(req, res) {
            return res.render('./users/registerForm');
        },
        loadLogin(req, res) {
            res.render('./users/loginForm');
        },
        searchUser(userName, req, res) {
            return data.users.getAll(userName)
                .then((user) => {
                    console.log(user);
                });
        },
        createUser(req, res) {

            const bodyUser = req.body;

            this.data.users.findByUsername(bodyUser.username)
                .then((dbUser) => {
                    if (dbUser) {
                        throw new Error('User already exists');
                    }
                    bodyUser.role = 'user';
                    return this.data.users.create(bodyUser);
                })
                .then((dbUser) => {
                    return res.redirect('/auth/login');
                })
                .catch((err) => {
                    req.flash('error', err);
                });
        }
    };

    return controller;
};

module.exports = { init };