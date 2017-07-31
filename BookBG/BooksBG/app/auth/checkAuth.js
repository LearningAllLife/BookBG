/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len,eol-last*/
function isAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }
    req.flash('error', 'You must login first');
    return res.redirect('/users/login');
}

function isAdmin(req, res, next) {
    if (req.user) {
        if (req.user._role === 'admin') {
            return next();
        }
        req.flash('error', 'You must login as admin!');
        return res.redirect('/');
    }
    req.flash('error', 'You must login first');
    return res.redirect('/users/login');
}


module.exports = {
    isAuthenticated,
    isAdmin,
};