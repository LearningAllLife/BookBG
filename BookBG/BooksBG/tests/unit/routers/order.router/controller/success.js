/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../../../app/routers/order.router/controller');

describe('order controller succes()', () => {
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

    it('expect render correct view', () => {
        data = {
            users: {},
        };

        controller = init(data);

        controller.success(req, res);
        expect(res.viewName).to.equal('orders/success.pug');
    });
});