/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last,no-unused-vars*/
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

    it('expect to render correct view', () => {
        data = {};

        controller = init(data);

        controller.getAddForm(req, res);

        expect(res.viewName).to.equal('genres/addGenreForm');
    });
});