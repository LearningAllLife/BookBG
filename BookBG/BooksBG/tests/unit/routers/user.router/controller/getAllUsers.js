/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../../../app/routers/users.router/controller');

describe('user controller getAllUsers()', () => {
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
            users: {
                getAll: () => {
                    return Promise.resolve([{
                        _name: 'user1',
                    }]);
                },
            },
        };

        controller = init(data);
        const spy = sinon.spy(data.users, 'getAll');

        controller.getAllUsers(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
                const call = spy.getCall(0);
                expect(call.args[0]).to.deep.equal({ _isDeleted: false });
            });
    });

    it('expect to render correct context', () => {
        data = {
            users: {
                getAll: () => {
                    return Promise.resolve([{
                        _name: 'user1',
                    }]);
                },
            },
        };

        controller.getAllUsers(req, res)
            .then(() => {
                expect(res.context.users).to.deep.equal([{ _name: 'user1' }]);
            });
    });

    it('expect to render correct view', () => {
        data = {
            users: {
                getAll: () => {
                    return Promise.resolve([{
                        _name: 'user1',
                    }]);
                },
            },
        };

        controller.getAllUsers(req, res)
            .then(() => {
                expect(res.viewName).to.deep.equal('users/getAll');
            });
    });
});