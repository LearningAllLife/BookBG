const { expect } = require('chai');
const sinon = require('sinon');

const { init } = require('../../../../../app/routers/books.router/controller');

describe('books controller getAllByFilter()', () => {
    let data = null;
    let controller = null;
    let req = null;
    let res = null;
    const items = [1, 2, 3, 4, 5, 6];

    beforeEach(() => {
        data = {
            books: {
                count: () => {
                    return Promise.resolve(6);
                },
                getAll: () => {
                    return Promise.resolve(items);
                }
            },
        };

        controller = init(data);
        req = require('../../../../unit/reqres').getRequestMock();
        res = require('../../../../unit/reqres').getResponseMock();
    })

    it('expect to return items', () => {
        req.path = 'testing/1';
        req.params = {};
        req.params.page = {};

        return controller.getAllByFilter(req, res)
            .then(() => {
                expect(res.context.context).to.deep.equal(items);
                expect(res.viewName).to.equal('books/partialViews/booksContent.pug');
            })
    })

    it('expect to return correct mark', () => {
        req.path = '/testing/1';
        req.params = { page: 1 };

        return controller.getAllByFilter(req, res)
            .then(() => {
                expect(res.context.marker).to.equal('testing');
            })
    })

    it('expect indeces to be correct', () => {
        req.path = '/testing/1';
        req.params = { page: 1 };

        return controller.getAllByFilter(req, res)
            .then(() => {
                expect(res.context.indeces).to.deep.equal([1, 2]);
            })
    })

    it('expect to render with correct isAdmin property', () => {
        req.path = '/testing/1';
        req.params = { page: 1 };

        return controller.getAllByFilter(req, res)
            .then(() => {
                expect(res.context.isAdmin).to.equal(false);
            })
    })

    it('expect to render default page', () => {
        req.path = '/testing/1';
        req.params = {};

        return controller.getAllByFilter(req, res)
            .then(() => {
                expect(res.context.isAdmin).to.equal(false);
            })
    })

    it('expect to work with isAdmin true', () => {
        req.user = { _isAdmin: true };
        req.path = '/testing/1';
        req.params = {};

        return controller.getAllByFilter(req, res)
            .then(() => {
                expect(res.context.isAdmin).to.equal(true);
            })
    })
});