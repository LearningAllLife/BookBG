/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../../../app/routers/books.router/controller');
describe('books controller search()', () => {
    let data = null;
    let controller = null;
    let req = null;
    let res = null;

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
        req = require('../../../../unit/reqres').getRequestMock();
        res = require('../../../../unit/reqres').getResponseMock();
    });

    it('expect to return correct when author contains', () => {
        data = {
            books: {
                getAll(object) {
                    return Promise.resolve(booksArray);
                },
            },
            authors: {
                getAll() {
                    return Promise.resolve([authorsArray[1]]);
                },
            },
        };

        controller = init(data);

        req.params = {};
        req.body = { input: 'test' };
        req.user = { _role: 'user' };

        controller.search(req, res)
            .then(() => {
                expect(res.context.isAdmin).to.equal(false);
            });
    });

    it('expect to return correct result if there are 2 books with 2 different authors', () => {
        const booksArray1 = [{
            isUpdated: false,
            _id: 1,
            _title: 'book1',
            _genre: 'testgenre1',
            _author: 'testauthor1',
        }, {
            isUpdated: false,
            _id: 2,
            _title: 'book1',
            _genre: 'testgenre2',
            _author: 'testauthor2',
        }, {
            isUpdated: false,
            _id: 3,
            _title: 'book3',
            _genre: 'testgenre3',
            _author: 'testauthor3',
        }];

        const authorsArray1 = [{
            _name: 'testauthor1',
            _books: [booksArray[0]],
        }, {
            _name: 'testauthor2',
            _books: [booksArray[1]],
        }, {
            _name: 'testauthor3',
            _books: [],
        }];

        data = {
            books: {
                getAll(object) {
                    return Promise.resolve(booksArray1);
                },
            },
            authors: {
                getAll() {
                    return Promise.resolve([authorsArray1[0]]);
                },
            },
        };

        controller = init(data);

        req.params = {};
        req.body = { input: 'test' };

        controller.search(req, res)
            .then(() => {
                expect(res.context.context.length).to.deep.equal(3);
            });
    });

    it('expect to return correct property of admin', () => {
        data = {
            books: {
                getAll(object) {
                    return Promise.resolve(booksArray);
                },
            },
            authors: {
                getAll() {
                    return Promise.resolve([authorsArray[1]]);
                },
            },
        };

        controller = init(data);

        req.params = {};
        req.body = { input: 'test' };
        req.user = { _role: 'admin' };

        controller.search(req, res)
            .then(() => {
                expect(res.context.isAdmin).to.equal(true);
            });
    });

    it('expect to return correct property of admin', () => {
        data = {
            books: {
                getAll(object) {
                    return Promise.resolve(booksArray);
                },
            },
            authors: {
                getAll() {
                    return Promise.resolve([authorsArray[1]]);
                },
            },
        };

        controller = init(data);

        req.params = {};
        req.body = { input: 'test' };
        req.user = { _role: 'user' };

        controller.search(req, res)
            .then(() => {
                expect(res.context.isAdmin).to.equal(false);
            });
    });

    it('expect to return correct result if author contains new book', () => {
        data = {
            books: {
                getAll(object) {
                    return Promise.resolve([booksArray[0]]);
                },
            },
            authors: {
                getAll() {
                    return Promise.resolve([authorsArray[1]]);
                },
            },
        };

        controller = init(data);

        req.params = {};
        req.body = { input: 'test' };

        controller.search(req, res)
            .then(() => {
                expect(res.context.context.length).to.deep.equal(2);
            });
    });

    it('expect books.getAll() to be called once', () => {
        data = {
            books: {
                getAll(object) {
                    return Promise.resolve(booksArray);
                },
            },
            authors: {
                getAll() {
                    return Promise.resolve([authorsArray[1]]);
                },
            },
        };

        controller = init(data);

        const spy1 = sinon.spy(data.books, 'getAll');
        req.params = {};
        req.body = { input: 'test' };

        controller.search(req, res)
            .then(() => {
                expect(spy1.callCount).to.equal(1);
                expect(spy1.calledWithMatch({
                    _title: new RegExp('test', 'i'),
                }));
            });
    });

    it('expect genres.getAll() to be called once', () => {
        data = {
            books: {
                getAll(object) {
                    return Promise.resolve(booksArray);
                },
            },
            authors: {
                getAll() {
                    return Promise.resolve([authorsArray[1]]);
                },
            },
        };

        controller = init(data);

        const spy2 = sinon.spy(data.authors, 'getAll');
        req.params = {};
        req.body = { input: 'test' };

        controller.search(req, res)
            .then(() => {
                expect(spy2.callCount).to.equal(1);
                expect(spy2.calledWithMatch({
                    _title: new RegExp('test', 'i'),
                }));
            });
    });
});