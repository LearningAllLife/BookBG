/* eslint linebreak-style: ["error", "windows"]*/
const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../app/data/base-data');

describe('Base data count()', () => {
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
            return model;
        };

        const toArray = () => {
            return foundItems;
        };

        const find = (props) => {
            return {
                toArray,
            };
        };

        const count = (props) => {
            return Promise.resolve(3);
        };

        const stub = sinon.stub(db, 'collection')
            .returns({ find, insert, count });

        data = new BaseData(db, ModelClass);
    });

    it('expect to insert into the collection the right model', () => {
        data.count({ _isDeleted: false })
            .then((result) => {
                expect(result).to.equal(3);
            });
    });
});
