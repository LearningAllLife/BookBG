/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } =
require('../../../../../app/routers/genres.router/controller');

describe('genres controller getAddForm()', () => {
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

    it('expect to call getAll() once', () => {
        data = {
            genres: {
                getAll: () => {
                    return Promise.resolve([1, 2]);
                },
            },
        };

        controller = init(data);

        const spy = sinon.spy(data.genres, 'getAll');

        controller.getGenresForDropDown(req, res)
            .then(() => {
                expect(spy.callCount).to.equal(1);
            });
    });

    it('expect to render correct view', () => {
        data = {
            genres: {
                getAll: () => {
                    return Promise.resolve([1, 2]);
                },
            },
        };

        controller = init(data);

        controller.getGenresForDropDown(req, res)
            .then(() => {
                expect(res.viewName).to.equal('genres/partialViews/forDropDown.pug');
            });
    });

    it('expect to render correct view with correct context', () => {
        data = {
            genres: {
                getAll: () => {
                    return Promise.resolve([1, 2]);
                },
            },
        };

        controller = init(data);

        controller.getGenresForDropDown(req, res)
            .then(() => {
                expect(res.context.data).to.deep.equal([1, 2]);
            });
    });
});