/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last,max-len*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../../../app/routers/order.router/controller');

describe('order controller completeOrder()', () => {
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

    it('expect to call getById once with correct params', () => {
        data = {
            orders: {
                getById: () => {
                    return Promise.resolve({ _id: 1, _isDone: false });
                },
                update: () => {
                    return Promise.resolve(1);
                },
            },
        };

        req.body = { id: 1 };
        controller = init(data);
        const spy = sinon.spy(data.orders, 'getById');

        controller.completeOrder(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
                const call = spy.getCall(0);
                expect(call.args[0]).to.deep.equal(1);
            });
    });

    it('expect to call update with correct params', () => {
        data = {
            orders: {
                getById: () => {
                    return Promise.resolve({ _id: 1, _isDone: false });
                },
                update: () => {
                    return Promise.resolve(1);
                },
            },
        };

        req.body = { id: 1 };
        controller = init(data);
        const spy = sinon.spy(data.orders, 'update');

        controller.completeOrder(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
                const call = spy.getCall(0);
                expect(call.args[0]).to.deep.equal({ _id: 1 });
                expect(call.args[1]).to.deep.equal({ _id: 1, _isDone: true });
            });
    });

    it('expect to return correct status', () => {
        data = {
            orders: {
                getById: () => {
                    return Promise.resolve({ _id: 1, _isDone: false });
                },
                update: () => {
                    return Promise.resolve(1);
                },
            },
        };

        req.body = { id: 1 };
        controller = init(data);

        controller.completeOrder(req, res)
            .then(() => {
                expect(res.statusCode).to.equal(200);
            });
    });
});