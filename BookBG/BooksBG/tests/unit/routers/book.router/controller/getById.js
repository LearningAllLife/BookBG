/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../../../app/routers/books.router/controller');

describe('books controller getById()', () => {
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

    it('expect to throw error if id is not found', () => {
        data = {
            books: {
                getById(id) {
                    return Promise.resolve({ _title: 'book1' });
                },
            },
        };

        controller = init(data);

        req.params = {};
        const spy = sinon.spy(req, 'flash');

        controller.getById(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
            });
    });

    it('expect to call getById with correct param', () => {
        data = {
            books: {
                getById(id) {
                    return Promise.resolve({ _title: 'book1' });
                },
            },
        };

        controller = init(data);
        req.params = { id: 113 };

        const spy = sinon.spy(data.books, 'getById');

        controller.getById(req, res)
            .then(() => {
                const call = spy.getCall(0);
                expect(call.args[0]).to.equal(113);
            });
    });

    it('expect to throw error if there is no such book found', () => {
        data = {
            books: {
                getById(id) {
                    return Promise.resolve(null);
                },
            },
        };

        controller = init(data);

        req.params = { id: 113 };

        const spy = sinon.spy(req, 'flash');

        controller.getById(req, res)
            .then(() => {
                const call = spy.getCall(0);
                expect(spy.callCount).to.equal(1);
                expect(call.args[1]).to.equal('No such book');
            });
    });

    it('expect to throw error if there is no such book found', () => {
        data = {
            books: {
                getById(id) {
                    return Promise.resolve(13);
                },
            },
        };

        controller = init(data);

        req.params = { id: 113 };

        controller.getById(req, res)
            .then(() => {
                expect(res.context.book).to.equal(13);
            });
    });
});