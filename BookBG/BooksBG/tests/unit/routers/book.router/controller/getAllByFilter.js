const { expect } = require('chai');
const sinon = require('sinon');

const { init } = require('../../../../../app/routers/books.router/controller');

describe('books controller', () => {
    describe('with no filter', () => {
        let data = null;
        let controller = null;
        let req = null;
        let res = null;
        const items = [1, 2, 3, 4];

        beforeEach(() => {
            data = {
                books: {
                    count: () => {
                        return Promise.resolve(4);
                    },
                    getAll: () => {
                        return Promise.resolve(items);
                    },
                },
            };

            controller = init(data);
            req = require('../../../../unit/reqres').getRequestMock();
            res = require('../../../../unit/reqres').getResponseMock();
        });

        it('expect getAllByFilter() to return items', () => {
            req.path = 'testing/1';
            req.params = {};
            req.params.page = {};

            return controller.getAllByFilter(req, res)
                .then(() => {
                    expect(res.context.context).to.deep.equal(items);
                });
        });

        it('expect getAllByFilter() to render corret view', () => {
            req.path = 'testing/1';
            req.params = {};
            req.params.page = {};

            return controller.getAllByFilter(req, res)
                .then(() => {
                    expect(res.viewName).to.equal('books/partialViews/booksContent.pug');
                });
        });
    });
});
