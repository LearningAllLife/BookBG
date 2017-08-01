/* eslint linebreak-style: ["error", "windows"]*/
/* eslint-disable eol-last,no-unused-vars*/
const { expect } = require('chai');
const sinon = require('sinon');

const UserData = require('../../../../app/data/user-data');

describe('User data create()', () => {
    let db = null;
    let ModelClass = null;
    let data = null;
    const spy = null;
    const foundItems = [1, 2, 3];

    beforeEach(() => {
        ModelClass = { name: 'testclass' };

        db = {
            collection: () => {},
        };

        const insert = (model) => {
            return Promise.resolve(model);
        };

        const toArray = () => {
            return foundItems;
        };

        const find = (props) => {
            return {
                toArray,
            };
        };

        const stub = sinon.stub(db, 'collection')
            .returns({ find, insert });

        data = new UserData(db);
    });

    it('expect to throw if invalid', () => {
        data.create(1)
            .then((result) => {
                expect(result).to.deep.equal({ number: 1 });
            });
    });
});