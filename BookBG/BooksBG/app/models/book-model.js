class Book {
    constructor({ title, author, genre, rating, price, picture }) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.rating = rating;
        this.price = price;
        this.picture = picture;
    }

    get title() {
        return this._title;
    }

    set title(x) {
        this._title = x;
    }

    get author() {
        return this._author;
    }

    set author(x) {
        this._author = x;
    }

    get genre() {
        return this._genre;
    }

    set genre(x) {
        this._genre = x;
    }

    get rating() {
        return this._rating;
    }

    set rating(x) {
        this._rating = x;
    }

    get price() {
        return this._price;
    }

    set price(x) {
        this._price = x;
    }

    get picture() {
        return this._picture;
    }

    set picture(x) {
        this._picture = x;
    }
}

module.exports = Book;