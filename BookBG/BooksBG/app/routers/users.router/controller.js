const init = (data) => {
    const controller = {
        getAllUsers(req, res) {
            return data.users.getAll({ _isDeleted: false })
                .then((users) => {
                    res.render('users/getAll', { users: users });
                });
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
            data.users.findByUsername(bodyUser.username)
                .then((dbUser) => {
                    if (dbUser) {
                        throw new Error('User already exists');
                    }
                    bodyUser.role = 'user';
                    data.users.create(bodyUser);
                    return bodyUser;
                })
                .then((dbUser) => {
                    return res.redirect('/');
                })
                .catch((err) => {
                    req.flash('error', err);
                });
        },
        deleteUser(req, res) {
            const id = req.body.id;
            return data.users.getById(id)
                .then((user) => {
                    const updateModel = user;
                    updateModel._isDeleted = true;
                    return data.users.update({ _id: user._id }, updateModel);
                })
                .then(() => {
                    res.status(200);
                    res.end();
                });
        }
    };

    return controller;
};

module.exports = { init };