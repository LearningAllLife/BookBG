const init = (data) => {
    const controller = {
        getAllUsers(req, res) {
            return data.getAll()
                .then((users) => {
                    for (let user of users) {
                        console.log(user);
                    }

                    res.render('../views/registerForm');
                });
        },
        loadLogin(req, res) {
            res.render('../views/loginForm');
        },
        searchUser(userName, req, res) {
            return data.getAll(userName)
                .then((user) => {
                    console.log(user);
                });
        },
        createUser(req, res) {

            const user = req.body;

            if (user === undefined) {
                throw new Error("invalid user");
            }

            return data.create(user);
        }
    };

    return controller;
};

module.exports = { init };