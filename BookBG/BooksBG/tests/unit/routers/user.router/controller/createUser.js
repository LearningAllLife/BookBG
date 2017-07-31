/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../../../app/routers/users.router/controller');

describe('user controller createUser()', () => {
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

    it('expect to call data.users findByUserName', () => {
        data = {
            users: {
                findByUsername: () => {
                    return Promise.resolve(null);
                },
                create: () => {
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
        req.body = { username: 'user1' };
        controller = init(data, validator);
        const spy = sinon.spy(data.users, 'findByUsername');

        controller.createUser(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
                const call = spy.getCall(0);
                expect(call.args[0]).to.deep.equal('user1');
            });
    });
    it('expect to call data.users findByUserName', () => {
        data = {
            users: {
                findByUsername: () => {
                    return Promise.resolve(null);
                },
                create: () => {
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
        req.body = { username: 'user1' };
        controller = init(data, validator);
        const spy = sinon.spy(data.users, 'findByUsername');

        controller.createUser(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
                const call = spy.getCall(0);
                expect(call.args[0]).to.deep.equal('user1');
            });
    });

    it('expect to throw if user already exists', () => {
        data = {
            users: {
                findByUsername: () => {
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
        req.body = { username: 'user1' };
        controller = init(data, validator);

        const spy = sinon.spy(req, 'flash');

        controller.createUser(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
                const call = spy.getCall(0);
                expect(call.args[1]).to.deep.equal('User already exists');
            });
    });

    it('expect to call create() with correct params', () => {
        data = {
            users: {
                findByUsername: () => {
                    return Promise.resolve(null);
                },
                create: () => {
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
        req.body = { username: 'user1' };
        controller = init(data, validator);
        const spy = sinon.spy(data.users, 'create');

        controller.createUser(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
                const call = spy.getCall(0);
                expect(call.args[0]).to.deep.equal({
                    username: 'user1',
                    role: 'user',
                });
            });
    });

    it('expect to redirect correctly after user is created', () => {
        data = {
            users: {
                findByUsername: () => {
                    return Promise.resolve(null);
                },
                create: () => {
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
        req.body = { username: 'user1' };
        controller = init(data, validator);

        controller.createUser(req, res)
            .then(() => {
                expect(res.redirectUrl).to.equal('/users/login');
            });
    });
});