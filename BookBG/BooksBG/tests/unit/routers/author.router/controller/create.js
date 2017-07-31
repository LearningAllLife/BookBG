/* eslint linebreak-style: ["error", "windows"]*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } =
require('../../../../../app/routers/authors.router/controller');

describe('authors controller create()', () => {
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

    it('expect to throw error if athor is undefined', () => {
        req.get = () => {
            return '/';
        };
        const spy = sinon.spy(req, 'flash');

        data = {
            authors: {

            },
        };

        controller = init(data);

        controller.create(req, res)
            .then(() => {
                const call = spy.getCall(0);
                expect(call.args[1]).to.equal('Invalid author');
            });
    });

    it('expect to authors getAll() with correct params', () => {
        req.get = () => {
            return '/';
        };

        data = {
            authors: {
                getAll: () => {
                    return Promise.resolve(1);
                },
            },
        };

        controller = init(data);

        req.body = { name: 'testAuthor' };
        const spy = sinon.spy(data.authors, 'getAll');
        controller.create(req, res)
            .then(() => {
                const call = spy.getCall(0);
                expect(call.args[0]).to.deep.equal({ _name: 'testAuthor' });
            });
    });

    it('expect to throw if already exist', () => {
        req.get = () => {
            return '/';
        };

        data = {
            authors: {
                getAll: () => {
                    return Promise.resolve(1);
                },
            },
        };

        controller = init(data);

        req.body = { name: 'testAuthor' };
        const spy = sinon.spy(req, 'flash');
        controller.create(req, res)
            .then(() => {
                const call = spy.getCall(0);
                expect(call.args[1]).to.deep.equal('Already Exists');
            });
    });

    it('expect to create author if such does not exist', () => {
        req.get = () => {
            return '/';
        };

        data = {
            authors: {
                getAll: () => {
                    return Promise.resolve([]);
                },
                create: () => {
                    return Promise.resolve(1);
                },
            },
        };

        controller = init(data);

        req.body = { name: 'testAuthor' };
        const spy = sinon.spy(data.authors, 'create');
        controller.create(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
                const call = spy.getCall(0);
                expect(call.args[0]).to.deep.equal({ name: 'testAuthor' });
            });
    });

    it('expect to redirect correctly', () => {
        req.get = () => {
            return '/';
        };

        data = {
            authors: {
                getAll: () => {
                    return Promise.resolve([]);
                },
                create: () => {
                    return Promise.resolve(1);
                },
            },
        };

        controller = init(data);

        req.body = { name: 'testAuthor' };

        controller.create(req, res)
            .then(() => {
                expect(res.redirectUrl).to.equal('/');
            });
    });
});
