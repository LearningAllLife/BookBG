/* eslint linebreak-style: ["error", "windows"]*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } =
require('../../../../app/routers/api.router/orders.api.router/controller');

describe('order api controller renderCreateForm()', () => {
    let data = null;
    let controller = null;
    let req = null;
    let res = null;

    beforeEach(() => {
        req = require('../../reqres').getRequestMock();
        res = require('../../reqres').getResponseMock();
        req.flash = () => {

        };
    });

    it('expect to call getAll() once', () => {
        data = {
            orders: {
                getAll: () => {
                    return Promise.resolve([1, 2]);
                },
            },
        };

        controller = init(data);
        const spy = sinon.spy(data.orders, 'getAll');

        controller.getAll(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
            });
    });
});