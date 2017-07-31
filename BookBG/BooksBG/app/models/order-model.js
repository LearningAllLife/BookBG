/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable no-console,max-len,eol-last*/
class Order {
    constructor({ books, adress, user, phoneNumber }) {
        this.books = books;
        this.adress = adress;
        this.user = user;
        this.phoneNumber = phoneNumber;
        const booksPrice = books
            .map((x) => parseInt(x._price, 10));
        this._totalPrice = booksPrice.reduce((a, b) => a + b, 0);
        this.isDone = false;
    }

    get books() {
        return this._books;
    }

    set books(x) {
        this._books = x;
    }

    get adress() {
        return this._adress;
    }

    set adress(x) {
        this._adress = x;
    }

    get user() {
        return this._user;
    }

    set user(x) {
        this._user = x;
    }

    get totalPrice() {
        return this._totalPrice;
    }
    get phoneNumber() {
        return this._phoneNumber;
    }

    set phoneNumber(x) {
        const pN = parseInt(x, 10);
        if (typeof pN === 'undefined') {
            throw Error('Invalid phone Number');
        }
        this._phoneNumber = x;
    }

    get isDone() {
        return this._isDone;
    }

    set isDone(x) {
        this._isDone = x;
    }
}

module.exports = Order;