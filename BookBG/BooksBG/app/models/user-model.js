const VALIDATOR = {
    IT_IS_VALID_STRING: function(x) {
        if (x == undefined || x == NaN || typeof x != 'string') {
            throw Error('invalid string');
        }
    },
    Check_If_It_Is_In_Range: function(x, min, max) {
        if (x < min || x > max) {
            throw Error('invalid name!');
        }
    },
    Check_If_IT_Matches_Pattern: function(x) {
        let pattern = /([A-Za-z])+/g;

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
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            throw Error("Invalid email!");
        }
    }
}

class User {
    constructor({ firstname, lastname, username, password, email }) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    get firstname() {
        return this._firstname;
    }

    set firstname(x) {

        VALIDATOR.IT_IS_VALID_STRING(x);
        VALIDATOR.Check_If_It_Is_In_Range(x.length, 2, 16);
        VALIDATOR.Check_If_IT_Matches_Pattern(x);

        this._firstname = x;
    }

    get lastname() {
        return this._lastname;
    }

    set lastname(x) {
        VALIDATOR.IT_IS_VALID_STRING(x);
        VALIDATOR.Check_If_It_Is_In_Range(x.length, 3, 20);
        VALIDATOR.Check_If_IT_Matches_Pattern(x);

        this._lastname = x;
    }

    get username() {
        return this._username;
    }

    set username(x) {
        VALIDATOR.IT_IS_VALID_STRING(x);
        VALIDATOR.Check_If_It_Is_In_Range(x.length, 6, 14);
        VALIDATOR.Check_If_Username_Matches_Pattern(x);

        this._username = x;
    }

    get password() {
        return this._password;
    }

    set password(x) {
        VALIDATOR.IT_IS_VALID_STRING(x);
        VALIDATOR.Check_If_It_Is_In_Range(x.length, 7, 20);
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
}

module.exports = User;