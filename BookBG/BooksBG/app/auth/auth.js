const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-local');
const MongoStore = require('connect-mongo')(session);
// const config = require('../../config/config');
function initAuth(app, { users }, db, secret) {
    passport.use(new Strategy((username, password, done) => {
        users.checkPassword(username, password)
            .then(() => {
                return users.findByUsername(username);
            })
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(null, false, { message: err.message });
            });
    }));

    app.use(session({
        cookie: { maxAge: 3600000 },
        store: new MongoStore({ db }),
        secret,
        resave: true,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        users.getById(id)
            .then((user) => {
                done(null, user);
            }).catch(done);
    });
    app.use((req, res, next) => {
        res.locals = {
            user: req.user,
        };
        next();
    });
}

module.exports = { initAuth };
