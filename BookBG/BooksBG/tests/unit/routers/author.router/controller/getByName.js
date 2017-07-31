/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } =
require('../../../../../app/routers/authors.router/controller');

describe('authors controller getByName()', () => {
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

    it('expect to throw error if there is no such author', () => {
        req.get = () => {
            return '/';
        };
        const spy = sinon.spy(req, 'flash');

        data = {
            authors: {

            },
        };
        req.params = {};
        controller = init(data);

        controller.getByName(req, res)
            .then(() => {
                const call = spy.getCall(0);
                expect(call.args[1]).to.equal('No such author');
            });
    });

    it('expect to data.authors.getAll() with correct params', () => {
        req.get = () => {
            return '/';
        };

        data = {
            authors: {
                getAll: () => {
                    return Promise.resolve([]);
                },
            },
        };
        req.params = { name: 'testAuthor' };
        controller = init(data);

        const spy = sinon.spy(data.authors, 'getAll');

        controller.getByName(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
                const call = spy.getCall(0);
                expect(call.args[0]).to.deep.equal({ _name: 'testAuthor' });
            });
    });

    it('expect to throw if there is no such author', () => {
        req.get = () => {
            return '/';
        };

        data = {
            authors: {
                getAll: () => {
                    return Promise.resolve([]);
                },
            },
        };
        req.params = { name: 'testAuthor' };
        controller = init(data);

        const spy = sinon.spy(req, 'flash');

        controller.getByName(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
                const call = spy.getCall(0);
                expect(call.args[1]).to.deep.equal('No such author');
            });
    });

    it('expect to render correct view with correct context', () => {
        req.get = () => {
            return '/';
        };

        data = {
            authors: {
                getAll: () => {
                    return Promise.resolve([{ _name: 'testAuthor' }]);
                },
            },
        };
        req.params = { name: 'testAuthor' };
        controller = init(data);

        controller.getByName(req, res)
            .then(() => {
                expect(res.viewName).to.equal('authors/info.pug');
                expect(res.context.author).to.deep.equal({ _name: 'testAuthor' });
            });
    });
});