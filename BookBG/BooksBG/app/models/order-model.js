class Order {
    constructor({ books, adress, user, totalPrice }) {
        this.books = books;
        this.adress = adress;
        this.user = user;
        this.totalPrice = totalPrice;
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

    set totalPrice(x) {
        this._totalPrice = x;
    }
}

module.exports = Order;