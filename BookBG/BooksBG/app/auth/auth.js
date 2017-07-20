const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-local');
const MongoStore = require('connect-mongo')(session);
const config = require('../../config/config');


function initAuth(app, { users }, secret) {

    passport.use(new Strategy((username, password, done) => {
        users.getAll({ _username: username })
            .then((users) => {
                const user = users[0];

                if (!user) {
                    return done(null,
                        false, { message: 'Incorrect username.' });
                }

                if (user._password !== password) {
                    return done(null,
                        false, { message: 'Incorrect password.' });
                }

                return done(null, user);
            });
    }));

    require('../../app/db/db').init(config.db)
        .then((db) => {
            app.use(session({
                store: new MongoStore({ db }),
                secret,
                resave: true,
                saveUninitialized: true,
            }));

        });

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
};

module.exports = { initAuth };