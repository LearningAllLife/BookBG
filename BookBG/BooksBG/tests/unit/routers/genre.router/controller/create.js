/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } =
require('../../../../../app/routers/genres.router/controller');

describe('genres controller create()', () => {
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

    it('expect to throw error if genre is undefined and redirect correctly', () => {
        req.get = () => {
            return '/';
        };
        const spy = sinon.spy(req, 'flash');

        data = {
            genres: {

            },
        };

        controller = init(data);

        controller.create(req, res)
            .then(() => {
                const call = spy.getCall(0);
                expect(call.args[1]).to.equal('Invalid genre');
                expect(res.redirectUrl).to.equal('/genres/add');
            });
    });

    it('expect to genres getAll() with correct params', () => {
        req.get = () => {
            return '/';
        };

        data = {
            genres: {
                getAll: () => {
                    return Promise.resolve(1);
                },
            },
        };

        controller = init(data);

        req.body = { genre: 'testGenre' };
        const spy = sinon.spy(data.genres, 'getAll');
        controller.create(req, res)
            .then(() => {
                const call = spy.getCall(0);
                expect(call.args[0]).to.deep.equal({ _name: 'testGenre' });
            });
    });

    it('expect to throw if already exist and redirect correctly', () => {
        req.get = () => {
            return '/';
        };

        data = {
            genres: {
                getAll: () => {
                    return Promise.resolve(1);
                },
            },
        };

        controller = init(data);

        req.body = { genre: 'testGenre' };
        const spy = sinon.spy(req, 'flash');
        controller.create(req, res)
            .then(() => {
                const call = spy.getCall(0);
                expect(call.args[1]).to.deep.equal('Already Exists');
                expect(res.redirectUrl).to.equal('/genres/add');
            });
    });

    it('expect to create genre if such does not exist', () => {
        req.get = () => {
            return '/';
        };

        data = {
            genres: {
                getAll: () => {
                    return Promise.resolve([]);
                },
                create: () => {
                    return Promise.resolve(1);
                },
            },
        };

        controller = init(data);

        req.body = { genre: 'testGenre' };
        const spy = sinon.spy(data.genres, 'create');
        controller.create(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
                const call = spy.getCall(0);
                expect(call.args[0]).to.deep.equal({ name: 'testGenre' });
            });
    });

    it('expect to redirect correctly', () => {
        req.get = () => {
            return '/';
        };

        data = {
            genres: {
                getAll: () => {
                    return Promise.resolve([]);
                },
                create: () => {
                    return Promise.resolve(1);
                },
            },
        };

        controller = init(data);

        req.body = { genre: 'testAuthor' };

        controller.create(req, res)
            .then(() => {
                expect(res.redirectUrl).to.equal('/');
            });
    });
});