/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last,max-len*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../../../app/routers/users.router/controller');

describe('user controller deleteUser()', () => {
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

    it('expect to call data.users getById with correct params', () => {
        data = {
            users: {
                getById: () => {
                    return Promise.resolve({ _id: 1, _isDeleted: false });
                },
                update: () => {
                    return Promise.resolve(1);
                },
            },
        };

        const validator = {
            escape: () => {
                return 'user1';
            },
        };
        req.get = () => {
            return Promise.resolve('/');
        };
        req.body = { id: 313 };
        res.end = () => {

        };
        controller = init(data, validator);
        const spy = sinon.spy(data.users, 'getById');

        controller.deleteUser(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
                const call = spy.getCall(0);
                expect(call.args[0]).to.deep.equal(313);
            });
    });

    it('expect to call data.users update with correct params', () => {
        data = {
            users: {
                getById: () => {
                    return Promise.resolve({ _id: 1, _isDeleted: false });
                },
                update: () => {
                    return Promise.resolve(1);
                },
            },
        };

        const validator = {
            escape: () => {
                return 'user1';
            },
        };
        req.get = () => {
            return Promise.resolve('/');
        };
        req.body = { id: 313 };
        res.end = () => {

        };
        controller = init(data, validator);
        const spy = sinon.spy(data.users, 'update');

        controller.deleteUser(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
                const call = spy.getCall(0);
                expect(call.args).to.deep.equal([{ _id: 1 },
                    { _id: 1, _isDeleted: true },
                ]);
            });
    });

    it('expect to return response status correctly', () => {
        data = {
            users: {
                getById: () => {
                    return Promise.resolve({ _id: 1, _isDeleted: false });
                },
                update: () => {
                    return Promise.resolve(1);
                },
            },
        };

        const validator = {
            escape: () => {
                return 'user1';
            },
        };
        req.get = () => {
            return Promise.resolve('/');
        };
        req.body = { id: 313 };
        res.end = () => {

        };
        controller = init(data, validator);

        controller.deleteUser(req, res)
            .then(() => {
                expect(res.statusCode).to.equal(200);
            });
    });
});