const jwt = require('jsonwebtoken');
const becomeAdmin = 'Poweroverwhelming';

class UsersControllerAPI {
    constructor(data) {
        this.data = data;
    }
    authenticate(req, res) {
        const token = jwt.sign({
            id: req.user._id,
        }, 'server secret', {
            expiresIn: 60 * 60 * 2,
        });
        res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
        });
    }
    getAll(req, res) {
        return this.data.users.getAll()
            .then((users) => {
                res.json({ users });
            });
    }
    makeAdmin(req, res) {
        Promise.resolve()
            .then(() => {
                const username = req.body.username;
                const secretmessage = req.body.secretmessage;
                if (!username || !secretmessage) {
                    throw Error('You must provide secretmessage and username');
                }
                if (secretmessage !== becomeAdmin) {
                    throw Error('Wrong secret message');
                }
                return this.data.users.findByUsername(username);
            })
            .then((user) => {
                if (!user) {
                    throw Error('No such user');
                }
                const updateModel = user;
                updateModel._role = 'admin';
                return this.data.users.update({ _id: user._id }, updateModel);
            })
            .then(() => {
                return res.json({ message: 'success' });
            })
            .catch((err) => {
                res.status(400);
                return res.json({ message: err.message });
            });
    }
}
const init = (data) => {
    return new UsersControllerAPI(data);
};

module.exports = { init };
