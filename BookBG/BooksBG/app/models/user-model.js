/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len*/
const { CONSTANTS } = require('../../public/helpers/constants');

const VALIDATOR = {
    IS_ROLE_VALID: function(x) {
        if (x.toLowerCase() !== CONSTANTS.USER && x.toLowerCase() !== CONSTANTS.ADMIN) {
            throw Error('Invalid Role');
        }
    },
    IT_IS_VALID_STRING: function(x) {
        if (x == undefined || x == NaN || typeof x !== 'string') {
            throw Error('invalid string');
        }
    },
    Check_If_It_Is_In_Range: function(x, min, max, check) {
        if (x < min || x > max) {
            throw Error(`invalid ${check}`);
        }
    },
    Check_If_IT_Matches_Pattern: function(x) {
        const pattern = /([A-Za-z])+/g;

        if (!pattern.test(x)) {
            throw Error('invalid name!');
        }
    },
    Check_If_Pasword_Matches_Pattern: function(x) {
        if (!/([A-Za-z0-9_])$/.test(x)) {
            throw Error('Invalid password must contain only ("A-Za-z0-9_")!');
        }
    },
    Check_If_Username_Matches_Pattern: function(x) {
        if (!/([A-Za-z0-9_])$/.test(x)) {
            throw Error('Invalid username must contain only ("A-Za-z0-9_")!');
        }
    },
    Check_If_Email_Matches_Pattern: function(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            throw Error('Invalid email!');
        }
    },
};

class User {
    constructor({ firstname, lastname, username, password, email, role }) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.isDeleted = false;
    }

    get firstname() {
        return this._firstname;
    }

    set firstname(x) {
        VALIDATOR.IT_IS_VALID_STRING(x);
        VALIDATOR.Check_If_It_Is_In_Range(x.length, 2, 16, 'firstname');
        VALIDATOR.Check_If_IT_Matches_Pattern(x);

        this._firstname = x;
    }

    get lastname() {
        return this._lastname;
    }

    set lastname(x) {
        VALIDATOR.IT_IS_VALID_STRING(x);
        VALIDATOR.Check_If_It_Is_In_Range(x.length, 2, 16, 'lastname');
        VALIDATOR.Check_If_IT_Matches_Pattern(x);

        this._lastname = x;
    }

    get username() {
        return this._username;
    }

    set username(x) {
        VALIDATOR.IT_IS_VALID_STRING(x);
        VALIDATOR.Check_If_It_Is_In_Range(x.length, 2, 14, 'username');
        VALIDATOR.Check_If_Username_Matches_Pattern(x);

        this._username = x;
    }

    get password() {
        return this._password;
    }

    set password(x) {
        VALIDATOR.IT_IS_VALID_STRING(x);
        VALIDATOR.Check_If_It_Is_In_Range(x.length, 3, 20, 'password');
        VALIDATOR.Check_If_Pasword_Matches_Pattern(x);

        this._password = x;
    }

    get email() {
        return this._email;
    }

    set email(x) {
        VALIDATOR.Check_If_Email_Matches_Pattern(x);
        this._email = x;
    }

    get role() {
        return this._role;
    }

    set role(x) {
        VALIDATOR.IS_ROLE_VALID(x);
        this._role = x.toLowerCase();
    }
    get isDeleted() {
        return this._isDeleted;
    }
    set isDeleted(x) {
        this._isDeleted = x;
    }
}

module.exports = User;