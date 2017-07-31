/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } =
require('../../../../app/routers/api.router/users.api.router/controller');

describe('users api controller makeAdmin()', () => {
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

    it('expect to throw when username is not provided', () => {
        data = {
            users: {},
        };

        req.body = { secretmessage: 'testMessage', username: null };
        controller = init(data);

        controller.makeAdmin(req, res)
            .then(() => {
                expect(res.statusCode).to.equal(400);
                expect(res.jsonMessage).
                to.equal('You must provide secretmessage and username');
            });
    });

    it('expect to throw when sercretmessage is not provided', () => {
        data = {
            users: {},
        };

        req.body = { secretmessage: null, username: 'userName' };
        controller = init(data);

        controller.makeAdmin(req, res)
            .then(() => {
                expect(res.statusCode).to.equal(400);
                expect(res.jsonMessage).
                to.equal('You must provide secretmessage and username');
            });
    });

    it('expect to throw when wrong sercret message is provided', () => {
        data = {
            users: {},
        };

        req.body = { secretmessage: 'wrongsecret', username: 'userName' };
        controller = init(data);

        controller.makeAdmin(req, res)
            .then(() => {
                expect(res.statusCode).to.equal(400);
                expect(res.jsonMessage).
                to.equal('Wrong secret message');
            });
    });

    it('expect call findByUserName with correct params', () => {
        data = {
            users: {
                findByUsername: () => {
                    return Promise.resolve(null);
                },
            },
        };

        req.body = { secretmessage: 'Poweroverwhelming', username: 'userName' };
        controller = init(data);
        const spy = sinon.stub(data.users, 'findByUsername');
        controller.makeAdmin(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
                const call = spy.getCall(0);
                expect(call.args[0]).to.equal(req.body.username);
            });
    });

    it('expect call update when user is found', () => {
        data = {
            users: {
                findByUsername: () => {
                    return Promise.resolve({ _id: 1, _role: 'user' });
                },
                update: () => {
                    return Promise.resolve('succes');
                },
            },
        };

        req.body = { secretmessage: 'Poweroverwhelming', username: 'userName' };
        controller = init(data);
        const spy = sinon.stub(data.users, 'update');
        controller.makeAdmin(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
                const call = spy.getCall(0);
                expect(call.args[0]).to.deep.equal({ _id: 1 });
                expect(call.args[1]).to.deep.equal({ _id: 1, _role: 'admin' });
            });
    });

    it('expect return correct json', () => {
        data = {
            users: {
                findByUsername: () => {
                    return Promise.resolve({ _id: 1, _role: 'user' });
                },
                update: () => {
                    return Promise.resolve('succes');
                },
            },
        };

        req.body = { secretmessage: 'Poweroverwhelming', username: 'userName' };
        controller = init(data);

        controller.makeAdmin(req, res)
            .then(() => {
                expect(res.jsonMessage).to.equal('success');
            });
    });
});