const jwt = require('jsonwebtoken');

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
}
const init = (data) => {
    return new UsersControllerAPI(data);
};

module.exports = { init };
