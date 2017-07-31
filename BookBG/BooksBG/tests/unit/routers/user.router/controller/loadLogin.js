/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last,max-len,no-unused-vars*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../../../app/routers/users.router/controller');

describe('user controller loadLogin()', () => {
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

        controller.loadLogin(req, res);
        expect(res.viewName).to.equal('./users/loginForm');
    });
});