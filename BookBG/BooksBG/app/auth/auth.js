/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len,eol-last*/
const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-local');
const MongoStore = require('connect-mongo')(session);
const TokenStrategy = require('passport-token').Strategy;
const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');

function initAuth(app, { users }, db, secret) {
    passport.use(new Strategy((username, password, done) => {
        users.checkPassword(username, password)
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(null, false, { message: err.message });
            });
    }));
    passport.use(new TokenStrategy(
        function(username, token, done) {
            Promise.resolve(users.findByUsername(username))
                .then((user) => {
                    if (!user) {
                        return done(null, false);
                    }
                    try {
                        const decoded = jwt.verify(token, 'server secret');
                        const date = new Date();
                        const dateAsNumber = date.getTime();
                        const id = new ObjectID(decoded.id);
                        if (!id.equals(user._id) || decoded.exp * 1000 < dateAsNumber) {
                            throw Error('Wrong Username or Token');
                        }
                        return done(null, user);
                    } catch (err) {
                        return done(null, false, { message: err.message });
                    }
                })
                .catch((err) => {
                    return done(null, false, { message: err.message });
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
            })
            .catch(done);
    });

    // for pug to work layout
    app.use((req, res, next) => {
        res.locals = {
            user: req.user,
        };
        next();
    });
}

module.exports = { initAuth };