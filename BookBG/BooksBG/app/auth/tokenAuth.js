const jwt = require('jsonwebtoken');

function serializeForToken(req, res, next) {
    Promise.resolve()
        .then(() => {
            req.user = {
                id: req.user._id,
            };
            next();
        });
}

function generateToken(req, res, next) {
    req.token = jwt.sign({
        id: req.user.id,
    }, 'very secret server secret', {
        expiresInMinutes: 120,
    });
    next();
}

function respond(req, res) {
    res.status(200).json({
        user: req.user,
        token: req.token,
    });
}

module.exports = {
    serializeForToken,
    generateToken,
    respond,
};
