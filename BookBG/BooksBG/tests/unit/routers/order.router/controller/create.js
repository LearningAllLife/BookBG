/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../../../app/routers/order.router/controller');

describe('order controller create()', () => {
    let data = null;
    let controller = null;
    let req = null;
    let res = null;

    beforeEach(() => {
        req = require('../../../../unit/reqres').getRequestMock();
        res = require('../../../../unit/reqres').getResponseMock();
        req.flash = () => {

        };

        req.get = () => {
            return '/';
        };
    });

    it('expect to throw Error if order is invalid',
        () => {
            controller = init(data);
            const spy = sinon.spy(req, 'flash');
            controller.create(req, res)
                .then(() => {
                    expect(spy.callCount).to.equal(1);
                    const call = spy.getCall(0);
                    expect(call.args[1]).to.equal('Invalid order');
                });
        });

    it('expect to call getById right amount times with right parameters',
        () => {
            data = {
                books: {
                    getById: () => {
                        return Promise.resolve(1);
                    },
                },
            };

            req.body = { books: '1,2,3' };
            controller = init(data);
            const spy = sinon.spy(data.books, 'getById');

            controller.create(req, res)
                .then(() => {
                    expect(spy.callCount).to.equal(3);
                    const call = spy.getCall(0);
                    expect(call.args[0]).to.deep.equal('1');
                    const call3 = spy.getCall(2);
                    expect(call3.args[0]).to.deep.equal('3');
                });
        });

    it('expect to throw if there are no books in order',
        () => {
            data = {
                books: {
                    getById: () => {
                        return Promise.resolve(null);
                    },
                },
            };

            req.body = { books: '' };
            controller = init(data);
            const spy = sinon.spy(req, 'flash');

            controller.create(req, res)
                .then(() => {
                    expect(spy.callCount).to.equal(1);
                    const call = spy.getCall(0);
                    expect(call.args[1]).to.equal('No books in order');
                });
        });

    // it('expect to throw if there is no user in order',
    //     () => {
    //         data = {
    //             books: {
    //                 getById: () => {
    //                     return Promise.resolve(1);
    //                 },
    //             },
    //             users: {
    //                 getById: () => {
    //                     return Promise.resolve(null);
    //                 },
    //             },
    //         };

    //         req.body = { books: '1,2,3' };
    //         controller = init(data);
    //         const spy = sinon.spy(req, 'flash');

    //         controller.create(req, res)
    //             .then(() => {
    //                 expect(spy.callCount).to.equal(1);
    //                 const call = spy.getCall(0);
    //                 expect(call.args[1]).to.equal('No user in order');
    //             });
    //     });
});