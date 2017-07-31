/* eslint linebreak-style: ["error", "windows"]*/
const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../../../app/routers/users.router/controller');

describe('user controller getAllUsers()', () => {
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

    it('expect to call method getAll() that are not deleted', () => {
        data = {
            users: {
                getAll: () => {
                    return Promise.resolve([{
                        _name: 'user1',
                    }]);
                },
            },
        };

        controller = init(data);

        controller.getAllUsers(req, res)
            .then(() => {

            });
    });
});
