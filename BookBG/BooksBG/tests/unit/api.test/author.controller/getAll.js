/* eslint linebreak-style: ["error", "windows"]*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } =
require('../../../../app/routers/api.router/authors.api.router/controller');

describe('authors api controller renderCreateForm()', () => {
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
            authors: {
                getAll: () => {
                    return Promise.resolve([1, 2]);
                },
            },
        };

        controller = init(data);
        const spy = sinon.spy(data.authors, 'getAll');

        controller.getAll(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
            });
    });
});