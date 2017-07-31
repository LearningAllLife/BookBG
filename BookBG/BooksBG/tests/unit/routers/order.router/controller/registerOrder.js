/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../../../app/routers/order.router/controller');

describe('order controller registerOrder()', () => {
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

    it('expect to call getById right amount of times with correct params',
        () => {
            data = {
                books: {
                    getById: () => {
                        return Promise.resolve(1);
                    },
                },
            };

            req.body = { ids: '1|2|3' };

            controller = init(data);
            const spy = sinon.spy(data.books, 'getById');
            controller.registerOrder(req, res)
                .then(() => {
                    expect(spy.callCount).to.equal(3);
                    const call = spy.getCall(0);
                    expect(call.args[0]).to.deep.equal('1');
                    const call3 = spy.getCall(2);
                    expect(call3.args[0]).to.deep.equal('3');
                });
        });

    it('expect to render correctly view and context',
        () => {
            data = {
                books: {
                    getById: () => {
                        return Promise.resolve(1);
                    },
                },
            };

            req.body = { ids: '1|2|3' };

            controller = init(data);

            controller.registerOrder(req, res)
                .then(() => {
                    expect(res.viewName).to.equal('orders/partial/finishOrder.pug');
                    expect(res.context.books).to.deep.equal([1, 1, 1]);
                });
        });
});