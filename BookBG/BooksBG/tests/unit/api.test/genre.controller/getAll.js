/* eslint linebreak-style: ["error", "windows"]*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } =
require('../../../../app/routers/api.router/genres.api.router/controller');

describe('genre api controller renderCreateForm()', () => {
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

    it('expect to call getAll once', () => {
        data = {
            genres: {
                getAll: () => {
                    return Promise.resolve([1, 2]);
                },
            },
        };

        controller = init(data);
        const spy = sinon.spy(data.genres, 'getAll');

        controller.getAll(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
            });
    });
});