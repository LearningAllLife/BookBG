/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last,no-unused-vars*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } =
require('../../../../../app/routers/authors.router/controller');

describe('authors controller renderCreateForm()', () => {
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

        controller.renderCreateForm(req, res);

        expect(res.viewName).to.equal('authors/addAuthorForm');
    });
});