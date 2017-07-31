/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last*/
const { expect } = require('chai');
const sinon = require('sinon');

const { init } = require('../../../../../app/routers/books.router/controller');

describe('books controller delete()', () => {
    let data = null;
    let data2 = null;
    let controller = null;
    let controller1 = null;
    let req = null;
    let res = null;
    let spy1 = null;
    let spy2 = null;
    let spy3 = null;

    const booksArray = [{
        isUpdated: false,
        _id: 1,
        _title: 'book1',
        _genre: 'testgenre1',
        _author: 'testauthor1',
    }, {
        isUpdated: false,
        _id: 2,
        _title: 'book2',
        _genre: 'testgenre2',
        _author: 'testauthor2',
    }, {
        isUpdated: false,
        _id: 3,
        _title: 'book3',
        _genre: 'testgenre3',
        _author: 'testauthor3',
    }];

    const genresArray = [{
        _name: 'testgenre1',
        _books: [booksArray[0]],
    }, {
        _name: 'testgenre2',
        _books: [booksArray[1]],
    }];

    const authorsArray = [{
        _name: 'testauthor1',
        _books: [booksArray[0]],
    }, {
        _name: 'testauthor2',
        _books: [booksArray[1]],
    }, {
        _name: 'testauthor3',
        _books: [],
    }];

    beforeEach(() => {
        data = {
            books: {
                getById(bookId) {
                    return Promise.resolve(booksArray[0]);
                },
                update(book, object) {},
            },
            genres: {
                getAll(filter) {
                    return Promise.resolve([genresArray[0]]);
                },
                update(filter, newModel) {},
            },
            authors: {
                getAll(filter) {
                    return Promise.resolve([authorsArray[0]]);
                },
                update(filter) {},
            },
        };

        data2 = {
            books: {
                getById(bookId) {
                    return Promise.resolve(booksArray[2]);
                },
                update(book, object) {},
            },
            genres: {
                getAll(filter) {
                    return Promise.resolve([genresArray[1]]);
                },
                update(filter, newModel) {},
            },
            authors: {
                getAll(filter) {
                    return Promise.resolve([authorsArray[1]]);
                },
                update(filter) {},
            },
        };
        controller = init(data);
        controller1 = init(data2);
        req = require('../../../../unit/reqres').getRequestMock();
        res = require('../../../../unit/reqres').getResponseMock();

        req.body = { input: 1 };
        req.flash = () => {
            return Promise.resolve('error');
        };
    });

    it('expect not to change author if there is no such found', () => {
        controller1.deleteBook(req, res, 1)
            .then(() => {
                expect(authorsArray[0]._books.length).to.equal(1);
            });
    });

    it('expect not to change genre if ther is no such found', () => {
        controller1.deleteBook(req, res, 1)
            .then(() => {
                expect(genresArray[0]._books.length).to.equal(1);
            });
    });

    it('expect to delete current book from authors collection', () => {
        controller.deleteBook(req, res, 1)
            .then(() => {
                expect(genresArray[0]._books.length).to.equal(0);
            });
    });

    it('expect to delete current book from authors collection', () => {
        controller.deleteBook(req, res, 1)
            .then(() => {
                expect(authorsArray[0]._books.length).to.equal(0);
            });
    });

    it('expect to mark current book as deleted in collection', () => {
        spy1 = sinon.spy(data.books, 'update');

        controller.deleteBook(req, res, 1)
            .then(() => {
                expect(spy1.callCount).to.equal(1);
                expect(spy1.calledWith({ _title: 'book1' }));
            });
    });

    it('expect to call update on genres collection', () => {
        spy2 = sinon.spy(data.genres, 'update');

        controller.deleteBook(req, res, 1)
            .then(() => {
                genresArray[0]._books = [];
                expect(spy2.callCount).to.equal(1);
                expect(spy2.calledWith({ _name: 'testgenre1' },
                    genresArray[0]));
            });
    });

    it('expect to call update on athors collection', () => {
        spy3 = sinon.spy(data.authors, 'update');

        controller.deleteBook(req, res, 1)
            .then(() => {
                expect(spy3.callCount).to.equal(1);
                expect(spy3.calledWith({ _name: 'testauthor1' },
                    authorsArray[0]));
            });
    });
});