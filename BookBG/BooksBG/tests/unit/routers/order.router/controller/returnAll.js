/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last,max-len*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../../../app/routers/order.router/controller');

describe('order controller returnALl()', () => {
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

    it('expect to call method getAll() that are not deleted', () => {
        data = {
            orders: {
                getAll: () => {
                    return Promise.resolve([{
                        _name: 'user1',
                    }]);
                },
            },
        };

        controller = init(data);
        const spy = sinon.spy(data.orders, 'getAll');

        controller.returnAll(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
                const call = spy.getCall(0);
                expect(call.args[0]).to.deep.equal({ _isDone: false });
            });
    });

    it('expect to throw if there are no orders', () => {
        data = {
            orders: {
                getAll: () => {
                    return Promise.resolve(null);
                },
            },
        };

        req.get = () => {
            return '/';
        };
        controller = init(data);
        const spy = sinon.spy(req, 'flash');

        controller.returnAll(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
                const call = spy.getCall(0);
                expect(call.args[1]).to.deep.equal('No orders');
            });
    });

    it('expect to render correct view with correct items', () => {
        data = {
            orders: {
                getAll: () => {
                    return Promise.resolve([1, 2, 3]);
                },
            },
        };

        req.get = () => {
            return '/';
        };
        controller = init(data);

        controller.returnAll(req, res)
            .then(() => {
                expect(res.viewName).to.equal('orders/allOrders.pug');
                expect(res.context).to.deep.equal({ orders: [1, 2, 3] });
            });
    });
});