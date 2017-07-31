/* eslint linebreak-style: ["error", "windows"]*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../../../app/routers/books.router/router');

describe('books controller create()', () => {
    let data = null;
    let controller = null;
    let req = null;
    let res = null;

    beforeEach(() => {
        req = require('../../../../unit/reqres').getRequestMock();
        res = require('../../../../unit/reqres').getResponseMock();
        req.flash = () => {

        };
    });

    it('expect to throw error if book is undefined', () => {
        req.get = () => {
            return '/';
        };
        const spy = sinon.spy(req, 'flash');

        data = {
            books: {

            },
        };

        controller = init(data);

        controller.create(req, res)
            .then(() => {
                const call = spy.getCall(0);
                expect(call.args[1]).to.equal('invalid book');
            });
    });

    it('expect to call getAll with correct parameters', () => {
        req.get = () => {
            return '/';
        };

        req.body = { title: 'testBook', author: 'testAuthor' };

        data = {
            books: {
                getAll: () => {
                    return Promise.resolve([{
                        _title: 'testBook',
                        _author: 'testAuthor',
                    }]);
                },
            },
        };

        controller = init(data);

        const spy = sinon.spy(data.books, 'getAll');

        controller.create(req, res)
            .then(() => {
                const call = spy.getCall(0);
                expect(call.args[0]).to.deep.equal({
                    _title: new RegExp('testBook', 'i'),
                });
            });
    });

    it('expect to throw if book is already created', () => {
        req.get = () => {
            return '/';
        };

        req.body = { title: 'testBook', author: 'testAuthor' };

        data = {
            books: {
                getAll: () => {
                    return Promise.resolve([{
                        _title: 'testBook',
                        _author: 'testAuthor',
                    }]);
                },
            },
        };

        controller = init(data);

        const spy = sinon.spy(req, 'flash');

        controller.create(req, res)
            .then(() => {
                const call = spy.getCall(0);
                expect(call.args[1]).to.equal('Book already exist!');
            });
    });

    it('expect to call findOrCreate on genres', () => {
        req.get = () => {
            return '/';
        };

        req.body = { title: 'testBook', author: 'testAuthor' };

        data = {
            books: {
                getAll: () => {
                    return Promise.resolve([{
                        _title: 'testBook1',
                        _author: 'testAuthor1',
                    }]);
                },
                create: () => {
                    return Promise.resolve({
                        ops: [{
                            _title: 'testBook1',
                            _author: 'testAuthor1',
                        }],
                    });
                },
            },
            genres: {
                findOrCreateBy: () => {
                    return Promise.resolve(null);
                },
            },
            authors: {
                findOrCreateBy: () => {
                    return Promise.resolve(null);
                },
            },
        };

        controller = init(data);

        const spy = sinon.spy(data.genres, 'findOrCreateBy');

        controller.create(req, res)
            .then(() => {
                const call = spy.getCall(0);
                expect(call.args[0].content).to.deep.equal({
                    _title: 'testBook1',
                    _author: 'testAuthor1',
                });
            });
    });

    it('expect to call findOrCreate of authors', () => {
        req.get = () => {
            return '/';
        };

        req.body = { title: 'testBook', author: 'testAuthor' };

        data = {
            books: {
                getAll: () => {
                    return Promise.resolve([{
                        _title: 'testBook1',
                        _author: 'testAuthor1',
                    }]);
                },
                create: () => {
                    return Promise.resolve({
                        ops: [{
                            _title: 'testBook1',
                            _author: 'testAuthor1',
                        }],
                    });
                },
            },
            genres: {
                findOrCreateBy: () => {
                    return Promise.resolve(null);
                },
            },
            authors: {
                findOrCreateBy: () => {
                    return Promise.resolve(null);
                },
            },
        };

        controller = init(data);

        const spy = sinon.spy(data.authors, 'findOrCreateBy');

        controller.create(req, res)
            .then(() => {
                const call = spy.getCall(0);
                expect(call.args[0].content).to.deep.equal({
                    _title: 'testBook1',
                    _author: 'testAuthor1',
                });
            });
    });
});
