/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len*/
class TestClass {
    constructor({ name, books }) {
        this.name = name;
        if (typeof books === 'undefined') {
            this.books = [];
        } else {
            this.books = books;
        }
    }

    get name() {
        return this._name;
    }

    set name(x) {
        this._name = x;
    }

    get books() {
        return this._books;
    }

    set books(x) {
        this._books = x;
    }
}

module.exports = TestClass;