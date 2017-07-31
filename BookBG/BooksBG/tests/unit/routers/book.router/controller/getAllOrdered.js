/* eslint linebreak-style: ["error", "windows"]*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../../../app/routers/books.router/controller');

describe('books controller getAllOrdered()', () => {
    let req = null;
    let res = null;
    let data = null;
    let controller = null;

    let booksArray = [{
        isUpdated: false,
        _id: 1,
        _title: 'bookA',
        _genre: 'testgenreA',
        _author: 'atestauthorA',
    }, {
        isUpdated: false,
        _id: 2,
        _title: 'bookB',
        _genre: 'testgenreB',
        _author: 'btestauthorB',
    }, {
        isUpdated: false,
        _id: 3,
        _title: 'bookC',
        _genre: 'testgenreC',
        _author: 'ctestauthorC',
    }];

    beforeEach(() => {
        data = {
            books: {
                getAll: () => {
                    return Promise.resolve(booksArray);
                },
            },
        };

        controller = init(data);
        req = require('../../../../unit/reqres').getRequestMock();
        res = require('../../../../unit/reqres').getResponseMock();
    });

    afterEach(() => {
        booksArray = [{
            isUpdated: false,
            _id: 1,
            _title: 'bookA',
            _genre: 'testgenreA',
            _author: 'atestauthorA',
        }, {
            isUpdated: false,
            _id: 2,
            _title: 'bookB',
            _genre: 'testgenreB',
            _author: 'btestauthorB',
        }, {
            isUpdated: false,
            _id: 3,
            _title: 'bookC',
            _genre: 'testgenreC',
            _author: 'ctestauthorC',
        }];
    });

    it('expect to call getAll() once', () => {
        req.body = { input: 'sometest' };
        const spy1 = sinon.spy(data.books, 'getAll');

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(spy1.callCount).to.equal(1);
            });
    });

    it('expect to call getAll() to trow error when invalid order', () => {
        req.body = { input: 'invalidtest' };
        const spy1 = sinon.spy(data.books, 'getAll');

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(spy1.threw);
            });
    });

    it('expect to call getAll() default to return all books in default and render corretly isAdmin when there is no user', () => {
        req.body = { input: 'Default' };

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(res.context.isAdmin).to.equal(false);
            });
    });

    it('expect to call getAll() default to return all books in default and render corretly result with user', () => {
        req.body = { input: 'Default' };
        req.user = { _role: 'admin' };

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(res.context.isAdmin).to.equal(true);
            });
    });

    it('expect to call getAll() default to return all books in default and render corretly result with user', () => {
        req.body = { input: 'Default' };
        req.user = { _role: 'user' };

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(res.context.isAdmin).to.equal(false);
            });
    });

    it('expect to call getAll() default to return all books in default and render corretly viewModel', () => {
        req.body = { input: 'Default' };
        req.user = { _role: 'user' };

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(res.viewName).to.equal('books/partialViews/booksContent.pug');
            });
    });

    it('expect Default to return correct result', () => {
        req.body = { input: 'Default' };
        req.user = { _role: 'user' };

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(res.context.context).to.deep.equal(booksArray);
            });
    });

    it('expect Athor ascending to return correct result', () => {
        req.body = { input: 'Author ascending' };
        req.user = { _role: 'user' };

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(res.context.context[0]._title).to.deep.equal('bookA');
                expect(res.context.context[0]._author).to.deep.equal('atestauthorA');
            });
    });

    it('expect Athor descending to return correct result', () => {
        req.body = { input: 'Author descending' };
        req.user = { _role: 'user' };

        controller.getAllOrdered(req, res)
            .then(() => {
                expect(res.context.context[0]._title).to.deep.equal('bookC');
                expect(res.context.context[0]._author).to.deep.equal('ctestauthorC');
                expect(res.context.context[2]._title).to.deep.equal('bookA');
                expect(res.context.context[2]._author).to.deep.equal('ctestauthorA');
            });
    });
});